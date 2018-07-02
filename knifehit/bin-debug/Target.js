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
var Target = (function (_super) {
    __extends(Target, _super);
    function Target(stageWidth, stageHeight) {
        var _this = _super.call(this, Target.PNG_NAME) || this;
        _this.stageWidth = stageWidth;
        _this.stageHeight = stageHeight;
        _this.setOption();
        _this.launchAnimation();
        return _this;
    }
    Target.prototype.setOption = function () {
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x = this.stageWidth / 2;
        this.y = 400;
    };
    Target.prototype.launchAnimation = function () {
        var _this = this;
        this.addEventListener(egret.Event.ENTER_FRAME, function (evt) {
            _this.rotation += Target.STEP_ROT;
            return false;
        }, this);
    };
    Target.STEP_ROT = 6;
    Target.PNG_NAME = 'target_png';
    return Target;
}(BitMapBase));
__reflect(Target.prototype, "Target");
//# sourceMappingURL=Target.js.map