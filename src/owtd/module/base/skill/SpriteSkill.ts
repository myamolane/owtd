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
    public constructor(){
        this.sourceEffect = new GameEffect();
        this.targetEffect = new GameEffect();
    }
}