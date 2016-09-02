/**
 * Items to be chained together with a next and error function.
 */
export class ChainItem {
    private action:(data : any, next:(data : any) => void, error:(data:any) => void) => void;

    public next(data : any, next:(data : any) => void, error:(data : any) => void):void{
        this.action(data, next, error);
    }

    constructor(action : (data : any, next:(data : any) => void, error:(data:any) => void) => void){
        this.action = action;
    }
}