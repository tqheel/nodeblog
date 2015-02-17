/**
 * Created by tqheel on 2/11/2015.
 */
var express = require('express');
var router = express.Router();
var getFiles = require('../modules/files.js');
var cheerio = require('cheerio');
var _ = require('underscore');

router.get('/', function(req, res, next) {

    var posts = getFiles('/content/published', function(err, files){
        if(err){
            err.status = 500;
            next(err);
        }
        else{
            var contents = [];
            //sort the file array by create date and then put in descending order (newest file first)
            files = _.sortBy(files, 'createDate').reverse();
            files.forEach(function(file, index){
                var $ = cheerio.load(file.content);
                var content = {
                    title: $('#title').text(),
                    markupCreateDate: $('h3').first().text(),
                    fileUnixCreateDate: file.createDate,
                    body: file.content
                };
                contents.push(content);
            });
            res = JSON.stringify(contents);
            next(res);
        }
    });
});

module.exports = router;