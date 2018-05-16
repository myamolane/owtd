class TdSkillSelectPanel extends egret.Sprite {
    private group: eui.Group;
    private static BasePath = "resource/assets/tdGame/skill/";
    private skills = {};
    public constructor(skillNames: Array<string>) {
        super();
        this.group = new eui.Group();
        this.addChild(this.group);
        let hLayout: eui.HorizontalLayout = new eui.HorizontalLayout();
        hLayout.gap = 10;
        hLayout.paddingTop = 10;
        hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        this.group.layout = hLayout;
        skillNames.forEach((skillName) => {
            let skill = new eui.Image();
            skill.source = TdSkillSelectPanel.BasePath + skillName + ".png";
            this.skills[skillName] = skill;
            skill.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSkillImage, this);
        });
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
        console.log(e.target)
    }
}