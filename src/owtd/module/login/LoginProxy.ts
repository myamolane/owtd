/**
 * Created by Administrator on 2014/11/23.
 */
class LoginProxy extends BaseProxy{
    public constructor($controller:BaseController){
        super($controller);
    }

    /**
     * 用户登陆
     * @param userName
     * @param pwd
     */
    public login(param:any, callback):Promise<any>{
        return this.post(InterfaceList.Login(), param);
    }

    public getPlayerInfo(userName: string):Promise<any>{
        return this.get(InterfaceList.getPlayerInfo(userName));
    }
}