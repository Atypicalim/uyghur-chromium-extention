
//chrome.tabs.executeScript(null,{code:"alert(123);"});
//chrome.tabs.executeScript(null,{code:"document.body.style.background='red';"});
//window.close();


var elements = document.getElementsByTagName('button');
for(var i=0;i<elements.length;i++){
	elements[i].onclick = function(){

		//chrome.tabs.executeScript(null,{code:"var divs = document.all; for(var i=0;i<divs.length;i++){ divs[i].style.background='red'; }"});
		chrome.tabs.executeScript(null,{code:"var divs = document.all; for(var i=0;i<divs.length;i++){ divs[i].style.fontFamily='alkatip basma tom'; }"});
		//chrome.tabs.executeScript(null,{code:"var ps = document.getElementsByTagName('p'); for(var i=0;i<ps.length;i++){ ps[i].style.fontFamily='alkatip basma tom'; }"});
		//chrome.tabs.executeScript(null,{code:"document.body.getElementsByTagName('div').style.fontFamily='alkatip basma tom'"});
		//chrome.tabs.executeScript(null,{code:"alert('ok');"});
	};
}




