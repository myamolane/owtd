class EnterProxy extends BaseProxy{
    public constructor($controller:BaseController){
        super($controller);
    }
    public updatePlayerInfo(param:any):Promise<any>{
        return this.request(InterfaceList.updatePlayer(param.id), param, 'put');
    }
}