import { Application, static as expressStatic } from "express";
import { Server } from "@Infra/Server";
import { Database } from "@Infra/dataAccess";
import { iocContainer } from "@Infra/ioc";
/** ------   Middleware Imports --------------------- -*/
import cors from "cors";
import bodyParser from "body-parser";
import { _404Middleware, errorHandlingMiddleware } from "@Infra/middlewares";
import {
  IS_DEV,
  SERVER_PORT,
  DB_HOST,
  DB_OPTIONS,
  CORS_CONFIG,
} from "@Common/config";
import { ErrorHandler } from "@Common/errorUtils";

export class AppBootstrapper {
  private readonly _app: Application;
  private readonly _server: Server<Application>;

  constructor(app: Application, server: Server<Application>) {
    this._app = app;
    this._server = server;
  }

  get app() {
    return this._app;
  }

  get server() {
    return this._server;
  }

  public async bootstrap() {
    await this.bootstrapInfrastructure();
    this.bootstrapMiddlewares();
    this.bootstrapGlobalErrorHandling();
    /** start server in last */
    await this.startServer(SERVER_PORT);
  }

  private async bootstrapInfrastructure() {
    await Database.connect(DB_HOST, DB_OPTIONS);
  }

  private bootstrapMiddlewares() {
    /** Resolving the first time here as the "composition-root" */
    // const rootRouter = iocContainer.container.get<RootRouter>(
    //   ROOT_TYPES.RootRouter
    // );
    // rootRouter.loadChildRouters();

    if (IS_DEV) {
      this.app.use(cors(CORS_CONFIG));
    }
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.text());
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    /** This is where all routes are handles */
    // this.app.use(rootRouter.routerInstance);
    this.app.use(expressStatic(`${__dirname}/../../public`));
    /** 404 middleware should be after the router middleware is hooked up */
    this.app.use(_404Middleware);
    /** Error handling middleware should be in the last */
    this.app.use(errorHandlingMiddleware);
  }

  private async startServer(port: number) {
    await this.server.start(port);
  }

  private bootstrapGlobalErrorHandling() {
    process.on("uncaughtException", async (error: unknown) => {
      // currently passing logger and reporter as null
      const errorHandler = new ErrorHandler(null, null);
      await errorHandler.handleError(error);
      if (!errorHandler.isTrustedError(error)) process.exit(1);
    });

    process.on("unhandledRejection", async (reason: unknown) => {
      throw reason;
    });
  }
}
