let form = document.querySelector("form");
let sr = window.webkitSpeechRecognition || window.SpeechRecognitionAlternative;
let speech = new sr();

const body = document.querySelector('body');

form[0].addEventListener("click", () => {

    var dropdown = document.getElementById("selects");
    var language = dropdown.options[dropdown.selectedIndex].value;

    // console.log(language);



    // const synth = window.speechSynthesis;

    speech.lang = language;
})
speech.continuous = true;
speech.interimResults = true;

// console.log(speech);

form.addEventListener("submit", e => {
    e.preventDefault();
    speech.start();

    //wave effects
    body.style.background = 'url(./other/wave.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%'
})

speech.onresult = res => {
    let text = Array.from(res.results)
        .map(r => r[0])
        .map(txt => txt.transcript)
        .join("");
    form[1].value = text;


    // if(text="I am Arpan"){
    //     const speaktext = new SpeechSynthesisUtterance("get lost");
    //     synth.speak(speaktext);
    //     // speak.stop();
    // }
    console.log(text);
}

form[3].addEventListener("click", () => {
    speech.stop();
    body.style.background = 'linear-gradient(to right bottom, #d13cff, #031f6a)';
})

const copy_btn = document.getElementById("copy_id");

form[4].addEventListener("click", () => {
    let copy_txt = document.querySelector('.textarea');
    copy_txt.select();
    document.execCommand('copy');

    copy_btn.style.background = '#a6a6a6';
    copy_btn.style.boxShadow = '6px 6px 5px 0px rgba(0,0,0,0.75) inset';

    setTimeout(() => {
        copy_btn.style.background = '#0ea4da';
        copy_btn.style.boxShadow = '0px 1px 2px 0px rgba(0, 255, 255, 0.7),1px 2px 4px 0px rgba(0, 255, 255, 0.7),2px 4px 8px 0px rgba(0, 255, 255, 0.7),2px 4px 16px 0px rgba(0, 255, 255, 0.7)';
    }, 1000)
})



