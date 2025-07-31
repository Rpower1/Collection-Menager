const showbutton = document.getElementById("show");
const showarea = document.getElementById("showarea");
const addbutton = document.getElementById("add");
const titleinput = document.getElementById("title");
const valueinput = document.getElementById("waarde");

let data = null;
let ishown = false;

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

    for (const item of data.verzameling_1) {
      html += `<li>${item.object} - €${item.waarde}</li>`;
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
