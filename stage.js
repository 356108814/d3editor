/**主舞台 */
class Stage {

    constructor() {
        this.container = new fgui.GComponent();
        this._init();
    }

    addChild(child) {
        this.container.addChild(child);
    }

    _init() {
        Laya3D.init(1280, 720);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;

        fgui.UIConfig.defaultFont = "Microsoft YaHei";
        Laya.stage.addChild(fgui.GRoot.inst.displayObject);
        fairygui.GRoot.inst.addChild(this.container);
    }


}