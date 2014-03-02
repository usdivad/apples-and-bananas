//Constant to check HTML nodeType
var TEXT_NODE = 3;

//Adapted from https://czone.eastsussex.gov.uk/sites/gtp/library/core/english/Documents/phonics/Table%20of%20phonemes.pdf
var phonemes = {
    a: ["a"],
    e: ["e", "eh"],
    i: ["i", "y"],
    o: ["o", "aw", "ah"],
    u: ["u", "uh"],
    ai: ["ai", "ay", "ae", "ey"],
    ee: ["ee", "ea", "ie"],
    igh: ["igh", "ie", "y"],
    oa: ["oa", "ow", "oh", "oe"],
    oo: ["oo", "ew", "ue", "uu"]
}

//Simplified phoneme list
//Nothing that doesn't match vowel pattern (uh,oh,aw)
var phonemes_simple = {
    a: ["a"],
    e: ["e"],
    i: ["i"],
    o: ["o", "aa"],
    u: ["u"],
    ai: ["ai", "ay", "ae", "ey"],
    ee: ["ee", "ea", "ie"],
    igh: ["ai", "ie", "y"],
    oa: ["oa", "oe"],
    oo: ["oo", "ue", "uu"]
}

/*
 * Alternate implementation of banana_text
 */

//Choose a random "glue" between each split term each time
Array.prototype.join_rand = function(list) {
    var joined = "";
    for (var i=0; i<this.length; i++) {
        var glue = list[Math.floor(Math.random()*list.length)];
        joined += this[i] + glue;
    }
    return joined;
}

//Wrapper; convert all strings in array to upper case
Array.prototype.toUpperCase = function() {
    for (var i=0; i<this.length; i++) {
        this[i] = this[i].toUpperCase();
    }
}


function banana_text_variation(text, phoneme) {
    var str = text;
    var pattern_lower = /[aeiou]+/;
    var pattern_upper = /[AEIOU]+/;
    var graphemes = phonemes[phoneme];
    str = text.split(pattern_lower).join_rand(graphemes);
    //Come back to this one below
    //str = text.split(pattern_upper).join_rand(graphemes.toUpperCase());

    return str;
}

/*
 * Banana procedure; functions defined in micro to macro order
 */

//Convert inner text into bananafied version
function banana_text(text, phoneme) {
    var str = text;
    var graphemes = phonemes_simple[phoneme];
    var vowel = graphemes[Math.floor(Math.random()*graphemes.length)];
    var vowel_lower = vowel.toLowerCase();
    var vowel_upper = vowel.toUpperCase();
    var pattern_lower = /[aeiouy]+/g;
    var pattern_upper = /[AEIOUY]+/g;

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

//Bananafies nodes IF they're text nodes; apply recursively
function banana_nodes(nodes, phoneme) {
    for (var i=0; i<nodes.length; i++) {
        if (nodes[i].nodeType == TEXT_NODE) {
            nodes[i].nodeValue = banana_text(nodes[i].nodeValue, phoneme);
        }
        else {
            banana_nodes(nodes[i].childNodes, phoneme); //the recursive call!
        }
    }
}

//Bananafies the whole page
function banana_page(phoneme) {
    var nodes = document.getElementsByTagName("body");
    banana_nodes(nodes, phoneme);
}


/*
 * Chrome calls
 */
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        //Bananafication!
        banana_page(request.phoneme);

        //Tab<->extension messaging check in tab console
        var msg = "this is what's up";
        console.log("You said: " + request.msg + "\nI said: "+ msg);
        sendResponse({msg: msg});
    }
);

/*
    TODO:
    - More complex phonemes (but it'll make it run slower, no?; iterate through all graphemes)
    - banana_text_variation() randomness

*/