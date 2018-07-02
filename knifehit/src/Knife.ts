class Knife extends BitMapBase {
    protected stageWidth: number;
    protected stageHeight: number;
    protected target: Target;
    protected static STEP_ROT = 6;
    private static PNG_NAME = 'knife_png';

    public constructor(stageWidth: number, stageHeight: number, target: Target) {
        super(Knife.PNG_NAME);
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.target = target;
    }
}