//Challenge 1: Age in days
function getAge(){
    let age = prompt("What is your age?");
    let days = age*365;
    var h1 = document.createElement('h1');
    var ageInDays = document.createTextNode('Age in Days: '+ days);
    h1.setAttribute('id','ageInDays');
    h1.appendChild(ageInDays);
    document.getElementById('challenge1Result').appendChild(h1);
}

function reset() {
    document.getElementById('ageInDays').remove();
}


//Challenge 2: Generate flower images
function generateFlower(){
    let flowerImg = document.createElement('img');
    flowerImg.src="flower.jpeg";
    flowerImg.style = 'width:200px;height:200px;margin:10px;'
    flowerImg.setAttribute('class','flowerImg');
    document.getElementById('challenge2Result').appendChild(flowerImg);
}

function flowerReset(){
    while(document.getElementsByClassName('flowerImg')[0]){
        document.getElementsByClassName('flowerImg')[0].remove();
    }
}

//Challenge 3: Rock, Paper, Scissor Game
function rpsGame(imageChoice){
    let weaponOption = ['rock','paper','scissor'];
    let index = Math.floor(( Math.random()*100 ) % 3);
    cpuWeapon = weaponOption[index];    
    userWeapon = imageChoice.id;
    var result = gameResult(userWeapon,cpuWeapon);
    frontEnd(userWeapon,cpuWeapon,result);
}

function gameResult(userWeapon,cpuWeapon){
    var result = "Game Tied";
    if(userWeapon=='paper'){
        if(cpuWeapon=='scissor')   result='You Lost';
        if(cpuWeapon=='rock')      result='You Won';
    }
    else if(userWeapon=='scissor') {
        if(cpuWeapon=='paper')     result='You Win';
        if(cpuWeapon=='rock')      result='You Lost';
    }
    else if(userWeapon=='rock') {
        if(cpuWeapon=='paper')     result='You Lost';
        if(cpuWeapon=='scissor')   result='You Won';
    }
    return result;
}

function frontEnd(userWeapon,cpuWeapon,result){
    document.getElementById("rpsImages").setAttribute('style','display:none');
    document.getElementById("rpsReset").removeAttribute('style');
    var userImage = document.createElement('img');
    userImage.src = 'static/images/'+userWeapon+'.jpeg';
    var cpuImage = document.createElement('img');
    cpuImage.src = 'static/images/'+cpuWeapon+'.jpeg';
    var resultDiv = document.getElementById('challenge3Result')
    var resultHeading = document.createElement('h3');
    resultHeading.innerText = result;
    resultDiv.appendChild(userImage);
    resultDiv.appendChild(cpuImage);
    resultDiv.appendChild(resultHeading);
}

function rpsReset() {
    document.getElementById('rpsImages').removeAttribute('style');
    document.getElementById("rpsReset").setAttribute('style','display:none');
    document.getElementById('challenge3Result').innerHTML = ''
}


//Challenge 4: Change color of all buttons

let allButtons = document.getElementsByTagName('button');
let copyButtons = [];
for(let i=0;i<allButtons.length;i++)
    copyButtons.push(allButtons[i].classList[1]);

function changeButtonsColor(selectedOption){
    if(selectedOption.value === 'red'){
        changeColorRed();
    }else if(selectedOption.value === 'green') {
        changeColorGreen();
    }else if(selectedOption.value === 'blue') {
        changeColorBlue();
    }else if(selectedOption.value === 'random') {
        changeColorRandom();
    }else if(selectedOption.value === 'reset') {
        changeColorReset();
    }
}

function changeColorRed() {
    for(let i=0;i<allButtons.length;i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}

function changeColorGreen() {
    for(let i=0;i<allButtons.length;i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}

function changeColorBlue() {
    for(let i=0;i<allButtons.length;i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-primary');
    }
}


function changeColorReset() {
    for(let i=0;i<allButtons.length;i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyButtons[i]);
    }
}

function changeColorRandom() {
    for(let i=0;i<allButtons.length;i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(getRandomButtonClass());
    }
}

function getRandomButtonClass(){
    buttonClasses = ['btn-primary','btn-danger','btn-success','btn-warning'];
    var randomIndex = Math.floor(((Math.random()*100)%buttonClasses.length));
    return buttonClasses[randomIndex];
}

//                              Challenge 5: Blackjack
let userScore = 0;
let botScore = 0;

document.querySelector('#hitButton').addEventListener('click',generateUserCard);
document.querySelector('#standButton').addEventListener('click',generateBotCard);
document.querySelector('#dealButton').addEventListener('click',resetBlackjack);

let hitSound = new Audio('static/sounds/swish.m4a');
let winSound = new Audio('static/sounds/cash.mp3');
let loseSound = new Audio('static/sounds/aww.mp3');

let result = {'user':{'color':'green','text':'You won!','audio':winSound,'status':'wins'},
              'bot':{'color':'red','text':'You lost!','audio':loseSound,'status':'loses'},
              'draw':{'color':'yellow','text':'You draw!','audio':loseSound,'status':'draws'}};

let stats = {'wins':0,'loses':0,'draws':0};

let isStand = false;
let turnsOver = false;

function generateUserCard() {
    if(isStand) return;
    if(userScore > 21)  return;
    let randomCard = getRandomCard();
    userScore += randomCard['value'];
    updateScore(userScore,'userScore');
    appendImage(randomCard,'userArea');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function generateBotCard() {
    isStand = true;
    if(botScore > 21){
        updateGameResult(computeWinner());
        return ;
    }
    let randomCard = getRandomCard();
    botScore += randomCard['value'];
    updateScore(botScore,'botScore');
    appendImage(randomCard,'botArea');
    await sleep(1000);
    let winner = computeWinner();
    if(!(winner ===  'bot'))    
        generateBotCard();
    else 
        updateGameResult(winner);
}

function computeWinner() {
    let winner = 'not working';
    if(userScore <= 21){
        if(botScore > 21)   winner = 'user';
        else if(botScore>userScore) winner = 'bot';
        else if(botScore==userScore)    winner = 'draw';
    }
    else if(userScore > 21){
        if(botScore <= 21)  winner = 'bot';
        else if(botScore > 21) winner = 'draw';
    }
    return winner;
}

function updateStatistics() {
    document.querySelector('#userWins').textContent = stats['wins'];
    document.querySelector('#userLoses').textContent = stats['loses'];
    document.querySelector('#userDraws').textContent = stats['draws'];
}

function updateScore(score,activePlayer){
    if(score>21){
        document.getElementById(activePlayer).textContent = 'BUST!';
        document.getElementById(activePlayer).style.color = 'red';

    } else {
        document.getElementById(activePlayer).innerText = score;
    }
}

function appendImage(randomCard,activePlayer){
    var activePlayerArea = document.getElementById(activePlayer);
    var imageTag = document.createElement('img');
    imageTag.src = 'static/images/cards/'+randomCard['card'] + '.png';
    imageTag.classList.add('gameCard');
    activePlayerArea.appendChild(imageTag);
    hitSound.play(); 
}

function getRandomCard() {
    let allCards = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    let randomIndex = Math.floor((Math.random()*100)%allCards.length);
    return {'card':allCards[randomIndex],'value':randomIndex+1};
}

function resetBlackjack() {
    if(!turnsOver)  return;
    document.querySelector('#userArea').innerHTML = '';
    document.querySelector('#botArea').innerHTML = '';
    userScore = 0;
    botScore = 0;
    document.querySelector('#userScore').textContent = '0';
    document.querySelector('#botScore').textContent = '0';

    document.querySelector('#userScore').style.color = 'white';
    document.querySelector('#botScore').style.color = 'white';

    document.querySelector('#gameResult').textContent = 'Lets play!';
    document.querySelector('#gameResult').style.color = 'black';

    turnsOver = false;
    isStand = false;
}

function updateGameResult(winner) {
    turnsOver = true;
    console.log(winner);
    let resultDiv = document.querySelector('#gameResult');
    console.log(result[winner]);
    resultDiv.textContent = result[winner]['text'];
    resultDiv.style.color = result[winner]['color'];
    result[winner]['audio'].play();
    stats[result[winner]['status']]++; 
    updateStatistics();
}