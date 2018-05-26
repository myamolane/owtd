/**
 * Created by egret on 15-1-7.
 */
class ShopView extends BasePanelView {
    public constructor(controller:BaseController, parent:eui.Group) {
        super(controller, parent);
        this.title.text = "道具商店";
        this.icon = "table_shop";
        this.contentGroup.left = 40;
        this.contentGroup.right = 40;
    }

    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    public initData():void {
        super.initData();
        this.applyFunc(ShopConst.GetShopList);
    }

    public onGetShopListSuccess(data: Array<any>){
        let arr: eui.ArrayCollection = new eui.ArrayCollection();
        data.forEach((item) => arr.addItem(item));
        this.contentGroup.addChild(this.createList(arr));
    }

    public onPurchaseSuccess(){
        console.log('purchase success');
    }

    private createList(dp:eui.ArrayCollection):eui.Scroller{
        var layout:eui.TileLayout = new eui.TileLayout();
        layout.requestedColumnCount = 2;
        layout.horizontalGap = 40;
        var taskList:eui.List = new eui.List();
        taskList.layout = layout;
        taskList.itemRenderer = SaleItemRenderer;
        taskList.itemRendererSkinName = "resource/skins/SaleItemSkin.exml";
        taskList.dataProvider = dp;
        
        var scroller:eui.Scroller = new eui.Scroller();
        scroller.percentWidth = scroller.percentHeight = 100;
        scroller.viewport = taskList;

        return scroller;
    }
}