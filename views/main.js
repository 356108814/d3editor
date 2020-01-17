/**
 * 中间主视图
 */
class MainView extends View {

    constructor() {
        super();
        this.scene = null;
        this.camera = null;
        this.model = null;
        self.animator = null;
    }

    initOptUI() {
        console.log(this.container_center);

        this.scene = this.container_center.displayObject.addChild(new Laya.Scene3D());
        // this.scene.ambientColor = new Laya.Vector3(1, 1, 1);
        this.camera = this.scene.addChild(new Laya.Camera(0, 0.1, 100));
        this.camera.addComponent(CameraMoveScript);
        this.camera.transform.translate(new Laya.Vector3(0, 0.5, 1));
        this.camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
        // this.camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
        this.camera.clearColor = new Laya.Vector4(0.28, 0.28, 0.28, 1);


        // let url = "model/hero/K423.lh";
        // this.loadModel(url);
    }

    loadModel(url) {
        if (this.model) {
            this.model.removeSelf();
        }

        let self = this;
        Laya.Sprite3D.load(url, Laya.Handler.create(null, function (sprite) {
            sprite.transform.scale = new Laya.Vector3(0.1, 0.1, 0.1);
            sprite.transform.localPositionX = 0;
            sprite.transform.localPositionZ = 0;
            sprite.transform.localPositionY = 0;
            sprite.transform.localRotationY = 0;
            self.scene.addChild(sprite);
            self.model = sprite;
            self.animator = sprite.getComponent(Laya.Animator);
            self.animator.crossFade(ActionName.Idle, 0.1);
        }));
    }
}