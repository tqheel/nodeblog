var fs = require('fs');
var path = require('path');
var async = require('async');

module.exports = function(dir, next){
    console.log('Resolving file path ' + dir);
    var resolvedPath = path.resolve(dir);
    console.log('Resolved path is ' + resolvedPath);
    var fileContents = [];
    fs.readdir(resolvedPath, function(err, fileList){
        if (err) {
            console.log('There was an error retrieving files from '+resolvedPath);
            next(err);
        } else {
            console.log('Retrieved list of files from '+ resolvedPath + '...');
            function processFile(element, callback) {
                var pathToFile = path.join(resolvedPath, element);
                var normPathToFile = path.normalize(pathToFile);
                fs.readFile(normPathToFile, 'utf8', function (readErr, data) {
                    if (readErr) {
                        console.log(readErr);
                        callback(readErr);
                    }
                    fs.stat(normPathToFile, function (statErr, stats) {
                        if (statErr) {
                            callback(statErr);
                        }
                        fileContents.push({
                            path: normPathToFile,
                            fileName: element,
                            ext: path.extname(element),
                            content: data,
                            createDate: new Date(stats.birthtime).getTime()
                        });
                        console.log('Finished processing file ' + element);
                        callback();
                    });
                });
            }
            //We have to iterate over the files asynchronously, or else the fileContents array will
            //get sent back to the calling function before it is ready
            var counter = 0;
            async.each(fileList, function(fileName, callback){
                console.log('Processing file ' + fileName);
                processFile(fileName, function(processingErr){
                    if(processingErr){
                        callback(processingErr);
                    }
                    else{
                        counter++;
                        console.log(counter+' file(s) have been processed.');
                        callback();
                    }
                });
            },function(fileProcessingErr){
                if(fileProcessingErr){
                    console.log('A file failed tp process. Error: '+ fileProcessingErr);
                    next(fileProcessingErr);
                }else{
                    if(counter===fileList.length){
                        //files finished processing
                        console.log('All content files have been processed.');
                        console.log('Sending files to http router...');
                        next(null, fileContents);
                    }
                }
            });

        }

    });

};