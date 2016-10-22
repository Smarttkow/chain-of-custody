import {ChainBuilder} from './../lib';
import * as fs from 'fs';
import {ICaughtException} from "../lib/lib.interface.caughtexception";

let chainBuilder = new ChainBuilder((data, next, error) => {
    fs.readFile(`${__dirname}/test.json`, 'UTF-8', (err, data) => {
        if(err){
            error(err);
        } else {
            next(data);
        }
    });
}).then((data, next, error) => {
    let json = JSON.parse(data.toString());
    json.updated = true;
    next(json);
}).then((data, next, error) => {
    fs.writeFile(`${__dirname}/tested.json`, JSON.stringify(data), (err) => {
        if(err){
            error(err);
        } else {
            next();
        }
    });
});

chainBuilder.on('exception', (err : ICaughtException) => {
    console.log(err);
});

chainBuilder.on('error', (err)=>{
    console.log(err);
});

chainBuilder.on('done', () => {
    console.log('ok');
});

chainBuilder.execute();