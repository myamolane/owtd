class SpriteSkill{
    public sourceEffect: GameEffect;
    public targetEffect: GameEffect;
    public multiple: boolean = false;
    public targetType: string;
    public releaseType: string;
    public name: string;
    public energy: number;
    public width: number;
    public delay: number;
    public sound: string;
    public mc: string;
    //public startBy: string;
    public static Skills: Object;
    public constructor(){
        this.sourceEffect = new GameEffect();
        this.targetEffect = new GameEffect();
    }
    public parse(data: any){
        if (!data)
            return;
        if (data.sourceEffect){
            this.sourceEffect.effectTime = data.sourceEffect.effectTime;
            this.sourceEffect.mc = data.sourceEffect.mc;
            this.sourceEffect.mcTime = data.sourceEffect.mcTime;
            data.sourceEffect.effects.forEach((effect) => {
                let item = new PropertyEffect();
                item.property = effect.property;
                item.value = effect.value;
                this.sourceEffect.effects.push(item);
            });
        }
        if (data.targetEffect){
            this.targetEffect.effectTime = data.targetEffect.effectTime;
            this.targetEffect.mc = data.targetEffect.mc;
            this.targetEffect.mcTime = data.targetEffect.mcTime;
            data.targetEffect.effects.forEach((effect) => {
                let item = new PropertyEffect();
                item.property = effect.property;
                item.value = effect.value;
                this.targetEffect.effects.push(item);
            });
        }
        this.name = data.name;
        this.multiple = data.multiple;
        this.releaseType = data.releaseType;
        this.targetType = data.targetType;
        this.energy = data.energy;
        this.width = data.width;
        this.delay = data.delay;
        this.sound = data.name+"_sound";
        this.mc = data.mc;
        //this.startBy = data.startBy;
    }
}