var fs = require('fs');
var path = require('path');

module.exports = function(dir, callback){
    fs.readdir(path.normalize(dir), function(err, list){
        if (err) {
            callback(err);
        } else {
            var files = [];
            list.forEach(function (element) {
                var stats = fs.stat(element);
                var stream = fs.createReadStream(element);
                var content = '';
                stream.pipe(content);
                var file = {
                    path: path.normalize(element),
                    fileName: path.basename(element),
                    ext: path.extname(element),
                    content: content,
                    createDate: new Date(stats.birthtime).getDate()
                };
                files.push(file);
            });
            callback(null, files);
        }
    });
};