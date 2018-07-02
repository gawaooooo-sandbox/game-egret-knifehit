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
var Knife = (function (_super) {
    __extends(Knife, _super);
    function Knife(stageWidth, stageHeight, target) {
        var _this = _super.call(this, Knife.PNG_NAME) || this;
        _this.stageWidth = stageWidth;
        _this.stageHeight = stageHeight;
        _this.target = target;
        return _this;
    }
    Knife.STEP_ROT = 6;
    Knife.PNG_NAME = 'knife_png';
    return Knife;
}(BitMapBase));
__reflect(Knife.prototype, "Knife");
//# sourceMappingURL=Knife.js.map