var timerOn = false;
var newStart = true;
var swap = 0;

var Timer = function() {
  this.time = 0;


  Timer.prototype.getTime = function() {
    var hours = Math.floor(this.time/60/60/1000);
    var mins = Math.floor(this.time/60/1000);
    var secs = Math.floor(this.time/1000);
    if (secs >= 60) {
      secs = secs % 60;
    }
    if (mins >= 60) {
      mins = mins % 60;
    }
    return [hours, mins, secs, this.time];
  }

  this.incMins = function () {
    this.time += 60*1000;
  };

  this.incHrs = function () {
    this.time += 60*60*1000;
  };

  this.decHrs = function () {
    this.time -= 60*60*1000;
    if (this.time < 0) {
      this.time = 0;
    }
  };

  this.decMins = function () {
    this.time -= 60*1000;
    if (this.time < 0) {
      this.time = 0;
    }
  };

  this.decSecs = function () {
    this.time -= 1000;
  };

  this.reset = function () {
    this.time = 0;
  };
}

var Display = function() {
  this.id = '';

  function leadZero(num) {
    if (num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  }

  this.update = function (timer) {
    var arr = timer.getTime();
    var hours = leadZero(arr[0]);
    var mins = leadZero(arr[1]);
    var secs = leadZero(arr[2]);

    if (this.id == 'display') {
      document.getElementById(this.id).innerHTML = hours + ':' + mins + ':' + secs
    } else {
      document.getElementById(this.id).innerHTML = hours + ':' + mins;
    }
  }
};

function swapTimer() {
  if (swap == 0) {
    mainT.time = breakT.time;
    $('div.break-alert').toggleClass('hidden');
    $('div.work-alert').toggleClass('hidden');
    swap = 1;
  } else {
    mainT.time = workT.time;
    $('div.break-alert').toggleClass('hidden');
    $('div.work-alert').toggleClass('hidden');
    swap = 0;
  }
}

function decrementTimer() {
  if (timerOn) {
    if (mainT.time == 0) {
      swapTimer();
      decrementTimer();
    } else {
      setTimeout(function(){
        mainT.decSecs();
        mainD.update(mainT);
        decrementTimer();
      }, 1000);
    }
  }
}

function clearToggles() {
  $('div.break-alert').removeClass('hidden');
  $('div.work-alert').removeClass('hidden');
  $('div.break-alert').toggleClass('hidden');
}
function startPause() {
  if (timerOn) {
    timerOn = false;
    document.getElementById('startPause').innerHTML = 'Start';
  } else {
    timerOn = true;
    document.getElementById('startPause').innerHTML = 'Pause';
    if (newStart) {
      clearToggles();
      mainT.time = workT.time;
      newStart = false;
      decrementTimer();
    } else {
      decrementTimer();
    }
  }
}

function resetTimer() {
  clearToggles();
  if (timerOn) {
    startPause();
    mainT.time = workT.time;
    mainD.update(mainT);
    swap = 0;
    newStart = true;
  } else {
    mainT.time = workT.time;
    mainD.update(mainT);
    swap = 0;
    newStart = true;
  }
}

var workT = new Timer();
var breakT = new Timer();
var mainT = new Timer();

var workD = new Display();
workD.id = 'workDisplay';
workD.update(workT);
var breakD = new Display();
breakD.id = 'breakDisplay';
breakD.update(breakT);
var mainD = new Display();
mainD.id = 'display';
mainD.update(mainT);


$('button').on('click', function(){
  switch(this.id) {
    case 'btIncHrs':
      breakT.incHrs();
      breakD.update(breakT);
      break;
    case 'btIncMin':
      breakT.incMins();
      breakD.update(breakT);
      break;
    case 'btDecHrs':
      breakT.decHrs();
      breakD.update(breakT);
      break;
    case 'btDecMin':
      breakT.decMins();
      breakD.update(breakT);
      break;
      case 'wtIncHrs':
      workT.incHrs();
      workD.update(workT);
      break;
    case 'wtIncMin':
      workT.incMins();
      workD.update(workT);
      break;
    case 'wtDecHrs':
      workT.decHrs();
      workD.update(workT);
      break;
    case 'wtDecMin':
      workT.decMins();
      workD.update(workT);
      break;
    case 'resetBT':
      breakT.reset();
      breakD.update(breakT);
      break;
    case 'resetWT':
      workT.reset();
      workD.update(workT);
      break;
    case 'startPause':
      startPause();
      break;
    case 'reset':
      resetTimer();
      break;
                }
});
