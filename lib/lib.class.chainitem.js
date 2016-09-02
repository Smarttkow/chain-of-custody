"use strict";
/**
 * Items to be chained together with a next and error function.
 */
class ChainItem {
    constructor(action) {
        this.action = action;
    }
    next(data, next, error) {
        this.action(data, next, error);
    }
}
exports.ChainItem = ChainItem;
