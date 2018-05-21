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


    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI():void{
        super.initUI();
        console.log(this.menuBtn.y);
        this.menu.x = this.menuBtn.x + this.menuBtn.width;
        this.menu.bottom = 0;
        this.menu.addEventListener(egret.TouchEvent.TOUCH_TAP,this.menuClickHandler,this);
        this.menuBtn.addEventListener(egret.Event.CHANGE,this.menuBtnChangeHandler,this);
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
        if(e.target == this.menu.shopBtn){
            this.playSound();
            App.ViewManager.open(ViewConst.Shop);
            this.menuBtn.selected = false;
            this.menu.visible = false;
        }
        else if(e.target == this.menu.packBtn){
            this.playSound();
            App.ViewManager.open(ViewConst.Warehouse);
            this.menuBtn.selected = false;
            this.menu.visible = false;
        }
        else if(e.target == this.menu.settingBtn){
            this.playSound();
            App.ViewManager.open(ViewConst.Mail);
            this.menuBtn.selected = false;
            this.menu.visible = false;
        }
    }
}