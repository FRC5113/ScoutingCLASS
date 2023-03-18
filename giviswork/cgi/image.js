const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const fileName = "image.js"; // clarifies the name of the file
var currentFunc = ""; // clarifies what function the server is working on at the time

function globalPathFinder(folderList, requestedFile) {
    currentFunc = "globalPathFinder";
    try {
        var count = 0;
        var folderPath = "";
        if (folderList !== [] || folderList !== {} || typeof folderList == 'object') {
            for (var i = 0; i < folderList.length; i++) {
                if (typeof folderList[i] == 'string') {
                    var currentFolder = folderList[i];
                    var pathKeeper = null;
                    if (folderPath == "") {
                        pathKeeper = "./" + currentFolder;
                    } else {
                        pathKeeper = folderPath + currentFolder;
                    }
                    if (fs.existsSync(pathKeeper)) {
                        folderPath = folderPath + currentFolder + "/";
                    } else {
                        i = i - 1;
                        folderPath = folderPath + "../";
                    }
                }
                count = count + 1;
                if (count == 100) {
                    return "";
                }
            }
        }
        if (typeof requestedFile == 'string') {
            return path.join(folderPath, requestedFile);
        }
        return "";
    } catch (e) {
        console.log(fileName + " " + currentFunc + "() ERROR: " + e);
        return "";
    }
}

function getImageLocation(infoFromURL) {
    if ("type" in infoFromURL && infoFromURL.type === "img" && "img" in infoFromURL) {
        // return globalPathFinder([infoFromURL.type], infoFromURL.img + ".png");
    }
    return path.join("../img/", infoFromURL.img + ".png");
}

if (!module.parent) {
    http.createServer(function (req, res) {
        try {
            var infoFromURL = url.parse(req.url, true).query;
            res.writeHead(200, { "Access-Control-Allow-Origin": "*" });

            function printImage(imgLoc) {
                currentFunc = "printImage";
                try {
                    fs.readFile(imgLoc, function (err, data) {
                        res.write(data);
                        return res.end();
                    });
                } catch (e) {
                    console.log(fileName + " " + currentFunc + "() ERROR: " + e);
                    res.write("");
                    return res.end(imgLoc);
                }
            }

            printImage(getImageLocation(infoFromURL));
        } catch (error) {
            console.log("image.js ERROR: " + error);
        }
    }).listen(8092);
    console.log('Server running at http://127.0.0.1:8092/');
}

// If we're running under Node, 
if (typeof exports !== 'undefined') {
    exports.globalPathFinder = globalPathFinder;
    exports.getImageLocation = getImageLocation;
}
