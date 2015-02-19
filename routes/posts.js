/**
 * Created by tqheel on 2/11/2015.
 */
var express = require('express');
var router = express.Router();
var getFiles = require('../handlers/files.js');
var contentHandler = require('../handlers/content.js');
var _ = require('underscore');

router.get('/', function(req, res, next) {
    console.log('Getting files...');
    getFiles('./content/published', function(err, files){

        if(err){
            err.status = 500;
            next(err);
        }

        else{
            console.log("Router has received the raw files from file handler.");
            //sort the file array by create date and then put in descending order (newest file first)

            console.log('Router handing files off to file handler to process contents...');
            contentHandler.processContentArray(files, function(err, contentArray){
                if(err){
                    err.status = 500;
                    next(err);
                }else{
                    //sort the files in descending order, assuming each file has a hidden html input element #id with time-coded value
                    contentArray = _.sortBy(contentArray, 'id').reverse();
                    console.log('Router has received file contents from content handler and is assigning file contents to http response as JSON. Yippie kai yay, mofo!');
                    res = JSON.stringify(contentArray);
                    next(res);
                }
            });

        }
    });
});

module.exports = router;