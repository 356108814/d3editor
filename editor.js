/**编辑器 */
class Editor extends View {
    constructor() {
        super();
        this.editorView = null;
        this.mainView = null;
        this.topView = null;
        this.libraryView = null;
        this.rightView = null;
        this.bottomView = null;
        Laya.stage.on(Laya.Event.RESIZE, this, this.onStageResize);

        this.initListener();
        this.initOptUI();
    }

    initListener() {
        Dispatcher.on(EventName.LoadModel, this, this.loadModel);
    }

    /**初始化ui */
    initOptUI() {
        this.editorView = FuiUtil.createComponent('Builder', 'Main');
        this.editorView.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        this.editorView.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
        this.addChild(this.editorView);

        this.initView('mainView', 'main');
        this.initView('libraryView', 'left');
    }

    initView(target, name) {
        this[target] = this.editorView[name];
        FuiUtil.assignTarget(this[target], this[target]);
        this[target].initOptUI();
        this[target].updateAll();
    }


    onStageResize() {
        // console.log(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
    }

    loadModel(url) {
        this.mainView.loadModel(url);
    }
}