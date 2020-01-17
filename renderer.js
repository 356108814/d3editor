const { ipcRenderer } = require('electron');

// const service = require('electron').remote.require('service');
// service.test();

// var fs = require("fs");
// fs.readFile('README.md', (err, data) => {
//   console.log(data.toString());
// });

// ipcRenderer.send('hhh', '我靠');


let stage = null;
let editor = null;

/**初始化 */
function init() {
    stage = new Stage();
}

function onPackageLoaded() {
    //注册自定义组件
    regExtension(PackName.Builder, 'MainView', MainView);
    regExtension(PackName.Builder, 'LibraryView', LibraryView);

    editor = new Editor();
    stage.addChild(editor);
}

function regExtension(packName, resName, clazz) {
    let itemUrl = fgui.UIPackage.getItemURL(packName, resName);
    if (itemUrl) {
        fairygui.UIObjectFactory.setPackageItemExtension(itemUrl, clazz);
    }
}

init();
