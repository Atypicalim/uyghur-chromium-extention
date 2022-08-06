
// fotns and their names to be used to create buttons 
var FONTS = [
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

var fonts =[];
var buttonsNode = document.getElementById("buttons");
var fontsUrl = "https://gitee.com/kompasim/uyghurFonts";
var keyboardUrl = "https://kompasim.github.io/others/kirguzguch.html";
var emptyHeight = 150;
var buttonHeight = 42.5;

function onSizeChange(size) {
	var command = "var es = document.all; for(var i=0;i<es.length;i++){ if((es[i]['tagName']=='IFRAME')||(es[i]['tagName']=='FRAME')){ var w=es[i].contentWindow; var wes = w.document.all; for(var j=0;j<wes.length;j++){ wes[j].style.fontSize='" + size + "px'; }  } es[i].style.fontSize='" + size + "px'; }";
	chrome.tabs.executeScript(null,{code:command});
}

function onFontClick(index) {
	var conf = fonts[index];
	var font = conf.font;
	var command = "var es = document.all; for(var i=0;i<es.length;i++){ if((es[i]['tagName']=='IFRAME')||(es[i]['tagName']=='FRAME')){ var w=es[i].contentWindow; var wes = w.document.all; for(var j=0;j<wes.length;j++){ wes[j].style.fontFamily='" + font + "'; }  } es[i].style.fontFamily='" + font + "'; }";
	chrome.tabs.executeScript(null,{code:command});
}

function createFontButtons() {
	for (const index in fonts) {
		var font = fonts[index];
		var button = document.createElement("button");
		button.textContent = font.name;
		button.onclick = function(){
			onFontClick(index);
		}
		buttonsNode.appendChild(button);
	}
}

function createDownloadButton() {
	var button = document.createElement("button");
	button.textContent = "فونتلار";
	button.onclick = function(){
		window.open(fontsUrl, '_blank').focus();
	}
	buttonsNode.appendChild(button);
}

function run() {
	for (const key in FONTS) {
		var font = FONTS[key];
		if (!document.fonts.check("16px '" + font.font + "'")) continue;
		fonts.push(font);
	}
	//
	var height = emptyHeight;
	if (fonts.length > 0) {
		createFontButtons();
		height = height + buttonHeight * fonts.length;
	} else {
		createDownloadButton();
		height = height + buttonHeight;
	}
	document.body.style.height = height + 'px';
	//
	document.getElementById("range").onchange = function(){
		onSizeChange(this.value);
	}
	document.getElementById("keyboard").onclick = function(){
		window.open(keyboardUrl, '_blank').focus();
	}
}

document.fonts.ready.then(() => {
	run();
});
