class TdGameModel extends BaseModel {
    public mapId: number;
    public monsterNum: number;

    public constructor($controller: BaseController) {
        super($controller)
    }
}