var $j = jQuery.noConflict();
var TEXT_NODE = 3;
//$j("body").append("ho");
//console.log($j("span").text());

/*
function banana(vowel) {
    console.log("BANANA");

    // Retrieving Facebook elements (trial and error)
    // - "span" for user text elements (comments have weird names)
    // - ".userContent" for posts
    // - "._1x_" is link title
    // - "._1y1" is link desc
    // - "a" is comment links
    $j("a, span, ._1x_, .1y1, .userContent").each(function() {
        
        var content_text = $j(this).text();
        var content_html = $j(this).html();
        if (content_html.match(/<img.*>/) === null) { //make sure we don't have images
            $j(this).text(replace_vowels(content_text, vowel));
        }
        else {
            console.log(content_text);
        }
        

        //SHOUTING
        //$j(this).text($j(this).text().toUpperCase());
    });
}

function replace_vowels(str, vowel) {
    var lower = vowel.toLowerCase();
    var upper = vowel.toUpperCase();
    var pattern_lower = /[aeiou]/g;
    var pattern_upper = /[AEIOU]/g;

    return str.replace(pattern_lower, lower).replace(pattern_upper, upper);
}
*/


function banana_text(str, vowel) {
    var vowel_lower = vowel.toLowerCase();
    var vowel_upper = vowel.toUpperCase();
    var pattern_lower = /[aeiou]/g;
    var pattern_upper = /[AEIOU]/g;
    var control_lower = "a";
    var control_upper = control_lower.toUpperCase();

    var temp = str.replace(vowel_lower, control_lower).replace(vowel_upper, control_upper);

    return temp.replace(pattern_lower, vowel_lower).replace(pattern_upper, vowel_upper);
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
        console.log(sender.tab);
        banana_page(request.vowel);
        sendResponse({msg: "this is what's up"});
    }
);

/*
    TODO:
    - Shuffle the intermediate characters (charles -> clraehs)
    - Maintain photos n such (don't destroy)
    - Do as button not just automatic on every page
    - Respond to events (scroll, reload, etc.)

*/