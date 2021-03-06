class TdGameView extends BaseSpriteView implements IUpdate {
    private map: egret.Bitmap;
    private mapLayer: egret.DisplayObjectContainer;
    private spriteLayer: egret.DisplayObjectContainer;
    private decorationLayer: egret.DisplayObjectContainer;
    //public turrets:Array<TdGameTurret>;
    //public monsters:Array<TdGameMonster>;
    //public bullets: Array<TdGameBullet>;
    private selectPanel: TDSelectPanel;
    private skillSelectPanel: TdSkillSelectPanel;
    public constructor($controller: BaseController, $parent: egret.DisplayObjectContainer) {
        super($controller, $parent);
        this._id = App.ModuleManager.generateModuleId();
        this.spriteLayer = new egret.DisplayObjectContainer();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
        EventManager.addEventListener(TdEvents.USE_EQUIP_SUCCESS, this.onUseEquip, this);
        //this.initSkillPanel();
    }
    // public initSkillPanel() {
    //     let skillNames = App.Utils.getKeys(SpriteSkill.Skills)
    //     this.skillSelectPanel = new TdSkillSelectPanel(skillNames);
    // }
    public isRunning = true;

    private static _type = ModuleType.View;
    public get type(): string { return TdGameView._type; }

    private _id: number;
    public onAddedToStage(e: egret.Event): void {
        let shape = new egret.Shape();
        shape.graphics.drawRect(300, 300, -200, -400);
        shape.graphics.endFill();
        this.addChild(shape);
    }

    public get Id() { return this._id; }

    private lastTime: number = 0;

    public update(passTime: number): void {
        if (this.isInit && passTime > this.lastTime) {
            this.createSp();
            this.lastTime = passTime + 1000;
        }
    }

    public createMap(key): void {
        key = 1;
        this.map = App.DisplayUtils.createBitmap('map_' + key + '_png');
        this.mapLayer.addChild(this.map);
        this.addChild(this.mapLayer);
    }
    //建立塔防
    private createTurret(mapId): void {

        var data = RES.getRes("map_" + mapId + "_turret_json");
        let td: TdGameTurret;

        for (var i: number = 0; i < data.turret.length; i++) {
            td = new TdGameTurret();
            td.Parse(data.turret[i]);
            td.load(this.spriteLayer);
            //td.load(this.spriteLayer);
        }
    }

    private action: any[];

    private creatAction(mapId): void {
        var data = RES.getRes("map_" + mapId + "_sprite_json");
        this.action = new Array();
        var index: number;
        for (var i: number = 0; i < data.sprite.length; i++) {
            data.sprite[i].path = data.Path;
            data.sprite[i].keyframe = false;
            data.sprite[i].delay = parseInt(data.sprite[i].delay);
            for (var j: number = 0; j < data.sprite[i].count; j++) {
                index = this.action.push(data.sprite[i]);
                if (index == data.sprite[i].count) {
                    this.action[index - 1].keyframe = true;
                }
            }
        }
    }

    private startTime: number;

    private createSp(): void {

        if (this.action.length > 0) {

            if ((this.startTime + this.action[0].delay) <= egret.getTimer()) {
                var sp: TdGameMonster;
                sp = new TdGameMonster();
                sp.parse(this.action.shift());
                sp.load(this.spriteLayer);
            }
        }
    }

    private createHouse(): void {
        var house: House = new House();
        house.x = this.map.width;
        house.y = this.map.height;
        house.setHp(10);
        house.load(this.decorationLayer);
    }

    private onUseEquip(e: BaseEvent) {
        console.log(e.object);
        this.addChild(SkillTargetPanel.Ins);
        SkillTargetPanel.Ins.showPanel(this.onEquipReleased, this, SpriteSkill.Skills[e.object]);

    }

    public onEquipReleased(skill: SpriteSkill, targets: Array<TdGameSprite>) {
        targets.forEach((target) => {
            target.onEffect(skill.targetEffect);
        });
    }

    public initUI(): void {
        super.initUI();
        this.mapLayer = new egret.DisplayObjectContainer();
        this.decorationLayer = new egret.DisplayObjectContainer();
        this.spriteLayer = new egret.DisplayObjectContainer();
        this.selectPanel = new TDSelectPanel();
        this.selectPanel.load(this);
    }

    public initData(): void {
        super.initData();
        this.startTime = egret.getTimer();
    }


    public open(...param: any[]): void {
        super.open(param);
        var gameModel: TdGameModel = param[0];
        this.createMap(gameModel.mapId);
        this.createTurret(gameModel.mapId);
        this.creatAction(gameModel.mapId);

        this.createHouse();
        EventManager.addEventListener(TdEvents.ACTIVATION_OF_BULLET, this.onActivationBullet, this);
        EventManager.addEventListener(TdEvents.HOUSE_DEAD, this.onHouseDead, this);
        EventManager.addEventListener(TdEvents.MONSTER_DEAD, this.onMonsterDead, this);
        //this.creatSp();
        App.ModuleManager.registerModule(this);
        this.addChild(this.spriteLayer);
        this.addChild(this.decorationLayer);
    }

    public close(...params: any[]): void {
        super.close(params);
        App.ModuleManager.unRegisterModule(this);
        while (this.spriteLayer.numChildren > 0) {
            let obj: any = this.spriteLayer.removeChildAt(0);
            (<ILoad>obj).release();
        }
        while (this.decorationLayer.numChildren > 0) {
            let obj: any = this.decorationLayer.removeChildAt(0);
            (<ILoad>obj).release();
        }
        while (this.numChildren > 0) {
            this.removeChildAt(0);
        }
        EventManager.removeEventListener(TdEvents.ACTIVATION_OF_BULLET, this.onActivationBullet, this);
        EventManager.removeEventListener(TdEvents.HOUSE_DEAD, this.onHouseDead, this);
        EventManager.removeEventListener(TdEvents.MONSTER_DEAD, this.onMonsterDead, this);
    }

    private onMonsterDead(e: BaseEvent): void {

        e.object.visible = false;
        let gold = this.applyFunc(TdGameConst.GetGold) + e.object.award;
        this.applyFunc(TdGameConst.SetGold, gold);

        if (TdGameMonster.Total == 1 && this.action.length == 0) {
            setTimeout(function () {
                alert("You win!");
                App.ControllerManager.applyFunc(ControllerConst.TdGame, TdGameConst.GameWin);
                App.SceneManager.backScene();
                EventManager.dispatchEvent(TdEvents.GAME_WIN, null);
            }, 2000);
            // alert("You win!");
            // this.applyFunc(TdGameConst.GameWin);
            // App.SceneManager.backScene();
            // EventManager.dispatchEvent(TdEvents.GAME_WIN, null);
        }
    }

    public onHouseDead(e: BaseEvent): void {
        App.ModuleManager.stop();
        alert('Game over');
        App.SceneManager.backScene();
    }

    public showPanel(callfun, callobj): void {
        this.selectPanel.showPanel(callfun, callobj);
    }

    public setPanelPoint(point: egret.Point) {
        this.selectPanel.setPoint(point);
    }

    private onActivationBullet(e: BaseEvent): void {
        var bullet: TdGameBullet = new TdGameBullet();
        bullet.setTarget(e.object[0], e.object[1]);
        bullet.load(this.decorationLayer);
    }

}
