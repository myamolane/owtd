/**
 * Created by yangsong on 2014/11/22.
 * Http请求处理
 */
declare var axios
class Http extends BaseClass {
    public _serverUrl:string;
    /**
     * 构造函数
     */
    public constructor() {
        super();
    }

    public async doRequest(url:string,data:Object=null, method=egret.HttpMethod.GET, dataFormat=egret.URLLoaderDataFormat.TEXT):Promise<any>{
        let req: egret.HttpRequest = new egret.HttpRequest();

        if (App.GlobalData.token)
            req.setRequestHeader("Authorization", "JWT "+App.GlobalData.token);
        req.open(this._serverUrl+url, method)
        req.responseType = dataFormat
        //req.setRequestHeader("Access-Contro-Allow-Headers", "*");
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        req.send(JSON.stringify(data))
        var promise = new Promise<any>((resolve,  reject) => {
            req.addEventListener(egret.Event.COMPLETE, (event) =>(
                resolve(JSON.parse(req.response))
            ), this)
            req.addEventListener(egret.IOErrorEvent.IO_ERROR, (event) =>(
                reject(req.response)
            ), this)            
        })
        return promise;
    }
    public async request(url: string, data:Object=null, method:string = 'GET'):Promise<any>{
        
        return axios({
            method: method,
            url: this._serverUrl+url,
            data: data,
            headers: {
                'Content-Type':'application/json',
            }
        }).then((res) => {
            console.log(res)
            return res.data
        })
    }
    /**
     * 初始化服务器地址
     * @param serverUrl服务器链接地址
     */
    public initServer(serverUrl:string):void {
        this._serverUrl = serverUrl;
    }
}
