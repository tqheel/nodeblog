/**
 * Created by tqheel on 2/11/2015.
 */
var express = require('express');
var router = express.Router();
var getFiles = require('../handlers/files.js');
var cheerio = require('cheerio');
var _ = require('underscore');

router.get('/', function(req, res, next) {
    console.log('Getting files...');
    getFiles('./content/published', function(err, files){

        if(err){
            err.status = 500;
            next(err);
        }

        else{
            console.log("Router has received the files.");
            var contents = [];
            //sort the file array by create date and then put in descending order (newest file first)
            files = _.sortBy(files, 'createDate').reverse();
            console.log('RouterProcessing file contents.');
            //TODO: Need to replace this iteration with async.each
            files.forEach(function(file, index){
                console.log(file.fileName);
                var $ = cheerio.load(file.content);
                var content = {
                    title: $('#title').text(),
                    markupCreateDate: $('h3').first().text(),
                    fileUnixCreateDate: file.createDate,
                    body: file.content
                };
                console.log(content.title);
                contents.push(content);
            });
            res = JSON.stringify(contents);
            console.log(contents);
            next(res);
        }
    });
});

module.exports = router;