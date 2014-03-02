var TEXT_NODE = 3;

function banana_text(text, vowel) {
    var str = text;
    var vowel_lower = vowel.toLowerCase();
    var vowel_upper = vowel.toUpperCase();
    var pattern_lower = /[aeiou]+/g;
    var pattern_upper = /[AEIOU]+/g;

    //Replacing all vowels with the specified vowel
    str = str.replace(pattern_lower, vowel_lower).replace(pattern_upper, vowel_upper);

    //Crude check for "beginnings of words" in terms of capitalization
    //The problem with replacing "I" is that it could be in context of "I LOVE YOU" or "I love you"
    if (vowel_lower.length > 1) {
        var pattern_beginning = new RegExp(vowel_upper + "(?![A-Z])", "g");
        var vowel_beginning = vowel_upper.substring(0, 1) + vowel_lower.substring(1, vowel_lower.length);
        str = str.replace(pattern_beginning, vowel_beginning);
    }

    return str;
}


function banana_nodes(nodes, vowel) {
    for (var i=0; i<nodes.length; i++) {
        if (nodes[i].nodeType == TEXT_NODE) {
            nodes[i].nodeValue = banana_text(nodes[i].nodeValue, vowel);
        }
        else {
            banana_nodes(nodes[i].childNodes, vowel); //the recursive call!
        }
    }
}

function banana_page(vowel) {
    var nodes = document.getElementsByTagName("body");
    banana_nodes(nodes, vowel);
}


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var msg = "this is what's up";
        console.log("You said: " + request.msg + "\nI said: "+ msg);
        banana_page(request.vowel);
        sendResponse({msg: msg});
    }
);

/*
    TODO:
    - Shuffle the intermediate characters (charles -> clraehs)
    - Maintain photos n such (don't destroy)
    - Do as button not just automatic on every page
    - Respond to events (scroll, reload, etc.)

*/