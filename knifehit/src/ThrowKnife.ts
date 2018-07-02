class ThrowKnife extends Knife {
    private dispatcher: KnifeManagerDispatcher;
    private canThrow = true;
    private static THROW_SPEED = 150;
    private static FALLOUT_ROTATION = 15;

    public constructor(stageWidth: number, stageHeight: number, target: Target, dispatcher: KnifeManagerDispatcher) {
        super(stageWidth, stageHeight, target);
        this.dispatcher = dispatcher;
        this.setOption();
    }

    private setOption() {
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        
        this.x = this.stageWidth / 2;
        this.y = this.stageHeight / 5 * 4;
    }

    public throw() {
        if (!this.canThrow) {
            console.log(' can not throw knife');
            return;
        }

        this.canThrow = false;

        egret.Tween.get(this, {
        }).to({
            y: this.target.y + this.height / 2
        }, ThrowKnife.THROW_SPEED)
        .call(this.onThrowComplete, this);
    }

    private onThrowComplete() {
        this.dispatcher.doHit(this.target.rotation);
    }

    public reset() {
        this.canThrow = true;
        this.setOption();
    }

    public fallOut() {
        egret.Tween.get(this, {
            onChange: this.onFallOutChange,
            onChangeObj: this
        }).to({
            y: this.stageHeight + this.height,
            rotation: 360
    }, ThrowKnife.THROW_SPEED * 4)
        .call(this.onFallOutComplete, this);
    }

    private onFallOutChange() {
        this.rotation += ThrowKnife.FALLOUT_ROTATION;
    }

    private onFallOutComplete() {
        this.reset();
        this.rotation -= ThrowKnife.FALLOUT_ROTATION;
    }
}