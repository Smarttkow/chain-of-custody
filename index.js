"use strict";
const lib_1 = require('./lib');
const fs = require('fs');
const builder = new lib_1.ChainBuilder();
builder.add((data, next, error) => {
    fs.readFile('./index.ts', 'UTF-8', (err, data) => {
        if (err == null) {
            next(data);
        }
        else {
            error(err);
        }
    });
}).add((data, next, error) => {
    console.log(data.toString());
    next(data);
}).add((data, next, error) => {
    fs.writeFile('./clone.goofy', data, (err, data) => {
        if (err == null) {
            next(data);
        }
        else {
            error(err);
        }
    });
});
builder.on('done', (data) => {
    console.log('we are done!');
});
builder.on('error', (data) => {
    console.log('error');
});
builder.execute();
