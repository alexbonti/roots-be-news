/**
 * Created by Anirudh on 14/11/19.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../config');

var news = new Schema({
    title: { type: String, trim: true },
    content: { type: String, trim: true },
    imageURL: { type: String },
    datePublished: { type: Date, default: Date.now },
    link: { type: String, trim: true },
    category: { type: String, trim: true }
});
news.index({ "title": 1, "content": 1, "link": 1, "category": 1 }, { unique: true })
module.exports = mongoose.model('news', news);