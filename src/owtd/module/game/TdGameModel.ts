class TdGameModel extends BaseModel {
    public mapId: any;
    public gold: number = 100;
    public constructor($controller: BaseController) {
        super($controller)
    }
}