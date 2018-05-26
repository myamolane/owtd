/**
 * Created by egret on 15-1-6.
 */
class MenuView extends BaseEuiView {
    public constructor($controller: BaseController, $parent: eui.Group) {
        super($controller, $parent);

        this.skinName = "resource/skins/GuiScreenSkin.exml";
    }

    public menuBtn: eui.ToggleButton;
    public menu: Menu;
    public backBtn: eui.Image;
    public goldDisplay: eui.Label;
    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI(): void {
        super.initUI();

        this.menu.x = this.menuBtn.x + this.menuBtn.width;
        this.menu.bottom = 0;
        this.menu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.menuClickHandler, this);
        this.menuBtn.addEventListener(egret.Event.CHANGE, this.menuBtnChangeHandler, this);
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
        EventManager.addEventListener(TdEvents.GAME_GOLD_CHANGED, this.onGoldChanged, this);
    }

    public initData() {
        super.initData();
        if (this.goldDisplay){
            this.goldDisplay.text = App.ControllerManager.applyFunc(ControllerConst.TdGame, TdGameConst.GetGold);
        }
    }
    private onGoldChanged(e: BaseEvent){
        this.goldDisplay.text = e.object;
    }
    private onBack(e: egret.TouchEvent): void {
        App.SceneManager.backScene();
    }

    private playSound(): void {
        App.SoundManager.playEffect("sound_dianji");
    }

    private menuBtnChangeHandler(e: egret.Event): void {
        this.playSound();
        if (this.menu) {
            this.menu.visible = this.menuBtn.selected;
        }
    }

    private menuClickHandler(e: egret.TouchEvent): void {
        this.menuBtn.selected = false;
        this.menu.visible = false;
    }
}