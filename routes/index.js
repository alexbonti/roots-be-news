/**
 * Created by Navit
 */
"use strict";

var DemoBaseRoute = require("./demoRoute/demoBaseRoute");
var UserBaseRoute = require("./userRoute/userBaseRoute");
var AdminBaseRoute = require("./adminRoute/adminBaseRoute");
var NewsBaseRoute = require('./newsRoute/newsBaseRoute');
var UploadBaseRoute = require('./uploadRoute/uploadBaseRoute')
var APIs = [].concat(DemoBaseRoute, UserBaseRoute, AdminBaseRoute, NewsBaseRoute, UploadBaseRoute);
module.exports = APIs;
