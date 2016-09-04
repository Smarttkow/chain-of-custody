import {ChainItem} from './lib.class.chainitem'
import {EventEmitter} from 'events';

export class ChainBuilder extends EventEmitter {
    public stack: ChainItem[] = [];

    public push(value: ChainItem): ChainBuilder {
        this.stack.push(value);
        return this;
    }

    public next(data?: any): void {
        const self: ChainBuilder = this;

        if (self.stack.length > 0) {
            self.stack.shift().next(data, (data?: any) => {
                self.next(data);
            }, (data?: any) => {
                self.error(data)
            })
        } else {
            this.emit('done', data);
        }
    }

    public error(data?: any): void {
        this.emit('error', data);
    }

    public then(callback: (data: any, next: (data?: any) => void, error: (data?: any) => void) => void): ChainBuilder {
        return this.push(new ChainItem(callback));
    }

    public execute(data?: any): void {
        this.next(data || null);
    }
}