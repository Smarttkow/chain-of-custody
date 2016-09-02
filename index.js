"use strict";
const lib_1 = require('./lib');
const fs = require('fs');
const builder = new lib_1.ChainBuilder();
builder.then((data, next, error) => {
    fs.readFile('./index.ts', 'UTF-8', (err, data) => {
        if (err == null) {
            next(data);
        }
        else {
            error(err);
        }
    });
}).then((data, next, error) => {
    console.log(data.toString());
    next(data);
}).then((data, next, error) => {
    fs.writeFile('./clone.goofy', data, (err) => {
        if (err == null) {
            next();
        }
        else {
            error(err);
        }
    });
});
builder.on('done', () => {
    console.log('we are done!');
});
builder.on('error', (err) => {
    console.log('error - detail');
    console.log(err);
});
builder.execute();
