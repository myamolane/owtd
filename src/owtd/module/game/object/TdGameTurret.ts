// tower

class TdGameTurret extends TdGameSprite implements IUpdate, ILoad{
    public constructor() {
        super();
    }
    public static type = ModuleType.Sprite;
    private offsetx: number;
    private offsety: number;
    private skin: string;
    private radius: number;
    private glob: number;

    private lastTime: number = 0;
    private radiusShap: egret.Shape;
    private skillSelectPanel: TdSkillSelectPanel;
    private creatSp(): void {

        var data = RES.getRes(this.skin + "_json");
        var texture = RES.getRes(this.skin + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, texture);

        if (this.mc != null) {
            this.mc.parent.removeChild(this.mc);
            this.mc.stop();
        }

        this.mc = new egret.MovieClip(mcFactory.generateMovieClipData(this.skin));
        this.addChild(this.mc);//添加到显示列表

        this.mc.x = -this.mc.width / 2 + this.offsetx;
        this.mc.y = -this.mc.height / 2 + this.offsety;

        this.mc.gotoAndPlay(1, -1);

        this.mc.touchEnabled = true;

        /*
        var shap:egret.Shape = new egret.Shape();
        shap.graphics.beginFill(0xffff60, 1);
        shap.graphics.drawCircle(0, 0,2);
        shap.graphics.endFill();
        this.addChild(shap);
        */
    }

    private creatBullet(source: TdGameSprite, target: TdGameSprite): void {

        var nowTime: number = egret.getTimer();
        if (nowTime > this.lastTime) {
            this.lastTime = nowTime + this.speed;//下次执行时间
            EventManager.dispatchEvent(TdEvents.ACTIVATION_OF_BULLET, [source, target]);
            this.changOrientation(target.Point);
        }

    }

    

    private searchTarget(): void {
        var spriteList: Object = App.ModuleManager.getModuleList()[ModuleType.Sprite];
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
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        this.addEventListener(TdEvents.ENERGY_CHANGED, this.onEnergyChanged, this)
        App.ModuleManager.registerModule(this);
        this.initSkillPanel();
    }

    public initSkillPanel(){
        let panel = new TdSkillSelectPanel(this.skills.map((skill) => skill.name));
        panel.enableSkill("HighNoon");

        panel.anchorOffsetX = panel.width >> 1;
        this.skillSelectPanel = panel;
        this.addChild(this.skillSelectPanel);
        
        console.log(this.skillSelectPanel.width);
    }

    public onEnergyChanged(e: egret.Event): void{
        console.log('engegy changed')
    }

    public onSkillEnable(skill: SpriteSkill){
        
    }

    public release(): void {
        if (this.mc != null) {
            this.mc.stop();
        }
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        EventManager.removeEventListener(TdEvents.ENERGY_CHANGED, this.onEnergyChanged, this)
        App.ModuleManager.unRegisterModule(this);
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
        console.log(this.skillSelectPanel.width);
        if (this.radiusShap == null) {
            this.radiusShap = new egret.Shape();
            this.radiusShap.graphics.beginFill(0xffff60, 1);
            this.radiusShap.graphics.drawCircle(0, 0, this.radius);
            this.radiusShap.graphics.endFill();
            this.radiusShap.alpha = 0.2;
            this.addChild(this.radiusShap);
        }
        App.ControllerManager.applyFunc(ControllerConst.TdGame, TdGameConst.ShowSelectPanel, this.onChange, this)
        App.ControllerManager.applyFunc(ControllerConst.TdGame, TdGameConst.SetSelectPanelPoint, new egret.Point(this.Point.x, this.Point.y+this.mc.height))
        
    }

    private onChange(item: string): void {

        this.parseSkin(item);
        this.creatSp();

        if (this.radiusShap != null) {
            this.removeChild(this.radiusShap);
            this.radiusShap = null;
        }
    }

    public Parse(obj: any): void {
        this.name = obj.name;
        this.x = parseInt(obj.x);
        this.y = parseInt(obj.y);
        obj.skills.forEach((skill) =>{
            if (TdGameView.spriteSkills.hasOwnProperty(skill))
                this.skills.push(TdGameView.spriteSkills[skill]);
        });
        console.log(this.skills);
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
