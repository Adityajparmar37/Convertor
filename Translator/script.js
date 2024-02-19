const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchangeIcon = document.querySelector(".exchange");
const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("button");
icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    // console.log(tag);

    for (const country_code in countries) {
        // console.log(countries[country_code]);
        let selected;
        if (id == 0 && country_code == "en-GB") {
            selected = "selected";
        } else if (id == 1 && country_code == "hi-IN") {
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }

});



exchangeIcon.addEventListener("click",()=>{
    let tempText = fromText.value,
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText
    selectTag[1].value = tempLang;
})



translateBtn.addEventListener("click",()=>{
    let text = fromText.value;
    translateFrom = selectTag[0].value,
    translateto = selectTag[1].value;

    if(!text) return;
    toText.setAttribute("placehoder","Translating..");

    let apiURL=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateto}`

    fetch(apiURL).then(res => res.json()).then(data=>{
        // console.log(data);
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placehoder","Translation");
    });
});

icons.forEach(icon =>{
    icon.addEventListener("click", ({target})=>{
        // console.log(target);

        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
                navigator.clipboard.writeText(fromText.value);
            }else{
                navigator.clipboard.writeText(toText.value);
            }
        }else{
            let utterance;

            if(target.id=="from"){
                utterance = new SpeechSynthesisUtterance(fromText.value)
                utterance.lang = selectTag[0].value;

            }else{
                utterance = new SpeechSynthesisUtterance(toText.value)
                utterance.lang = selectTag[1].value;
            }

            speechSynthesis.speak(utterance);
        }
    });
})