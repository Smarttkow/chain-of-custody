"use strict";
const lib_class_chainitem_1 = require('./lib.class.chainitem');
const events_1 = require('events');
class ChainBuilder extends events_1.EventEmitter {
    constructor(...args) {
        super(...args);
        this.stack = [];
    }
    push(value) {
        this.stack.push(value);
        return this;
    }
    next(data) {
        const self = this;
        if (self.stack.length > 0) {
            self.stack.shift().next(data, (data) => {
                self.next(data);
            }, (data) => {
                self.error(data);
            });
        }
        else {
            this.emit('done', data);
        }
    }
    error(data) {
        this.emit('error', data);
    }
    add(callback) {
        return this.push(new lib_class_chainitem_1.ChainItem(callback));
    }
    execute(data) {
        this.next(data || null);
    }
}
exports.ChainBuilder = ChainBuilder;
