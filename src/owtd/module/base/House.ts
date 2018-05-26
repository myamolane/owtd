class House extends egret.Sprite implements ILoad{

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        private onAddToStage(event: egret.Event) {
            this.init();
            this.draw();
        }

        private _hp: number = 10;

        public setHp(value: number): void {
            this._hp = value;
            this.draw();
        }
        private set hp(value: number) {
            if (value == this.hp) {
                return;
            }
            this.setHp(value);
            this.hpText.text = value.toString();
            if (this._hp <= 0) {
                EventManager.dispatchEvent(TdEvents.HOUSE_DEAD, this);
            }
        }
        private get hp(): number {
            return this._hp;
        }

        public load(parent: egret.DisplayObjectContainer): void {
            parent.addChild(this);
            EventManager.addEventListener(TdEvents.MONSTER_ARRIVED, this.onMonsterArrived, this);
        }

        public release(): void {
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            EventManager.removeEventListener(TdEvents.MONSTER_ARRIVED, this.onMonsterArrived, this);
        }

        private hpText: egret.BitmapText;

        private init(): void {

            var data = RES.getRes("num_fnt");

            this.hpText = new egret.BitmapText();
            this.hpText.font = data;
            this.hpText.text = this.hp.toString();
            this.addChild(this.hpText);

            var shap: egret.Shape = new egret.Shape();
            shap.graphics.beginFill(0xffff60, 1);
            shap.graphics.drawRect(0, 0, 8, 8);
            shap.graphics.endFill();
            //this.addChild(shap);//添加到显示列表
        }

        private draw(): void {
            if (this.parent == null) {
                return;
            }
            this.hpText.x = -this.hpText.width ;
            this.hpText.y = -this.hpText.height ;
        }

        //处理怪物走到目标点
        private onMonsterArrived(e: BaseEvent): void {
            if (e.object instanceof TdGameMonster) {
                this.hp = this.hp - (<TdGameMonster>e.object).atk
            }
        }
    }