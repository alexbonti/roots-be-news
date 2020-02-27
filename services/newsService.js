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
var getNews = function (criteria, projection, skip, numberOfRecords, options, callback) {
    options.lean = true;
    Models.News.find(criteria, projection, options, callback).sort({ $natural: -1 }).skip(skip).limit(numberOfRecords);
};

var getNewsBySearch = function (criteria, projection, skip, numberOfRecords, options, callback) {
    options.lean = true;
    Models.News.find(criteria, projection, options, callback).skip(skip).limit(numberOfRecords);
};
//Get News from DB
var getDistinctCategory = function (callback) {
    Models.News.distinct("category", callback);
};
module.exports = {
    updateNews: updateNews,
    createNews: createNews,
    deleteNews: deleteNews,
    getNews: getNews,
    getDistinctCategory: getDistinctCategory,
    getNewsBySearch: getNewsBySearch
};
