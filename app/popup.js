/*
 * Main
 */
window.onload = function() {
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
    ];
    var images = document.getElementsByTagName("img");

    options.innerHTML = populate_phonemes(phoneme_list);

    //Dropdown menu's "onchange" function
    options.addEventListener("change", function() {
        //chrome.tabs.executeScript(null, {code:"console.log('ho')"});
        var phoneme = options[options.selectedIndex].value; //== options.selectedOptions[0].value but more compatible
        send_to_tab(phoneme);
    });

    for (var i=0; i<images.length; i++) {
        images[i].addEventListener("click", function() {
            var phoneme = options[Math.floor(Math.random()*options.length)].value;
            send_to_tab(phoneme);
        })
    }

    //console.log("hey");
};

function send_to_tab(phoneme) {
    chrome.tabs.query({active: true, currentWindow: true}, 
        function(tabs) {
            //Send phoneme value as well as checker message to tab
            var msg = "whatup?";
            chrome.tabs.sendMessage(tabs[0].id, {phoneme: phoneme, msg: msg}, function(response) {
                console.log("I said: " + msg + "\nYou said: "+ response.msg);
        });
    });
}

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