class BaseSkillTargetPanel extends egret.DisplayObjectContainer{
    public type: string;
    public constructor() { super(); }
    private isOpen:boolean = false;
    //private text: string;
    private callObj: any;
    private callFunc: any;
    private skill: SpriteSkill;
    public showPanel(callfunc, callObj, skill) {
        if (this.isOpen) {
            return;
        }
        this.callObj = callObj;
        this.callFunc = callfunc;
        this.skill = skill;
    }

    public closePanel() {
        if (!this.isOpen) {
            return;
        }
        this.parent.removeChild(this);
        this.callObj = null;
        this.callFunc = null;
        this.skill = null;
    }

    public callBack(targets):void{
        this.callFunc.apply(this.callObj, [this.skill, targets]);
    }
}