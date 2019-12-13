/**
 * Created by Anirudh on 14/11/19.
 */
var Service = require("../../services");
var UniversalFunctions = require("../../utils/universalFunctions");
var async = require("async");
// var UploadManager = require('../../lib/uploadManager');
var TokenManager = require("../../lib/tokenManager");
var CodeGenerator = require("../../lib/codeGenerator");
var ERROR = UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR;
var _ = require("underscore");
const rp = require('request-promise');
const $ = require('cheerio');
const puppeteer = require('puppeteer');
const chalk = require("chalk");
var Config = require("../../config");

var fetchNews = function (callback) {
    const error = chalk.bold.red;
    const success = chalk.keyword("green");
    var NEWS = [];
    var URL = 'https://www.abc.net.au/news/';
    var categories = ["politics", "business", "world", "analysis-and-opinion", "sport"]
    async.series(
        [
            function (cb) {
                (async () => {
                    try {
                        var browser = await puppeteer.launch({ headless: true });
                        var page = await browser.newPage();
                        await page.goto("https://www.abc.net.au/news/politics/");
                        await page.waitForSelector(`li`);
                        var news = await page.evaluate(() => {
                            var titleNodeList = document.querySelectorAll(`li > h3 > a`);
                            var dates = document.querySelectorAll(`li`);
                            var content = document.querySelectorAll(`div.text-container > p`);
                            var titleLinkArray = [];
                            for (var i = 0; i < titleNodeList.length; i++) {
                                var data = {
                                    title: titleNodeList[i].innerText.trim(),
                                    link: "www.abc.net.au" + titleNodeList[i].getAttribute("href"),
                                    category: "politics",
                                    datePublished: Date.now(),
                                    content: content[i].innerText.trim()
                                };
                                titleLinkArray[i] = data;
                                data = {};
                            }
                            return titleLinkArray;
                        });
                        await browser.close();
                        _.map(news, function (item) {
                            NEWS.push(item);
                        })
                        console.log(success("Browser Closed"));
                        cb();
                    } catch (err) {
                        console.log(error(err));
                        await browser.close();
                        console.log(error("Browser Closed"));
                    }
                })()
            },
            function (cb) {
                (async () => {
                    try {
                        var browser = await puppeteer.launch({ headless: true });
                        var page = await browser.newPage();
                        await page.goto("https://www.abc.net.au/news/business/");
                        await page.waitForSelector(`li`);
                        var news = await page.evaluate(() => {
                            var titleNodeList = document.querySelectorAll(`li > h3 > a`);
                            var dates = document.querySelectorAll(`li`);
                            var content = document.querySelectorAll(`div.text-container > p`);
                            var titleLinkArray = [];
                            for (var i = 0; i < titleNodeList.length; i++) {
                                var data = {
                                    title: titleNodeList[i].innerText.trim(),
                                    link: "www.abc.net.au" + titleNodeList[i].getAttribute("href"),
                                    category: "business",
                                    datePublished: Date.now(),
                                    content: content[i].innerText.trim()
                                };
                                titleLinkArray[i] = data;
                                data = {};
                            }
                            return titleLinkArray;
                        });
                        await browser.close();
                        _.map(news, function (item) {
                            NEWS.push(item);
                        })
                        console.log(success("Browser Closed"));
                        cb();
                    } catch (err) {
                        console.log(error(err));
                        await browser.close();
                        console.log(error("Browser Closed"));
                    }
                })()
            },
            function (cb) {
                (async () => {
                    try {
                        var browser = await puppeteer.launch({ headless: true });
                        var page = await browser.newPage();
                        await page.goto("https://www.abc.net.au/news/world/");
                        await page.waitForSelector(`li`);
                        var news = await page.evaluate(() => {
                            var titleNodeList = document.querySelectorAll(`li > h3 > a`);
                            var dates = document.querySelectorAll(`li`);
                            var content = document.querySelectorAll(`div.text-container > p`);
                            var titleLinkArray = [];
                            for (var i = 0; i < titleNodeList.length; i++) {
                                var data = {
                                    title: titleNodeList[i].innerText.trim(),
                                    link: "www.abc.net.au" + titleNodeList[i].getAttribute("href"),
                                    category: "world",
                                    datePublished: Date.now(),
                                    content: content[i].innerText.trim()
                                };
                                titleLinkArray[i] = data;
                                data = {};
                            }
                            return titleLinkArray;
                        });
                        await browser.close();
                        _.map(news, function (item) {
                            NEWS.push(item);
                        })
                        console.log(success("Browser Closed"));
                        cb();
                    } catch (err) {
                        console.log(error(err));
                        await browser.close();
                        console.log(error("Browser Closed"));
                    }
                })()
            },
            function (cb) {
                (async () => {
                    try {
                        var browser = await puppeteer.launch({ headless: true });
                        var page = await browser.newPage();
                        await page.goto("https://www.abc.net.au/news/analysis-and-opinion/");
                        await page.waitForSelector(`li`);
                        var news = await page.evaluate(() => {
                            var titleNodeList = document.querySelectorAll(`li > h3 > a`);
                            var dates = document.querySelectorAll(`li`);
                            var content = document.querySelectorAll(`div.text-container > p`);
                            var titleLinkArray = [];
                            for (var i = 0; i < titleNodeList.length; i++) {
                                var data = {
                                    title: titleNodeList[i].innerText.trim(),
                                    link: "www.abc.net.au" + titleNodeList[i].getAttribute("href"),
                                    category: "analysis-and-opinion",
                                    datePublished: Date.now(),
                                    content: content[i].innerText.trim()
                                };
                                titleLinkArray[i] = data;
                                data = {};
                            }
                            return titleLinkArray;
                        });
                        await browser.close();
                        _.map(news, function (item) {
                            NEWS.push(item);
                        })
                        console.log(success("Browser Closed"));
                        cb();
                    } catch (err) {
                        console.log(error(err));
                        await browser.close();
                        console.log(error("Browser Closed"));
                    }
                })()
            },
            function (cb) {
                (async () => {
                    try {
                        var browser = await puppeteer.launch({ headless: true });
                        var page = await browser.newPage();
                        await page.goto("https://www.abc.net.au/news/sport/");
                        await page.waitForSelector(`li`);
                        var news = await page.evaluate(() => {
                            var titleNodeList = document.querySelectorAll(`li > h3 > a`);
                            var dates = document.querySelectorAll(`li`);
                            var content = document.querySelectorAll(`div.text-container > p`);
                            var titleLinkArray = [];
                            for (var i = 0; i < titleNodeList.length; i++) {
                                var data = {
                                    title: titleNodeList[i].innerText.trim(),
                                    link: "www.abc.net.au" + titleNodeList[i].getAttribute("href"),
                                    category: "sport",
                                    datePublished: Date.now(),
                                    content: content[i].innerText.trim()
                                };
                                titleLinkArray[i] = data;
                                data = {};
                            }
                            return titleLinkArray;
                        });
                        await browser.close();
                        _.map(news, function (item) {
                            NEWS.push(item);
                        })
                        console.log(success("Browser Closed"));
                        cb();
                    } catch (err) {
                        console.log(error(err));
                        await browser.close();
                        console.log(error("Browser Closed"));
                    }
                })()
            },
            function (cb) {
                _.map(NEWS, function (news) {
                    Service.NewsService.createNews(news, function (err, data) {
                        console.log("Done");
                    })
                })
                cb();
            }
        ],
        function (error, result) {
            if (error) {
                callback(error);
            } else {
                callback(null, "Successfully Fetched!");
            }
        }
    );
}


var createNews = function (userData, payloadData, callback) {
    var data;
    async.series(
        [
            function (cb) {
                var criteria = {
                    _id: userData._id
                };
                Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                    if (err) cb(err);
                    else {
                        if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                        else {
                            userFound = (data && data[0]) || null;
                            if (userFound.userType != Config.APP_CONSTANTS.DATABASE.USER_ROLES.SUPERADMIN) cb(ERROR.PRIVILEGE_MISMATCH);
                            else cb();
                        }
                    }
                });
            },
            function (cb) {
                Service.NewsService.createNews(payloadData, function (err, data) {
                    if (err) cb(err)
                    else {
                        data = data && data[0] || null;
                        cb();
                    }
                })
            }
        ],
        function (err, result) {
            if (err) return callback(err);
            else return callback(null, { data: data });
        }
    );
};

var getNews = function (payloadData, callback) {
    var news;
    async.series(
        [
            function (cb) {
                if (payloadData.category != "") {
                    Service.NewsService.getNews({ category: payloadData.category }, {}, {}, function (err, data) {
                        if (err) cb(err)
                        else {
                            news = data;
                            cb();
                        }
                    })
                }
                else {
                    Service.NewsService.getNews({}, {}, {}, function (err, data) {
                        if (err) cb(err)
                        else {
                            news = data;
                            cb();
                        }
                    })
                }
            }
        ],
        function (err, result) {
            if (err) return callback(err);
            else return callback(null, { data: news });
        }
    );
};

var updateNews = function (userData, payloadData, callback) {
    var news;
    async.series(
        [
            function (cb) {
                var criteria = {
                    _id: userData._id
                };
                Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                    if (err) cb(err);
                    else {
                        if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                        else {
                            userFound = (data && data[0]) || null;
                            if (userFound.userType != Config.APP_CONSTANTS.DATABASE.USER_ROLES.SUPERADMIN) cb(ERROR.PRIVILEGE_MISMATCH);
                            else cb();
                        }
                    }
                });
            },
            function (cb) {
                var objToSave = {
                    title: payloadData.title,
                    content: payloadData.content,
                    datePublished: Date.now(),
                    link: payloadData.link,
                    category: payloadData.category
                }
                Service.NewsService.updateNews({ _id: payloadData._id }, objToSave, {}, function (err, data) {
                    if (err) cb(err)
                    else cb();
                })
            }
        ],
        function (err, result) {
            if (err) return callback(err);
            else return callback(null, { data: news });
        }
    );
};

var deleteNews = function (userData, payloadData, callback) {
    var news;
    async.series(
        [
            function (cb) {
                var criteria = {
                    _id: userData._id
                };
                Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
                    if (err) cb(err);
                    else {
                        if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                        else {
                            userFound = (data && data[0]) || null;
                            if (userFound.userType != Config.APP_CONSTANTS.DATABASE.USER_ROLES.SUPERADMIN) cb(ERROR.PRIVILEGE_MISMATCH);
                            else cb();
                        }
                    }
                });
            },
            function (cb) {
                Service.NewsService.deleteNews({ _id: payloadData._id }, function (err, data) {
                    if (err) cb(err)
                    else cb();
                })
            }
        ],
        function (err, result) {
            if (err) return callback(err);
            else return callback(null, { data: news });
        }
    );
};
module.exports = {
    fetchNews: fetchNews,
    createNews: createNews,
    getNews: getNews,
    updateNews: updateNews,
    deleteNews: deleteNews
};
