/**3d模型 */
class Model3D {

    constructor() {
        this.container = new Laya.Sprite();
        this.model = null;
        this.animator = null;

        this.isRotate = false;
        this.angleV3 = new Laya.Vector3(0, 0, 0);
        this.scaleV3 = new Laya.Vector3(1, 1, 1);

        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onTouchDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onTouchUp);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
        Laya.stage.on(Laya.Event.MOUSE_WHEEL, this, this.onMouseWheel)
    }

    load(url, caller, callFun) {
        let self = this;
        Laya.Sprite3D.load(url, Laya.Handler.create(null, function (sprite) {
            sprite.transform.scale = new Laya.Vector3(0.1, 0.1, 0.1);
            sprite.transform.localPositionX = 0;
            sprite.transform.localPositionZ = 0;
            sprite.transform.localPositionY = 0;
            sprite.transform.localRotationY = 0;
            self.container.addChild(sprite);
            self.model = sprite;
            self.animator = sprite.getComponent(Laya.Animator);
            self.play(ActionName.Idle);
            if (caller && callFun) {
                callFun.apply(caller, [self.animator.getControllerLayer(0)['_statesMap']])
            }
        }));
    }

    removeSelf() {
        if (this.model) {
            this.model.removeSelf();
        }
    }

    play(actionName) {
        if (this.animator) {
            this.animator.crossFade(actionName, 0.1);
        }
    }

    addToParent(parent) {
        parent.addChild(this.container);
    }

    onTouchDown() {
        this.isRotate = true;
        this.lastMouseX = Laya.stage.mouseX;
    }

    onTouchUp() {
        this.isRotate = false;
    }

    onTouchMove(e) {
        if (!this.isRotate || !this.model) return;
        let dir = 1;
        if (Laya.stage.mouseX <= this.lastMouseX) {
            dir = -1;
        }
        this.lastMouseX = Laya.stage.mouseX;
        this.angleV3.y += 270 * (Laya.timer.delta / 1000) * dir;
        if (this.angleV3.y > 360) this.angleV3.y = 0;
        if (this.angleV3.y < 0) this.angleV3.y = 360;
        this.model.transform.rotationEuler = this.angleV3;
    }

    onMouseWheel(e) {
        if (!this.model) return;
        let delta = e.delta;
        let add = delta > 0 ? 0.05 : -0.05;
        let scale = this.scaleV3.x + add;
        if (scale < 0) {
            scale = 0;
        }
        this.scaleV3.x = scale;
        this.scaleV3.y = scale;
        this.scaleV3.z = scale;
        this.model.transform.setWorldLossyScale(this.scaleV3);
    }
}