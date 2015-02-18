var fs = require('fs');
var path = require('path');

module.exports = function(dir, callback){
    var resolvedPath = path.resolve(dir);
    var files = [];
    fs.readdir(resolvedPath, function(err, list){

        if (err) {
            callback(err);
        } else {

            list.forEach(function (element, index, array) {
                var pathToFile = path.join(resolvedPath, element);
                var normPathToFile = path.normalize(pathToFile);
                fs.readFile(normPathToFile, 'utf8', function(readErr, data){
                    if(readErr){
                        console.log(readErr);
                        callback(readErr);
                    }
                    fs.stat(normPathToFile, function(statErr, stats){
                        if(statErr){
                            callback(statErr);
                        }
                        files.push({
                            path: normPathToFile,
                            fileName: element,
                            ext: path.extname(element),
                            content: data,
                            createDate: new Date(stats.birthtime).getDate()
                        });
                    });
                    //make sure that files are finished being processed before running callback
                    if(index === array.length - 1){
                        callback(null, files);
                        console.log('Number of files processed: ' +  files.length)
                    }
                });

            });

        }

    });

};