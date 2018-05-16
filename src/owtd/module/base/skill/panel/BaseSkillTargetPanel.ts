class BaseSkillTargetPanel extends FullPanel{
    public type: string;
    public constructor() { super(); }
    private static ins: BaseSkillTargetPanel;

    public static get Ins(): BaseSkillTargetPanel {
        if (this.ins == null) this.ins = new BaseSkillTargetPanel();
        return this.ins;
    }
    //private text: string;
    private callObj: any;
    private callFunc: any;

    public showPanel(callfunc, callObj) {
        if (this.isOpen) {
            return;
        }
        this.show(0);
        this.callObj = callObj;
        this.callFunc = callfunc;
        
        
    }

    public closePanel() {
        if (!this.isOpen) {
            return;
        }
        this.close();
        
        while(this.numChildren > 0){
            this.removeChildAt(0);
        }
        this.callObj = null;
        this.callFunc = null;
    }
}