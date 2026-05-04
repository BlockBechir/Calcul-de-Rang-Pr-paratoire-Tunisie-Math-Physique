const inputs = document.querySelectorAll("input[type=number]");
const yearSelect = document.getElementById("year");
const resultDiv = document.getElementById("result");
const resultDiv2 = document.getElementById("result2");
const tabs = document.querySelectorAll(".box-tab");

let activeTab = "MP";

const epreuve1 = { "MP": "Math II:", "PC": "Chimie Organique:", "T": "Conception Mécanique:", "BG": "Chimie Organique:" };
const epreuve2 = { "MP": "Math I:", "PC": "Mathematiques:", "T": "Mathematiques:", "BG": "Mathematiques:" };
const epreuve3 = { "MP": "STA:", "PC": "STA:", "T": "STA:", "BG": "Géologie:" };

const rangsMP = { 2025: [ 1, 10, 18, 55, 90, 138, 160, 150, 167, 163, 161, 136, 105, 66, 55, 29, 15, 0, 2, 0 ], 2024: [ 5, 29, 57, 134, 181, 209, 209, 224, 201, 162, 121, 78, 58, 30, 7, 6, 2, 0, 0, 0 ] };
const rangsPC = { 2025: [0,1,13,52,90,150,174,165,143,118,99,85,42,28,13,9,2,1,0,0], 2024: [4,10,31,93,150,183,203,157,131,96,67,40,35,22,6,6,0,0,0] };
const rangsT = { 2025: [0,2,12,33,58,87,121,100,97,86,74,35,26,9,9,1,1,0,0,0], 2024: [2,3,26,36,84,107,107,120,116,58,49,35,18,4,0,0,2,0,0,0] };
const rangsBG = { 2025: [0,0,0,2,9,26,52,69,46,37,26,13,6,4,1,1,0,0,0,0], 2024: [0,0,0,5,22,45,75,60,38,38,21,14,4,2,3,0,0,0,0,0] };
const rangs = { "MP": rangsMP, "PC": rangsPC, "T": rangsT, "BG": rangsBG };

const rangsMPsub = [
  [ 8, 11, 20, 39, 38, 55, 64, 67, 74, 76, 61, 65, 64, 57, 72, 55, 54, 55, 56, 55, 58, 53, 41, 32, 51, 46, 28, 30, 36, 21, 19, 18, 21, 10, 9, 7, 7, 3, 4, 2, 1 ],
  [ 16, 18, 16, 34, 40, 46, 63, 65, 67, 66, 71, 74, 74, 80, 77, 73, 58, 74, 54, 66, 65, 44, 38, 41, 26, 29, 25, 25, 20, 19, 16, 15, 13, 10, 8, 12, 5, 3, 2, 1, 2, 1 ],
  [ 0, 7, 16, 20, 35, 31, 34, 25, 40, 40, 49, 56, 45, 49, 53, 64, 66, 66, 72, 57, 72, 60, 64, 59, 59, 73, 67, 42, 52, 38, 23, 29, 12, 19, 15, 12, 5, 2, 2, 0, 0 ],
  [ 5, 10, 15, 9, 18, 37, 16, 28, 37, 32, 42, 29, 50, 65, 52, 55, 65, 78, 75, 90, 70, 85, 69, 66, 67, 64, 55, 42, 28, 33, 23, 10, 15, 5, 3, 10, 3, 3, 0, 0, 0 ],
  [ 6, 27, 26, 22, 32, 40, 33, 50, 42, 42, 62, 41, 57, 74, 49, 61, 68, 58, 59, 73, 55, 57, 65, 59, 48, 62, 51, 43, 35, 29, 25, 20, 12, 16, 15, 6, 2, 4, 2, 1, 0 ],
  [ 1, 1, 2, 5, 5, 8, 9, 13, 19, 20, 20, 17, 35, 24, 37, 31, 32, 42, 41, 48, 47, 48, 61, 55, 68, 62, 73, 77, 80, 80, 74, 68, 77, 72, 69, 43, 33, 26, 5, 1, 0 ],
  [0, 0, 0, 0, 0, 0, 5, 8, 7, 10, 21, 28, 43, 74, 85, 119, 0, 142, 131, 142, 116, 102, 90, 79, 69, 52, 47, 0, 36, 45, 36, 5, 12, 8, 8, 5, 6, 3, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 5, 8, 7, 10, 21, 28, 43, 74, 85, 119, 0, 142, 131, 142, 116, 102, 90, 79, 69, 52, 47, 0, 36, 45, 36, 5, 12, 8, 8, 5, 6, 3, 0, 0, 0 ],
  [ 1, 4, 5, 4, 8, 6, 10, 15, 15, 23, 27, 45, 51, 60, 68, 83, 86, 90, 87, 78, 109, 98, 72, 73, 65, 67, 51, 55, 40, 31, 29, 21, 11, 12, 10, 8, 2, 5, 4, 2, 0 ]
];

const rangsPCsub = [
  [ 0, 6, 11, 9, 26, 33, 35, 42, 42, 46, 56, 63, 59, 63, 64, 78, 58, 72, 51, 35, 50, 44, 31, 29, 29, 32, 28, 12, 20, 18, 18, 11, 10, 7, 7, 5, 4, 3, 1, 1, 1 ],
  [ 2, 3, 10, 10, 15, 16, 24, 45, 36, 44, 45, 38, 37, 49, 39, 43, 30, 38, 35, 27, 27, 35, 34, 35, 45, 31, 32, 42, 36, 31, 41, 37, 33, 29, 30, 26, 28, 16, 10, 1, 0 ],
  [ 0, 0, 16, 26, 36, 33, 47, 45, 51, 68, 54, 65, 53, 57, 68, 60, 52, 64, 40, 39, 47, 34, 37, 32, 32, 14, 28, 14, 19, 10, 7, 7, 6, 3, 3, 1, 2, 3, 0, 0, 1 ],
  [ 2, 4, 9, 17, 27, 29, 33, 46, 47, 71, 57, 77, 64, 77, 59, 70, 63, 66, 45, 41, 38, 40, 38, 33, 34, 22, 14, 17, 13, 7, 7, 5, 3, 4, 2, 4, 1, 1, 1, 1, 0 ],
  [ 15, 30, 29, 34, 40, 39, 45, 53, 52, 66, 48, 52, 66, 40, 44, 47, 59, 40, 60, 39, 32, 26, 36, 30, 23, 23, 16, 21, 11, 6, 9, 10, 8, 4, 2, 2, 1, 1, 0, 0 ],
  [ 0, 1, 3, 13, 17, 23, 25, 36, 42, 43, 45, 52, 46, 39, 58, 45, 55, 42, 49, 51, 37, 40, 41, 33, 51, 37, 51, 43, 22, 25, 26, 25, 24, 20, 12, 5, 6, 6, 0, 0, 0 ],
  [ 1, 0, 1, 1, 3, 0, 1, 10, 8, 17, 26, 37, 62, 98, 121, 125, 0, 119, 110, 85, 99, 60, 60, 37, 36, 25, 14, 0, 7, 6, 7, 4, 1, 4, 2, 1, 1, 0, 0, 0, 0 ],
  [ 1, 1, 1, 1, 2, 3, 9, 13, 16, 24, 39, 52, 59, 65, 75, 79, 76, 87, 70, 70, 73, 71, 61, 58, 48, 32, 23, 20, 24, 11, 3, 6, 9, 1, 1, 0, 0, 1, 1, 1, 0 ]
];

const rangsTsub = [
  [ 1, 6, 11, 18, 14, 16, 23, 30, 34, 37, 34, 51, 36, 21, 40, 40, 36, 36, 30, 32, 29, 28, 24, 26, 18, 15, 17, 14, 16, 4, 6, 3, 3, 3, 1, 1, 2, 0, 1, 0, 0 ],
  [ 0, 0, 3, 6, 6, 12, 9, 18, 22, 26, 30, 29, 54, 45, 48, 63, 54, 53, 50, 41, 41, 35, 21, 19, 17, 11, 8, 12, 8, 6, 1, 2, 1, 0, 1, 0, 0, 0, 1, 0, 0 ],
  [ 1, 1, 6, 13, 10, 27, 26, 34, 30, 37, 40, 23, 38, 38, 45, 27, 33, 37, 30, 30, 24, 22, 24, 28, 22, 29, 13, 13, 10, 9, 9, 4, 8, 5, 1, 0, 2, 1, 1, 0, 1 ],
  [ 3, 5, 4, 15, 20, 21, 28, 35, 33, 24, 29, 45, 44, 43, 47, 31, 33, 30, 32, 28, 42, 32, 23, 22, 21, 13, 15, 7, 7, 7, 0, 1, 3, 0, 1, 1, 0, 1, 0, 0, 0 ],
  [ 8, 17, 18, 24, 32, 36, 30, 37, 34, 43, 39, 22, 32, 45, 25, 35, 29, 20, 25, 40, 21, 24, 26, 14, 14, 14, 11, 5, 11, 7, 8, 2, 1, 2, 0, 0, 3, 1, 1, 0, 0 ],
  [ 0, 3, 7, 11, 13, 24, 21, 21, 41, 34, 29, 29, 35, 30, 40, 19, 26, 25, 26, 23, 31, 23, 33, 25, 20, 18, 28, 32, 28, 7, 8, 19, 10, 6, 6, 3, 1, 0, 0, 0, 0 ],
  [ 0, 0, 0, 1, 4, 0, 5, 8, 19, 15, 30, 41, 63, 64, 78, 84, 0, 70, 60, 41, 51, 37, 29, 11, 15, 8, 5, 0, 6, 5, 1, 1, 2, 1, 0, 1, 0, 0, 0, 0, 0 ],
  [ 0, 0, 2, 1, 3, 4, 11, 10, 17, 21, 28, 42, 33, 37, 57, 46, 57, 49, 52, 38, 40, 41, 43, 28, 25, 15, 12, 15, 4, 4, 7, 5, 2, 3, 1, 1, 9, 1, 1, 0, 0 ]
];

const rangsBGsub = [
  [ 0, 0, 0, 0, 0, 3, 3, 1, 4, 4, 6, 3, 7, 7, 7, 6, 14, 13, 18, 18, 18, 18, 14, 19, 17, 13, 11, 6, 16, 10, 7, 8, 7, 4, 4, 1, 2, 2, 1, 0, 0 ],
  [ 4, 4, 6, 4, 11, 7, 7, 14, 11, 12, 9, 13, 4, 14, 10, 8, 8, 12, 10, 14, 6, 13, 9, 4, 17, 12, 5, 6, 4, 6, 8, 3, 3, 3, 4, 5, 1, 0, 0, 0, 1 ],
  [ 0, 2, 5, 3, 4, 7, 9, 17, 16, 22, 17, 20, 13, 13, 16, 17, 17, 15, 14, 12, 12, 12, 8, 2, 5, 6, 2, 0, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0 ],
  [ 0, 0, 3, 4, 2, 3, 4, 5, 11, 9, 15, 18, 17, 9, 23, 19, 20, 11, 16, 16, 16, 11, 7, 7, 12, 8, 2, 8, 6, 4, 3, 0, 1, 0, 12, 0, 0, 0, 1, 0, 0 ],
  [ 9, 7, 10, 16, 3, 16, 13, 19, 14, 9, 11, 13, 11, 21, 16, 10, 12, 10, 12, 8, 13, 6, 5, 4, 5, 5, 2, 4, 4, 0, 0, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0 ],
  [ 0, 0, 1, 5, 17, 11, 17, 14, 14, 17, 19, 8, 16, 18, 14, 8, 10, 12, 8, 6, 6, 11, 9, 5, 7, 6, 7, 5, 4, 4, 4, 4, 1, 1, 2, 1, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 1, 4, 7, 8, 8, 17, 19, 32, 30, 0, 23, 29, 35, 24, 15, 10, 8, 7, 2, 2, 0, 1, 4, 0, 2, 3, 0, 1, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 2, 2, 3, 7, 10, 12, 16, 17, 17, 12, 26, 23, 14, 14, 19, 16, 13, 6, 13, 9, 6, 8, 5, 2, 2, 6, 4, 4, 2, 1, 0, 0, 0, 0, 1, 0, 0 ],
  [ 5, 4, 4, 9, 6, 11, 14, 7, 10, 11, 11, 16, 15, 11, 14, 14, 13, 11, 11, 9, 5, 14, 13, 7, 7, 7, 5, 7, 5, 0, 4, 4, 1, 2, 1, 1, 2, 0, 0, 1, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 5, 14, 8, 12, 15, 21, 16, 29, 20, 14, 19, 14, 11, 18, 12, 14, 14, 8, 9, 4, 1, 4, 2, 2, 1, 1, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 9, 13, 20, 23, 24, 17, 27, 13, 23, 20, 20, 11, 12, 11, 6, 10, 11, 6, 2, 1, 2, 1, 0, 0, 0, 1, 0, 0, 0, 0 ]
];

const rangssub = {
  "MP": rangsMPsub,
  "PC": rangsPCsub,
  "T": rangsTsub,
  "BG": rangsBGsub
};

const weights = {
  "MP": [10, 6, 10, 4, 4, 3, 3, 4, 0, 0, 0],
  "PC": [11, 3, 12, 4, 4, 3, 3, 4, 0, 0, 0],
  "T": [10, 6, 10, 4, 4, 3, 3, 6, 0, 0, 0],
  "BG": [7, 2, 5, 2, 4, 3, 3, 4.5, 4.5, 4.5, 4.5]
};

tabs.forEach(tab => {
  tab.addEventListener("click", (event) => {
    activeTab = event.target.dataset.value;
    tabs.forEach(t => {
      t.style.backgroundColor = "#131314";
      t.classList.remove("active");
    });
    event.target.style.backgroundColor = "#1E1F20";
    event.target.classList.add("active");
    
    document.querySelector('label[for="analyse"]').textContent = epreuve2[activeTab] || "Math I:";
    document.querySelector('label[for="algebre"]').textContent = epreuve1[activeTab] || "Math II:"; 
    document.querySelector('label[for="sta"]').textContent = epreuve3[activeTab] || "STA:"; 
    
    const isBG = (activeTab === "BG");
    document.getElementById("group-genetique").classList.toggle("hidden-element", !isBG);
    document.getElementById("group-animale").classList.toggle("hidden-element", !isBG);
    document.getElementById("group-vegetale").classList.toggle("hidden-element", !isBG);
    
    update();
  });
});

function computeAverage(values) {
  let total = 0, sumWeights = 0;
  const currentWeights = weights[activeTab] || weights["MP"];
  for (let i = 0; i < values.length; i++) {
    total += values[i] * (currentWeights[i] || 0);
    sumWeights += (currentWeights[i] || 0);
  }
  return sumWeights > 0 ? (total / sumWeights) : 0;
}

function computeRang(avg, year, tab) {
  const selectedRangs = rangs[tab][year];
  if (!selectedRangs) return 0;
  let r = 0, floorAvg = Math.floor(avg);
  for (let i = floorAvg + 1; i < selectedRangs.length; i++) r += selectedRangs[i];
  const fractional = 1 - (avg - floorAvg);
  return Math.round(r + 1 + fractional * (selectedRangs[floorAvg] || 0));
}

function computeSubjectRang(grade, tab, index) {
  const selectedRangs = rangssub[tab][index];
  if (!selectedRangs) return 0;
  
  const scaledGrade = grade * 2;
  let r = 0, floorGrade = Math.floor(scaledGrade);
  
  for (let i = floorGrade + 1; i < selectedRangs.length; i++) {
    r += selectedRangs[i];
  }
  
  const fractional = 1 - (scaledGrade - floorGrade);
  return Math.round(r + 1 + fractional * (selectedRangs[floorGrade] || 0));
}

function update() {
  const values = [];
  const is2024 = yearSelect.value === "2024";
  
  inputs.forEach((input, i) => {
    const val = parseFloat(input.value) || 0;
    values.push(val);
    
    const rankLabel = input.nextElementSibling;
    if (rankLabel && rankLabel.tagName === 'LABEL') {
      if (is2024) {
        rankLabel.style.display = "none";
      } else {
        rankLabel.style.display = "";
        rankLabel.textContent = computeSubjectRang(val, activeTab, i);
      }
    }
  });

  const avg = computeAverage(values);
  const rang = computeRang(avg, yearSelect.value, activeTab);
  
  resultDiv.textContent = "Rang ≈ " + rang;
  resultDiv2.textContent = "Moyenne = " + avg.toFixed(2);
}

inputs.forEach(input => input.addEventListener("input", update));
yearSelect.addEventListener("change", update);

update();