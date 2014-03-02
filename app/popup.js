window.onload = function() {
    console.log("load");

    var options = document.getElementById("options");
    var operator = document.getElementById("operator");
    var phoneme_list = [
        {phoneme: "a", text: "apples and bananas"},
        {phoneme: "e", text: "epples end benehnehs"},
        {phoneme: "i", text: "ipples ind binihnihs"},
        {phoneme: "o", text: "opples ond bahnawnaws"},
        {phoneme: "u", text: "upples und buhnuhnuhs"},
        {phoneme: "ai", text: "aypples aynd baenaynays"},
        {phoneme: "ee", text: "eapples eend beeneenees"},
        {phoneme: "igh", text: "iepples aind bainainais"},
        {phoneme: "oa", text: "oapples oand boenoenoes"},
        {phoneme: "oo", text: "oopples uund boonoonoos"},
    ]

    options.innerHTML = populate_phonemes(phoneme_list);

    options.addEventListener("change", function() {
        chrome.tabs.executeScript(null, {code:"console.log('ho')"});
        chrome.tabs.query({active: true, currentWindow: true}, 
            function(tabs) {
                var vowel = options[options.selectedIndex].value; //== options.selectedOptions[0].value but more compatible
                var msg = "whatup?";
                chrome.tabs.sendMessage(tabs[0].id, {vowel: vowel, msg: msg}, function(response) {
                    console.log("I said: " + msg + "\nYou said: "+ response.msg);
                });
        });

    });

    //console.log("hey");
};

//Populates a <select> elements with values and text from a list of phonemes
function populate_phonemes(plist) {
    var html = "";
    for (var i=0; i<plist.length; i++) {
        var p = plist[i];
        html += "<option " + "value = '" + p.phoneme + "'>"
              + p.text + "</option>";
    }
    return html;
}

//Trying to implement lookbehind for regexes in Javascript
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