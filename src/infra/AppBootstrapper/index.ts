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
  BASE_ENDPOINT_V1,
} from "@Common/config";
import { ErrorHandler } from "@Common/errorUtils";
import { RootRouter } from "@Infra/routers/RootRouter";
import { IOC_TYPES } from "@Common/constants";

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
    /** NOTE: the order of middleware is important */

    if (IS_DEV) this.app.use(cors(CORS_CONFIG));
    this.app.use(bodyParser.json());
    /** ========================  Lading router middleware ====================== */

    /** Resolving dependencies the first time here as the "composition-root" */
    const rootRouter = iocContainer.get<RootRouter>(IOC_TYPES.RootRouter);
    rootRouter.loadAllRouters();
    /** adding routerInstance as routing middleware */
    this.app.use(BASE_ENDPOINT_V1, rootRouter.routerInstance);

    /** ========================================================================= */
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
      // currently passing logger and reporter as null, as no requirement for logger and reporter yet
      const errorHandler = new ErrorHandler(null, null);
      await errorHandler.handleError(error);
      if (!errorHandler.isTrustedError(error)) process.exit(1); // exiting right away of something unexpected occurs
    });

    process.on("unhandledRejection", async (reason: unknown) => {
      throw reason;
    });
  }
}
