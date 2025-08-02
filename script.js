//const { json } = require("express");

const showbutton = document.getElementById("show");
const showarea = document.getElementById("showarea");
const addbutton = document.getElementById("add");
const titleinput = document.getElementById("title");
const valueinput = document.getElementById("waarde");
const deletebutton = document.getElementById("Delete");
const showtimeb = document.getElementById("showtime");
const waardearea = document.getElementById("completewaarde")

let data = null;
let setting = null;
var counter = 1;
let ishown = false;
var isdel = false;

deletebutton.onclick = deletef
showtimeb.onclick = function(){
  if(setting.show_time === true){
    setting.show_time = false
    showtimeb.textContent = "Show Time"
    show();
    show();
  }else{
  setting.show_time = true
  showtimeb.textContent = "Hide Time"
  show();
  show();
  }
}

// Probeer data uit localStorage te laden
const opgeslagen = localStorage.getItem("verzameling");
const settings = localStorage.getItem("settings");

if (opgeslagen) {
  data = JSON.parse(opgeslagen);
} else {
  data = { verzameling_1: [] };
}

if (settings) {
  setting = JSON.parse(settings);
} else {
  console.log("hij vind hem niet")
  setting = { show_time: false }; // of wat je default wil
}


// Event listeners toevoegen
showbutton.onclick = show;
addbutton.onclick = add;

function add() {
  const title = titleinput.value;
  const value = valueinput.value;
  var tijd = new Date();

  if (title && value) {
    data.verzameling_1.push({ object: title, waarde: value, datum : tijd});
    save();
    show();
    show(); // Bijwerken van de lijst
  } else {
    alert("Vul zowel een titel als een waarde in.");
  }

  // Inputvelden leegmaken
  titleinput.value = "";
  valueinput.value = "";
  get_value();
  get_chart();
}
var overallvalue = null;
var nieuwevalue = null;

function get_value(){
  nieuwevalue = 0;
  for (const item of data.verzameling_1){
    nieuwevalue += parseInt(item.waarde)
  }
  overallvalue = nieuwevalue

  waardearea.textContent = `Total value: ${overallvalue}`
}

function show() {
  if (!ishown) {
    showbutton.textContent = "Hide";
    ishown = true;
    let html = "<ul>";
    counter = 1; // reset counter zodat de checkbox IDs kloppen
    for (const item of data.verzameling_1) {
      console.log(setting.show_time)
      if (setting.show_time === true){
        html += `<li><input type="checkbox" id="${counter}checkbox">
      ${item.object} - €${item.waarde} - ${item.datum}</li>`;
      counter += 1;
      }else{
      html += `<li><input type="checkbox" id="${counter}checkbox">
      ${item.object} - €${item.waarde}</li>`;
      counter += 1;}
    }
    html += "</ul>";
    showarea.innerHTML = html;
  } else {
    showbutton.textContent = "Show";
    ishown = false;
    showarea.innerHTML = "";
  }
}


function save() {
  localStorage.setItem("verzameling", JSON.stringify(data));
}

function deletef() {
    let nieuweVerzameling = []; // <- Hier resetten bij elke delete

    for (let i = 0; i < data.verzameling_1.length; i++) {
        const checkbox = document.getElementById(`${i + 1}checkbox`);
        if (checkbox && checkbox.checked) {
            console.log(`Item ${i} wordt verwijderd:`, data.verzameling_1[i]);
        } else {
            nieuweVerzameling.push(data.verzameling_1[i]);
        }
    }

    data.verzameling_1 = nieuweVerzameling;
    save();
    counter = 1;
    showarea.innerHTML = "";
    ishown = false;
    show();
    get_value();
    get_chart();
}

let xValues = [50,60,70,80,90,100,110,120,130,140,150];
let yValues = [7,8,8,9,9,9,10,11,14,14,15];
var yValue;
function get_XY(){
  xValues = [];
  yValues = [];
  let yValue = 0;

  // Eerst: items zonder datum
  for (const item of data.verzameling_1) {
    if (!item.datum) {
      xValues.push("geen datum");
      yValue += parseInt(item.waarde);
      yValues.push(yValue);
    }
  }

  // Daarna: items met datum (gesorteerd op datum)
  const datedItems = data.verzameling_1
    .filter(item => item.datum)
    .sort((a, b) => new Date(a.datum) - new Date(b.datum)); // optioneel: sorteren

  for (const item of datedItems) {
    const datum = new Date(item.datum);
    const formattedDate = datum.toISOString().split("T")[0];
    xValues.push(formattedDate);
    yValue += parseInt(item.waarde);
    yValues.push(yValue);
  }
}



function get_chart(){
get_XY();

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor:"rgba(0, 255, 0, 0.6)",
      borderColor: "rgba(0, 255, 0, 1)",
      data: yValues
    }]
  },
  options:{}
});
}



  get_value();
get_chart();