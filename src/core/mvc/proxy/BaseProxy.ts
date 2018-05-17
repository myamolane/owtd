/**
 * Created by yangsong on 2014/11/22.
 * Proxy基类
 */
class BaseProxy {
    private _controller:BaseController;

    /**
     * 构造函数
     * @param $controller 所属模块
     */
    public constructor($controller:BaseController) {
        this._controller = $controller;
    }

    /**
     * 触发本模块消息
     * @param key 唯一标识
     * @param param 参数
     *
     */
    public applyFunc(key:any, ...param:any[]):any {
        return this._controller.applyFunc.apply(this._controller, arguments);
    }

    /**
     * 触发其他模块消息
     * @param controllerKey 模块标识
     * @param key 唯一标识
     * @param param 所需参数
     *
     */
    public applyControllerFunc(controllerKey:number, key:any, ...param:any[]):any {
        return this._controller.applyControllerFunc.apply(this._controller, arguments);
    }

    /**
     * 发送消息到Http服务端
     * @param type 消息标识 例如: User.login
     * @param paramObj 消息参数 例如: var paramObj:any = {"uName":uName, "uPass":uPass};
     */
    public async post(path:string, paramObj:any = null):Promise<any> {
        return App.Http.request(path, paramObj, 'POST').then((res) =>{
            console.log(res)
            return res;
        })
    }

    public async postWithUrlParam(path:string, paramObj: any = null):Promise<any> {
        return this.post(path  + this.getURLVariables(paramObj).toString(), null)
    }
    /**
     * 将参数转换为URLVariables
     * @param t_type
     * @param t_paramObj
     * @returns {egret.URLVariables}
     */
    private getURLVariables(t_paramObj:any):egret.URLVariables {
        var paramObj:any = {};

        var param:string = JSON.stringify(paramObj);
        var variables:egret.URLVariables = new egret.URLVariables(param);
        return variables;
    }
}
