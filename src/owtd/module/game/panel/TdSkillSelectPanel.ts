class TdSkillSelectPanel extends egret.Sprite {
    private group: eui.Group;
    private skills: Object = {};
    public constructor(skillNames: Array<string>) {
        super();
        this.group = new eui.Group();
        this.addChild(this.group);
        let hLayout: eui.HorizontalLayout = new eui.HorizontalLayout();
        hLayout.gap = 10;
        hLayout.paddingTop = 10;
        hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        this.group.layout = hLayout;
        this.group.addEventListener(egret.Event.RESIZE, this.reposition, this);
        skillNames.forEach((skillName) => {
            let resName = "skill_"+skillName;
            let skill = App.DisplayUtils.createEuiImage(resName)
            skill.name = skillName;
            skill.scaleX = 0.3;
            skill.scaleY = 0.3;
            this.skills[skillName] = skill;
            skill.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchSkillImage, this);
        });
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
    }

    public onAddedToStage(e: egret.Event): void{

    }

    public reposition():void{
        this.y = - this.group.height;
    }

    public enableSkill(skillName):void {
        let img = this.skills[skillName];
        if (!img)
            return;
        if (this.group.contains(img))
            return;
        this.group.addChild(img);
        
    }
    public disableSkill(skillName):void {
        let img = this.skills[skillName];
        if (this.group.contains(img))
            this.group.removeChild(img);
    }
    public onTouchSkillImage(e: egret.Event): void{
        (<TdGameTurret>this.parent).useSkill((<eui.Image>e.target).name);
    }
}