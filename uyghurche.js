// uyghurche kirguzguch (qarluq uime din ozgertildi)

var CALSS_UG_YES = "ug_yes"; // add this class to enable uyghur input
var CALSS_UG_NOT = "ug_not"; // add this class to disable uyghur input
var isGlobalUyghur = true; // set to false if u dont want to change all input areas
var isInputUyghur = true;
var isOnlyCtrl = false;
let CODE_CTRL = 17;
var CODE_RIGHT = 221;
var CODE_LEFT = 219;
let KEY_DOWN = "keydown";
let KEY_PRESS = "keypress";
let KEY_UP = "keyup";


var Input = {
    34: 34,
    47: 1574,
    63: 1567,
    44: 1548,
    109: 1605,
    77: 1605,
    110: 1606,
    78: 1606,
    98: 1576,
    66: 1576,
    118: 1736,
    86: 1736,
    99: 1594,
    67: 1594,
    120: 1588,
    88: 1588,
    122: 1586,
    90: 1586,
    97: 1726,
    65: 1726,
    115: 1587,
    83: 1587,
    100: 1583,
    68: 1688,
    102: 1575,
    70: 1601,
    103: 1749,
    71: 1711,
    104: 1609,
    72: 1582,
    106: 1602,
    74: 1580,
    107: 1603,
    75: 1734,
    108: 1604,
    76: 1604,
    59: 1563,
    113: 1670,
    81: 1670,
    119: 1739,
    87: 1739,
    101: 1744,
    69: 1744,
    114: 1585,
    82: 1585,
    116: 1578,
    84: 1600,
    121: 1610,
    89: 1610,
    117: 1735,
    85: 1735,
    105: 1709,
    73: 1709,
    111: 1608,
    79: 1608,
    112: 1662,
    80: 1662
};

function inputUyghur(e, src, kc) {
    kc = Input[kc];
    if (kc == null) return;
    var input = String.fromCharCode(kc);
    var text = src.value;
    var begin = src.selectionStart;
    var text1 = text.substring(0, begin);
    var text2 = text.substring(src.selectionEnd);
    src.value = text1.concat(input, text2);
    begin++;
    src.selectionStart = begin;
    src.selectionEnd = begin;
    if (e.preventDefault) e.preventDefault();
    var che = document.createEvent("HTMLEvents");
    che.initEvent("change", true, true);
    src.dispatchEvent(che);
}

function checkUIME(className) {
    if ((className).indexOf(CALSS_UG_YES) > -1) return 1;
    if ((className).indexOf(CALSS_UG_NOT) > -1) return -1;
    return isGlobalUyghur ? 1 : -1;
}

function changeDirection(target, isToRight) {
    console.log(target.classList);
    target.style.direction = isToRight ? "rtl" : "ltr";
    target.style.textAlign = isToRight ? "right" : "left";
}

function handleEvent(e) {
    //
    var targetNode = e.srcElement || e.target;
    var tagName = targetNode.tagName.toUpperCase();
    var keyCode = e.keyCode || e.which;
    var eventType = e.type;
    //
    var uimeStatus = checkUIME(targetNode.className);
    if (uimeStatus == -1) return;
    if (tagName != "TEXTAREA" && !(tagName == "INPUT" && (targetNode.getAttribute("type") == "text" || targetNode.type == 'text'))) return;
    // 
    if (!targetNode.isUyghurRegistered) {
        changeDirection(targetNode, true);
        targetNode.isUyghurRegistered = true;
    }
    //
    if (eventType == KEY_DOWN) {
        isOnlyCtrl = e.ctrlKey && keyCode == CODE_CTRL;
        if (keyCode == CODE_RIGHT) {
            changeDirection(targetNode, true);
        } else if (keyCode == CODE_LEFT) {
            changeDirection(targetNode, false);
        }
    }
    // 
    if (eventType == KEY_PRESS) {
        if (keyCode == 32 || e.altKey || e.metaKey || e.ctrlKey) return;
        isOnlyCtrl = false;
        if (targetNode.readOnly || targetNode.disabled) return;
        if (!isInputUyghur) return;
        inputUyghur(e, targetNode, keyCode);
    }
    // 
    if (eventType == KEY_UP) {
        if (keyCode != CODE_CTRL) isOnlyCtrl = false;
        if (isOnlyCtrl && keyCode == CODE_CTRL) {
            isInputUyghur = !isInputUyghur;
        }
    }
}

function registerUyghur() {
    document.addEventListener(KEY_DOWN, handleEvent, true);
    document.addEventListener(KEY_PRESS, handleEvent, true);
    document.addEventListener(KEY_UP, handleEvent, true);
}

if (document.readyState == "complete") {
    registerUyghur();
} else {
    window.addEventListener("load", registerUyghur, false);
}
