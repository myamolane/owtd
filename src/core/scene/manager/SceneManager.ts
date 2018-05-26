/**
 * Created by yangsong on 2014/11/28.
 * 场景管理类
 */
class SceneManager extends BaseClass {
    private _scenes:any;
    private _currScene:string;
    private _curParam: Array<any>;
    private _history: Array<string>;
    private _paramHistory: Array<Array<any>>;
    /**
     * 构造函数
     */
    public constructor() {
        super();
        this._scenes = {};
        this._history = [];
        this._paramHistory = [];
    }

    /**
     * 清空处理
     */
    public clear():void {
        var nowScene:BaseScene = this._scenes[this._currScene];
        if(nowScene){
            nowScene.onExit();
            this._currScene = undefined;
            this._curParam = [];
            this._history = [];
            this._paramHistory = [];
        }
        this._scenes = {};
    }

    /**
     * 注册Scene
     * @param key Scene唯一标识
     * @param scene Scene对象
     */
    public register(key:string, scene:BaseScene):void {
        this._scenes[key] = scene;
    }

    /**
     * 切换场景
     * @param key 场景唯一标识
     */
    public runScene(key:string, ...param:any[]):void {
        
        var nowScene:BaseScene = this._scenes[key];
        if (nowScene == null) {
            Log.trace("场景" + key + "不存在");
            return;
        }

        var oldScene:BaseScene = this._scenes[this._currScene];
        if (oldScene) {
            this._history.push(this._currScene);
            this._paramHistory.push(this._curParam);
            oldScene.onExit();
        }
        console.log('run scene: '+ key);
        console.log('exit scene: '+ this._currScene);
        nowScene.onEnter.apply(nowScene, param);
        this._currScene = key;
        this._curParam = param;
    }

    public backScene():void{
        if (this._history.length == 0){
            Log.trace("不存在上一个场景");
            return;
        }
        let key = this._history.pop();
        let param = this._paramHistory.pop();
        let lastScene: BaseScene = this._scenes[key];
        if (lastScene == null){
            Log.trace("场景" + key + "不存在");
            return;
        }
        let curScene: BaseScene = this._scenes[this._currScene];
        curScene.onExit();
        lastScene.onEnter.apply(lastScene, param);
        this._currScene = key;
        this._curParam = param;
    }

    /**
     * 获取当前Scene
     * @returns {string}
     */
    public getCurrScene():string {
        return this._currScene;
    }
}
