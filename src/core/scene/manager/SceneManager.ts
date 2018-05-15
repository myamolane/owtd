/**
 * Created by yangsong on 2014/11/28.
 * 场景管理类
 */
class SceneManager extends BaseClass {
    private _scenes:any;
    private _currScene:string;

    /**
     * 构造函数
     */
    public constructor() {
        super();
        this._scenes = {};
    }

    /**
     * 清空处理
     */
    public clear():void {
        var nowScene:BaseScene = this._scenes[this._currScene];
        if(nowScene){
            nowScene.onExit();
            this._currScene = undefined;
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
            console.log('exit scene:'+this._currScene)
            oldScene.onExit();
        }
        console.log('enter scene:'+nowScene)
        nowScene.onEnter.apply(nowScene, param);
        this._currScene = key;
    }

    /**
     * 获取当前Scene
     * @returns {string}
     */
    public getCurrScene():string {
        return this._currScene;
    }
}
