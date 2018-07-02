var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var KnifeManager = (function () {
    function KnifeManager(stageWidth, stageHeight, target, mainDispatcher) {
        this.hitKnifes = [];
        this.isLegalHit = false;
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.target = target;
        this.mainDispatcher = mainDispatcher;
        var dispatcher = new KnifeManagerDispatcher();
        dispatcher.addEventListener(KnifeManagerDispatcher.HIT, this.hit, this);
        this.throwKnife = new ThrowKnife(stageWidth, stageHeight, target, dispatcher);
    }
    KnifeManager.prototype.getThrowKnifeInstance = function () {
        return this.throwKnife;
    };
    KnifeManager.prototype.hit = function (event) {
        this.isLegalHit = true;
        // rotationが0 to -180なので、これを 0 to 360に変更
        var impactAngle = event.data + 180;
        var _a = { x: this.throwKnife.x, y: this.throwKnife.y }, x = _a.x, y = _a.y;
        for (var i = 0; i < this.hitKnifes.length; i += 1) {
            var knife = this.hitKnifes[i];
            if (Math.abs(impactAngle - knife.getImpactAngle()) < 15) {
                this.gameOver();
                break;
            }
        }
        if (this.isLegalHit) {
            // 当たっていたらナイフを生成
            var knife = new HitKnife({
                stageWidth: this.stageWidth,
                stageHeight: this.stageHeight,
                target: this.target,
                x: x,
                y: y,
                impactAngle: impactAngle
            });
            this.afterHit(knife);
        }
    };
    KnifeManager.prototype.afterHit = function (knife) {
        this.hitKnifes.push(knife);
        this.mainDispatcher.add(knife);
        this.throwKnife.reset();
    };
    KnifeManager.prototype.gameOver = function () {
        console.log(' !! GAME OVER !!! ');
        this.isLegalHit = false;
        this.throwKnife.fallOut();
        this.mainDispatcher.removeAll(this.hitKnifes);
        this.hitKnifes = [];
    };
    return KnifeManager;
}());
__reflect(KnifeManager.prototype, "KnifeManager");
var KnifeManagerDispatcher = (function (_super) {
    __extends(KnifeManagerDispatcher, _super);
    function KnifeManagerDispatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KnifeManagerDispatcher.prototype.doHit = function (targetRotation) {
        this.dispatchEventWith(KnifeManagerDispatcher.HIT, false, targetRotation);
    };
    KnifeManagerDispatcher.HIT = 'hit';
    return KnifeManagerDispatcher;
}(egret.EventDispatcher));
__reflect(KnifeManagerDispatcher.prototype, "KnifeManagerDispatcher");
//# sourceMappingURL=KnifeManager.js.map