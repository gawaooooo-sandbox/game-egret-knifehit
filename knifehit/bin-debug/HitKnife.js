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
var HitKnife = (function (_super) {
    __extends(HitKnife, _super);
    function HitKnife(_a) {
        var stageWidth = _a.stageWidth, stageHeight = _a.stageHeight, target = _a.target, x = _a.x, y = _a.y, impactAngle = _a.impactAngle;
        var _this = _super.call(this, stageWidth, stageHeight, target) || this;
        _this.impactAngle = impactAngle;
        _this.target = target;
        _this.setOption({ x: x, y: y });
        _this.launchAnimation();
        return _this;
    }
    HitKnife.prototype.setOption = function (_a) {
        var x = _a.x, y = _a.y;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x = x;
        this.y = y;
    };
    HitKnife.prototype.launchAnimation = function () {
        var _this = this;
        this.addEventListener(egret.Event.ENTER_FRAME, function (evt) {
            _this.rotation += HitKnife.STEP_ROT;
            var radians = (_this.rotation + 90) * Math.PI / 180;
            _this.x = _this.target.x + _this.target.width / 2 * Math.cos(radians);
            _this.y = _this.target.y + _this.target.width / 2 * Math.sin(radians);
            return false;
        }, this);
    };
    HitKnife.prototype.getImpactAngle = function () {
        return this.impactAngle;
    };
    return HitKnife;
}(Knife));
__reflect(HitKnife.prototype, "HitKnife");
//# sourceMappingURL=HitKnife.js.map