class EnterController extends BaseController{

    private proxy:EnterProxy;
    private enterView:EnterView;
    
    public constructor(){
        super();

        this.proxy = new EnterProxy(this);

        this.enterView = new EnterView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Enter, this.enterView);
    }
}
