class KnifeManager {
    private throwKnife: ThrowKnife;
    private hitKnifes: HitKnife[] = [];
    private isLegalHit = false;
    private mainDispatcher: MainDispatcher;
    private stageWidth: number;
    private stageHeight: number;
    private target: Target;

    public constructor(stageWidth: number, stageHeight: number, target: Target, mainDispatcher: MainDispatcher) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.target = target;
        this.mainDispatcher = mainDispatcher;

        const dispatcher = new KnifeManagerDispatcher();
        dispatcher.addEventListener(KnifeManagerDispatcher.HIT, this.hit, this);

        this.throwKnife = new ThrowKnife(stageWidth, stageHeight, target, dispatcher);
    }

    public getThrowKnifeInstance() {
        return this.throwKnife;
    }

    private hit(event:egret.Event) {
        this.isLegalHit =  true;
        // rotationが0 to -180なので、これを 0 to 360に変更
        const impactAngle = event.data + 180;
        const {x, y} = {x: this.throwKnife.x, y: this.throwKnife.y};

        for(let i = 0; i < this.hitKnifes.length; i += 1) {
            const knife = this.hitKnifes[i];
            if (Math.abs(impactAngle - knife.getImpactAngle()) < 15) {
                this.gameOver();
                break;
            }
        }

        if (this.isLegalHit) {
            // 当たっていたらナイフを生成
            const knife = new HitKnife({
                stageWidth: this.stageWidth,
                stageHeight: this.stageHeight,
                target: this.target,
                x,
                y,
                impactAngle
            });
            this.afterHit(knife);
        }
    }

    private afterHit(knife: HitKnife) {
        this.hitKnifes.push(knife);
        this.mainDispatcher.add(knife);
        this.throwKnife.reset();
    }

    private gameOver() {
        console.log(' !! GAME OVER !!! ');
        this.isLegalHit = false;
        this.throwKnife.fallOut();
        this.mainDispatcher.removeAll(this.hitKnifes);
        this.hitKnifes = [];
    }
}

class KnifeManagerDispatcher extends egret.EventDispatcher {
    public static HIT:string = 'hit';

    public doHit(targetRotation: number) {
        this.dispatchEventWith(KnifeManagerDispatcher.HIT, false, targetRotation);
    }
}