const showbutton = document.getElementById("show");
const showarea = document.getElementById("showarea");
const addbutton = document.getElementById("add");
const titleinput = document.getElementById("title");
const valueinput = document.getElementById("waarde");
const deletebutton = document.getElementById("Delete");

let data = null;
var counter = 1;
let ishown = false;

deletebutton.onclick = deletef

// Probeer data uit localStorage te laden
const opgeslagen = localStorage.getItem("verzameling");
if (opgeslagen) {
  data = JSON.parse(opgeslagen);
} else {
  // Als er nog geen data is, begin met lege verzameling
  data = { verzameling_1: [] };
}

// Event listeners toevoegen
showbutton.onclick = show;
addbutton.onclick = add;

function add() {
  const title = titleinput.value;
  const value = valueinput.value;

  if (title && value) {
    data.verzameling_1.push({ object: title, waarde: value });
    save();
    show();
    show(); // Bijwerken van de lijst
  } else {
    alert("Vul zowel een titel als een waarde in.");
  }

  // Inputvelden leegmaken
  titleinput.value = "";
  valueinput.value = "";
}

function show() {
  if (!ishown) {
    showbutton.textContent = "Hide";
    ishown = true;
    let html = "<ul>";
    counter = 1; // reset counter zodat de checkbox IDs kloppen
    for (const item of data.verzameling_1) {
      html += `<li><input type="checkbox" id="${counter}checkbox">
      ${item.object} - €${item.waarde}</li>`;
      counter += 1;
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
    // Nieuwe array zonder de geselecteerde items
    let nieuweVerzameling = [];

    for (let i = 0; i < data.verzameling_1.length; i++) {
        const checkbox = document.getElementById(`${i + 1}checkbox`);
        if (checkbox && checkbox.checked) {
            console.log(`Item ${i} wordt verwijderd:`, data.verzameling_1[i]);
            // Sla dit item over → dus niet toevoegen aan de nieuwe array
        } else {
            // Niet geselecteerd? Dan toevoegen aan de nieuwe array
            nieuweVerzameling.push(data.verzameling_1[i]);
        }
    }

    // Vervang de oude verzameling met de nieuwe
    data.verzameling_1 = nieuweVerzameling;

    // Opslaan in localStorage
    save();

    // UI bijwerken
    counter = 1; // reset de teller, zodat IDs weer kloppen
    showarea.innerHTML = ""; // eerst leegmaken
    ishown = false; // zodat de show() opnieuw rendert
    show();
}



