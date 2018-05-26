/**
 * Created by egret on 15-1-7.
 */
class WarehouseView extends BasePanelView {
    private _collection: eui.ArrayCollection;
    private _equipList: eui.List;
    public constructor(controller:BaseController, parent:eui.Group) {
        super(controller, parent);
        this.title.text = "背包";
        this.icon = "table_warehouse";
        //this.btn = "icon_sale";
        this.contentGroup.left = 40;
        this.contentGroup.right = this.contentGroup.left;
        this.initList();
        //this.contentGroup.addChild(this._equipList);
        EventManager.addEventListener(TdEvents.PURCHASE_EQUIP_SUCCESS, this.onRecordChanged, this);
    }

    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    public initData():void {
        super.initData();
        if (App.GlobalData.player)
            this.applyFunc(WarehouseConst.GetEquips, App.GlobalData.player.id);
    }

    public open(...param: any[]){
        super.open(param);
        this.contentGroup.addChild(this._equipList);
    }
    public onGetEquipsSuccess(data: Array<any>): void{
        //let arr: eui.ArrayCollection = new eui.ArrayCollection();
        data.forEach((item) => { if (item.number) this._collection.addItem({ ...item.equipment, number: item.number})});
    }

    public onUseEquipSuccess(data):void{
        console.log(this);

        for (let i = 0; i < this._collection.length; i++){
            let item = this._collection.getItemAt(i);
            if (item.id === data.equipment.id){
                this._collection.replaceItemAt({...data.equipment, number:  data.number}, i);
                break;
            }
        }
        App.ViewManager.closeView(this);
        EventManager.dispatchEvent(TdEvents.USE_EQUIP_SUCCESS, "equip_" + data.equipment.name);
    }
    
    private onRecordChanged(e: BaseEvent){
        let data = e.object;
        for (let i = 0; i < this._collection.length; i++){
            let item = this._collection.getItemAt(i);
            if (item.id === data.equipment.id){
                this._collection.replaceItemAt({...data.equipment, number:  data.number}, i);
                break;
            }
        }
    }

    private initList():eui.Scroller{
        this._collection = new eui.ArrayCollection();
        var layout:eui.TileLayout = new eui.TileLayout();
        layout.requestedColumnCount = 2;
        layout.horizontalGap = 40;

        this._equipList = new eui.List();
        this._equipList.layout = layout;
        this._equipList.itemRenderer = SaleItemRenderer;
        this._equipList.itemRendererSkinName = "resource/skins/SaleItemSkin.exml";
        this._equipList.dataProvider = this._collection;

        var scroller:eui.Scroller = new eui.Scroller();
        scroller.percentWidth = scroller.percentHeight = 100;
        scroller.viewport = this._equipList;

        return scroller;
    }

}