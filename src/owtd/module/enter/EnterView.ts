class EnterView extends BaseEuiView {
    public constructor($controller: BaseController, $parent: eui.Group) {
        super($controller, $parent);

        this.skinName = "resource/skins/TdGameEnterSkin.exml";
    }

    public menu: Menu;
    public levelGroup: eui.Group;

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI(): void {
        super.initUI();

        let level1 = App.DisplayUtils.createEuiImage("level1_png");
        let curLevel = 1;
        for (let i = 0; i <= App.GlobalData.levels; i++) {
            let resName = "level" + i;
            resName += i <= curLevel ? "_png" : "_locked_png";
            let levelImage = App.DisplayUtils.createEuiImage(resName);
            levelImage.name = i.toString();
            this.levelGroup.addChild(levelImage);
            levelImage.scaleX = 2;
            levelImage.scaleY = 2;
            levelImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLevelClicked, this);
        }

        this.menu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.menuClickHandler, this);

    }

    private onLevelClicked(e: egret.TouchEvent) {
        App.SceneManager.runScene(SceneConsts.TdGame, e.target.name);
    }

    private playSound(): void {
        App.SoundManager.playEffect("sound_dianji");
    }

    private shopClickHandler(e: egret.TouchEvent): void {
        this.playSound();
        App.ViewManager.open(ViewConst.Shop);
    }

    private warehouseClickHandler(e: egret.TouchEvent): void {
        this.playSound();
        App.ViewManager.open(ViewConst.Warehouse);
    }

    private moreClickHandler(e: egret.TouchEvent): void {
        this.playSound();
    }


    private menuClickHandler(e: egret.TouchEvent): void {
        if (e.target == this.menu.shopBtn) {
            this.playSound();
            App.ViewManager.open(ViewConst.Shop);
            //this.menu.visible = false;
        }
        else if (e.target == this.menu.packBtn) {
            this.playSound();
            App.ViewManager.open(ViewConst.Warehouse);
        }
        else if (e.target == this.menu.settingBtn) {
            this.playSound();
            App.ViewManager.open(ViewConst.Task);
            //this.menu.visible = false;
        }
    }
}