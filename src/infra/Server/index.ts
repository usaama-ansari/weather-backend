import http from "http";
import type { Server as HttpServer } from "http";

export class Server<TApp> {
  private readonly _httpServer: HttpServer;

  constructor(app: TApp) {
    this._httpServer = http.createServer(app);
  }

  get httpServer(): HttpServer {
    return this._httpServer;
  }

  public start(PORT: number): Promise<void> {
    return new Promise((resolve) => {
      this._httpServer.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
        resolve();
      });
    });
  }
}
