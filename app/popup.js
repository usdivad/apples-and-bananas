window.onload = function() {
    console.log("load");

    document.getElementById("o1").addEventListener("click", function() {
        chrome.tabs.executeScript(null, {code:"console.log('ho')"});
        chrome.tabs.query({active: true, currentWindow: true}, 
            function(tabs) {
                var msg = "whatup?"
                chrome.tabs.sendMessage(tabs[0].id, {vowel: "ee", msg: msg}, function(response) {
                    console.log("I said: " + msg + "\nYou said: "+ response.msg);
                });
        });

    });

    //console.log("hey");
};

/*
function replace_vowels(vowel) {
    //var body_text = $("body").text();
    alert("op");
    var pattern = /[aeiou]+/g;

    chrome.tabs.executeScript(null, {code:"console.log('yo')"});
    
    chrome.tabs.executeScript(null,
        //{code:"document.body.innerText='" + body_text.replace(pattern, vowel) + "'"});
        {code: "document.body.innerText = document.body.innerText.replace("
                + pattern + "," + "'"+vowel+"'" + ")"});

    //window.close();
}
*/

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