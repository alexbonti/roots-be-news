/**
 * Created by Navit
 */

"use strict";
//External Dependencies
var Hapi = require("hapi");

//Internal Dependencies
var Config = require("./config");
var Plugins = require("./plugins");
var SocketManager = require("./lib/socketManager");
var Routes = require("./routes");
var MongoConnect = require('./mongoConnect')
var BootStrap = require('./utils/bootStrap')
var log4js = require('log4js');

log4js.configure({
  appenders: {
    App: { type: 'console' },
    Upload_Manager: { type: 'console' },
    Socket_Manager: { type: 'console' },
    Token_Manager: { type: 'console' }
  },
  categories: {
    default: { appenders: ['App'], level: 'trace' },
    Upload_Manager: { appenders: ['Upload_Manager'], level: 'trace' },
    Socket_Manager: { appenders: ['Socket_Manager'], level: 'trace' },
    Token_Manager: { appenders: ['Token_Manager'], level: 'trace' }
  }
});

// Global Logger variables for logging

global.appLogger = log4js.getLogger('App');
global.uploadLogger = log4js.getLogger('Upload_Manager');
global.socketLogger = log4js.getLogger('Socket_Manager');
global.tokenLogger = log4js.getLogger('Token_Manager')

const init = async () => {
  //Create Server
  var server = new Hapi.Server({
    app: {
      name: process.env.APP_NAME
    },
    port: process.env.HAPI_PORT,
    routes: { cors: true }
  });

  //Register All Plugins
  await server.register(Plugins, {}, err => {
    if (err) {
      server.log(["error"], "Error while loading plugins : " + err);
    } else {
      server.log(["info"], "Plugins Loaded");
    }
  });

  //add views
  await server.views({
    engines: {
      html: require("handlebars")
    },
    relativeTo: __dirname,
    path: "./views"
  });

  //Default Routes
  server.route({
    method: "GET",
    path: "/",
    handler: function (req, res) {
      return res.view("welcome");
    }
  });

  server.route(Routes);

  SocketManager.connectSocket(server);

  BootStrap.bootstrapAdmin(function (err) {
    if (err) console.log(err)
  });

  server.events.on("response", function (request) {
    console.log(
      request.info.remoteAddress +
      ": " +
      request.method.toUpperCase() +
      " " +
      request.url.pathname +
      " --> " +
      request.response.statusCode
    );
    console.log("Request payload:", request.payload);
  });

  // Start Server
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
