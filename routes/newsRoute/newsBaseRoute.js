/**
 * Created by Anirudh on 14/11/19.
 */
var UniversalFunctions = require("../../utils/universalFunctions");
var Controller = require("../../controllers");
var Joi = require("joi");
var Config = require("../../config");

var fetchNews = {
    method: "POST",
    path: "/api/news/fetchNews",
    config: {
        description: "Fetch News",
        tags: ["api", "user"],
        handler: function (request, h) {
            return new Promise((resolve, reject) => {
                Controller.NewsBaseController.fetchNews(function (
                    err,
                    data
                ) {
                    if (err) reject(UniversalFunctions.sendError(err));
                    else
                        resolve(
                            UniversalFunctions.sendSuccess(
                                Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                                data
                            )
                        );
                });
            });
        },
        validate: {
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
};

var createNews = {
    method: "POST",
    path: "/api/news/createNews",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        return new Promise((resolve, reject) => {
            Controller.NewsBaseController.createNews(userData, request.payload, function (
                err,
                data
            ) {
                if (err) reject(UniversalFunctions.sendError(err));
                else
                    resolve(
                        UniversalFunctions.sendSuccess(
                            Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                            data
                        )
                    );
            });
        });
    },
    config: {
        description: "Create News",
        tags: ["api", "user"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            payload: {
                title: Joi.string().required(),
                content: Joi.string().required(),
                imageURL: Joi.string().optional().allow(""),
                link: Joi.string().optional().allow(""),
                category: Joi.string().required(),
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
};

var getNews = {
    method: "POST",
    path: "/api/news/getNews",
    config: {
        description: "Get News",
        tags: ["api", "user"],
        handler: function (request, h) {
            return new Promise((resolve, reject) => {
                Controller.NewsBaseController.getNews(request.payload, function (
                    err,
                    data
                ) {
                    if (err) reject(UniversalFunctions.sendError(err));
                    else
                        resolve(
                            UniversalFunctions.sendSuccess(
                                Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                                data
                            )
                        );
                });
            });
        },
        validate: {
            payload: {
                category: Joi.string().optional().allow("")
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
};

var updateNews = {
    method: "PUT",
    path: "/api/news/updateNews",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        return new Promise((resolve, reject) => {
            Controller.NewsBaseController.updateNews(userData, request.payload, function (
                err,
                data
            ) {
                if (err) reject(UniversalFunctions.sendError(err));
                else
                    resolve(
                        UniversalFunctions.sendSuccess(
                            Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                            data
                        )
                    );
            });
        });
    },
    config: {
        description: "Update News",
        tags: ["api", "user"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            payload: {
                _id: Joi.string().required(),
                title: Joi.string().required(),
                content: Joi.string().required(),
                imageURL: Joi.string().optional().allow(""),
                link: Joi.string().optional().allow(""),
                category: Joi.string().required(),
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
};

var deleteNews = {
    method: "DELETE",
    path: "/api/news/deleteNews",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        return new Promise((resolve, reject) => {
            Controller.NewsBaseController.deleteNews(userData, request.payload, function (
                err,
                data
            ) {
                if (err) reject(UniversalFunctions.sendError(err));
                else
                    resolve(
                        UniversalFunctions.sendSuccess(
                            Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                            data
                        )
                    );
            });
        });
    },
    config: {
        description: "Update News",
        tags: ["api", "user"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            payload: {
                _id: Joi.string().required(),
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
};
var NewsBaseRoute = [
    fetchNews,
    createNews,
    getNews,
    updateNews,
    deleteNews
];
module.exports = NewsBaseRoute;