$(document).ready(function() {

    //handles event properly but doesn't execute script on tab
    /*$(".operator").click(function() {
        replace_vowels("ee");
    });*/

    //executes script on tab but doesn't wait for click
    $(".operator").click(replace_vowels("oo"));
    
    //document.getElementById("o1").addEventListener("click", replace_vowels("ee"));
    console.log("hey");
});

function replace_vowels(vowel) {
    //var body_text = $("body").text();
    alert("op");
    var pattern = /[aeiou]+/g;
    chrome.tabs.executeScript(null,
        {code: "console.log('asdf')"});
    chrome.tabs.executeScript(null,
        //{code:"document.body.innerText='" + body_text.replace(pattern, vowel) + "'"});
        {code: "document.body.innerText = document.body.innerText.replace("
                + pattern + "," + "'"+vowel+"'" + ")"});
    window.close();
}

function lookbehind(str, regex) {
    //return str.reverse().
}

String.prototype.reverse = function() {
    return this.split("").reverse().join("");
}


/*

(?=(<\/\S+>))
.replace(/[aeiou]+/g, "ee")

*/