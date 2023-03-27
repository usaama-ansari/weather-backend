import "reflect-metadata";
import express, { Application } from "express";
import { AppBootstrapper } from "@Infra/AppBootstrapper";
import { Server } from "@Infra/Server";

const app: Application = express();
const server = new Server(app);
const appBootstrapper = new AppBootstrapper(app, server);
appBootstrapper.bootstrap();