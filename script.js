
const avatarImg = document.querySelector('.avatar')
const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
const outputInsults = document.querySelector('.insults')
const header = document.querySelector('.topic')
const download = document.querySelector('.download')
const reload = document.querySelector('.reload')
const share = document.querySelector('.share')

const y = document.querySelector(".topic")
const b = document.querySelector(".nameInput")
const c = document.querySelector(".button")
const e = document.querySelector(".copyRights")
e.hidden = true
download.hidden = true
reload.hidden = true
share.hidden = true


var userName = document.querySelector('.nameInput');

const button = document.querySelector('.button')
button.hidden = true
var inputName = "";
var gender;

var urlExtra = 'https://api.dicebear.com/5.x/adventurer/svg?size=200&scale=90&radius=50';
var seed = '';
var hair = '';
var num;

var url = "https://api.dicebear.com/5.x/adventurer/svg?size=200&scale=90&radius=50";

const earring = parseInt(Math.random() * 6);
//console.log(url);



userName.addEventListener('keyup', () => {
    inputName = userName.value;
    //console.log(inputName)
    var foundGender = "";
    fetch('https://api.genderize.io/?name=' + inputName)
    .then((res) => res.json())
    .then((data) => {
        foundGender = data.gender;
        gender = foundGender;
        if(inputName.length > 2){
            changeAvatar();
            button.hidden = false
        }else{
            button.hidden = true
        }
    })
    //console.log(url);
})

const changeAvatar = function(){
    seed = '&seed=' + userName.value;
    if(gender == 'male'){
        num = parseInt(Math.random() * 19);
        if(num==0) num=1;
        hair = '&hair=short' + ("0" + num).slice(-2);
    }
    if(gender == 'female'){
        num = parseInt(Math.random() * 26);
        if(num == 0) num = 1;
        hair = '&hair=long' + ("0" + num).slice(-2);
    }
    urlExtra = `${url}${seed}${hair}`
    //console.log(urlExtra);
    avatarImg.innerHTML = `
    <img
        src=${urlExtra}
        alt="avatar"
    />
    `
}

function hideElement(hide){
    if(hide.hidden === false){
        hide.hidden = true
    }else{
        hide.hidden = false
    }
}







button.addEventListener("click", () => {
    inputName = userName; 
    if (inputName.value === "manoj"){
        Toastify({
            text: "Sorry, you can't insult the creator",
            duration: 3000,
            close: true,
            gravity: "bottom", 
            position: "center",
            stopOnFocus: true, 
            style: {
              background: "orange",
              borderRadius: "8px"
            },
          }).showToast();
    }
    else if(itemsArray.includes(inputName.value)){
        var insults = "How many times in a day should I insult you ?" 

        outputInsults.innerHTML = `
        <h3>
            ${insults}
        </h3>
        `
        hideElement(b)
        hideElement(c)
        hideElement(e)
        hideElement(download)
        hideElement(reload)
        hideElement(share)
        changeElement()
    }
    
    else if (inputName.value != "" ) {
        createItem(inputName) 
        randomInsults()
        hideElement(b)
        hideElement(c)
        hideElement(e)
        hideElement(download)
        hideElement(reload)
        hideElement(share)
        changeElement()

    }


    
})



reload.addEventListener("click", () => {
    location.reload()
})




download.addEventListener("click", () => {

})






function createItem(item){
    itemsArray.push(item.value)
    localStorage.setItem('items', JSON.stringify(itemsArray))
}

function getRandomNumber(min, max) {
    let step1 = max - min + 1 
    let step2 = Math.random() * step1
    let result = Math.floor(step2) + min
    
    return result
}

const randomInsults = function() {
    fetch("./insults.json")
    .then((res) => res.json())
    .then((data) => {
        insults = data.insults

        let index = getRandomNumber(0, insults.length-1)
        outputInsults.innerHTML = `
        <h3>
            ${insults[index]}
        </h3>
        `
    })
    
}


function changeElement() {

    header.innerHTML = `
    <h1 style="font-size: 35px;">
        ${inputName.value}
    </h1>
    `    
}


