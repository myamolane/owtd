class CircleSkillTargetPanel extends BaseSkillTargetPanel {
    public radius: number = 100;
    public shape: egret.Shape;
    private static ins: CircleSkillTargetPanel;

    public static get Ins(): CircleSkillTargetPanel {
        if (this.ins == null) {
            this.ins = new CircleSkillTargetPanel();
        }
        this.ins.width = App.StageUtils.getWidth();
        this.ins.height = App.StageUtils.getHeight();
        return this.ins;
    }
    public showPanel(callFunc, callObj, skill: SpriteSkill) {

        super.showPanel(callFunc, callObj, skill);
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0, 1);
        this.shape.graphics.drawCircle(0, 0, this.radius);
        this.shape.graphics.endFill();
        this.addChild(this.shape);
        this.touchEnabled = true;

        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTargetChanged, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRelease, this);
    }
    public moveCircle(e: egret.TouchEvent) {
        this.shape.x = e.localX;
        this.shape.y = e.localY;
    }
    public onTouch(e: egret.TouchEvent) {

    }
    public onTargetChanged(e: egret.TouchEvent) {
        this.moveCircle(e);
    }
    public onRelease(e: egret.TouchEvent) {
        this.callBack(this.getTarget());
        this.closePanel();
    }
    public getTarget(): Array<TdGameMonster>{
        let point:egret.Point = this.localToGlobal(this.shape.x, this.shape.y);
        let modules: Object = App.ModuleManager.getModulesByType(ModuleType.Monster);
        let targets:Array<TdGameMonster> = [];
        
        for (let id in modules){
            let monster: TdGameMonster = modules[id];
            let distance = App.MathUtils.getPointsDistance(point, monster.Point);
            if (distance < this.radius){
                targets.push(monster);
            }
        }
        return targets;
    }
    public closePanel() {
        super.closePanel();

        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTargetChanged, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onRelease, this);
        this.removeChild(this.shape);
        delete this.shape;
        this.shape = null;
    }
}