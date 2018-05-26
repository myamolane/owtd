class WareHouseProxy extends BaseProxy{
    public constructor($controller:BaseController){
        super($controller);
    }

    public getEquips(playerId: number):Promise<any>{
        return this.get(InterfaceList.equips(playerId));
    }

    public useEquip(equipId:number):Promise<any>{
        return this.post(InterfaceList.useEquip(equipId));
    }
}