class MessageRender extends eui.ItemRenderer{
    public msgDisplay: eui.Label;
    public msgIconDisplay: eui.Image;
    public constructor() {
        super();
    }
    public dataChanged() {
        super.dataChanged();
        if (this.msgDisplay) {
            this.msgDisplay.text = this.data.message;
        }
        if (this.msgIconDisplay) {
            this.msgIconDisplay.source = this.data.type;
        }
    }
}