//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {
            }
        })

        egret.lifecycle.onPause = () => {
            console.log("egret onPause");
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            console.log("egret onResume");
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        this.launchAnimation();
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;
    private target: Target;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        const dispatcher = new MainDispatcher();
        dispatcher.addEventListener(MainDispatcher.ADD_KNIFE, this.addKnife, this);
        dispatcher.addEventListener(MainDispatcher.REMOVE_KNIFE, this.removeAllKnife, this);

        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;

        // set background color
        const background = new egret.Shape;
        background.graphics.beginFill(0x444444);
        background.graphics.drawRect(0, 0, stageW, stageH);
        background.graphics.endFill();
        this.addChild(background);

        // set target, throwKnife
        this.target = new Target(stageW, stageH);
        const knifeManager = new KnifeManager(stageW, stageH, this.target, dispatcher);
        const throwKnife = knifeManager.getThrowKnifeInstance();

        this.addChildAt(throwKnife, 1);
        this.addChildAt(this.target, 2);     

        // add touch event
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (evt: egret.TouchEvent) => {
            throwKnife.throw();
        }, this);

        // TODO: test text
        let textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.LEFT;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.type = egret.TextFieldType.DYNAMIC;
        textfield.lineSpacing = 6;
        textfield.x = 0;
        textfield.y = 0;
        this.textfield = textfield;
    }

    private addKnife(event:egret.Event) {
        if (!event.data) {
            return;
        }

        const knife = event.data;
        this.addChildAt(knife, 1);
     }

    private removeAllKnife(event:egret.Event) {
        if (!event.data) {
            return;
        }
        const hitKnifes = event.data;

        hitKnifes.forEach(knife => {
            this.removeChild(knife);
        });
    }

    private launchAnimation() {
        this.addEventListener(egret.Event.ENTER_FRAME, (evt: egret.Event) => {
            this.textfield.text = `Rotation: ${this.target.rotation}`;
            return false;
        }, this);
    }
}

class MainDispatcher extends egret.EventDispatcher {
    public static ADD_KNIFE = 'addknife';
    public static REMOVE_KNIFE = 'removeknife';

    public add(knife:HitKnife) {
        this.dispatchEventWith(MainDispatcher.ADD_KNIFE, false, knife);
    }

    public removeAll(knifes: HitKnife[]) {
        this.dispatchEventWith(MainDispatcher.REMOVE_KNIFE, false, knifes);
    }
}