/**
 * 公共服务提供者
 */
var fs = require('fs');
var path = require("path");

/**本地缓存 */
class Cache {

}

/**数据存储，可以为文件或DB */
class Storage {

}

/**svn服务 */
class Svn {

}

/**文件服务，对接本地文件系统交互 */
class FsOper {

    getAssets(root, fileList = []) {
        const files = fs.readdirSync(root);
        files.forEach((item, index) => {
            var fullPath = path.join(root, item);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                this.getAssets(path.join(root, item), fileList);  //递归读取文件
            } else {
                const d = path.parse(fullPath);
                if (this.isModelFile(d.ext)) {
                    fullPath = fullPath.replace(/\\/g, '/')
                    fileList.push({ 'name': d.name, 'filepath': fullPath });
                }
            }
        });
        return fileList;
    }

    isModelFile(ext) {
        return ['.lh'].indexOf(ext) != -1;
    }
}

cache = new Cache()
storage = new Storage()
svn = new Svn()
fsOper = new FsOper();