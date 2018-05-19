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
}