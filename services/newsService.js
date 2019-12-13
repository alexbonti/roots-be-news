/**
 * Created by Anirudh on 14/11/19.
 */
"use strict";

var Models = require("../models");

var updateNews = function (criteria, dataToSet, options, callback) {
    options.lean = true;
    options.new = true;
    Models.News.findOneAndUpdate(criteria, dataToSet, options, callback);
};
//Insert News in DB
var createNews = function (objToSave, callback) {
    new Models.News(objToSave).save(callback);
};
//Delete News in DB
var deleteNews = function (criteria, callback) {
    Models.News.findOneAndRemove(criteria, callback);
};

//Get News from DB
var getNews = function (criteria, projection, options, callback) {
    options.lean = true;
    Models.News.find(criteria, projection, options, callback);
};

module.exports = {
    updateNews: updateNews,
    createNews: createNews,
    deleteNews: deleteNews,
    getNews: getNews,
};
