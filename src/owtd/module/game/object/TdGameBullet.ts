class TdGameBullet extends TdGameSprite{
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    public onAddToStage(event: egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }
    private radius: number;
    private target: TdGameSprite;
    private source: TdGameSprite;
    public atk: number = 10;
    public setTarget(source: TdGameSprite, target: TdGameSprite): void{
        this.x = source.x;
        this.y = source.y;
        this.source = source;
        this.target = target;
        let bitmap: egret.Bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes("bullet1");
        bitmap.x = -bitmap.width;
        bitmap.y = -bitmap.height;
        this.addChild(bitmap);

        this.radius = 10;
        this.speed = 1;
    }
    
    public load(parent: egret.DisplayObjectContainer): void{
        parent.addChild(this);
        App.ModuleManager.registerModule(this);
    }

    public release(): void{
        if (this.parent != null){
            this.parent.removeChild(this);
        }
        App.ModuleManager.unRegisterModule(this);
    }
    
    public update(passTime: number){
        super.update(passTime);
        this.move(passTime);
    }
    
    private move(passTime: number): void{
        let distance: number = App.MathUtils.getPointsDistance(this.Point, this.target.Point);
        if (distance <= this.radius) {
            this.target.setHp(this.target.hp - this.atk);
            this.target = null;
            this.release();
            this.source.Energy = this.source.energy + this.atk;
        }
        else {
            let targetSpeed: egret.Point = App.MathUtils.getSpeed(this.target.Point, this.Point, this.speed);
            let xDistance: number = 10 * targetSpeed.x;
            let yDistance: number = 10 * targetSpeed.y;
            this.x = this.x + xDistance;
            this.y = this.y + yDistance;
        }
    }
}