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
var ThrowKnife = (function (_super) {
    __extends(ThrowKnife, _super);
    function ThrowKnife(stageWidth, stageHeight, target, dispatcher) {
        var _this = _super.call(this, stageWidth, stageHeight, target) || this;
        _this.canThrow = true;
        _this.dispatcher = dispatcher;
        _this.setOption();
        return _this;
    }
    ThrowKnife.prototype.setOption = function () {
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x = this.stageWidth / 2;
        this.y = this.stageHeight / 5 * 4;
    };
    ThrowKnife.prototype.throw = function () {
        if (!this.canThrow) {
            console.log(' can not throw knife');
            return;
        }
        this.canThrow = false;
        egret.Tween.get(this, {}).to({
            y: this.target.y + this.height / 2
        }, ThrowKnife.THROW_SPEED)
            .call(this.onThrowComplete, this);
    };
    ThrowKnife.prototype.onThrowComplete = function () {
        this.dispatcher.doHit(this.target.rotation);
    };
    ThrowKnife.prototype.reset = function () {
        this.canThrow = true;
        this.setOption();
    };
    ThrowKnife.prototype.fallOut = function () {
        egret.Tween.get(this, {
            onChange: this.onFallOutChange,
            onChangeObj: this
        }).to({
            y: this.stageHeight + this.height,
            rotation: 360
        }, ThrowKnife.THROW_SPEED * 4)
            .call(this.onFallOutComplete, this);
    };
    ThrowKnife.prototype.onFallOutChange = function () {
        this.rotation += ThrowKnife.FALLOUT_ROTATION;
    };
    ThrowKnife.prototype.onFallOutComplete = function () {
        this.reset();
        this.rotation -= ThrowKnife.FALLOUT_ROTATION;
    };
    ThrowKnife.THROW_SPEED = 150;
    ThrowKnife.FALLOUT_ROTATION = 15;
    return ThrowKnife;
}(Knife));
__reflect(ThrowKnife.prototype, "ThrowKnife");
//# sourceMappingURL=ThrowKnife.js.map