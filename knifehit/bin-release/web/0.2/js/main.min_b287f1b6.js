var __reflect=this&&this.__reflect||function(t,e,i){t.__class__=e,i?i.push(e):i=[e],t.__types__=t.__types__?i.concat(t.__types__):i},__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);i.prototype=e.prototype,t.prototype=new i},__awaiter=this&&this.__awaiter||function(t,e,i,n){return new(i||(i=Promise))(function(r,a){function o(t){try{h(n.next(t))}catch(e){a(e)}}function s(t){try{h(n["throw"](t))}catch(e){a(e)}}function h(t){t.done?r(t.value):new i(function(e){e(t.value)}).then(o,s)}h((n=n.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function i(t){return function(e){return n([t,e])}}function n(i){if(r)throw new TypeError("Generator is already executing.");for(;h;)try{if(r=1,a&&(o=a[2&i[0]?"return":i[0]?"throw":"next"])&&!(o=o.call(a,i[1])).done)return o;switch(a=0,o&&(i=[0,o.value]),i[0]){case 0:case 1:o=i;break;case 4:return h.label++,{value:i[1],done:!1};case 5:h.label++,a=i[1],i=[0];continue;case 7:i=h.ops.pop(),h.trys.pop();continue;default:if(o=h.trys,!(o=o.length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){h=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){h.label=i[1];break}if(6===i[0]&&h.label<o[1]){h.label=o[1],o=i;break}if(o&&h.label<o[2]){h.label=o[2],h.ops.push(i);break}o[2]&&h.ops.pop(),h.trys.pop();continue}i=e.call(t,h)}catch(n){i=[6,n],a=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}var r,a,o,s,h={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:i(0),"throw":i(1),"return":i(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},BitMapBase=function(t){function e(e){var i=t.call(this)||this;return i.name=e,i.createBitmapByName(),i}return __extends(e,t),e.prototype.createBitmapByName=function(){if(this.name){var t=RES.getRes(this.name);return this.texture=t,this}},e}(egret.Bitmap);__reflect(BitMapBase.prototype,"BitMapBase");var Knife=function(t){function e(i,n,r){var a=t.call(this,e.PNG_NAME)||this;return a.stageWidth=i,a.stageHeight=n,a.target=r,a}return __extends(e,t),e.STEP_ROT=6,e.PNG_NAME="knife_png",e}(BitMapBase);__reflect(Knife.prototype,"Knife");var HitKnife=function(t){function e(e){var i=e.stageWidth,n=e.stageHeight,r=e.target,a=e.x,o=e.y,s=e.impactAngle,h=t.call(this,i,n,r)||this;return h.impactAngle=s,h.target=r,h.setOption({x:a,y:o}),h.launchAnimation(),h}return __extends(e,t),e.prototype.setOption=function(t){var e=t.x,i=t.y;this.anchorOffsetX=this.width/2,this.anchorOffsetY=this.height/2,this.x=e,this.y=i},e.prototype.launchAnimation=function(){var t=this;this.addEventListener(egret.Event.ENTER_FRAME,function(i){t.rotation+=e.STEP_ROT;var n=(t.rotation+90)*Math.PI/180;return t.x=t.target.x+t.target.width/2*Math.cos(n),t.y=t.target.y+t.target.width/2*Math.sin(n),!1},this)},e.prototype.getImpactAngle=function(){return this.impactAngle},e}(Knife);__reflect(HitKnife.prototype,"HitKnife");var KnifeManager=function(){function t(t,e,i,n){this.hitKnifes=[],this.isLegalHit=!1,this.stageWidth=t,this.stageHeight=e,this.target=i,this.mainDispatcher=n;var r=new KnifeManagerDispatcher;r.addEventListener(KnifeManagerDispatcher.HIT,this.hit,this),this.throwKnife=new ThrowKnife(t,e,i,r)}return t.prototype.getThrowKnifeInstance=function(){return this.throwKnife},t.prototype.hit=function(t){this.isLegalHit=!0;for(var e=t.data+180,i={x:this.throwKnife.x,y:this.throwKnife.y},n=i.x,r=i.y,a=0;a<this.hitKnifes.length;a+=1){var o=this.hitKnifes[a];if(Math.abs(e-o.getImpactAngle())<15){this.gameOver();break}}if(this.isLegalHit){var o=new HitKnife({stageWidth:this.stageWidth,stageHeight:this.stageHeight,target:this.target,x:n,y:r,impactAngle:e});this.afterHit(o)}},t.prototype.afterHit=function(t){this.hitKnifes.push(t),this.mainDispatcher.add(t),this.throwKnife.reset()},t.prototype.gameOver=function(){console.log(" !! GAME OVER !!! "),this.isLegalHit=!1,this.throwKnife.fallOut(),this.mainDispatcher.removeAll(this.hitKnifes),this.hitKnifes=[]},t}();__reflect(KnifeManager.prototype,"KnifeManager");var KnifeManagerDispatcher=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.doHit=function(t){this.dispatchEventWith(e.HIT,!1,t)},e.HIT="hit",e}(egret.EventDispatcher);__reflect(KnifeManagerDispatcher.prototype,"KnifeManagerDispatcher");var LoadingUI=function(t){function e(){var e=t.call(this)||this;return e.createView(),e}return __extends(e,t),e.prototype.createView=function(){egret.log(" call loading UI createView "),this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},e.prototype.onProgress=function(t,e){this.textField.text="Loading..."+t+"/"+e},e}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var Main=function(t){function e(){var e=t.call(this)||this;return e.once(egret.Event.ADDED_TO_STAGE,e.onAddToStage,e),e}return __extends(e,t),e.prototype.onAddToStage=function(t){egret.lifecycle.addLifecycleListener(function(t){t.onUpdate=function(){}}),egret.lifecycle.onPause=function(){console.log("egret onPause"),egret.ticker.pause()},egret.lifecycle.onResume=function(){console.log("egret onResume"),egret.ticker.resume()},this.runGame()["catch"](function(t){console.log(t)})},e.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.loadResource()];case 1:return t.sent(),this.createGameScene(),this.launchAnimation(),[2]}})})},e.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(i){switch(i.label){case 0:return i.trys.push([0,3,,4]),t=new LoadingUI,this.stage.addChild(t),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return i.sent(),[4,RES.loadGroup("preload",0,t)];case 2:return i.sent(),this.stage.removeChild(t),[3,4];case 3:return e=i.sent(),console.error(e),[3,4];case 4:return[2]}})})},e.prototype.createGameScene=function(){var t=new MainDispatcher;t.addEventListener(MainDispatcher.ADD_KNIFE,this.addKnife,this),t.addEventListener(MainDispatcher.REMOVE_KNIFE,this.removeAllKnife,this);var e=this.stage.stageWidth,i=this.stage.stageHeight,n=new egret.Shape;n.graphics.beginFill(4473924),n.graphics.drawRect(0,0,e,i),n.graphics.endFill(),this.addChild(n),this.target=new Target(e,i);var r=new KnifeManager(e,i,this.target,t),a=r.getThrowKnifeInstance();this.addChildAt(a,1),this.addChildAt(this.target,2),this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(t){a["throw"]()},this);var o=new egret.TextField;this.addChild(o),o.width=e-172,o.textAlign=egret.HorizontalAlign.LEFT,o.size=24,o.textColor=16777215,o.type=egret.TextFieldType.DYNAMIC,o.lineSpacing=6,o.x=0,o.y=0,this.textfield=o},e.prototype.addKnife=function(t){if(t.data){var e=t.data;this.addChildAt(e,1)}},e.prototype.removeAllKnife=function(t){var e=this;if(t.data){var i=t.data;i.forEach(function(t){e.removeChild(t)})}},e.prototype.launchAnimation=function(){},e}(egret.DisplayObjectContainer);__reflect(Main.prototype,"Main");var MainDispatcher=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.add=function(t){this.dispatchEventWith(e.ADD_KNIFE,!1,t)},e.prototype.removeAll=function(t){this.dispatchEventWith(e.REMOVE_KNIFE,!1,t)},e.ADD_KNIFE="addknife",e.REMOVE_KNIFE="removeknife",e}(egret.EventDispatcher);__reflect(MainDispatcher.prototype,"MainDispatcher");var Target=function(t){function e(i,n){var r=t.call(this,e.PNG_NAME)||this;return r.stageWidth=i,r.stageHeight=n,r.setOption(),r.launchAnimation(),r}return __extends(e,t),e.prototype.setOption=function(){this.anchorOffsetX=this.width/2,this.anchorOffsetY=this.height/2,this.x=this.stageWidth/2,this.y=400},e.prototype.launchAnimation=function(){var t=this;this.addEventListener(egret.Event.ENTER_FRAME,function(i){return t.rotation+=e.STEP_ROT,!1},this)},e.STEP_ROT=6,e.PNG_NAME="target_png",e}(BitMapBase);__reflect(Target.prototype,"Target");var ThrowKnife=function(t){function e(e,i,n,r){var a=t.call(this,e,i,n)||this;return a.canThrow=!0,a.dispatcher=r,a.setOption(),a}return __extends(e,t),e.prototype.setOption=function(){this.anchorOffsetX=this.width/2,this.anchorOffsetY=this.height/2,this.x=this.stageWidth/2,this.y=this.stageHeight/5*4},e.prototype["throw"]=function(){return this.canThrow?(this.canThrow=!1,void egret.Tween.get(this,{}).to({y:this.target.y+this.height/2},e.THROW_SPEED).call(this.onThrowComplete,this)):void console.log(" can not throw knife")},e.prototype.onThrowComplete=function(){this.dispatcher.doHit(this.target.rotation)},e.prototype.reset=function(){this.canThrow=!0,this.setOption()},e.prototype.fallOut=function(){egret.Tween.get(this,{onChange:this.onFallOutChange,onChangeObj:this}).to({y:this.stageHeight+this.height,rotation:360},4*e.THROW_SPEED).call(this.onFallOutComplete,this)},e.prototype.onFallOutChange=function(){this.rotation+=e.FALLOUT_ROTATION},e.prototype.onFallOutComplete=function(){this.reset(),this.rotation-=e.FALLOUT_ROTATION},e.THROW_SPEED=150,e.FALLOUT_ROTATION=15,e}(Knife);__reflect(ThrowKnife.prototype,"ThrowKnife");