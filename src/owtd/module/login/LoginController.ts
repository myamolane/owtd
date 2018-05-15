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
        this.registerFunc(LoginConst.Token, this.onGetToken, this);
    }

    /**
     * 请求登陆处理
     * @param userName
     * @param pwd
     */
    private onLogin(param:Object):void{
        this.loginProxy.login(param, this.loginSuccess).then((res)=>{
            this.loginSuccess(res);
        });
    }

    private onGetToken(param:Object):void{
        this.loginProxy.token(param).then(res => {
            this.getTokenSuccess(res)
        });
    }

    private getTokenSuccess(res:any):void{
        App.GlobalData.token = res.token
        this.loginView.getTokenSuccess(res)
    }

    /**
     * 登陆成功处理
     */
    private loginSuccess(res:any):void{
        //保存数据
        App.GlobalData.token = res.data.token
        localStorage.setItem('token', App.GlobalData.token)
        //本模块UI处理
        this.loginView.loginSuccess(res);
        //UI跳转
        //App.ViewManager.close(ViewConst.Login);

        //var model:BaseModel = this.getControllerModel(ControllerConst.Login);
    }
}