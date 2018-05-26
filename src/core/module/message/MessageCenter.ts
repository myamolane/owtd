class MessageCenter extends BaseClass{
    private view: MessageView;
    public constructor(layer: BaseEuiLayer){
        super();
    }
    public ShowMessage(message: string, type: string = "success"){
        this.view.addMessage(message, type);
    }
    public Init(layer: BaseEuiLayer){
        this.view = new MessageView(layer);
    }
}