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
var BitMapBase = (function (_super) {
    __extends(BitMapBase, _super);
    function BitMapBase(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.createBitmapByName();
        return _this;
    }
    BitMapBase.prototype.createBitmapByName = function () {
        if (!this.name) {
            return;
        }
        var texture = RES.getRes(this.name);
        this.texture = texture;
        return this;
    };
    return BitMapBase;
}(egret.Bitmap));
__reflect(BitMapBase.prototype, "BitMapBase");
//# sourceMappingURL=BitmapBase.js.map