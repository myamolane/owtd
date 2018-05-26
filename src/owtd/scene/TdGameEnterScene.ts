/**
 * Created by yangsong on 2017/10/11.
 */
class TdGameEnterScene extends BaseScene{
    /**
     * 构造函数
     */
    public constructor(){
        super();
    }

    /**
     * 进入Scene调用
     */
    public onEnter(...param:any[]):void{
        super.onEnter();

        if (!App.GlobalData.level){
            App.GlobalData.level = localStorage.getItem('level');
            if (!App.GlobalData.level)
                App.GlobalData.level = 1;
        }
        //参数



        //添加该Scene使用的Layer
        this.addLayer(LayerManager.UI_Main);
        this.addLayer(LayerManager.UI_Popup);
        this.addLayer(LayerManager.UI_Message);
        this.addLayer(LayerManager.UI_Tips);

        //运行RpgGame
        //App.ControllerManager.applyFunc(ControllerConst.Enter, TdGameConst.GameInit, mapId);

        //开启UI部分
        //App.ViewManager.open(ViewConst.RpgGame);
        App.ViewManager.open(ViewConst.Enter);
        //App.ViewManager.open(ViewConst.TdGame);

        //播放背景音乐
        App.SoundManager.playBg("sound_bg");
    }

    /**
     * 退出Scene调用
     */
    public onExit():void{
        super.onExit();

        //关闭ComponentSystem
        ComponentSystem.stop();
    }
}
