const textarea = document.querySelector("textarea"),
    // downloadButton = document.querySelector(".Download"),
    voiceList = document.querySelector("select"),
    // audioElement = document.getElementById("audio"),
speakButton = document.getElementById("btn");

const body = document.querySelector('body');

let synth = speechSynthesis;
let isSpeaking = true;

function voices() {
    for (let voice of synth.getVoices()) {
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}> ${voice.name} (${voice.lang}) </option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices)

function textToSpeak(text) {
    let utter = new SpeechSynthesisUtterance(text);

    for (let voice of synth.getVoices()) {
        if (voice.name === voiceList.value) {
            utter.voice = voice;
        }
    }

    synth.speak(utter);
    console.log("background");
    body.style.background = 'url(/voice_ass/wave.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%'
}

speakButton.addEventListener("click", e => {
    e.preventDefault();
    if (textarea.value !== "") {
        if (!synth.speaking) {
            textToSpeak(textarea.value);
        }

        if (textarea.value.length > 80) {
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speakButton.innerText = "Pause";
                body.style.background = 'url(/voice_ass/wave.gif)';
                body.style.backgroundRepeat = 'repeat-x';
                body.style.backgroundSize = '100% 100%'
            }
            else {
                synth.pause();
                isSpeaking = true;
                speakButton.innerText = "Resume";
                body.style.background = 'linear-gradient(to right bottom, #d13cff, #031f6a)';
            }
            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speakButton.innerText = "Text To Speech";
                    body.style.background = 'linear-gradient(to right bottom, #d13cff, #031f6a)';
                }
            });
        } else {
            speakButton.innerText = "Text To Speech";
        }
    }
});

// function createAudioBlob(text) {
//     const utter = new SpeechSynthesisUtterance(text);
//     const selectedVoice = voiceList.value;

//     for (let voice of synth.getVoices()) {
//         if (voice.name === selectedVoice) {
//             utter.voice = voice;
//         }
//     }

//     return new Promise((resolve, reject) => {
//         utter.onend = resolve;
//         utter.onerror = reject;
//         synth.speak(utter);
//     });
// }
// downloadButton.addEventListener("click", async () => {
//     const Text = textarea.value;

//     if (Text !== "") {
//         await createAudioBlob(text);
//         const blob = new Blob([new XMLSerializer().serializeToString(audioElement)], {
//             type: "audio/wav"
//         });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = "text-to-speech.wav";
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         URL.revokeObjectURL(url);
//     }
// });