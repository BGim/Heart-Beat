//Facebook.js auto Click Your Heart Beat For facebook

function autoclick() {  
	var Heart=document.getElementsByClassName('_khz _4sz1 _4rw5 _3wv2'); 	
	for(var i=0;i<Heart.length;i++){
		if(Heart[i].firstChild.attributes[0].value=='false'){ 
			Heart[i].firstChild.click(); 
		}
	}
};

function cancelclick() {  
	var Heart=document.getElementsByClassName('_khz _4sz1 _4rw5 _3wv2'); 	
	for(var i=0;i<Heart.length;i++){
		if(Heart[i].firstChild.attributes[0].value=='true'){ 
			Heart[i].firstChild.click(); 
		}
	}
}

/*
   */

var like_flag = setInterval(function(){autoclick()/*console.log('like....');*/},1500);
var cancellike_flag;  

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){		
		
		if(!message){
			console.log('abort');
    		}	
		
		if (message.action === 'Like') {
			clearInterval(cancellike_flag);
			//console.log(message.action);
			like_flag = setInterval(function(){autoclick() /*console.log('like....');*/},1500);
				
    		}else if (message.action === 'CancelLike'){	
			clearInterval(like_flag);
			//console.log(message.action);
			cancellike_flag = setInterval(function(){cancelclick()/*console.log('cancellike....');*/},1500); 	
				    		
		}else if (message.action === 'Stop'){
			//clearInterval(like_flag);
			clearInterval(cancellike_flag);
			
		};
	});
