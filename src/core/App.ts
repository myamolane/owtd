/**
 * Created by yangsong on 2014/11/22.
 */
class App {
    /**
     * 请求服务器使用的用户标识
     * @type {string}
     */
    public static ProxyUserFlag: string = "";
    /**
     * 全局配置数据
     * @type {null}
     */
    public static GlobalData: any = null;
    /**
     * ProtoFile
     * @type {null}
     */
    public static ProtoFile: any = null;
    /**
     * ProtoConfig
     * @type {null}
     */
    public static ProtoConfig: any = null;

    /**
     * Http请求
     * @type {Http}
     */
    public static get Http(): Http {
        return Http.getInstance();
    }

    public static get MessageCenter(): MessageCenter {
        return MessageCenter.getInstance();
    }
    /**
     * 模块管理类
     * @type {ControllerManager}
     */
    public static get ControllerManager(): ControllerManager {
        return ControllerManager.getInstance();
    }

    /**
     * View管理类
     * @type {ViewManager}
     */
    public static get ViewManager(): ViewManager {
        return ViewManager.getInstance();
    }

    /**
     * 场景管理类
     * @type {SceneManager}
     */
    public static get SceneManager(): SceneManager {
        return SceneManager.getInstance();
    }

    /**
     * 调试工具
     * @type {DebugUtils}
     */
    public static get DebugUtils(): DebugUtils {
        return DebugUtils.getInstance();
    }

    /**
     * 统一的计时器和帧刷管理类
     * @type {TimerManager}
     */
    public static get TimerManager(): TimerManager {
        return TimerManager.getInstance();
    }

    /**
     * 日期工具类
     * @type {DateUtils}
     */
    public static get DateUtils(): DateUtils {
        return DateUtils.getInstance();
    }

    /**
     * 数学计算工具类
     * @type {MathUtils}
     */
    public static get MathUtils(): MathUtils {
        return MathUtils.getInstance();
    }

    /**
     * 随机数工具类
     * @type {RandomUtils}
     */
    public static get RandomUtils(): RandomUtils {
        return RandomUtils.getInstance();
    }

    /**
     * 显示对象工具类
     * @type {DisplayUtils}
     */
    public static get DisplayUtils(): DisplayUtils {
        return DisplayUtils.getInstance();
    }

    /*
     * 图片合成数字工具类
     * */
    public static get BitmapNumber(): BitmapNumber {
        return BitmapNumber.getInstance();
    }


    /**
     * Stage操作相关工具类
     */
    public static get StageUtils(): StageUtils {
        return StageUtils.getInstance();
    }

    /**
     * Effect工具类
     */
    public static get EffectUtils(): EffectUtils {
        return EffectUtils.getInstance();
    }

    /**
     * 字符串工具类
     */
    public static get StringUtils(): StringUtils {
        return StringUtils.getInstance();
    }

    /**
     * 通过工具类
     */
    public static get CommonUtils(): CommonUtils {
        return CommonUtils.getInstance();
    }

    /**
     * 音乐管理类
     */
    public static get SoundManager(): SoundManager {
        return SoundManager.getInstance();
    }

    /**
     * 设备工具类
     */
    public static get DeviceUtils(): DeviceUtils {
        return DeviceUtils.getInstance();
    }

    /**
     * 引擎扩展类
     */
    public static get EgretExpandUtils(): EgretExpandUtils {
        return EgretExpandUtils.getInstance();
    }

    /**
     * 键盘操作工具类
     */
    public static get KeyboardUtils(): KeyboardUtils {
        return KeyboardUtils.getInstance();
    }

    /**
     * 摇杆操作工具类
     */
    public static get RockerUtils(): RockerUtils {
        return RockerUtils.getInstance();
    }

    /**
     * 震动类
     */
    public static get ShockUtils(): ShockUtils {
        return ShockUtils.getInstance();
    }

    /**
     * 资源加载工具类
     */
    public static get ResourceUtils(): ResourceUtils {
        return ResourceUtils.getInstance();
    }

    /**
     * RenderTextureManager
     */
    public static get RenderTextureManager(): RenderTextureManager {
        return RenderTextureManager.getInstance();
    }

    /**
     * TextFlow
     */
    public static get TextFlowMaker(): TextFlowMaker {
        return TextFlowMaker.getInstance();
    }

    /**
     * 分帧处理类
     * @returns {any}
     * @constructor
     */
    public static get DelayOptManager(): DelayOptManager {
        return DelayOptManager.getInstance();
    }

    /**
     * 数组工具类
     * @returns {any}
     * @constructor
     */
    public static get ArrayUtils(): ArrayUtils {
        return ArrayUtils.getInstance();
    }

    /**
     * 通用Loading动画
     * @returns {any}
     * @constructor
     */
    public static get EasyLoading(): EasyLoading {
        return EasyLoading.getInstance();
    }

    /**
     * 单一资源通过版本号加载管理类
     */
    public static get ResVersionManager(): ResVersionManager {
        return ResVersionManager.getInstance();
    }

    public static get ModuleManager(): ModuleManager {
        return ModuleManager.getInstance();
    }
    
    public static get MovieClipUtil(): MovieClipUtil {
        return MovieClipUtil.getInstance();
    }

    public static get Utils(): Utils {
        return Utils.getInstance();
    }
    /**
     * 初始化函数
     * @constructor
     */
    public static Init(): void {
        //全局配置数据
        App.GlobalData = RES.getRes("global");
        //开启调试
        App.DebugUtils.isOpen(App.GlobalData.IsDebug);
        App.DebugUtils.setThreshold(5);
        //扩展功能初始化
        App.EgretExpandUtils.init();
        //实例化Http请求
        App.Http.initServer(App.GlobalData.HttpSerever);
        //实例化ProtoBuf和Socket请求
        App.ProtoFile = dcodeIO.ProtoBuf.loadProto(RES.getRes(App.GlobalData.ProtoFile));
        App.ProtoConfig = RES.getRes(App.GlobalData.ProtoConfig);
    }
}
