const DateTime = luxon.DateTime;
const Duration = luxon.Duration;
const dt = DateTime.now();

console.log(DateTime.now())

const hoursInput = document.querySelector("#hours");
const minsInput = document.querySelector("#mins");
const secsInput = document.querySelector("#secs");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn")
var timer;
const alarm = new Audio("alarm.wav");

const inputs = [hoursInput, minsInput, secsInput];

inputs.forEach((input, index) => {
    input.addEventListener("input", (event) => {
        let number = event.target.value.replace(/[^0-9]/g, '');
        if (index === 0) {
            if (number >= 99) {
                number = 99;
            }
            event.target.value = number;
            return;
        }
        if (number >= 59) {
            number = 59;
            event.target.value = number;
            return;
        }
    })
})


function getTimerStartPoint() {

    const hours = hoursInput.value;
    const mins = minsInput.value;
    const secs = secsInput.value;
    if (hours == undefined || mins == undefined || secs == undefined) return null
    const dur = Duration.fromObject({
        hours: hours,
        minutes: mins,
        seconds: secs
    })
    return dur;
}



function startTimer(timeRemaining) {
    if (timer || timeRemaining.as('seconds') <= 0 || timeRemaining == null) return
    //console.log("Starting timer from ... ", timeRemaining.toObject())
    timer = setInterval(() => {
        if (timeRemaining.as('seconds') <= 0) {
            alarm.loop = true;
            alarm.play();
            clearInterval(timer);
            return;
        }
        timeRemaining = timeRemaining.minus(1000).normalize();
        updateTimerDisplay(timeRemaining.toObject())
        //console.log("Time remaining: ", timeRemaining.toObject())

    }, 1000)
}

startBtn.addEventListener("click", (event) => {

    let timeRemaining = getTimerStartPoint();
    startTimer(timeRemaining);
})

stopBtn.addEventListener("click", (event) => {
    //console.log("Stopping timer...")
    clearInterval(timer);
    timer = undefined;
    alarm.pause();
    alarm.currentTime = 0;

})

function updateTimerDisplay(time) {

    hoursInput.value = Duration.fromObject({
        hours: time.hours
    }).toFormat("hh");
    minsInput.value = Duration.fromObject({
        minutes: time.minutes
    }).toFormat("mm");
    secsInput.value = Duration.fromObject({
        seconds: time.seconds
    }).toFormat("ss");

}