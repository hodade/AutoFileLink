// console.log("load background.js");

//リクエスト前のイベントで特定のURLを拾う
chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		if (details.url.match(/^http:\/\/autofilelink\/(.+)$/)) {
			var url = 'file://' + RegExp.$1;
			chrome.tabs.update(details.tabId,{url:url}, function(){}); 
		}
		return {cancel: true};
	},
	{urls: ["http://autofilelink/*"]},
	["blocking"]
);
