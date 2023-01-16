const totext = document.querySelector(".to-text");
const fromtext = document.querySelector(".from-text");
const selectTag= document.querySelectorAll("select"),
translateBtn= document.querySelector("button"),
exchangeIcon=document.querySelector(".exchage"),
icons=document.querySelectorAll(".row i");
// console.log(fromtext)

selectTag.forEach((tag, id)=>{


    for(const countary_code in countries){
        let seleted;
        if(id == 0 && countary_code == "en-GB"){
            seleted="Selected";
        }else if(id == 1 && countary_code == 'hi-IN'){
            seleted = "selected";
        }
                let option= `<option value="${countary_code}" ${seleted}>${countries[countary_code]}</option>`;
                tag.insertAdjacentHTML("beforeend", option);

    }
   
})


exchangeIcon.addEventListener("click", ()=>{
    let temptext = fromtext.value,
    templang= selectTag[0].value;
    fromtext.value = totext.value;
    selectTag[0].value = selectTag [1].value;
    totext.value = temptext;
    selectTag[1].value = templang;
    
})


translateBtn.addEventListener("click", ()=>{
    let text = fromtext.value,
    translatefrom = selectTag[0].value,
    transtateto = selectTag[1].value;
    if(!text) return;
    totext.setAttribute("placeholder", "Trabakting...");
    let apurl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translatefrom}|${transtateto}`;
    fetch(apurl).then(res=> res.json()).then(date =>{
        console.log(date)
        totext.value =date.responseData.translatedText;
        totext.setAttribute("placeholder", "Trabakting...");
    })
    
})

icons.forEach(icon =>{
    icon.addEventListener("click" , (event)=>{
       
        if(event.target.classList.contains("fa-copy")){
            if(event.target.id == "from"){
                // console.log("form copy icon clikced")
                navigator.clipboard.writeText(fromtext.value);
            }else{
                // console.log("to copy icon clikced")
                navigator.clipboard.writeText(totext.value);
            }
        }
        else{
            let utterace;
            if(event.target.id == "from"){
                utterace = new SpeechSynthesisUtterance(fromtext.value);
                utterace.lang = selectTag[0].value;
            }else{
                // console.log("to copy icon clikced")
                utterace = new SpeechSynthesisUtterance(totext.value);
                utterace.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterace);
        }
    })
})