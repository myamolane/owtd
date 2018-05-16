class CircleSkillTargetPanel extends BaseSkillTargetPanel{
    public radius: number;
    
    public showPanel(callFunc, callObj) { 
        super.showPanel(callFunc, callObj);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTargetChanged, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRelease, this);
    }
    public onTargetChanged(e: egret.TouchEvent){
        console.log('target changed');
    }
    public onRelease(e: egret.TouchEvent){
        console.log('skill released');
        this.closePanel();
    }
    public closePanel(){
        super.closePanel();
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTargetChanged, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onRelease, this);
    }
}