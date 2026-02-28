

let category = localStorage.getItem("category");

let xp = parseInt(localStorage.getItem("xp")) || 0;
let level = parseInt(localStorage.getItem("level")) || 1;
let streak = parseInt(localStorage.getItem("streak")) || 0;
let badge = localStorage.getItem("badge") || "Beginner";

let current = 0;
let timer;
let timeLeft = 15;

let correctSound = new Audio("https://www.soundjay.com/buttons/sounds/button-4.mp3");
let wrongSound = new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3");
let completeSound = new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");

let data = {

animals:[
{q:"Dog",a:"కుక్క",o:["కుక్క","పిల్లి","సింహం"]},
{q:"Cat",a:"పిల్లి",o:["కుక్క","పిల్లి","పక్షి"]},
{q:"Lion",a:"సింహం",o:["పులి","సింహం","ఏనుగు"]},
{q:"Tiger",a:"పులి",o:["పులి","కుక్క","గుఱ్ఱం"]},
{q:"Elephant",a:"ఏనుగు",o:["ఏనుగు","పిల్లి","పక్షి"]},
{q:"Monkey",a:"కోతి",o:["కోతి","సింహం","ఆవు"]},
{q:"Cow",a:"ఆవు",o:["ఆవు","మేక","పిల్లి"]}
],

food:[
{q:"Milk",a:"పాలు",o:["నీరు","పాలు","టీ"]},
{q:"Rice",a:"అన్నం",o:["అన్నం","రొట్టి","పాలు"]},
{q:"Water",a:"నీరు",o:["నీరు","టీ","పాలు"]},
{q:"Sugar",a:"చక్కెర",o:["ఉప్పు","చక్కెర","పాలు"]},
{q:"Salt",a:"ఉప్పు",o:["ఉప్పు","చక్కెర","అన్నం"]},
{q:"Egg",a:"గుడ్డు",o:["గుడ్డు","పాలు","టీ"]},
{q:"Fruit",a:"పండు",o:["పండు","కూర","నీరు"]}
],

basics:[
{q:"Yes",a:"అవును",o:["అవును","కాదు","ధన్యవాదాలు"]},
{q:"No",a:"కాదు",o:["అవును","కాదు","సరే"]},
{q:"Thank You",a:"ధన్యవాదాలు",o:["ధన్యవాదాలు","సరే","అవును"]},
{q:"Sorry",a:"క్షమించండి",o:["క్షమించండి","అవును","ధన్యవాదాలు"]},
{q:"Please",a:"దయచేసి",o:["దయచేసి","సరే","కాదు"]}
],

daily:[
{q:"Sun",a:"సూర్యుడు",o:["చంద్రుడు","సూర్యుడు","నక్షత్రం"]},
{q:"Moon",a:"చంద్రుడు",o:["సూర్యుడు","చంద్రుడు","గాలి"]},
{q:"Star",a:"నక్షత్రం",o:["నక్షత్రం","సూర్యుడు","నీరు"]},
{q:"House",a:"ఇల్లు",o:["ఇల్లు","పాఠశాల","ఆఫీస్"]},
{q:"School",a:"పాఠశాల",o:["ఇల్లు","పాఠశాల","బజార్"]}
],

travel:[
{q:"Bus",a:"బస్",o:["బస్","కారు","రైలు"]},
{q:"Train",a:"రైలు",o:["రైలు","బస్","కారు"]},
{q:"Car",a:"కారు",o:["కారు","బస్","రైలు"]},
{q:"Airport",a:"విమానాశ్రయం",o:["విమానాశ్రయం","పాఠశాల","బజార్"]},
{q:"Ticket",a:"టికెట్",o:["టికెట్","కారు","గుడి"]}
],

emotions:[
{q:"Happy",a:"సంతోషం",o:["సంతోషం","బాధ","కోపం"]},
{q:"Sad",a:"బాధ",o:["బాధ","సంతోషం","ఆనందం"]},
{q:"Angry",a:"కోపం",o:["కోపం","బాధ","నిద్ర"]},
{q:"Love",a:"ప్రేమ",o:["ప్రేమ","కోపం","బాధ"]},
{q:"Fear",a:"భయం",o:["భయం","సంతోషం","కోపం"]}
]

};

let sentenceQuiz = [
{q:"I am fine",a:"నేను బాగున్నాను",o:["నేను బాగున్నాను","నేను వెళ్లాను","నేను తిన్నాను"]},
{q:"How are you?",a:"మీరు ఎలా ఉన్నారు?",o:["మీరు ఎలా ఉన్నారు?","మీరు ఎక్కడ ఉన్నారు?","మీరు ఏమి చేస్తున్నారు?"]}
];

let questions;

if(level >= 3 && category === "daily"){
questions = sentenceQuiz;
document.getElementById("categoryTitle").innerText = "Sentence Practice 🔓";
}else{
questions = data[category];
document.getElementById("categoryTitle").innerText = category.toUpperCase();
}

load();

function load(){
let q = questions[current];
document.getElementById("question").innerText = q.q;
document.getElementById("options").innerHTML = "";
document.getElementById("result").innerText = "";

q.o.forEach(opt=>{
let btn = document.createElement("button");
btn.innerText = opt;
btn.className = "option";
btn.onclick = ()=>check(opt);
document.getElementById("options").appendChild(btn);
});

startTimer();
updateProgress();
}

function check(ans){
clearInterval(timer);

if(ans === questions[current].a){

correctSound.play();

xp += 10;
streak++;

document.getElementById("result").innerText = "Correct ✅";

}else{

wrongSound.play();

streak = 0;

document.getElementById("result").innerText = "Wrong ❌";
}

save();

setTimeout(next,1000);
}

function next(){
current++;
if(current < questions.length){
load();
}else{
finish();
}
}

function finish(){
document.getElementById("question").innerText = "Completed 🎉";
document.getElementById("options").innerHTML = "";
document.getElementById("progress").style.width = "100%";
launchConfetti();
completeSound.play();
}

function animateXP(oldXP, newXP){
let currentXP = oldXP;
let increment = Math.ceil((newXP - oldXP)/20);

let interval = setInterval(()=>{
currentXP += increment;
if(currentXP >= newXP){
currentXP = newXP;
clearInterval(interval);
}
localStorage.setItem("xp", currentXP);
},30);
}

function save(){
let oldXP = parseInt(localStorage.getItem("xp")) || 0;

level = Math.floor(xp/100) + 1;

if(xp > 500) badge="Legend";
else if(xp > 300) badge="Master";
else if(xp > 150) badge="Pro";

animateXP(oldXP, xp);

localStorage.setItem("level",level);
localStorage.setItem("streak",streak);
localStorage.setItem("badge",badge);
}

function speak(){
let speech = new SpeechSynthesisUtterance(questions[current].a);
speech.lang = "te-IN";
speechSynthesis.speak(speech);
}

function startTimer(){
clearInterval(timer);
timeLeft = 15;
document.getElementById("time").innerText = timeLeft;

timer = setInterval(()=>{
timeLeft--;
document.getElementById("time").innerText = timeLeft;

let percentage = (timeLeft/15)*100;
document.getElementById("progress").style.width = percentage + "%";

if(timeLeft <= 0){
clearInterval(timer);
next();
}
},1000);
}

// function updateProgress(){
// document.getElementById("progress").style.width =
// ((current+1)/questions.length)*100 + "%";
// } 

function updateProgress(){
/* Removed to avoid conflict with timer bar */
}

function home(){
window.location="index.html";
}

function launchConfetti(){
for(let i=0;i<100;i++){
let conf = document.createElement("div");
conf.className = "confetti";
conf.style.left = Math.random()*100+"vw";
conf.style.backgroundColor = `hsl(${Math.random()*360},100%,50%)`;
conf.style.animationDuration = (Math.random()*3+2)+"s";
document.body.appendChild(conf);

setTimeout(()=>conf.remove(),5000);
}
}