class SettingView extends BasePanelView {
    private musicSlider: eui.HSlider;
    private effectSlider: eui.HSlider;
    private musicBtn: eui.Image;
    private effectBtn: eui.Image;
    private musicCloseLabel: eui.Label;
    private effectCloseLabel: eui.Label;
    private userBtn: eui.Button;
    public constructor(controller: BaseController, parent: eui.Group) {
        super(controller, parent);
        this.title.text = "设置";
    }
    public initUI() {
        super.initUI();

        this.initVolumeUI();
        this.initUserUI();
    }

    private initUserUI(){
        this.userBtn = new eui.Button();
        if (App.GlobalData.token){
            this.userBtn.label = "退出账号";
            this.userBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchQuitBtn, this);
        }
        else{
            this.userBtn.label = "登录账号"
            this.userBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLoginBtn,this);
        }
        this.contentGroup.addChild(this.userBtn);
        this.userBtn.bottom = 0;
    }

    private onTouchQuitBtn(e: egret.TouchEvent):void{
         App.Utils.clearToken();
         this.userBtn.label = "登录账号";
         this.userBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchQuitBtn, this);
         this.userBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLoginBtn, this);
    }
    private onTouchLoginBtn(e:egret.TouchEvent):void{
        App.ViewManager.open(ViewConst.Login);
        App.ViewManager.closeView(this);
    }
    // private close(params: []){

    // }

    private initVolumeUI() {
        this.musicSlider = this.initHSlider("bg");
        this.effectSlider = this.initHSlider("effect");
        this.musicBtn = App.DisplayUtils.createEuiImage("music_volume_png");
        this.effectBtn = App.DisplayUtils.createEuiImage("effect_volume_png");
        this.musicBtn.scaleX = 0.2;
        this.musicBtn.scaleY = 0.2;
        this.musicBtn.name = "bg";
        this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);

        this.effectBtn.scaleX = 0.2;
        this.effectBtn.scaleY = 0.2;
        this.effectBtn.name = "effect";
        this.effectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);

        this.musicCloseLabel = new eui.Label("/");
        this.musicCloseLabel.textColor = 0xD81500;
        this.musicCloseLabel.size = 40;
        this.musicCloseLabel.rotation = 15;
        this.musicCloseLabel.bold = true;

        this.effectCloseLabel = new eui.Label("/");
        this.effectCloseLabel.textColor = 0xD81500;
        this.effectCloseLabel.size = 40;
        this.effectCloseLabel.rotation = 15;
        this.effectCloseLabel.bold = true;

        let vlayout: eui.VerticalLayout = new eui.VerticalLayout();
        vlayout.horizontalAlign = "center";
        vlayout.gap = 10;
        this.contentGroup.layout = vlayout;

        let hlayout1: eui.HorizontalLayout = new eui.HorizontalLayout();
        let list1: eui.Group = new eui.Group();
        let musicBtnGroup = new eui.Group();
        hlayout1.verticalAlign = "center";
        hlayout1.gap = 20;
        list1.layout = hlayout1;
        musicBtnGroup.addChild(this.musicBtn);
        musicBtnGroup.addChild(this.musicCloseLabel);
        list1.addChild(musicBtnGroup)
        list1.addChild(this.musicSlider);
        this.musicSlider.y = this.musicBtn.height >> 1;

        let hlayout2: eui.HorizontalLayout = new eui.HorizontalLayout();
        hlayout2.verticalAlign = "center";
        hlayout2.gap = 20;
        let list2: eui.Group = new eui.Group();
        list2.layout = hlayout2;
        let effectBtnGroup = new eui.Group();
        effectBtnGroup.addChild(this.effectBtn);
        effectBtnGroup.addChild(this.effectCloseLabel);
        list2.addChild(effectBtnGroup);
        list2.addChild(this.effectSlider);
        this.effectSlider.y = this.effectBtn.height >> 1;

        this.contentGroup.addChild(list1);
        this.contentGroup.addChild(list2);

        this.musicCloseLabel.x = this.musicBtn.width * this.musicBtn.scaleX >> 1;
        this.effectCloseLabel.x = this.effectBtn.width * this.effectBtn.scaleX >> 1;
        this.musicCloseLabel.visible = false;
        this.effectCloseLabel.visible = false;
        this.effectCloseLabel.touchEnabled = false;
        this.musicCloseLabel.touchEnabled = false;
    }

    private initHSlider(name: string): eui.HSlider {
        var hSlider: eui.HSlider = new eui.HSlider();
        hSlider.width = 200;
        hSlider.minimum = 0;//定义最小值
        hSlider.maximum = 100;//定义最大值
        hSlider.value = 100;//定义默认值
        hSlider.name = name;
        hSlider.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
        //this.contentGroup.addChild(hSlider);
        return hSlider;
    }
    private changeHandler(evt: eui.UIEvent): void {
        let volume = evt.target.value / 100;
        switch (evt.target.name) {
            case 'bg':
                App.SoundManager.setBgVolume(volume);
                if (evt.target.value === 0) {
                    this.musicCloseLabel.visible = true;
                }
                else {
                    this.musicCloseLabel.visible = false;
                }
                break;
            case 'effect':
                App.SoundManager.setEffectVolume(volume);
                if (evt.target.value === 0) {
                    this.effectCloseLabel.visible = true;
                }
                else {
                    this.effectCloseLabel.visible = false;
                }
                break;
            default:
                break;
        }
    }

    private onTouchBtn(e: egret.TouchEvent) {
        switch (e.target.name) {
            case 'bg':
                App.SoundManager.setBgOn(this.musicCloseLabel.visible);
                this.musicCloseLabel.visible = !this.musicCloseLabel.visible;
                break;
            case 'effect':
                App.SoundManager.setEffectOn(this.effectCloseLabel.visible);
                this.effectCloseLabel.visible = !this.effectCloseLabel.visible;
                break;
            default:
                break;
        }
    }
}