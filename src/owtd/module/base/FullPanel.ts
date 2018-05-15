class FullPanel extends egret.Sprite implements ILoad{

    private layer: egret.DisplayObjectContainer;
    public isOpen: boolean = false;

    private backBG: egret.Bitmap;

    public constructor() {
        super();
    }

    private backGround(): void {
        if (this.backBG) { return; }
        this.backBG = new egret.Bitmap();
        this.backBG.name = "panelbackground";
        this.backBG.texture = RES.getRes("panelbackground");
        this.backBG.alpha = 0.6;
        this.backBG.width = App.StageUtils.getWidth();
        this.backBG.height = App.StageUtils.getHeight();
        
        this.layer.addChild(this.backBG)
    }


    public show(type: number = 0): void {

        this.isOpen = true;
        //灰色遮罩显示与否
        if (type == 0) {
            this.backGround();
        }

        this.layer.addChild(this);
    }

    public load(parent: egret.DisplayObjectContainer){
        this.layer = parent
    }
    public release(){
        this.layer = null;
    }
    public close(): void {
        this.isOpen = false;

        if (this.backBG && this.backBG.parent) {
            this.layer.removeChild(this.backBG);
            this.backBG = null;
        }

        if (this.parent) {
            this.layer.removeChild(this);
        }
    }

    public setWindowCenter(): void {
        this.x = App.StageUtils.getWidth() - this.width >> 1;
        this.y = App.StageUtils.getHeight() - this.height >> 1;
    }

    public setPoint(point: egret.Point): void {

        this.x = point.x - (this.width >> 1);
        this.y = point.y - (this.height >> 1);
    }


}