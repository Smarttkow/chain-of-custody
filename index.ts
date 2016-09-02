import {ChainBuilder} from './lib';
import * as fs from 'fs';

const builder = new ChainBuilder();

builder.then((data : any, next, error) => {
    fs.readFile('./index.ts', 'UTF-8', (err, data) => {
        if(err == null){
            next(data)
        } else {
            error(err);
        }
    });
}).then((data : any, next, error) => {
    console.log(data.toString());
    next(data);
}).then((data : any, next, error) => {
    fs.writeFile('./clone.goofy', data, (err) => {
        if(err == null){
            next()
        } else {
            error(err);
        }
    })
});

builder.on('done', () => {
   console.log('we are done!');
});

builder.on('error', (err) => {
    console.log('error - detail');
    console.log(err);
});

builder.execute();