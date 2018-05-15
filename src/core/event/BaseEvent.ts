class BaseEvent extends egret.Event{
    public constructor(type: string, bubbles?: boolean, cancelable?: boolean){
        super(type, bubbles, cancelable);
    }

    public object: any;
}