/**
 * Created by egret on 15-1-7.
 */
class WarehouseController extends BaseController {
    private warehouseView:WarehouseView;
    private warehouseProxy: WareHouseProxy;
    public constructor() {
        super();
        this.warehouseView = new WarehouseView(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Warehouse, this.warehouseView);
        this.warehouseProxy = new WareHouseProxy(this);
        this.registerFunc(WarehouseConst.GetEquips, this.onGetEquips,this)
        this.registerFunc(WarehouseConst.UseEquip, this.onUseEquip, this);
    }
    public onGetEquips(playerId: number){
        return this.warehouseProxy.getEquips(playerId).then((data) => {
            this.warehouseView.onGetEquipsSuccess(data);
        });
    }
    public onUseEquip(equipId: number){
        return this.warehouseProxy.useEquip(equipId)
            .then((res)=>{console.log(this);this.warehouseView.onUseEquipSuccess(res)});
    }
}