/**
 * Created by Navit
 */

 'use strict';

var mongo = {
    //URI: process.env.MONGO_URI || 'mongodb://localhost/LPad-News',
    URI: process.env.MONGO_URI || "mongodb://"+process.env.MONGO_USER_LPAD_NEWS+":"+process.env.MONGO_PASS_LPAD_NEWS+"@localhost/"+process.env.MONGO_DBNAME_LPAD_NEWS_TEST,
    port: 27017
};

module.exports = {
    mongo: mongo
};



