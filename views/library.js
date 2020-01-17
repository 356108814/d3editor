var fs = require('fs');
var path = require("path");
/**
 * 左侧资源视图
 */
class LibraryView extends View {

    constructor() {
        super();
    }

    initOptUI() {
        this.fileURL = "ui://6ue812ttokgs3m";
        this.tree_asset = this.tree_asset.asTree;
        this.tree_asset.on(fgui.Events.CLICK_ITEM, this, this.onClickNode);
        this.tree_asset.treeNodeRender = Laya.Handler.create(this, this.renderTreeNode, null, false);
    }

    updateAll() {
        // let self = this;
        // var root = 'E:/美术资源/Laya3d/output'
        var root = 'E:/github/d3editor/model'

        // console.log(path.resolve('model'));
        fs.readdir(root, (err, files) => {
            files.map((value, index, arr) => {
                var folderNode = new fgui.GTreeNode(true);
                folderNode.data = value;
                folderNode.data = { 'text': value };
                this.tree_asset.rootNode.addChild(folderNode);
                const files = fsOper.getAssets(root + '/' + value);
                files.forEach((file, index) => {
                    var node = new fgui.GTreeNode(false);
                    node.data = { 'text': file.name, 'filepath': file.filepath };
                    folderNode.addChild(node);
                });
            });
        });
    }

    onClickNode(itemObject) {
        var node = itemObject.treeNode;
        var nodeData = node.data;
        console.log(nodeData);
        if (!node.isFolder) {
            var url = nodeData.filepath.replace('E:/github/d3editor/', '');
            console.log(url);
            
            Dispatcher.event(EventName.LoadModel, url);
            // Dispatcher.event(EventName.LoadModel, 'model/hero/K423.lh');
        }
    }

    renderTreeNode(node, obj) {
        if (node.isFolder) {
            obj.text = node.data.text;
        } else if (node.data instanceof Array) {
            obj.text = (node.data)[0];
            obj.icon = (node.data)[1];
        } else {
            obj.text = node.data.text;
            obj.icon = this.fileURL;
        }
    }
}