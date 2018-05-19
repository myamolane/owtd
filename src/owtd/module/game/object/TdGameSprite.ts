class TdGameSprite extends egret.Sprite implements IEffectable, IUpdate, ILoad {//{
    //private _components: any;
    public constructor() {
        super();
        this.id = App.ModuleManager.generateModuleId();
    }
    public mc: egret.MovieClip;
    private static _type = ModuleType.Sprite;
    public get type() { return TdGameSprite._type; }
    public get Id(): number { return this.id; }
    private id: number;
    public name: string;
    public isRunning: boolean = true;
    //public skillPath: string;
    //public gameView: TdGameView;
    public speed: number = 0.1;
    public hp: number = 100;
    public hpMax: number = 100;
    public atk: number = 1;
    public skills: Array<SpriteSkill> = [];
    public energy: number = 0;
    public static Total = 0;
    private direction: string = "";

    public get Direction(): string {
        return this.direction;
    }

    public onEffect(effect: GameEffect) {
        if (effect.mc) {
            let originMc = this.mc;
            let newMc = App.MovieClipUtil.generateMc(this.name + "_" + effect.mc);
            if (this.mc != null) {
                this.mc.parent.removeChild(originMc);
                originMc.stop();
            }
            this.mc = newMc;
            this.addChild(newMc);
            newMc.gotoAndPlay(0, effect.mcTime);
            effect.mc = originMc.name;
        }
        effect.effects.forEach((propertyEffect) => {
            this[propertyEffect.property] = this[propertyEffect.property] + propertyEffect.value;
        });


        if (effect.effectTime > 0) {
            App.TimerManager.doTimer(effect.effectTime, 1, ( params: GameEffect) => {
                if (params.mc) {
                    let originMc = App.MovieClipUtil.generateMc(params.mc);
                    if (this.mc != null) {
                        this.mc.parent.removeChild(this.mc);
                        this.mc.stop();
                    }
                    this.mc = originMc;
                    this.addChild(this.mc);
                    this.mc.gotoAndPlay(0, -1);
                }
                effect.effects.forEach((propertyEffect) => {
                    this[propertyEffect.property] = this[propertyEffect.property] - propertyEffect.value;
                });
            }, this, effect);
        }
    }

    public setHp(value): void {
        if (value < 0)
            value = 0;
        this.hp = value;
        this.dispatchEvent(new egret.Event(TdEvents.SPRITE_HP_CHANGED));
        //hp changed
    }

    public setDirection(p: egret.Point): void {
        let xNum: number = p.x - this.x;
        let yNum: number = p.y - this.y;
        let tempDirection: string;
        if (xNum == 0) {
            if (yNum > 0)
                tempDirection = "down"
            else if (yNum < 0)
                tempDirection = "up"
        }
        if (yNum == 0) {
            if (xNum > 0) {
                tempDirection = "right";
            }
            else if (xNum < 0) {
                tempDirection = "left";
            }
        }
        if (tempDirection != this.direction) {
            this.direction = tempDirection;
            this.dispatchEvent(new egret.Event(TdEvents.SPRITE_DIRECTION_CHANGED))
            //direction changed
        }
    }
    //public _path: PathNode[]

    public toString(): string {
        return "x:" + this.x + " y:" + this.y;
    }
    public update(passTime: number): void {

    }
    public load(parent: egret.DisplayObjectContainer): void {

    }
    public release(): void {

    }

    public get Point(): egret.Point {
        return new egret.Point(this.x, this.y);
    }

    public set Hp(value: number) {
        this.setHp(value);
    }
    public get Hp(): number{
        return this.hp;
    }

    public set Atk(value: number) {
        this.atk = value;
    }

    public set Speed(value: number) {
        this.speed = value;
    }
    public get Speed():number{
        return this.speed;
    }

    public set Energy(value: number) {
        this.energy = value;
        this.dispatchEvent(new egret.Event(TdEvents.ENERGY_CHANGED));
    }
}