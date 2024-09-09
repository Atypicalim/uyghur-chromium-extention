
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
var fontsUrl = "https://mydown.yesky.com/pcsoft/244340791.html";
var keyboardUrl = "https://Atypicalim.github.io/others/kirguzguch.html";
var emptyHeight = 150;
var buttonHeight = 42.5;

function runCommand(arguments) {
	chrome.tabs.query({active: true, currentWindow: true}).then(([tab]) => {
		arguments.target = {tabId: tab.id};
		chrome.scripting.executeScript(arguments)
	})
}

function onSizeChange(size) {
	runCommand({
		function: (fontSize) => {
			var es = document.all;
			for(var i=0;i<es.length;i++){ es[i].style.fontSize= + fontSize + 'px'; }
		},
		args: [size],
	})
}

function onFontClick(index) {
	runCommand({
		function: (font) => {
			var es = document.all;
			for(var i=0;i<es.length;i++){ es[i].style.fontFamily = font.font; }
		},
		args: [fonts[index]],
	})
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
	// https://github.com/Atypicalim/uyghurche
	runCommand({
		files: ['uyghurche.js'],
	})
}

document.fonts.ready.then(() => {
	run();
});
