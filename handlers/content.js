/**
 * Created by tqheel on 2/18/2015.
 */
var async = require('async');
var cheerio = require('cheerio');


function processContent(file){
    console.log('Handler processing contents of file '+ file.fileName);
    var $ = cheerio.load(file.content);
    return {
        id: $('#id').val(),
        title: $('#title').text(),
        fileName: file.fileName,
        markupCreateDate: $('h3').first().text(),
        fileUnixCreateDate: file.createDate,
        body: file.content
    };
}

module.exports = {
    processContentArray: function(rawFileArray, next){
        var contentArray = [];
        var counter = 0;
        async.each(rawFileArray, function(file, callback){
            var fileContents = processContent(file);
            console.log('Handler extracted title "' + fileContents.title + '" from file ' + file.fileName );
            contentArray.push(fileContents);
            counter++;
            callback();
        }, function(){
            if(counter === rawFileArray.length){
                console.log('Content handler finished extracting content from ' + counter + ' files. Returning content to router...');
                next(null, contentArray);
            }
        });

    },
    processContent: function(rawContent, next){

    }
};