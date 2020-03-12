/**
 * Created by Anirudh on 14/11/19.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../config');
var image = 'https://s3.au-syd.cloud-object-storage.appdomain.cloud/ipan-v2-bucket/image/profilePicture/original/Profile_p6ShcttnsmkW.png';

var news = new Schema({
  title: { type: String, trim: true },
  content: { type: String, trim: true },
  imageURL: { type: String, default: image },
  datePublished: { type: Date, default: Date.now },
  link: { type: String, trim: true },
  category: { type: String, trim: true }
});
news.index({ "title": 1, "content": 1, "category": 1 }, { unique: true })
news.index({ title: "text" })
module.exports = mongoose.model('news', news);