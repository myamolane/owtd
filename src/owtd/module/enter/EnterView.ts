class EnterView extends BaseEuiView {
    public constructor($controller: BaseController, $parent: eui.Group) {
        super($controller, $parent);
        this.skinName = "resource/skins/TdGameEnterSkin.exml";
    }

    public menu: Menu;
    public levelGroup: eui.Group;
    public backBtn: eui.Image;
    public goldIcon: eui.Image;
    public goldDisplay: eui.Label;
    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI(): void {
        super.initUI();

        // let level1 = App.DisplayUtils.createEuiImage("level1_png");
        // let curLevel = 1;
        // for (let i = 0; i <= App.GlobalData.levels; i++) {
        //     let resName = "level" + i;
        //     resName += i <= curLevel ? "_png" : "_locked_png";
        //     let levelImage = App.DisplayUtils.createEuiImage(resName);
        //     levelImage.name = i.toString();
        //     this.levelGroup.addChild(levelImage);
        //     levelImage.scaleX = 2;
        //     levelImage.scaleY = 2;
        //     levelImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLevelClicked, this);
        // }
        // this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
    }
    public open(...param: any[]) {
        super.open(param);
        let curLevel = parseInt(App.GlobalData.level);
        for (let i = 1; i <= App.GlobalData.levels; i++) {
            let resName = "level" + i;
            resName += i <= curLevel ? "_png" : "_locked_png";
            let levelImage = App.DisplayUtils.createEuiImage(resName);
            levelImage.name = i.toString();
            this.levelGroup.addChild(levelImage);
            levelImage.scaleX = 2;
            levelImage.scaleY = 2;
            levelImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLevelClicked, this);
        }
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
    }
    public close(...param: any[]) {
        super.close(param);
        while (this.levelGroup.numChildren > 0) {

            let obj: any = this.levelGroup.removeChildAt(0);
            if (obj instanceof eui.Image) {
                obj.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLevelClicked, this);
            }
        }
        this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
    }
    public initData() {
        super.initData();
        if (App.GlobalData.player) {
            this.goldDisplay.text = App.GlobalData.player.gold;
            this.goldDisplay.visible = true;
            this.goldIcon.visible = true;
        }
        EventManager.addEventListener(TdEvents.GAME_WIN, this.onGameWin, this);
    }
    private onGameWin(e: BaseEvent) {
        let model = <TdGameModel>App.ControllerManager.getControllerModel(ControllerConst.TdGame);

        if (App.GlobalData.player) {
            this.goldDisplay.text = App.GlobalData.player.gold;
        }

    }
    private onBack(e: egret.TouchEvent): void {
        App.SceneManager.backScene();

    }

    private onLevelClicked(e: egret.TouchEvent) {
        App.SceneManager.runScene(SceneConsts.TdGame, e.target.name);
    }

    private playSound(): void {
        App.SoundManager.playEffect("sound_dianji");
    }
}