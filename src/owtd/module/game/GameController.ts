class TdGameController extends BaseController {
    private gameView: TdGameView;
    private gameModel: TdGameModel;
    public constructor() {
        super();
        this.gameView = new TdGameView(this, LayerManager.Game_Main);
        App.ViewManager.register(ViewConst.TdGame, this.gameView)

        this.gameModel = new TdGameModel(this)

        this.registerFunc(TdGameConst.GameInit, this.gameInit, this)
        this.registerFunc(TdGameConst.ShowSelectPanel, this.showSelectPanel, this)
        this.registerFunc(TdGameConst.SetSelectPanelPoint, this.setSelectPanelPoint, this)
    }
    private gameInit(mapId: number) {
        this.gameModel.mapId = mapId;
        this.gameModel.monsterNum = 200;
        App.ViewManager.open(ViewConst.TdGame, this.gameModel);
    }
    private showSelectPanel(callfun, callobj){
        this.gameView.showPanel(callfun, callobj)
    }
    private setSelectPanelPoint(point: egret.Point){
        this.gameView.setPanelPoint(point)
    }
}