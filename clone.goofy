import {ChainBuilder} from './lib';
import * as fs from 'fs';

const builder = new ChainBuilder();

builder.add((data : any, next, error) => {
    fs.readFile('./index.ts', 'UTF-8', (err, data) => {
        if(err == null){
            next(data)
        } else {
            error(err);
        }
    });
}).add((data : any, next, error) => {
    console.log(data.toString());
    next(data);
}).add((data : any, next, error) => {
    fs.writeFile('./clone.goofy', data, (err, data) => {
        if(err == null){
            next(data)
        } else {
            error(err);
        }
    })
});

builder.on('done', (data) => {
   console.log('we are done!');
});

builder.on('error', (data) => {
    console.log('error');
});

builder.execute();