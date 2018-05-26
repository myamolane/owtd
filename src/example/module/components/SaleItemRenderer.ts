/**
 * 商品的渲染器
 */
class SaleItemRenderer extends eui.ItemRenderer {
    public titleDisplay:eui.Label;
    public priceDisplay:eui.Label;
    public iconDisplay:eui.Image;
    public priceIconDisplay: eui.Image;
    public infoIconDisplay: eui.Image;
    public infoDisplay: eui.Label;
    public closeIconDisplay: eui.Image;
    public constructor() {
        super();
    }
    private purchase(e:egret.TouchEvent){
        App.ControllerManager.applyFunc(ControllerConst.Shop, ShopConst.PurchaseEquip, this.data.id);
    }
    private useEquip(e:egret.TouchEvent){
        App.ControllerManager.applyFunc(ControllerConst.Warehouse, WarehouseConst.UseEquip, this.data.id);
    }
    public dataChanged() {
        super.dataChanged();
        
        //if (this.titleDisplay) {
            this.titleDisplay.text = this.data.text_name;
        //}
        if (this.priceDisplay) {
            if ((<Object>this.data).hasOwnProperty('number')){
                this.priceDisplay.text = this.data.number;
                this.priceIconDisplay.visible = false;
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.useEquip, this);
            }
            else {
                this.priceDisplay.text = this.data.price;
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.purchase, this);
            }
        }

        if (this.iconDisplay) {
            this.iconDisplay.source = "equip_"+this.data.name;
            //this.iconDisplay.source = "icon_fertilizer02";
        }

        if (this.infoIconDisplay){
            this.infoIconDisplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onViewInfo, this);
        }

        if (this.closeIconDisplay){
            this.closeIconDisplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseInfo, this);
        }

        if (this.infoDisplay){
            this.infoDisplay.text = this.data.intro;
        }
    }

    public onCloseInfo(e: egret.TouchEvent){
       if (this.priceDisplay) {
            this.priceDisplay.visible = true;
        }
        if (this.iconDisplay) {
            this.iconDisplay.visible = true;
        }
        this.infoIconDisplay.visible = true;
        if (!this.data.hasOwnProperty('number'))
            this.priceIconDisplay.visible = true;   
        this.infoDisplay.visible = false;
        this.closeIconDisplay.visible = false;
    }

    public onViewInfo(e: egret.TouchEvent){
        if (this.priceDisplay) {
            this.priceDisplay.visible = false;
        }

        if (this.iconDisplay) {
            this.iconDisplay.visible = false;
        }
        this.infoIconDisplay.visible = false;
        this.priceIconDisplay.visible = false;
        this.priceIconDisplay.visible = false;
        
        this.infoDisplay.visible = true;
        this.closeIconDisplay.visible = true;
        
    }
    // public partAdded(partName:string, instance:any):void {
    //     super.partAdded(partName, instance);
    //     if (!this.data)
    //         return;
    //     if (instance == this.titleDisplay) {
    //         this.titleDisplay.text = this.data.title;
    //     }
    //     if (instance == this.priceDisplay) {
    //         this.priceDisplay.text = this.data.price;
    //     }
    //     if (instance == this.timeDisplay) {
    //         this.timeDisplay.text = this.data.time;
    //     }
    //     if (instance == this.iconDisplay) {
    //         this.iconDisplay.source = this.data.icon;
    //     }
    // }
}