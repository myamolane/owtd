/**
 * Created by Administrator on 2014/11/23.
 */
class LoginController extends BaseController{
    //本模块的数据存储
    private loginModel:LoginModel;
    //本模块的所有UI
    private loginView:LoginView;
    //本模块的Proxy
    private loginProxy:LoginProxy;

    public constructor(){
        super();

        //初始化Model
        this.loginModel = new LoginModel(this);

        //初始化UI
        this.loginView = new LoginView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Login, this.loginView);

        //初始化Proxy
        this.loginProxy = new LoginProxy(this);

        //注册模块间、模块内部事件监听

        //注册C2S消息
        this.registerFunc(LoginConst.Login, this.onLogin, this);
        this.registerFunc(LoginConst.GetPlayerInfo, this.onGetPlayerInfo, this);
    }

    private onGetPlayerInfo(username: string){
        return this.loginProxy.getPlayerInfo(username).then((res) => {
            App.GlobalData.player = res;
            App.GlobalData.level = res.level;
            return res;
        });
    }
    /**
     * 请求登陆处理
     * @param userName
     * @param pwd
     */
    private onLogin(param:Object):void{
        this.loginProxy.login(param, this.loginSuccess).then((res)=>{
            this.loginSuccess(res);
        })
    }

    /**
     * 登陆成功处理
     */
    private loginSuccess(res:any):void{
        //保存数据
        App.GlobalData.token = res.token;
        localStorage.setItem('token', res.token);
        App.GlobalData.username = res.username;
        //本模块UI处理
        this.loginView.loginSuccess(res);
        //UI跳转
        //App.ViewManager.close(ViewConst.Login);
        //var model:BaseModel = this.getControllerModel(ControllerConst.Login);
    }
}