/**
 * Created by yangsong on 2014/11/22.
 * Http请求处理
 */
declare var axios
class Http extends BaseClass {
    public _serverUrl: string;
    /**
     * 构造函数
     */
    public constructor() {
        super();
    }

    private async checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        const errortext = codeMessage[response.status] || response.statusText;
        const error = new Error(errortext);
        error.name = response.status;
        error.message = errortext;
        throw error;
    }

    private async checkResponse(response) {
        let body = response.data;
        if (body.status && body.status != 'ok') {

        }
        
        return body.data;
    }

    private async handleError(e: any) {
        let status
        let message
        if (e.response){
            status = parseInt(e.response?e.response.status:e.name);
        }
        else{
            status = e.name;
        }
        message = codeMessage[status]?codeMessage[status]:e.message;
        console.log(status);
        console.log(message);
        App.MessageCenter.ShowMessage(message, MessageType.ERROR)
        if (status === 401) {
            console.log(401);
            App.Utils.clearToken();
        }
        else if (status === 403) {
            console.log(403);
        }
        else if (status <= 504 && status >= 500) {
            
        }
        else if (status >= 404 && status < 422) {
            
        }
        
        return Promise.reject(message);
    }

    public async request(url: string, data: Object = null, method: string = 'GET'): Promise<any> {
        let headers = {
            'Content-Type': 'application/json'
        };
        let token = App.GlobalData.token?App.GlobalData.token:localStorage.getItem('token');
        
        if (token){
            headers['Authorization'] = "JWT " + token;
        }
        
        console.log(headers);
        let result = <Promise<any>>axios({
            method: method,
            url: this._serverUrl + url,
            data: data,
            headers: headers
        }); 
        return result
            .then(this.checkStatus)
            // .then(response => {
            //     if (method === 'DELETE' || response.status === 204) {
            //         return response.text();
            //     }
            //     return response.json();
            // })
            .then(this.checkResponse)
            // .then((res) => {
            //     console.log(res)
            //     return res.data
            // })
            .catch((e) => {return this.handleError(e);});
    }
    /**
     * 初始化服务器地址
     * @param serverUrl服务器链接地址
     */
    public initServer(serverUrl: string): void {
        this._serverUrl = serverUrl;
    }
}
