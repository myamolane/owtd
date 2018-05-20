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

        //参数
        let mapId:number
        if (param && param.length > 0)
            mapId = param[0];
        else
            mapId = 1; 


        //添加该Scene使用的Layer
        // LayerManager.Game_Main.scaleX = LayerManager.Game_Main.scaleY = 1.5;
        this.addLayerAt(LayerManager.Game_Main, 0);
        this.addLayer(LayerManager.UI_Main);
        this.addLayer(LayerManager.UI_Popup);
        this.addLayer(LayerManager.UI_Message);
        this.addLayer(LayerManager.UI_Tips);

        //运行RpgGame
        App.ControllerManager.applyFunc(ControllerConst.TdGame, TdGameConst.GameInit, mapId);

        //开启UI部分
        //App.ViewManager.open(ViewConst.RpgGame);
        App.ViewManager.open(ViewConst.Menu);
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
