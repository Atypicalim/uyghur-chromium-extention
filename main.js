
//chrome.tabs.executeScript(null,{code:"alert(123);"});
//chrome.tabs.executeScript(null,{code:"document.body.style.background='red';"});
//window.close();


var elements = document.getElementsByTagName('button');
for(var i=0;i<elements.length;i++){
	elements[i].onclick = clickHandle;
}
//alert(elements);

//document.getElementsByTagName("button").click = function(){
//	chrome.tabs.executeScript(null,{code:"alert(123);"});
//}

function clickHandle(element){
	//var a = element.id;
	chrome.tabs.executeScript(null,{code:"alert("+element+");"});
}

// document.addEventListener('DOMContentLoaded', function () {      
//     var button = document.getElementsByTagName('button');
//     for (var i = 0; i < input.length; i++) {
//         if (button[i].value == '运行') {
//             button[i].addEventListener('click', function () {
//                 //document.getElementById('10').value = "hello";
//                 chrome.tabs.executeScript(null,{code:"alert(999);"});
//             });
//         }
//     }
// });

//alert(document.getElementsByTagName('button')[1].value);
//chrome.tabs.executeScript(null,{code:"alert(document.title);"});




