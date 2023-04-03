// selecting the time tag value with query selector
const currentTime = document.querySelector('h1')

// seleting the options menu with query selector
const options = document.querySelector('.options');

// selecting the dropdown value with query selector
const select = document.querySelectorAll('select')

// selecting the button value with query selector
const setAlarm = document.querySelector('button');

// setting a varaible with no value for futher use
let alarmTime;

// fetching the ringtone for the alarm from the other folder
let ringtone = new Audio("./ringtone/Alarm Clock.mp3");

// setting the alarm to be by default false  
let isAlarmSet = false;

// loop to print the hour value and using an if and else shorthand statement to insert 0 before single digits
for (let i = 12; i > 0; i--) {
  i = i < 10 ? '0' + i : i
  let option = `<option value='${i}'>${i}</option>`
  select[0].firstElementChild.insertAdjacentHTML('beforebegin', option)
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? '0' + i : i
  let option = `<option value='${i}'>${i}</option>`
  select[1].firstElementChild.insertAdjacentHTML('beforebegin', option)
}

for (let i = 2; i > 0; i--) {
  let AmPm = i == 1 ? 'AM' : 'PM'
  let option = `<option value='${AmPm}'>${AmPm}</option>`
  select[2].firstElementChild.insertAdjacentHTML('beforebegin', option)
}

setInterval(() => {
  // getting the time with in built functions
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    AmPm = 'AM'

  // setting the value from AM to PM if the value gets greater than 12  
  if (h >= 12) {
    h - h - 12
    AmPm = 'PM'
  }

  // when the hour value gets zero, then setting back the value to 12
  h = h == 0 ? (h = 12) : h
 
  // putting zeros behind the numbers if the value gets less than 10
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s

  currentTime.innerText = `${h}:${m}:${s}:${AmPm}`

  // setting the target time to match with the actual time and make the ringtone ring
  if (alarmTime == `${h}:${m} ${AmPm}`) {
    ringtone.play();
    ringtone.loop = true;
  }

}, 1000)

function setTheAlarm () {
    // if the isAlarmSet is true setting the alarm time to be null, making the ringtone go off, removing the class added in the past when selecting the time from the dropdowns and changing the button text back to set alarm
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        options.classList.remove('disable');
        setAlarm.innerText = "SET ALARM"
        return isAlarmSet = false
    }


    // getting the values from the dropdowns 
    let time = `${select[0].value}:${select[1].value} ${select[2].value}`;

    // putting an alert if the any of the options are not selected
    if (time.includes('Hour') || time.includes('Minutes') || time.includes('AM/PM')) {
      return alert('please select a valid time')
    }

    // putting the disable class and disabling the pointer events on dropdown after the click on set alarm so the time cannot be changed until the user clears the alarm
    isAlarmSet = true;
    alarmTime = time;
    options.classList.add('disable')
    setAlarm.innerText = 'CLEAR ALARM'
}

// setting an event listener on the button with the click event
setAlarm.addEventListener('click', setTheAlarm)