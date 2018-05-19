class TdGameMonster extends TdGameSprite {//implements IUpdate, ILoad{
    public award: number = 1;
    public path: egret.Point[] = [];
    
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

    }

    //public static type = ModuleType.Sprite;
    // public static type = ModuleType.Monster;
    public get type(){
        return ModuleType.Monster;
    }
    // public type = ModuleType.Monster;
    public update(passtime: number): void {
        super.update(passtime);
        this.move(passtime);
    }
    private move(passTime: number): void {

        if (this.path.length == 0) {
            return;
        }

        var point: egret.Point = this.path[0];  //下一个节点
        var targetSpeed: egret.Point = App.MathUtils.getSpeed(point, new egret.Point(this.x, this.y), this.speed);
        var xDistance: number =  targetSpeed.x;
        var yDistance: number =  targetSpeed.y;

        if (Math.abs(point.x - this.x) <= Math.abs(xDistance) && Math.abs(point.y - this.y) <= Math.abs(yDistance)) {

            this.x = point.x;
            this.y = point.y;
            this.path.shift();

            if (this.path.length == 0) {
                EventManager.dispatchEvent(TdEvents.MONSTER_ARRIVED, this);
                this.release();
                return;
            }
            else {
                this.setDirection(this.path[0]);
            }
        }
        else {
            this.x = this.x + xDistance;
            this.y = this.y + yDistance;
        }

    }
    private onAddToStage(event: egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(TdEvents.SPRITE_DIRECTION_CHANGED, this.onDirectionChanged, this);
        this.addEventListener(TdEvents.SPRITE_HP_CHANGED, this.onHpChange, this);
        this.x = this.path[0].x;
        this.y = this.path[0].y;
        this.setDirection(this.path[1]);

    }
    
    public load(parent: egret.DisplayObjectContainer): void {
        super.load(parent);
        parent.addChild(this);
        App.ModuleManager.registerModule(this)
    }
    public release(): void {
        super.release();
        if (this.mc != null) {
            this.mc.stop();
        }
        this.removeEventListener(TdEvents.SPRITE_DIRECTION_CHANGED, this.onDirectionChanged, this);
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        App.ModuleManager.unRegisterModule(this);
    }

    public parse(obj: any): void {

        this.hp = parseInt(obj.hp);
        this.hpMax = parseInt(obj.hp);
        this.award = parseInt(obj.glob);
        this.speed = parseFloat(obj.speed);
        this.name = obj.type;
        this.path = [];

        for (var i: number = 0; i < obj.path.length; i++) {

            this.path.push(new egret.Point(parseInt(obj.path[i].x), parseInt(obj.path[i].y)));
        }

    }
    private onHpChange(e: egret.Event): void {
        //this.hpImg.sethp(this.Hp, this.HpMax);
        if (this.hp <= 0) {
            EventManager.dispatchEvent(TdEvents.SPRITE_DEAD, this);
            this.release();
        }
    }
    private onDirectionChanged(e: egret.Event): void {
        var that: TdGameMonster = (<TdGameMonster>e.target);
        var data = RES.getRes(this.name + "_" + that.Direction + "_json");//获取描述

        var texture = RES.getRes(this.name + "_" + this.Direction + "_png");//获取大图

        var mcFactory = new egret.MovieClipDataFactory(data, texture);//获取MovieClipData工厂类

        if (this.mc != null) {
            this.mc.parent.removeChild(this.mc);
            this.mc.stop();
        }

        this.mc = new egret.MovieClip(mcFactory.generateMovieClipData(this.name + "_" + this.Direction));//创建一个MC
        this.addChild(this.mc);//添加到显示列表

        this.mc.x = -20;
        this.mc.y = - 30;
        this.mc.gotoAndPlay(1, -1);

        //创建一个圆心，主要用来对点
        // var shap: egret.Shape = new egret.Shape();
        // shap.graphics.beginFill(0xffff60, 1);
        // shap.graphics.drawRect(0, 0, 3, 3);
        // shap.graphics.endFill();
        //this.addChild(shap);//添加到显示列表

    }
}