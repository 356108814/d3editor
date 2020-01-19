/**
 * 中间主视图
 */
class MainView extends View {

    constructor() {
        super();
        this.scene = null;
        this.camera = null;
        this.model = null;
        this.actionList = null;
    }

    initOptUI() {
        console.log(this.container_center);
        this.actionList = this.getChild('list_action');
        this.actionList.on(fgui.Events.CLICK_ITEM, this, this.onClickActionItem);

        this.scene = this.container_center.displayObject.addChild(new Laya.Scene3D());
        this.camera = this.scene.addChild(new Laya.Camera(0, 0.1, 100));
        this.camera.transform.translate(new Laya.Vector3(0, 0.5, 1));
        this.camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
        this.camera.clearColor = new Laya.Vector4(0.28, 0.28, 0.28, 1);

        // let url = "model/hero/K423.lh";
        this.model = new Model3D();
        this.model.addToParent(this.scene);
    }

    /**加载模型 */
    loadModel(url) {
        this.model.removeSelf();
        this.model.load(url, this, (stateMap) => {
            this.actionList.removeChildrenToPool();
            for (var name in stateMap) {
                var item = this.actionList.addItemFromPool();
                item.title = name;
            }
            this.actionList.ensureBoundsCorrect();
        });
    }

    /**点击动作 */
    onClickActionItem(item) {
        this.model.play(item.title);
    }
}