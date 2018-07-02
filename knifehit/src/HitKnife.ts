class HitKnife extends Knife {
    private impactAngle: number;
    public constructor({stageWidth, stageHeight, target, x, y, impactAngle}) {
        super(stageWidth, stageHeight, target);
        this.impactAngle = impactAngle;
        this.target = target;
        this.setOption({x, y});
        this.launchAnimation();
    }

    private setOption({x, y}) {
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x = x;
        this.y = y;
    }

    private launchAnimation() {
        this.addEventListener(egret.Event.ENTER_FRAME, (evt:egret.Event) => {
            this.rotation += HitKnife.STEP_ROT;
            const radians = (this.rotation + 90) * Math.PI / 180;

            this.x = this.target.x + this.target.width / 2 * Math.cos(radians);
            this.y = this.target.y + this.target.width / 2 * Math.sin(radians);

            return false;
        }, this);
    }

    public getImpactAngle() {
        return this.impactAngle;
    }
}