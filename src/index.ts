import express from "express";
import http from "http";
import getConfigs from "./config/config";
import expressConfig from "./frameworks/webserver/express";
import serverConfig from "./frameworks/webserver/index";
import GetMySql from "./frameworks/database/mysql/connection";
import routes from "./frameworks/webserver/routes";

const app = express();

const server = http.createServer(app);
GetMySql();
expressConfig(app, getConfigs);
routes(app, express, getConfigs);
serverConfig(server, getConfigs).startServer();
