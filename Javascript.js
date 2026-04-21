const inputs = document.querySelectorAll("input[type=number]");
const yearSelect = document.getElementById("year");
const resultDiv = document.getElementById("result");
const resultDiv2 = document.getElementById("result2");
const tabs = document.querySelectorAll(".box-tab");
const epreuve1 = { "MP": "Math II:", "PC": "Chimie Organique:"};
const epreuve2 = { "MP": "Math I:", "PC": "Mathematiques:"};

tabs.forEach(tab => {
  tab.addEventListener("click", (event) => {
    tabs.forEach(t => t.style.backgroundColor = "#131314");
    event.target.style.backgroundColor = "#1E1F20";
    activeTab = event.target.dataset.value;
    document.querySelector('label[for="analyse"]').textContent = epreuve2[activeTab];
    document.querySelector('label[for="algebre"]').textContent = epreuve1[activeTab];
    tabs.forEach(t => t.classList.remove("active"));
    event.target.classList.add("active");
    update();
  });
});

let activeTab = "MP";

const rangsMP = {
  2025: [ 1, 10, 18, 55, 90, 138, 160, 150, 167, 163, 161, 136, 105, 66, 55, 29, 15, 0, 2, 0 ],
  2024: [ 5, 29, 57, 134, 181, 209, 209, 224, 201, 162, 121, 78, 58, 30, 7, 6, 2, 0, 0, 0 ],
};

const rangsPC = {
  2025: [0,1,13,52,90,150,174,165,143,118,99,85,42,28,13,9,2,1,0,0],
  2024: [4,10,31,93,150,183,203,157,131,96,67,40,35,22,6,6,0,0,0],
};

const rangs = { "MP": rangsMP, "PC": rangsPC}

const weights = {
  "MP": [10, 6, 10, 4, 4, 3, 3, 4],
  "PC": [ 11, 3, 12, 4, 4, 3, 3, 4 ],
};

tabs.forEach(tab => {
  tab.addEventListener("click", (event) => {
    activeTab = event.target.dataset.value;
    tabs.forEach(t => t.classList.remove("active"));
    event.target.classList.add("active");
    update();
  });
});

function computeAverage(values) {
  let total = 0;
  let sumWeights = 0;
  const currentWeights = weights[activeTab] || weights["MP"];
  for (let i = 0; i < values.length; i++) {
    total += values[i] * currentWeights[i];
    sumWeights += currentWeights[i];
  }
  return sumWeights > 0 ? (total / sumWeights) : 0;
}

function computeRang(avg, year,tab) {
  const selectedRangs = rangs[tab][year];
  if (!selectedRangs) return 0;
  let r = 0;
  let floorAvg = Math.floor(avg);
  for (let i = floorAvg + 1; i < selectedRangs.length; i++) {
    r += selectedRangs[i];
  }
  const fractional = 1 - (avg - floorAvg);
  return Math.round(r + fractional * (selectedRangs[floorAvg] || 0));
}

function update() {
  const values = [];
  inputs.forEach(input => values.push(parseFloat(input.value) || 0));
  const avg = computeAverage(values);
  const selectedYear = yearSelect.value;
  const rang = computeRang(avg, selectedYear, activeTab);
  resultDiv.textContent = "Rang ≈ " + rang;
  resultDiv2.textContent = "Moyenne = " + avg.toFixed(2);
}

inputs.forEach(input => input.addEventListener("input", update));
yearSelect.addEventListener("change", update);

update();