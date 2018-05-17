// tower

class TdGameTurret extends TdGameSprite implements IUpdate, ILoad {
    public constructor() {
        super();
    }
    //public static type = ModuleType.Sprite;
    // public static type = ModuleType.Turret;
    public get type(){
        return ModuleType.Turret;
    }
    private offsetx: number;
    private offsety: number;
    private skin: string;
    private radius: number;
    private glob: number;
    private circle: egret.Shape;
    private lastTime: number = 0;
    private shape: egret.Shape;
    private skillSelectPanel: TdSkillSelectPanel;
    public fireRate: number = 3000;
    private creatSp(): void {

        var data = RES.getRes(this.skin + "_json");
        var texture = RES.getRes(this.skin + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, texture);

        if (this.mc != null) {
            this.mc.parent.removeChild(this.mc);
            this.mc.stop();
        }

        this.mc = new egret.MovieClip(mcFactory.generateMovieClipData(this.skin));
        this.addChildAt(this.mc, 0);//添加到显示列表

        //this.mc.x = -this.mc.width / 2 + this.offsetx;
        //this.mc.y = -this.mc.height / 2 + this.offsety;

        this.mc.gotoAndPlay(1, -1);

        this.mc.touchEnabled = true;



    }

    private creatBullet(source: TdGameSprite, target: TdGameSprite): void {

        var nowTime: number = egret.getTimer();
        if (nowTime > this.lastTime) {
            this.lastTime = nowTime + this.fireRate;//下次执行时间
            EventManager.dispatchEvent(TdEvents.ACTIVATION_OF_BULLET, [source, target]);
            this.changOrientation(target.Point);
        }

    }



    private searchTarget(): void {
        var spriteList: Object = App.ModuleManager.getModuleList()[ModuleType.Monster];
        var tempSp: TdGameMonster;

        for (var key in spriteList) {
            if (spriteList[key] instanceof TdGameMonster) {
                tempSp = spriteList[key];
                if (App.MathUtils.getPointsDistance(tempSp.Point, this.Point) <= this.radius) {
                    this.creatBullet(this, tempSp);
                }
            }
        }
    }

    private changOrientation(point: egret.Point): void//根据敌人的位置改变方向
    {
        var xx: number = point.x - this.x;
        var yy: number = point.y - this.y;
        var angle: number = Math.atan2(yy, xx);
        angle *= 180 / Math.PI;
        angle -= 180;
        if (angle < 0) angle += 360;
        //_angle = angle;
        //var child:Sprite = _tower.getChildAt(0) as Sprite;帧
        var index: number = Math.round(this.mc.totalFrames * angle / 360);// angle/360/72
        this.mc.gotoAndStop(index);
    }

    public load(parent: egret.DisplayObjectContainer): void {
        parent.addChild(this);
        this.creatSp();
        this.touchEnabled = true;
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0xfff, 0);
        this.shape.graphics.drawRect(0, 0, this.mc.width, this.mc.height);
        this.shape.graphics.endFill();
        this.shape.touchEnabled = true;
        this.addChild(this.shape);

        this.addEventListener(TdEvents.ENERGY_CHANGED, this.onEnergyChanged, this);
        //this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        this.shape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        App.ModuleManager.registerModule(this);
        this.initSkillPanel();
    }

    public release(): void {
        if (this.mc != null) {
            this.mc.stop();
        }
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.shape.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        EventManager.removeEventListener(TdEvents.ENERGY_CHANGED, this.onEnergyChanged, this)
        App.ModuleManager.unRegisterModule(this);
    }

    public initSkillPanel() {
        let panel = new TdSkillSelectPanel(this.skills.map((skill) => skill.name));
        //panel.enableSkill("HighNoon");
        panel.anchorOffsetX = panel.width >> 1;
        this.skillSelectPanel = panel;
        this.addChild(this.skillSelectPanel);
    }

    public onEnergyChanged(e: egret.Event): void {
        this.skills.forEach((skill) => {
            if (this.energy >= skill.energy)
                this.enableSkill(skill);
        });
    }

    public enableSkill(skill: SpriteSkill) {
        this.skillSelectPanel.enableSkill(skill.name);
    }

    public useSkill(skillName: string): void {
        //this.skills[skillName]
        this.touchEnabled = false;
        this.addChild(CircleSkillTargetPanel.Ins);
        CircleSkillTargetPanel.Ins.showPanel(this.onSkillReleased, this, TdGameView.spriteSkills[skillName]);
    }

    public onSkillReleased(skill:SpriteSkill, targets: Array<TdGameMonster>){
        console.log(targets);
        targets.forEach((target) => {
            target.onEffect(skill.targetEffect);
        });
        this.onEffect(skill.sourceEffect);
    }


    /**
    *	 虚方法，需要Override
    * @param ElapsedSeconds 距离上次被更新的时间间隔
    *
    */
    public update(passTime: number): void {
        if (this.speed == 0) {
            return;
        }
        this.searchTarget();
    }

    private onTouchTab(e: egret.TouchEvent): void {
        if (this.circle == null) {
            this.circle = new egret.Shape();
            this.circle.graphics.beginFill(0xffff60, 1);
            this.circle.graphics.drawCircle(0, 0, this.radius);
            this.circle.graphics.endFill();
            this.circle.alpha = 0.2;
            this.addChild(this.circle);
        }
        App.ControllerManager.applyFunc(ControllerConst.TdGame, TdGameConst.ShowSelectPanel, this.onChange, this)
        App.ControllerManager.applyFunc(ControllerConst.TdGame, TdGameConst.SetSelectPanelPoint, new egret.Point(this.Point.x, this.Point.y + this.mc.height))

    }

    private onChange(item: string): void {

        this.parseSkin(item);
        this.creatSp();

        if (this.circle != null) {
            this.removeChild(this.circle);
            this.circle = null;
        }
    }

    public Parse(obj: any): void {
        this.name = obj.name;
        this.x = parseInt(obj.x);
        this.y = parseInt(obj.y);
        obj.skills.forEach((skill) => {
            if (TdGameView.spriteSkills.hasOwnProperty(skill))
                this.skills.push(TdGameView.spriteSkills[skill]);
        });
        this.parseSkin(obj.type);
    }

    private parseSkin(key: string): void {

        var data = RES.getRes("turretskin");//这里遇到一个文件编码问题,主要是中文,为了方便,文件统一utf-8吧

        this.skin = key;
        this.offsetx = parseInt(data[key].offsetx);
        this.offsety = parseInt(data[key].offsety);
        this.radius = parseInt(data[key].radius);
        this.speed = parseInt(data[key].speed);
        this.glob = parseInt(data[key].glob);
    }
}
