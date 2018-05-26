class TdGameController extends BaseController {
    private gameView: TdGameView;
    private gameModel: TdGameModel;
    private proxy: GameProxy;
    public constructor() {
        super();
        this.gameView = new TdGameView(this, LayerManager.Game_Main);
        App.ViewManager.register(ViewConst.TdGame, this.gameView)
        this.proxy = new GameProxy(this);
        this.gameModel = new TdGameModel(this)

        this.registerFunc(TdGameConst.GameInit, this.gameInit, this)
        this.registerFunc(TdGameConst.ShowSelectPanel, this.showSelectPanel, this)
        this.registerFunc(TdGameConst.SetSelectPanelPoint, this.setSelectPanelPoint, this)
        this.registerFunc(TdGameConst.GetGold, this.getGold, this);
        this.registerFunc(TdGameConst.SetGold, this.setGold, this);
        this.registerFunc(TdGameConst.UpdatePlayer, this.onUpdatePlayerInfo, this);
        this.registerFunc(TdGameConst.GameWin, this.onGameWin, this);
    }
    private onUpdatePlayerInfo(param: any){
        this.proxy.updatePlayerInfo(param);
    }
    private gameInit(mapId: number) {
        this.gameModel.mapId = mapId;
        this.gameModel.gold = 1;
        App.ViewManager.open(ViewConst.TdGame, this.gameModel);
    }
    private showSelectPanel(callfun, callobj) {
        this.gameView.showPanel(callfun, callobj)
    }
    private setSelectPanelPoint(point: egret.Point) {
        this.gameView.setPanelPoint(point)
    }
    private setGold(gold: number) {
        this.gameModel.gold = gold;
        EventManager.dispatchEvent(TdEvents.GAME_GOLD_CHANGED, gold);
    }
    private getGold() {
        return this.gameModel.gold;
    }
    private onGameWin() {
        if (parseInt(this.gameModel.mapId) === App.GlobalData.level) {
            App.GlobalData.level++;
            console.log(App.GlobalData.level);
            localStorage.setItem('level', App.GlobalData.level);
            if (App.GlobalData.player) {
                App.GlobalData.player.gold += this.gameModel.gold;
                App.GlobalData.player.level = App.GlobalData.level;
                this.applyFunc(TdGameConst.UpdatePlayer, App.GlobalData.player);
            }
        }
    }
}