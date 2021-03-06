class SkillTargetPanel extends egret.DisplayObjectContainer {// extends egret.DisplayObjectContainer{
    static SkillReleaseTypeHandlers = {
        "circle": {
            draw: function (): egret.Shape {
                let shape = new egret.Shape();
                shape.graphics.beginFill(0, 0.5);
                shape.graphics.drawCircle(0, 0, SkillTargetPanel.ins.skill.width / 2);
                shape.graphics.endFill();
                return shape;
            },
            move: function (shape: egret.Shape, e: egret.TouchEvent): void {
                shape.x = e.localX;
                shape.y = e.localY;
            }
        },
        "rect": {
            draw: function (): egret.Shape {
                let shape = new egret.Shape();
                shape.graphics.beginFill(0, 0.5);
                shape.graphics.drawRect(0, 0, SkillTargetPanel.Ins.skill.width, SkillTargetPanel.ins.skill.width);
                shape.graphics.endFill();
                return shape;
            },
            move: function (shape: egret.Shape, e: egret.TouchEvent): void {

            }
        },


    }
    private static ins: SkillTargetPanel;

    public static get Ins(): SkillTargetPanel {
        if (this.ins == null) {
            this.ins = new SkillTargetPanel();
        }
        this.ins.width = App.StageUtils.getWidth();
        this.ins.height = App.StageUtils.getHeight();
        this.ins.touchEnabled = true;
        return this.ins;
    }
    public constructor() { super(); }
    private isOpen: boolean = false;
    private callObj: any;
    private callFunc: any;
    private skill: SpriteSkill;
    private shape: egret.Shape;
    public showPanel(callfunc, callObj, skill) {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        this.callObj = callObj;
        this.callFunc = callfunc;
        this.skill = skill;
        if (SkillTargetPanel.SkillReleaseTypeHandlers.hasOwnProperty(this.skill.releaseType)) {
            this.shape = SkillTargetPanel.SkillReleaseTypeHandlers[this.skill.releaseType].draw();
            this.addChild(this.shape);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.move, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRelease, this);
        }
        else {
            this.onRelease(null);
        }
    }

    public onRelease(e: egret.TouchEvent) {
        let targets: Array<TdGameSprite> = [];
        if (SkillTargetPanel.SkillReleaseTypeHandlers.hasOwnProperty(this.skill.releaseType)) {
            targets = this.getRangeTarget();
        }
        else {
            switch (this.skill.releaseType) {
                case "fullmap":
                    targets = App.Utils.getValues(App.ModuleManager.getModulesByType(this.skill.targetType));
                    if (!this.skill.multiple)
                        targets = targets.splice(1);
                    break;
            }
        }
        App.SoundManager.playEffect(this.skill.sound);
        this.callBack(targets);
        //App.TimerManager.doTimer
        this.closePanel();
    }

    public move(e: egret.TouchEvent) {
        this.shape.x = e.localX;
        this.shape.y = e.localY;
    }

    public getRangeTarget() {
        let point: egret.Point = this.localToGlobal(this.shape.x, this.shape.y);
        let modules: Object = App.ModuleManager.getModulesByType(this.skill.targetType);
        let targets: Array<TdGameSprite> = [];

        for (let id in modules) {
            let sprite: TdGameSprite = modules[id];
            if (this.shape.hitTestPoint(sprite.Point.x, sprite.Point.y)) {
                targets.push(sprite);
            }
        }
        return targets;
    }

    public closePanel() {
        if (!this.isOpen) {
            return;
        }

        if (SkillTargetPanel.SkillReleaseTypeHandlers.hasOwnProperty(this.skill.releaseType)) {
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.move, this);
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onRelease, this);
        this.callObj = null;
        this.callFunc = null;
        this.skill = null;
        if (this.shape) {
            this.removeChild(this.shape);
            delete this.shape;
            this.shape = null;
        }
        this.isOpen = false;
        this.parent.removeChild(this);
    }

    public callBack(targets): void {
        if (this.skill.delay > 0)
            App.TimerManager.doTimer(this.skill.delay, 1, this.callFunc, this.callObj, [this.skill, targets]);
        else
            this.callFunc.apply(this.callObj, [this.skill, targets]);

    }
    public drawCircle(): egret.Shape {
        let shape = new egret.Shape();
        shape.graphics.beginFill(0, 0.5);
        shape.graphics.drawCircle(0, 0, SkillTargetPanel.ins.skill.width / 2);
        shape.graphics.endFill();
        return shape;
    }

    public drawRect(): egret.Shape {
        let shape = new egret.Shape();
        shape.graphics.beginFill(0, 0.5);
        shape.graphics.drawRect(0, 0, SkillTargetPanel.ins.skill.width, SkillTargetPanel.ins.skill.width);
        shape.graphics.endFill();
        return shape;
    }

    public drawPoint(): egret.Shape {
        let shape = new egret.Shape();
        shape.graphics.beginFill(0, 0.5);
        shape.graphics.drawCircle(0, 0, 20);
        shape.graphics.endFill();
        return shape;
    }
}