/**
 * Created by egret on 15-1-7.
 */
class ShopController extends BaseController {

    private shopView: ShopView;
    private shopProxy: ShopProxy;
    public constructor() {
        super();

        this.shopView = new ShopView(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Shop, this.shopView);
        this.shopProxy = new ShopProxy(this);
        this.registerFunc(ShopConst.GetShopList, this.onGetShopList, this);
        this.registerFunc(ShopConst.PurchaseEquip, this.onPurchase, this);
    }

    private onGetShopList() {
        this.shopProxy.getShopList().then((data) => {
            this.shopView.onGetShopListSuccess(data);
        })
    }

    private onPurchase(equipId: number) {
        this.shopProxy.purchaseEquip(equipId).then((res) => {
            EventManager.dispatchEvent(TdEvents.PURCHASE_EQUIP_SUCCESS, res);
            this.shopView.onPurchaseSuccess();
        })
    }
}