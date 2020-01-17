class FuiUtil {
    static createComponent(packageName, resName, userClass) {
        let comp;
        let object = fgui.UIPackage.createObject(packageName, resName, userClass);
        if (object != null) {
            comp = object.asCom;
            FuiUtil.assignTarget(comp, comp);
            return comp;
        }
        return null;
    }

    /**赋值可操作属性至target */
    static assignTarget(target, source) {
        for (let c of source._children) {
            if (FuiUtil.isOptChild(c.name)) {
                target[c.name] = c;
            }
        }
    }

    /**是否为自定义可操作的组件 */
    static isOptChild(name) {
        let excludeNames = ["title", "icon", "button"];
        return name.match("^n[0-9]+$") == null && excludeNames.indexOf(name) == -1;
    }
}