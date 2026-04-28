//define variable for our location
let locationField;

let audioCtx;

let freq = 0;

let infoField;

let imgElement = document.getElementById("resultImage");

//wait until html document is loaded so that we can access the keyboard input field
document.addEventListener('DOMContentLoaded', function(event) { 
  //locationField = document.getElementById("location");
  locationField = document.querySelector("#location");
  infoField = document.getElementById('info');
})

// create web audio api context
audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
const oscillator = audioCtx.createOscillator();

oscillator.type = "triangle"; 
oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime); // value in hertz
oscillator.connect(audioCtx.destination);
oscillator.start();

function sonify(){
  console.log(locationField.value);

fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+locationField.value +'?key=YH5QF5SWJL5LZ8SFPZFT2RCC2')
	.then(response => response.json())
	.then(response => {
    freq = response.days[0].temp + 50; console.log(freq - 50); 
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime); 
    audioCtx.resume();
    infoField.innerHTML = "The weather in " + locationField.value + " is " + response.days[0].temp
    if (response.days[0].temp < 40) {
  infoField.innerHTML += " ❄️";
  imgElement.src = "images/snow.jpg";
}
else if (response.days[0].temp < 60) {
  infoField.innerHTML += " ☁️";
  imgElement.src = "images/catcloud.jpg";
}
else {
  infoField.innerHTML += " 🌤️";
  imgElement.src = "images/suncat.jpg";
}
  })
	.catch(err => console.error(err));
}

function stop(){
  audioCtx.suspend();
}