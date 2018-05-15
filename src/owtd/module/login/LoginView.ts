/**
 * Created by Administrator on 2014/11/23.
 */
class LoginView extends BasePanelView {
    public idTextInput:eui.TextInput;
    public pwdTextInput:eui.TextInput;
    private idLabel: eui.Label;
    private pwdLabel: eui.Label;
    public registerBtn: eui.Label;
    public skipBtn: eui.Label;
    private logo_twink_data:string = "logo_twink_json";
    private logo_twink_txtr:string = "logo_twink_png";
    public loginBtn: egret.MovieClip;
    public constructor($controller:BaseController, $parent:eui.Group){
        super($controller, $parent);
    }

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI():void{
        super.initUI();
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( RES.getRes(this.logo_twink_data), RES.getRes(this.logo_twink_txtr));
        var mcData:egret.MovieClipData = mcFactory.generateMovieClipData("logo_twink");
        this.loginBtn = new egret.MovieClip(mcData);
        this.loginBtn.x = 230;
        this.loginBtn.y = 300;
        this.loginBtn.touchEnabled = true;
        this.loginBtn.gotoAndPlay(0, -1);
        this.contentGroup.addChild(this.loginBtn);

        this.idTextInput = new eui.TextInput();
        this.idTextInput.skinName = "resource/eui_skins/TextInputSkin.exml"
        this.idTextInput.text = "myamo";
        this.idTextInput.left = 180;
        this.idTextInput.top = 100;
        this.contentGroup.addChild(this.idTextInput);
        
        this.pwdTextInput = new eui.TextInput();
        this.pwdTextInput.skinName = "resource/eui_skins/TextInputSkin.exml"
        this.pwdTextInput.text = "cjl720717";
        this.pwdTextInput.left = this.idTextInput.left;
        this.pwdTextInput.top = this.idTextInput.top + 70;
        this.pwdTextInput.displayAsPassword = true;
        this.contentGroup.addChild(this.pwdTextInput);
        
        this.idLabel = new eui.Label();
        this.idLabel.text = "特工Id:";
        this.idLabel.left = this.idTextInput.left - this.idLabel.width- 20;
        this.idLabel.top = this.idTextInput.top;
        this.contentGroup.addChild(this.idLabel);

        this.pwdLabel = new eui.Label();
        this.pwdLabel.text = "口令:";
        this.pwdLabel.left = this.pwdTextInput.left - this.pwdLabel.width - 20;
        this.pwdLabel.top = this.pwdTextInput.top;
        this.contentGroup.addChild(this.pwdLabel);

        this.skipBtn = new eui.Label();
        this.skipBtn.text = "跳过";
        this.skipBtn.left = 20;
        this.skipBtn.bottom = 20;
        this.contentGroup.addChild(this.skipBtn);
        
        this.registerBtn = new eui.Label();
        this.registerBtn.text = "注册";
        this.registerBtn.right = this.skipBtn.left;
        this.registerBtn.bottom = this.skipBtn.left;
        this.contentGroup.addChild(this.registerBtn);

        this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogin, this);
        
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRegister, this);
        this.skipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkip, this);
    }
    public onSkip(): void {
        
        App.SceneManager.runScene(SceneConsts.TdGame, [1])
    }
    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    public initData():void{
        super.initData();
    }

    /**
     * 面板开启执行函数，用于子类继承
     * @param param 参数
     */
    public open(...param:any[]):void{
        super.open(param);
    }

    /**
     * 面板关闭执行函数，用于子类继承
     * @param param 参数
     */
    public close(...param:any[]):void{
        super.close(param);
    }

    private playSound():void{
        App.SoundManager.playEffect("sound_dianji");
    }
    private onRegister():void{
        this.playSound();
        //App.ViewManager.open(ViewConst.Register)
        window.open('http://localhost:8000/user/register')
    }
    /**
     * 请求登陆处理
     * @param userName
     * @param pwd
     */
    private onLogin():void{
        
        //进行基础检测
        if(this.idTextInput.text == null || this.idTextInput.text.length == 0){
            return;
        }
        if(this.pwdTextInput.text == null || this.pwdTextInput.text.length == 0){
            return;
        }
        var param = {
            "username": this.idTextInput.text,
            "password": this.pwdTextInput.text
        }
        alert('start login')
        this.applyFunc(LoginConst.Login, param);
    }

    /**
     * 登陆成功处理
     */
    public loginSuccess(res):void{
        //TODO 登陆成功处理
        //this.getToken()
    }
    
    private getToken():void{
        var param = {
            "username": this.idTextInput.text,
            "password": this.pwdTextInput.text
        }
        this.applyFunc(LoginConst.Token, param);
    }

    public getTokenSuccess(res):void{
    }
}