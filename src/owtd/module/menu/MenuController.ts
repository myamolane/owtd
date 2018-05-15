/**
 * Created by yangsong on 15-1-6.
 */
class MenuController extends BaseController{

    private proxy:MenuProxy;
    private homeView:MenuView;

    public constructor(){
        super();

        this.proxy = new MenuProxy(this);

        this.homeView = new MenuView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Menu, this.homeView);
    }
}
