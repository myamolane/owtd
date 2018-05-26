class MessageView extends egret.DisplayObjectContainer {
    private _list: eui.List;
    private _messages: eui.ArrayCollection;
    private _parent: BaseEuiLayer;
    private _show: boolean = false;
    public constructor(parent: BaseEuiLayer) {
        super();
        this._parent = parent;
        this._list = new eui.List();
        this._messages = new eui.ArrayCollection();
        let layout: eui.TileLayout = new eui.TileLayout();

        layout.requestedColumnCount = 1;
        layout.verticalGap = 10;
        this._list.layout = layout;
        this._list.itemRenderer = MessageRender;
        this._list.itemRendererSkinName = "resource/skins/MessageSkin.exml";
        this._list.dataProvider = this._messages;

        //    this.addChild(this._list);
        //    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromParent, this);
        //    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
        this._list.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromParent, this);
        this._list.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
    }
    private onAddedToStage(e: egret.Event) {
        this._list.validateSize();
        this._parent.validateSize();
        console.log(this._parent.width);
        console.log("stage width:" + App.StageUtils.getWidth());
        console.log(this._list.width);
        this._list.x = (App.StageUtils.getWidth() - this._list.width) >> 1;
    }
    public addMessage(message: string, type: string = "success") {
        let msg = { message: message, type: "icon_" + type }
        this._messages.addItem(msg);
        setTimeout(function (that, msg){console.log(that);that.removeMessage(msg)}, 4000, this,msg);
        if (!this._show) {
            LayerManager.UI_Tips.addChild(this._list);
            console.log(this._parent.width);
            console.log(this._list.width);

            this._show = true;
        }
    }
    private removeMessage(msg: Object){
        if (!this._messages)
            return;
        let index = this._messages.getItemIndex(msg);
        console.log(index);
        if (index >= 0)
            this._messages.removeItemAt(index);
    }

    private onRemoveFromParent(e: egret.Event) {
        this._messages.removeAll();
        this._show = false;
    }
}