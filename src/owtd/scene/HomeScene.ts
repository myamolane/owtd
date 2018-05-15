/**
 * Created by egret on 15-1-7.
 */
class HomeScene extends BaseScene{
    /**
     * 构造函数
     */
    public constructor(){
        super();
    }

    /**
     * 进入Scene调用
     */
    public onEnter():void{
        super.onEnter();

        //添加该Scene使用的层级
        this.addLayer(LayerManager.UI_Main);

        //开启UI部分
        App.ViewManager.open(ViewConst.Home);

        //播放背景音乐
        App.SoundManager.playBg("sound_bg");
    }

    /**
     * 退出Scene调用
     */
    public onExit():void{
        super.onExit();
        
    }
}