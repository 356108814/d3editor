/**游戏场景 */
class GameScene {
    constructor() {
        let scene, camera;
        let width = 1280;
        let height = 720;
        Laya3D.init(width, height);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.Stat.show();
        this.scene = Laya.stage.addChild(new Laya.Scene3D());
        this.scene.ambientColor = new Laya.Vector3(1, 1, 1);
        this.camera = this.scene.addChild(new Laya.Camera(0, 0.1, 100));
        this.camera.addComponent(CameraMoveScript);
        this.camera.transform.translate(new Laya.Vector3(0, 0.5, 1));
        this.camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
    }
}


class Game {
    constructor() {
        this.gameScene = new GameScene();
        this.start();
    }

    start() {
        var text = new Laya.Text();
        text.overflow = Text.HIDDEN;

        text.color = "#FFFFFF";
        text.font = "Impact";
        text.fontSize = 20;
        text.borderColor = "#FFFF00";
        text.x = 80;
        text.text = "A POWERFUL HTML5 ENGINE ON FLASH TECHNICAL"

        Laya.stage.addChild(text);

        let sprite = new Laya.Sprite();
        sprite.loadImage("banner.jpg");
        // Laya.stage.addChild(sprite);

        let url = "model/hero/K423.lh";
        let self = this;
        Laya.Sprite3D.load(url, Laya.Handler.create(null, function (sprite) {
            sprite.transform.scale = new Laya.Vector3(0.1, 0.1, 0.1);
            self.gameScene.scene.addChild(sprite);
        }));


        // service.test();
        var fs = require("fs");
        fs.readFile('README.md', (err, data) => {
            console.log(data.toString());
            text.text = data.toString();
        });

        Dispatcher.event("test", "haha");
    }
}