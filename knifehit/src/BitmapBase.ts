class BitMapBase extends egret.Bitmap {
    public constructor(name: string) {
        super();
        this.name = name;
        this.createBitmapByName();
    }

    private createBitmapByName() {
        if (!this.name) {
            return;
        }

        const texture: egret.Texture = RES.getRes(this.name);
        this.texture = texture;
        return this;
    }
}