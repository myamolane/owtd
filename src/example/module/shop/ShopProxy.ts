class ShopProxy extends BaseProxy{
    public constructor($controller:BaseController){
        super($controller);
    }

    public purchaseEquip(equipId: number):Promise<any>{
        return this.post(InterfaceList.purchaseEquip(equipId));
    }

    public getShopList():Promise<any>{
        return this.get(InterfaceList.getShopList());
    }
}