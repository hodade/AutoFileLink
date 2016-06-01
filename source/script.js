$(function(){
	// console.log('load my extension');

	// \\で始まる文字列を別のリンクに置換する関数
	var replaceFileLink = function(){
		var body = $('body').html();

		if (!body.match(/(\\\\[^<>]+)/)) {
			return;
		}

		//bodyの内容をまるごと書き換える（いろいろエラーになる）
		// body = body.replace(/(\\\\[^<>]+)/g,function(matchAll,match1){
		// 	return '<a title="AutoFileLinkで開く" target="_blank" href="http://autofilelink/'+match1+'">'+match1+'</a>';
		// });
		// $('body').html(body);

		//再帰的に子要素を巡って、対象となるものだけ置換する（こっちだとOK）
		replaceFileLinkSub($('body'));
	};

	//再帰的に子要素を巡って置換する関数
	var replaceFileLinkSub = function(obj) {
		var obj_ary = $(obj).children();
		if (obj_ary.length > 0) {
			obj_ary.each(function(k,v){
				replaceFileLinkSub(v);
			})
		} else {
			// console.log(obj);
			var html = $(obj).html();
			html = html.replace(/(\\\\[^<>]+)/g,function(matchAll,match1){
				// console.log(matchAll);
				return '<a title="AutoFileLinkで開く" target="_blank" href="http://autofilelink/'+match1+'">'+match1+'</a>';
			});
			$(obj).html(html);
		}
	};

	//ページが読み込まれた後のイベントを取得する
	window.addEventListener("load",function(event){
		//リンクの置換
		replaceFileLink();
	});

});
