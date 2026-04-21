const inputs = document.querySelectorAll("input[type=number]");
const yearSelect = document.getElementById("year");
const resultDiv = document.getElementById("result");
const resultDiv2 = document.getElementById("result2");

const rangs = {
  2025: [1, 10, 18, 55, 90, 138, 160, 150, 167, 163, 161, 136, 105, 66, 55, 29, 15, 0, 2, 0],
  2024: [5, 29, 57, 134, 181, 209, 209, 224, 201, 162, 121, 78, 58, 30, 7, 6, 2, 0, 0, 0],
  2023: [ 5, 29, 57, 134, 181, 209, 209, 224, 201, 162, 121, 78, 58, 30, 7, 6, 2, 0, 0, 0 ],
  2022: [],
  2021: [],
  2020: [],
};

const weights = [10, 6, 10, 4, 4, 3, 3, 4];

function computeAverage(values) {
  let total = 0;
  let sumWeights = 0;
  for (let i = 0; i < values.length; i++) {
    total += values[i] * weights[i];
    sumWeights += weights[i];
  }
  return sumWeights > 0 ? (total / sumWeights) : 0;
}

function computeRang(avg, year) {
  const selectedRangs = rangs[year];
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
  const rang = computeRang(avg, selectedYear);
  
  resultDiv.textContent = "Rang ≈ " + rang;
  resultDiv2.textContent = "Moyenne = " + avg.toFixed(2);
}

inputs.forEach(input => input.addEventListener("input", update));
yearSelect.addEventListener("change", update);

update();