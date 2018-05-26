class SettingController extends BaseController {

    private settingView:SettingView;
    public constructor() {
        super();

        this.settingView = new SettingView(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Setting, this.settingView);
    }
}