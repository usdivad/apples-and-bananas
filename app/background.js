var $j = jQuery.noConflict();
$j("body").append("ho");
console.log($j("span").text());

/**
    Retrieving Facebook elements (trial and error)

    - "span" for user text elements (comments have weird names)
    - ".userContent" for posts
    - "._1x_" is link title
    - "._1y1" is link desc
    - "a" is comment links

**/
$j("span, a, ._1x_, .1y1, .userContent").each(function() {
    var text = $j(this).text();
    $j(this).text(text.replace(/[aeiou]/g, "oo")
                    .replace(/[AEIOU]/g, "OO"));
})