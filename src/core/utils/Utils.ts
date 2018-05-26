class Utils extends BaseClass{
    public getValues(obj: Object){
        let values = [];
        for (let key in obj){
            values.push(obj[key]);
        }
        return values;
    }

    public getKeys(obj: Object){
        let keys = [];
        for (let key in obj){
            keys.push(key);
        }
        return keys;
    }

    public setToken(token: string):void{
        App.GlobalData.token = token;
        localStorage.setItem('token', token);
    }

    public clearToken():void{
        App.GlobalData.token = null;
        localStorage.removeItem('token');
    }

    public getToken():string{
        return App.GlobalData.token?App.GlobalData.token:localStorage.getItem('token');
    }
}