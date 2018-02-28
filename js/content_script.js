
//content_script.js auto Click Your Heart Beat


function autoclick() {  
	var Heart=document.getElementsByClassName('item qz_like_btn_v3'); 
	for(var i=0;i<Heart.length;i++){ 
		if(Heart[i].attributes[6].value=='like'){ 
			Heart[i].firstChild.click();
		}
	}
};

function cancelclick() {  
	var Heart=document.getElementsByClassName('item qz_like_btn_v3'); 
	for(var i=0;i<Heart.length;i++){ 
		if(Heart[i].attributes[6].value=='cancellike'){ 
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
			console.log(message.action);
			//clearInterval(like_flag);
			clearInterval(cancellike_flag);
			
		};
	});
