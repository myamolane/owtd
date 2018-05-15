/**
 * Created by egret on 15-1-6.
 */
class HomeView extends BaseEuiView{
    public constructor($controller:BaseController, $parent:eui.Group) {
        super($controller, $parent);

        //this.skinName = "resource/skins/GuiScreenSkin.exml";
    }
    private bg:egret.Bitmap;
    public startBtn: eui.Label;

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */

    public initUI():void{
        super.initUI();
        this.bg = App.DisplayUtils.createBitmap("home_bg");
        let stageW = App.StageUtils.getWidth();
        let stageH = App.StageUtils.getHeight();
        this.bg.width = stageW;
        this.bg.height = stageH;
        this.addChild(this.bg);
        
        this.startBtn = new eui.Label();
        this.startBtn.horizontalCenter = 0;
        this.startBtn.verticalCenter = 40;
        this.startBtn.text = "开始战斗";
        this.startBtn.width = 200;
        this.startBtn.height = 70;
        this.startBtn.size = 43;
        this.startBtn.bold = true;
        this.startBtn.textAlign = "center";
        this.startBtn.verticalAlign = "middle"
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startClickHandler, this);
        this.addChild(this.startBtn)
    }

    private playSound():void{
        App.SoundManager.playEffect("sound_dianji");
    }
    private startClickHandler(e:egret.TouchEvent):void{
        this.playSound();
        App.ViewManager.open(ViewConst.Login)
    }
    // private friendClickHandler(e:egret.TouchEvent):void{
    //     this.playSound();
    //     App.ViewManager.open(ViewConst.Friend);
    // }

    // private menuBtnChangeHandler(e:egret.Event):void{
    //     this.playSound();
    //     if(this.menu){
    //         this.menu.visible = this.menuBtn.selected;
    //     }
    // }

    // private menuClickHandler(e:egret.TouchEvent):void{
    //     console.log(e.target)
    //     if(e.target == this.menu.taskBtn){
    //         this.playSound();
    //         App.ViewManager.open(ViewConst.Task);
    //         this.menuBtn.selected = false;
    //         this.menu.visible = false;
    //     }
    //     else if(e.target == this.menu.dailyBtn){
    //         this.playSound();
    //         App.ViewManager.open(ViewConst.Daily);
    //         this.menuBtn.selected = false;
    //         this.menu.visible = false;
    //     }
    //     else if(e.target == this.menu.mailBtn){
    //         this.playSound();
    //         App.ViewManager.open(ViewConst.Mail);
    //         this.menuBtn.selected = false;
    //         this.menu.visible = false;
    //     }
    // }
}