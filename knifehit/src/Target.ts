class Target extends BitMapBase {
    private stageWidth: number;
    private stageHeight: number;
    private static STEP_ROT = 6;
    private static PNG_NAME = 'target_png';

    public constructor(stageWidth: number, stageHeight: number) {
        super(Target.PNG_NAME);
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.setOption();
        this.launchAnimation();
    }

    private setOption() {
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;

        this.x = this.stageWidth / 2;
        this.y = 400;
    }

    private launchAnimation() {
        this.addEventListener(egret.Event.ENTER_FRAME, (evt: egret.Event) => {
            this.rotation += Target.STEP_ROT;
            return false;
        }, this);
    }
}