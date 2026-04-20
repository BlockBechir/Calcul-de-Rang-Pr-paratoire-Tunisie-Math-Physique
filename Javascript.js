const inputs = document.querySelectorAll("input[type=number]");
const resultDiv = document.getElementById("result");
const resultDiv2 = document.getElementById("result2");
const weights = [10, 6, 10, 4, 4, 3, 3, 4];
const rangs = [1,10,18,55,90,138,160,150,167,163,161,136,105,66,55,29,15,0,2,0];

function computeAverage(values) {
  let total = 0;
  let sumWeights = 0;
  for (let i=0; i<values.length; i++) {
    total += values[i] * weights[i];
    sumWeights += weights[i];
  }
  return total / sumWeights;
}

function computeRang(avg) {
  let r = 0;
  for (let i = Math.floor(avg)+1; i < rangs.length; i++) {
    r += rangs[i];
  }
  const fractional = 1 - (avg - Math.floor(avg));
  return Math.round(r + fractional * rangs[Math.floor(avg)]);
}

function update() {
  const values = [];
  inputs.forEach(input => values.push(parseFloat(input.value) || 0));
  
  const avg = computeAverage(values);
  const rang = computeRang(avg);
  const rounded = avg.toFixed(2);
  
  resultDiv.textContent = "Rang ≈ " + rang;
  resultDiv2.textContent = "Moyenne = " + rounded;
}

inputs.forEach(input => input.addEventListener("input", update));
update();
