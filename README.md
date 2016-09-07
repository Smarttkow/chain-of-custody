#chain-of-custody
Chain of Custody design pattern for cleanly dealing with sequences of operations that may be asynchronous.
#Install
npm install chain-of-custody

#Usage
There are two key components, `ChainItem` and `ChainBuilder`. You won't care about `ChainItem`. The intent is to
create a nice, readable chain of steps that are executed one by one with a generate way to exit the chain (i.e. by
using an event) in the event of a failure.

##Example
```javascript
import {ChainBuilder} from './../lib';
import * as fs from 'fs';

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

chainBuilder.on('error', (err)=>{
    console.log(err);
});

chainBuilder.on('done', () => {
    console.log('ok');
});

chainBuilder.execute();
```
##API
###`ChainBuilder::constructor(closure : (data?:any, next:(data?:any)=>void, error:(data?:any)=>void))`
###`ChainBuilder::execute(data?:any):void`
Takes any data object as an initializer, if desired.
###'ChainBuilder::then(closure : (data?:any, next:(data?:any)=>void, error:(data?:any)=>void)):void`
Next step in the chain. Must be a closure of that type.
###Events
There are two events, `done` for when the sequence is complete and `error` to be called only on sequence failure.

#Executing from Source
npm install will bring in the typings logic for the TypeScript support. TypeScript is included so that TypeScript can be used.
