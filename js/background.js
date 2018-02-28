//background.js HeartBeat Extension Event Page

/*
   */ 
background = {};
/*
   */
background.storage = (function(){
	var objs={};
	window.setTimeout(function(){
	    chrome.storage.local.get(null,function(o){objs=o});
	},3000);
	
	return{
	   "read":function (name) {return objs[name]},
	   "write":function (name,data){
		var tmp = {};
		objs[name] = data;
		tmp[name] = data;
		chrome.storage.local.set(tmp,function(){})
	}}
})();
/*
   */
background.changeIcon = (function(){
	var command;
	chrome.browserAction.onClicked.addListener(function(){ if (command) command() })
	return{
	    "Icon":function (id) {
		chrome.browserAction.setIcon({
		path: { '16':'icon/' + id + '/heartbeat_16.png',
			'48':'icon/' + id + '/heartbeat_48.png',
			'128':'icon/' + id + '/heartbeat_128.png'				
			}		
		});	
	    },
	    "Title":function(id){
		chrome.browserAction.setTitle({
			"title":"Heart Beat is " + id
		});		
	    }	
	}
})();
/*
   */
background.double = (function(){
	chrome.browserAction.onClicked.addListener(function(tab) {
		var point = change_icon()
		if (point ===0){
			chrome.tabs.sendMessage(tab.id,{action: 'Like'});		
		}else if(point ===1){
			chrome.tabs.sendMessage(tab.id,{action: 'Stop'});				
		}else{
			chrome.tabs.sendMessage(tab.id,{action: 'CancelLike'});
		}	
	});
});
	
/*		
   */
function change_icon(){
	var send_point;
	var status_x = background.storage.read('status_1');
	//console.log('the current status_x is'+ status_x);

	if (status_x%3 === 0){ //Auto Like
		background.changeIcon.Icon(0);
		background.changeIcon.Title("Auto Like");
		send_point = 0;		
		//chrome.browserAction.onClicked.addListener(function(tab) {chrome.tabs.sendMessage(tab.id,{action: 'run'});});		
	}else if(status_x%3 === 1){ //Pause
		background.changeIcon.Icon(1);
		background.changeIcon.Title("Stop");
		send_point = 1;		
		//chrome.browserAction.onClicked.addListener(function(tab) {chrome.tabs.sendMessage(tab.id,{action: 'stop'});});		
	}else{ //Auto CancleLike
		background.changeIcon.Icon(0);
		background.changeIcon.Title("Auto Cancel-Like");
		send_point = 2;		
		//chrome.browserAction.onClicked.addListener(function(tab) {chrome.tabs.sendMessage(tab.id,{action: 'stop'});});	
	};
	
	status_x++;			
	background.storage.write('status_1',status_x);
	
	return send_point;	
};

/*
   */
(function (){
	background.storage.write("status_1",1);
	var status = background.storage.read('status_1');
	console.log('the init status is ' + status);

	/*if (chrome && chrome.runtime && chrome.runtime.setUninstallURL) {
		chrome.tabs.create({url: "Seeyou.html"});
	}*/

	chrome.runtime.onInstalled.addListener(function (details) {
		if (details && details.reason && details.reason == 'install')window.setTimeout(function(){ chrome.tabs.create({url: "Welcome.html"});},1000);
	});

})();
/*
   */
background.double();



