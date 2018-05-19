/**
 * Created by egret on 15-1-6.
 */
class MenuView extends BaseEuiView{
    public constructor($controller:BaseController, $parent:eui.Group) {
        super($controller, $parent);

        this.skinName = "resource/skins/GuiScreenSkin.exml";
    }

    public menuBtn:eui.ToggleButton;
    public menu:Menu;

    //public friendBtn:eui.Image;
    public shopBtn:eui.Image;
    public warehouseBtn:eui.Image;
    //public factoryBtn:eui.Image;
    //public moreBtn:eui.Image;

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI():void{
        super.initUI();

        this.menu.addEventListener(egret.TouchEvent.TOUCH_TAP,this.menuClickHandler,this);
        this.menuBtn.addEventListener(egret.Event.CHANGE,this.menuBtnChangeHandler,this);
        //this.shopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shopClickHandler,this);
        //this.warehouseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.warehouseClickHandler,this);
        //this.factoryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.factoryClickHandler,this);
      //  this.moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.moreClickHandler,this);
    }

    private playSound():void{
        App.SoundManager.playEffect("sound_dianji");
    }

    

    private shopClickHandler(e:egret.TouchEvent):void{
        this.playSound();
        App.ViewManager.open(ViewConst.Shop);
    }

    private warehouseClickHandler(e:egret.TouchEvent):void{
        this.playSound();
        App.ViewManager.open(ViewConst.Warehouse);
    }

    private moreClickHandler(e:egret.TouchEvent):void{
        this.playSound();
    }


    private menuBtnChangeHandler(e:egret.Event):void{
        this.playSound();
        if(this.menu){
            this.menu.visible = this.menuBtn.selected;
        }
    }

    private menuClickHandler(e:egret.TouchEvent):void{
        if(e.target == this.menu.taskBtn){
            this.playSound();
            App.ViewManager.open(ViewConst.Task);
            this.menuBtn.selected = false;
            this.menu.visible = false;
        }
        else if(e.target == this.menu.dailyBtn){
            this.playSound();
            App.ViewManager.open(ViewConst.Daily);
            this.menuBtn.selected = false;
            this.menu.visible = false;
        }
        else if(e.target == this.menu.mailBtn){
            this.playSound();
            App.ViewManager.open(ViewConst.Mail);
            this.menuBtn.selected = false;
            this.menu.visible = false;
        }
    }
}