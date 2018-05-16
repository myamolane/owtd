class SpriteSkill{
    public sourceEffect: GameEffect;
    public targetEffect: GameEffect;
    public multiple: boolean = false;
    public targetType;
    public name: string;
    public energy: number;
    public constructor(){
        this.sourceEffect = new GameEffect();
        this.targetEffect = new GameEffect();
    }
}