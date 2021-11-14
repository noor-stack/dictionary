const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input"),
synonyms = wrapper.querySelector(".synonyms .list"),
infoText = wrapper.querySelector(".info-text"),
volumeIcon = wrapper.querySelector(".word i");
removeIcon = wrapper.querySelector(".search span");
let audio;
//data function

function data(result,word){
    if(result.title){//if return message cant find word
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search another word.`;
    }
    else{
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0];
        phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`;


        //passing the response data to a particular html element
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phonetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerHTML = definitions.example;
        audio = new Audio("https:" + result[0].phonetics[0].audio);

        if(definitions.synonyms[0] == undefined){
            synonyms.parentElement.style.display = "none";
        }else{
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for (let i = 0; i < 5; i++) {   //getting only 5 synonyms out of many
                let tag = `<span onclick=search('${definitions.synonyms[i]}')>${definitions.synonyms[i]},</span>`;
                synonyms.insertAdjacentHTML("beforeend", tag);//passing only 5 synonyms div
            }
        }
    }
    
    
}

function search(word){
    searchInput.value = word;
    fetchApi(word);
    wrapper.classList.remove("active");
    
}
//fetch api function
function fetchApi(word){
    wrapper.classList.remove("active");
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(res => res.json()).then(result => data(result,word)); 
    //fetching api and retun with parsing into js obj and in another then
}

searchInput.addEventListener("keyup", e =>{
    if(e.key === "Enter" && e.target.value){
        fetchApi(e.target.value);
    }
});

volumeIcon.addEventListener("click", () =>{
   audio.play();
});

removeIcon.addEventListener("click", () =>{
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color = "#9a9a9a";
    infoText.innerHTML = `Type a word and press enter to get meaning, example, synonyms, etc.`;
});