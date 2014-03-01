var $j = jQuery.noConflict();
$j("body").append("ho");
//console.log($j("span").text());

/**
    Retrieving Facebook elements (trial and error)

    - "span" for user text elements (comments have weird names)
    - ".userContent" for posts
    - "._1x_" is link title
    - "._1y1" is link desc
    - "a" is comment links

**/
$j("span, a, ._1x_, .1y1, .userContent").each(function() {
    
    var content_text = $j(this).text();
    var content_html = $j(this).html();
    if (content_html.match(/<img.*>/) === null) { //make sure we don't have images
        $j(this).text(replace_vowels(content_text, "oo"));
    }
    else {
        console.log(content_text);
    }
    

    //SHOUTING
    //$j(this).text($j(this).text().toUpperCase());
});

function replace_vowels(str, vowel) {
    var lower = vowel.toLowerCase();
    var upper = vowel.toUpperCase();
    var pattern_lower = /[aeiou]/g;
    var pattern_upper = /[AEIOU]/g;

    return str.replace(pattern_lower, lower).replace(pattern_upper, upper);
}

/*
    TODO:
    - Shuffle the intermediate characters (charles -> clraehs)
    - Maintain photos n such (don't destroy)

*/