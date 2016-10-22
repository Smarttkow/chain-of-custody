"use strict";
const lib_class_chainitem_1 = require('./lib.class.chainitem');
const events_1 = require('events');
/**
 * Create a chain of callback methods.
 */
class ChainBuilder extends events_1.EventEmitter {
    constructor(firstStep) {
        super();
        this.stack = [];
        if (firstStep !== null) {
            this.then(firstStep);
        }
    }
    push(value) {
        this.stack.push(value);
        return this;
    }
    next(data) {
        const self = this;
        if (self.stack.length > 0) {
            self.stack.shift().next(data, (data) => {
                try {
                    self.next(data);
                }
                catch (e) {
                    this.emit('exception', {
                        exception: e,
                        data: data
                    });
                }
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
    then(callback) {
        return this.push(new lib_class_chainitem_1.ChainItem(callback));
    }
    execute(data) {
        this.next(data || null);
    }
}
exports.ChainBuilder = ChainBuilder;
