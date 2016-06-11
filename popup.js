
//chrome.tabs.executeScript(null,{code:"alert(123);"});
//chrome.tabs.executeScript(null,{code:"document.body.style.background='red';"});
//window.close();

// var iframes = document.getElementsByTagName("iframe");
// for(var i=0; i<iframes.length;i++){
// 	console.log(iframes[i]['tagName']);
// }
// iframe.contentWindow
// chrome.tabs.executeScript(null,{code:"alert('"+val+"')"});


// fotns and their names to be used to create buttons 
var fonts = [
	{"name":"تور ","font":"UKIJ Tuz Tor"},
	{"name":"نەقىش ","font":"UKIJ Tuz Neqish"},
	{"name":"كەسمە ","font":"UKIJ Chiwer Kesme"},
	{"name":"دىۋانى ","font":"UKIJ Diwani Tom"},
	{"name":"ئەسلىيە ","font":"UKIJ Esliye Chiwer"},
	{"name":"كەسمە ","font":"UKIJ Kesme"},
	{"name":"كۇفى ","font":"UKIJ Kufi"},
	{"name":"مەردانە ","font":"UKIJ Merdane"},
	{"name":"رۇقى ","font":"UKIJ Ruqi"},
	{"name":"سۇلۇس ","font":"UKIJ Sulus Tom"}
];

// get the father element for buttons 
var buttons = document.getElementById("buttons");
// create a button element to either of the fonts
fonts.forEach( function(element, index) {
	// create button
	var button = document.createElement("button");
	button.textContent = element["name"];
	button.onclick = function(){
		// add font family to all elements
		var command = "var es = document.all; for(var i=0;i<es.length;i++){ if(es[i]['tagName']=='IFRAME'){ var w=es[i].contentWindow; var wes = w.document.all; for(var j=0;j<wes.length;j++){ wes[j].style.fontFamily='"+element["font"]+"'; }  } es[i].style.fontFamily='"+element["font"]+"'; }";
		chrome.tabs.executeScript(null,{code:command});
		// add something else
	}
	// append to the father element
	buttons.appendChild(button);

});

// listener to the input range component for font size
var inputRange = document.getElementById("range");
inputRange.onchange = function(){
	var command = "var es = document.all; for(var i=0;i<es.length;i++){ if(es[i]['tagName']=='IFRAME'){ var w=es[i].contentWindow; var wes = w.document.all; for(var j=0;j<wes.length;j++){ wes[j].style.fontSize='"+inputRange.value+"px'; }  } es[i].style.fontSize='"+inputRange.value+"px'; }";

	//var command = "var es = document.all; for(var i=0;i<es.length;i++){ es[i].style.fontSize='"+inputRange.value+"px'; }";
	chrome.tabs.executeScript(null,{code:command});
}





