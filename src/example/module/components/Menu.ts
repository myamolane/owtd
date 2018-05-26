class Menu extends eui.Component {
    public shopBtn: eui.Image;
    public packBtn: eui.Image;
    public settingBtn: eui.Image;
    //private currentView: string;

    public constructor() {
        super();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.menuClickHandler, this);
    }
    private playSound(): void {
        App.SoundManager.playEffect("sound_dianji");
    }
    private menuClickHandler(e: egret.TouchEvent): void {
        if (e.target == this.shopBtn) {
            this.playSound();
            App.ViewManager.open(ViewConst.Shop);
        }
        else if (e.target == this.packBtn) {
            this.playSound();
            App.ViewManager.open(ViewConst.Warehouse);
        }
        else if (e.target == this.settingBtn) {
            this.playSound();
            App.ViewManager.open(ViewConst.Setting);
        }
    }
}