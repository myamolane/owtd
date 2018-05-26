class ModuleManager extends BaseClass{
    public constructor() {

            super();
            App.StageUtils.getStage().addEventListener(egret.Event.ENTER_FRAME, this.update, this);
            //game.XFKLayer.Ins.Stage.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }

        public stop(){
            this._isRunning = false
        }

        public start(){
            this._isRunning = true
        }
        private _isRunning: boolean = true;


        private _modules = new Object();

        private _types = new Object();

        public generateModuleId():number { return this._total++}
        private _total = 0;

        public getModuleList(): Object {
            return this._modules;
        }

        public stopModules(type: string): void {
            if (this._types.hasOwnProperty(type))
                this._types[type] = false;
        }

        public startModules(type: string): void {
            if (this._types.hasOwnProperty(type))
                this._types[type] = true;
        }

        public getModulesByType(type: string):Object{
            return this._modules[type];
        }

        public registerModule(object:IUpdate): void {
            if (!this._modules[object.type])
                this._modules[object.type] = {}
            if (!this._types.hasOwnProperty(object.type))
                this._types[object.type] = true;
            this._modules[object.type][object.Id.toString()] = object;
        }

        public unRegisterModule(object: IUpdate): void {
            if (!this._modules[object.type])
                return;
            
            delete this._modules[object.type][object.Id.toString()];
        }

        private _lastTime: number = 0;

        private updateModules(modules: Object, advancedTime: number): void{
            if (!modules)
                return;
                
            for (let key in modules){
                (<IUpdate>modules[key]).update(advancedTime);
            }
        }

        private update(e:egret.Event): void{
            if (!this._isRunning) {
                return;
            }
            for (let type in this._types)
            {   
                this.updateModules(this._modules[type], egret.getTimer());
            }
        }

}