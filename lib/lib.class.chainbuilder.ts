import {ChainItem} from './lib.class.chainitem';
import {ICaughtException} from './lib.interface.caughtexception';
import {EventEmitter} from 'events';

/**
 * Create a chain of callback methods.
 */
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
                try {
                    self.next(data);
                } catch (e) {
                    this.emit('exception', {
                        exception: e,
                        data: data
                    } as ICaughtException);
                }
            }, (data?: any) => {
                self.error(data)
            });
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

    constructor(firstStep?:(data : any, next : (data?:any)=> void, error: (data?: any) => void) => void) {
        super();

        if(firstStep !== null){
            this.then(firstStep);
        }
    }
}