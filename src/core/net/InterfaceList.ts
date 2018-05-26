class InterfaceList{
    public static Login(){
        return "/api/v1/auth/login/";
    }
    public static Register(){
        return "/api/v1/accounts/";
    }
    public static Token(){
        return "/api/v1/auth/token"
    }
    public static getAccountInfo(){
        return "/api/v1/accounts/current"
    }
    public static getPlayerInfo(username: string){
        return "/api/v1/players/current/";
    }
    public static getShopList(){
        return "/api/v1/equipments/";
    }
    public static purchaseEquip(equipId:number){
        return "/api/v1/equipments/"+equipId+"/purchase/"
    }
    public static useEquip(equipId:number) {
        return "/api/v1/equipments/"+equipId+"/use/";
    }
    public static equips(playerId: number){
        return "/api/v1/players/"+playerId+"/equip-records/";
    }
    public static updatePlayer(playerId){
        return "/api/v1/players/"+playerId+"/";
    }
}