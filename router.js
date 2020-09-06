const fs = require('fs');
const router = require('koa-router')();

function addMapping(router, mapping) {
	for (var url in mapping) {
		if (url.startsWith('GET')) {
			var path = url.substring(4);
			router.get(path, mapping[url]);
			console.log(`register URL mapping: GET ${path}`);
		} else if (url.startsWith('POST')) {
			var path = url.substring(5);
			router.post(path, mapping[url]);
			console.log(`register URL mapping: POST ${path}`);
		} else {
			console.log('无效的 URL');
		}
	}
}

function addControllers(router) {
	var js_files = fs.readdirSync(__dirname + '/controllers');
	// 过滤出.js文件:
	var js_files = js_files.filter((f) => {
		return f.endsWith('.js');
	});
	for (var f of js_files) {
		// console.log(`process controller: ${f}...`);
		let mapping = require(__dirname + '/controllers/' + f);
		// console.log('mapping===', mapping);
		addMapping(router, mapping);
	}
}
// console.log(js_files)

module.exports = function dir(params) {
	let CTR = params || 'controllers';
	addControllers(router, CTR);
	return router.routes();
};
