class MovieClipUtil extends BaseClass {
    public generateMc(mcName: string): egret.MovieClip {
        var data = RES.getRes(mcName + "_json");//获取描述
        var texture = RES.getRes(mcName + "_png");//获取大图
        var mcFactory = new egret.MovieClipDataFactory(data, texture);//获取MovieClipData工厂类
        return new egret.MovieClip(mcFactory.generateMovieClipData(mcName));
    }
}