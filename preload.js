// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

// ---------------------------------------------------
// 在页面加载之前需要执行的相关代码

// ---------------------------------------------------


// -------------------------------------------------------
document.addEventListener('DOMNodeInserted', (event) => {
	// 页面内容加载之前需要引入的一些代码

})
// -------------------------------------------------------


// -------------------------------------------------------
document.addEventListener('DOMContentLoaded', (event) => {
	// 页面内容加载之后需要引入的一些操作
	let loadItems = [{ url: 'assets/BlackSkin_atlas0.png', type: Laya.Loader.IMAGE }, { url: 'assets/BlackSkin.fui', type: Laya.Loader.BUFFER },
	{ url: 'assets/Builder.fui', type: Laya.Loader.BUFFER }, { url: 'assets/Builder_atlas0.png', type: Laya.Loader.BUFFER }];
	Laya.loader.load(loadItems, Laya.Handler.create(this, onLoaded));

	function onLoaded() {
		fgui.UIPackage.addPackage('assets/BlackSkin');
		fgui.UIPackage.addPackage('assets/Builder');
		console.log('BlackSkin loaded.....');

		onPackageLoaded();//调用renderer中的方法
	}

	
})
// -------------------------------------------------------

