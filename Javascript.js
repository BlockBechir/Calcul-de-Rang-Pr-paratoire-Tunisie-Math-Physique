const inputs = document.querySelectorAll("input[type=number]");
const yearSelect = document.getElementById("year");
const resultDiv = document.getElementById("result");
const resultDiv2 = document.getElementById("result2");
const resultDiv3 = document.getElementById("Admise");
const tabs = document.querySelectorAll("#calculator .box-tab[data-value]");
const bonusCheck = document.getElementById("bonus");

bonusCheck.addEventListener("change", update);

let activeTab = "MP";

const epreuve1 = { "MP": "Math II:", "PC": "Chimie Organique:", "T": "Conception Mécanique:", "BG": "Chimie Organique:" };
const epreuve2 = { "MP": "Math I:", "PC": "Math:", "T": "Math:", "BG": "Math:" };
const epreuve3 = { "MP": "STA:", "PC": "STA:", "T": "STA:", "BG": "Géologie:" };

const Candidates = {
  2025: { "MP": 1522, "PC": 1186, "T": 752, "BG": 293 },
  2024: { "MP": 1714, "PC": 1235, "T": 768, "BG": 328 }
}

const Admise = {
  2025: { "MP": 1326, "PC": 1045, "T": 689, "BG": 253 },
  2024: { "MP": 1410, "PC": 1030, "T": 686, "BG": 290 }
}

const rangsMP = { 2025: [ 1, 10, 18, 55, 90, 138, 160, 150, 167, 163, 161, 136, 105, 66, 55, 29, 15, 0, 2, 0 ], 2024: [ 5, 29, 57, 134, 181, 209, 209, 224, 201, 162, 121, 78, 58, 30, 7, 6, 2, 0, 0, 0 ] };
const rangsPC = { 2025: [0,1,13,52,90,150,174,165,143,118,99,85,42,28,13,9,2,1,0,0], 2024: [4,10,31,93,150,183,203,157,131,96,67,40,35,22,6,6,0,0,0] };
const rangsT = { 2025: [0,2,12,33,58,87,121,100,97,86,74,35,26,9,9,1,1,0,0,0], 2024: [2,3,26,36,84,107,107,120,116,58,49,35,18,4,0,0,2,0,0,0] };
const rangsBG = { 2025: [0,0,0,2,9,26,52,69,46,37,26,13,6,4,1,1,0,0,0,0], 2024: [0,0,0,5,22,45,75,60,38,38,21,14,4,2,3,0,0,0,0,0] };
const rangs = { "MP": rangsMP, "PC": rangsPC, "T": rangsT, "BG": rangsBG };

const rangsMPsub = {
  2025: [
    [ 8, 8, 19, 39, 38, 53, 63, 66, 73, 76, 61, 65, 64, 56, 70, 53, 54, 54, 56, 55, 58, 53, 41, 32, 51, 46, 28, 29, 36, 21, 19, 18, 20, 10, 8, 6, 7, 2, 3, 2, 0 ],
    [ 15, 18, 15, 34, 40, 44, 61, 64, 67, 65, 70, 74, 73, 79, 75, 73, 57, 72, 54, 66, 65, 42, 36, 41, 24, 29, 24, 24, 19, 18, 16, 15, 13, 10, 6, 12, 5, 2, 1, 1, 2, 0 ],
    [ 0, 7, 16, 19, 35, 30, 34, 25, 40, 40, 49, 56, 45, 48, 53, 62, 66, 66, 72, 56, 72, 60, 64, 59, 58, 73, 67, 42, 52, 38, 23, 29, 12, 19, 15, 12, 4, 1, 2, 0, 0 ],
    [ 5, 10, 16, 11, 21, 39, 17, 29, 39, 34, 46, 29, 50, 68, 56, 56, 67, 82, 76, 90, 73, 85, 70, 69, 71, 67, 55, 44, 28, 36, 23, 12, 16, 5, 5, 12, 4, 5, 0, 0, 0 ],
    [ 5, 27, 26, 22, 32, 40, 33, 49, 42, 42, 62, 41, 57, 74, 49, 61, 66, 58, 59, 73, 55, 57, 65, 59, 48, 62, 51, 43, 35, 28, 25, 20, 12, 15, 15, 5, 2, 4, 1, 1, 0 ],
    [ 1, 1, 2, 5, 5, 8, 9, 12, 19, 20, 19, 17, 35, 24, 37, 31, 32, 41, 40, 47, 47, 47, 61, 55, 68, 62, 73, 76, 80, 80, 74, 68, 77, 72, 68, 43, 33, 26, 5, 1, 0 ],
    [ 0, 0, 0, 0, 0, 0, 4, 8, 7, 9, 21, 27, 43, 74, 84, 119, 0, 142, 131, 141, 116, 101, 90, 77, 69, 52, 47, 0, 36, 45, 36, 3, 11, 8, 8, 5, 5, 2, 0, 0, 0 ],
    [ 1, 4, 5, 4, 8, 6, 10, 15, 15, 22, 26, 45, 50, 60, 68, 83, 86, 90, 87, 77, 108, 98, 72, 72, 65, 67, 51, 55, 40, 31, 29, 21, 10, 11, 9, 8, 2, 5, 3, 2, 0 ]
  ],
  2024: [
    [20, 63, 120, 140, 165, 162, 168, 191, 182, 136, 109, 83, 73, 47, 19, 17, 9, 5, 1, 1],
    [99, 186, 151, 203, 183, 152, 133, 128, 104, 93, 77, 53, 40, 31, 29, 12, 8, 7, 2, 1],
    [28, 67, 83, 96, 101, 114, 131, 183, 177, 156, 165, 137, 101, 61, 33, 33, 11, 10, 7, 2],
    [25, 58, 102, 127, 159, 167, 186, 155, 161, 155, 121, 87, 66, 61, 32, 26, 7, 4, 4, 3],
    [68, 113, 144, 172, 191, 136, 170, 161, 157, 121, 109, 64, 41, 24, 9, 7, 2, 2, 0, 0],
    [28, 57, 75, 97, 92, 108, 111, 125, 146, 132, 135, 146, 155, 110, 86, 59, 26, 7, 0, 0],
    [1, 1, 11, 43, 104, 201, 244, 261, 249, 205, 123, 95, 75, 52, 21, 8, 7, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
};

const rangsPCsub = {
  2025: [
    [ 0, 5, 10, 9, 25, 32, 33, 42, 41, 44, 56, 62, 59, 63, 64, 77, 56, 71, 51, 35, 49, 43, 31, 29, 28, 32, 28, 12, 20, 18, 18, 10, 8, 7, 6, 4, 3, 2, 1, 0, 1 ],
    [ 2, 3, 10, 10, 15, 16, 24, 45, 36, 44, 45, 38, 37, 49, 39, 42, 30, 38, 35, 27, 27, 35, 34, 35, 45, 31, 32, 42, 36, 31, 41, 37, 33, 29, 30, 26, 28, 16, 11, 1, 0 ],
    [ 0, 0, 16, 26, 36, 33, 47, 45, 51, 69, 54, 65, 53, 57, 69, 60, 52, 65, 40, 39, 47, 35, 37, 32, 32, 15, 28, 15, 19, 11, 9, 7, 6, 3, 3, 2, 3, 3, 0, 0, 1 ],
    [ 2, 4, 9, 17, 26, 29, 33, 46, 47, 71, 57, 77, 64, 77, 58, 69, 63, 66, 45, 41, 38, 39, 38, 33, 34, 22, 14, 17, 13, 7, 7, 5, 3, 4, 2, 4, 1, 1, 1, 1, 0 ],
    [ 16, 31, 30, 35, 43, 39, 45, 53, 53, 66, 48, 52, 66, 41, 47, 49, 58, 41, 60, 39, 32, 27, 36, 30, 23, 23, 17, 21, 11, 6, 11, 11, 9, 4, 3, 3, 3, 3, 0, 0 ],
    [ 0, 1, 3, 13, 17, 23, 25, 34, 42, 43, 45, 52, 46, 38, 58, 45, 54, 42, 49, 51, 37, 40, 41, 33, 51, 37, 51, 43, 22, 25, 26, 25, 24, 20, 12, 5, 6, 6, 0, 0, 0 ],
    [ 1, 0, 1, 1, 3, 0, 1, 10, 8, 17, 26, 37, 62, 98, 121, 125, 0, 118, 110, 85, 99, 60, 60, 37, 36, 24, 14, 0, 7, 6, 7, 2, 1, 4, 2, 1, 1, 0, 0, 0, 0 ],
    [ 1, 1, 1, 1, 2, 3, 9, 13, 16, 24, 39, 52, 59, 65, 75, 79, 76, 86, 70, 70, 73, 71, 61, 58, 48, 32, 22, 20, 24, 11, 3, 6, 9, 1, 1, 0, 0, 1, 1, 1, 0 ]
  ],
  2024: [
    [ 11, 37, 47, 96, 108, 104, 121, 136, 145, 115, 92, 69, 44, 48, 19, 19, 14, 6, 1, 1 ],
    [ 29, 61, 81, 120, 137, 135, 123, 110, 69, 62, 57, 47, 54, 36, 33, 28, 19, 14, 5, 4 ],
    [ 7, 41, 73, 117, 142, 164, 167, 124, 105, 81, 72, 41, 30, 21, 24, 5, 5, 4, 1, 2 ],
    [ 11, 34, 82, 95, 120, 123, 133, 132, 97, 93, 68, 79, 47, 44, 27, 16, 13, 10, 5, 2 ],
    [ 51, 85, 118, 143, 165, 129, 118, 73, 87, 86, 60, 52, 31, 11, 11, 8, 5, 1, 1, 1 ],
    [ 61, 107, 77, 123, 113, 97, 94, 96, 62, 91, 87, 66, 59, 26, 29, 26, 8, 3, 2, 1 ],
    [ 0, 3, 12, 40, 95, 163, 214, 221, 184, 122, 70, 50, 26, 19, 7, 4, 0, 2, 0, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
};

const rangsTsub = {
  2025: [
    [ 1, 6, 11, 16, 14, 16, 22, 30, 34, 37, 34, 51, 36, 21, 40, 40, 35, 36, 30, 32, 29, 28, 24, 26, 18, 14, 17, 14, 16, 3, 6, 3, 3, 3, 1, 1, 2, 0, 1, 0, 0 ],
    [ 0, 0, 3, 6, 6, 12, 9, 18, 22, 26, 30, 29, 54, 45, 48, 63, 54, 52, 50, 41, 41, 35, 21, 18, 17, 11, 8, 12, 8, 6, 1, 2, 1, 0, 1, 0, 0, 0, 1, 0, 0 ],
    [ 1, 1, 6, 13, 10, 27, 26, 34, 30, 37, 40, 23, 38, 38, 44, 27, 33, 37, 30, 30, 24, 22, 24, 28, 22, 29, 13, 13, 10, 9, 9, 4, 8, 5, 1, 0, 2, 1, 1, 0, 1 ],
    [ 3, 5, 4, 15, 20, 21, 29, 35, 33, 24, 29, 45, 46, 43, 46, 32, 33, 30, 32, 28, 42, 32, 23, 22, 21, 13, 15, 7, 8, 7, 0, 1, 3, 0, 1, 1, 0, 2, 0, 0, 0 ],
    [ 8, 17, 18, 24, 32, 36, 30, 37, 33, 43, 39, 21, 32, 44, 25, 35, 29, 19, 25, 40, 21, 24, 26, 14, 14, 14, 11, 4, 11, 7, 8, 2, 1, 2, 0, 0, 3, 1, 1, 0, 0 ],
    [ 0, 3, 7, 11, 13, 23, 21, 21, 41, 34, 29, 29, 35, 30, 39, 19, 25, 25, 26, 23, 31, 23, 33, 25, 20, 18, 28, 32, 28, 7, 7, 19, 10, 6, 6, 3, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 1, 4, 0, 5, 8, 19, 15, 30, 41, 63, 64, 78, 83, 0, 70, 60, 40, 51, 37, 28, 11, 15, 8, 5, 0, 6, 5, 1, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 1, 1, 3, 2, 11, 9, 16, 21, 28, 42, 32, 37, 57, 45, 56, 48, 52, 38, 40, 41, 43, 28, 25, 15, 12, 14, 3, 4, 7, 5, 1, 2, 1, 1, 8, 1, 1, 0, 0 ]
  ],
  2024: [
    [16,29,44,56,78,68,94,85,75,65,48,40,22,18,12,7,4,4,0,1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [13,46,57,42,73,76,72,103,72,61,56,37,28,12,6,3,1,1,1,0],
    [6,26,43,57,85,87,93,82,76,65,42,29,24,21,8,11,4,2,1,1],
    [23,48,87,73,86,72,85,57,57,55,29,32,21,19,8,5,0,1,2,1],
    [42,76,71,92,66,45,52,70,53,36,41,29,24,33,8,9,9,4,0,1],
    [2,9,18,56,129,149,133,110,84,30,18,14,4,4,2,0,1,0,0,0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
};

const rangsBGsub = {
  2025: [
    [ 0, 0, 0, 0, 0, 3, 3, 1, 4, 4, 6, 3, 7, 7, 7, 6, 14, 13, 18, 18, 18, 18, 14, 19, 17, 13, 11, 6, 16, 10, 7, 8, 7, 4, 4, 1, 2, 2, 1, 0, 0 ],
    [ 4, 4, 6, 4, 11, 7, 7, 14, 11, 12, 9, 13, 4, 14, 10, 8, 8, 12, 10, 14, 6, 13, 9, 4, 17, 12, 5, 6, 4, 6, 8, 3, 3, 3, 4, 5, 1, 0, 0, 0, 1 ],
    [ 0, 2, 5, 3, 4, 7, 9, 17, 16, 22, 17, 20, 13, 13, 16, 17, 17, 15, 14, 12, 12, 12, 8, 2, 5, 6, 2, 0, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0 ],
    [ 0, 0, 3, 4, 2, 3, 4, 5, 10, 8, 14, 17, 16, 8, 21, 17, 19, 11, 16, 16, 16, 11, 7, 7, 12, 8, 2, 8, 6, 4, 3, 0, 1, 0, 12, 0, 0, 0, 1, 0, 0 ],
    [ 9, 7, 10, 16, 3, 16, 13, 19, 14, 9, 11, 13, 11, 21, 16, 10, 12, 10, 12, 8, 13, 6, 5, 4, 5, 5, 2, 4, 4, 0, 0, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0 ],
    [ 0, 0, 1, 5, 17, 11, 17, 14, 14, 17, 19, 8, 16, 18, 14, 8, 10, 12, 8, 6, 6, 11, 9, 5, 7, 6, 7, 5, 4, 4, 4, 4, 1, 1, 2, 1, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 1, 4, 7, 8, 8, 17, 19, 32, 30, 0, 23, 29, 35, 24, 15, 10, 8, 7, 2, 2, 0, 1, 4, 0, 2, 3, 0, 1, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 2, 2, 3, 7, 10, 12, 16, 17, 17, 12, 26, 23, 14, 14, 19, 16, 13, 6, 13, 9, 6, 8, 5, 2, 2, 6, 4, 4, 2, 1, 0, 0, 0, 0, 1, 0, 0 ],
    [ 5, 4, 4, 9, 6, 11, 14, 7, 10, 11, 11, 16, 15, 11, 14, 14, 13, 11, 11, 9, 5, 14, 13, 7, 7, 7, 5, 7, 5, 0, 4, 4, 1, 2, 1, 1, 2, 0, 0, 1, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 5, 14, 8, 12, 15, 21, 16, 29, 20, 14, 19, 14, 11, 18, 12, 14, 14, 8, 9, 4, 1, 4, 2, 2, 1, 1, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 9, 13, 20, 23, 24, 17, 27, 13, 23, 20, 20, 11, 12, 11, 6, 10, 11, 6, 2, 1, 2, 1, 0, 0, 0, 1, 0, 0, 0, 0 ]
  ],
  2024: [
    [0,0,0,5,22,45,75,60,38,38,21,14,4,2,3,0,0,0,0,0],
    [6,22,23,37,34,34,26,21,31,24,21,15,5,12,4,4,1,4,2,1],
    [29,25,38,21,14,19,22,34,26,24,14,18,14,9,9,3,3,1,2,2],
    [0,2,16,21,29,50,48,49,34,28,21,7,5,7,3,2,3,2,0,0],
    [2,9,16,28,29,53,28,20,26,35,17,18,12,13,5,5,4,6,1,0],
    [27,28,31,38,27,31,22,21,18,21,14,13,9,9,7,6,1,3,0,0],
    [19,36,39,32,30,26,22,29,15,19,10,10,8,5,10,7,5,3,1,1],
    [0,2,8,15,35,60,55,38,48,21,21,14,3,3,1,3,0,0,0,0],
    [0,1,2,6,20,36,27,34,40,44,32,38,11,14,8,6,2,3,0,0],
    [15,15,20,32,31,47,48,29,25,17,14,13,4,7,6,0,2,2,0,0],
    [0,0,0,1,4,12,13,16,28,32,46,55,46,43,20,8,2,0,1,0],
    [0,0,0,3,23,42,38,40,29,35,33,24,15,16,14,6,4,4,0,0]
  ]
};

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
      t.style.backgroundColor = "";
      t.classList.remove("active");
    });
    event.target.classList.add("active");
    
    document.querySelector('label[for="analyse"]').textContent = epreuve2[activeTab] || "Math I:";
    document.querySelector('label[for="algebre"]').textContent = epreuve1[activeTab] || "Math II:"; 
    document.querySelector('label[for="sta"]').textContent = epreuve3[activeTab] || "STA:"; 
    
    const isBG = (activeTab === "BG");
    document.getElementById("group-genetique").classList.toggle("hidden-element", !isBG);
    document.getElementById("group-animale").classList.toggle("hidden-element", !isBG);
    document.getElementById("group-vegetale").classList.toggle("hidden-element", !isBG);

    const tableMap = { "MP": "rankTableMP", "PC": "rankTablePC", "T": "rankTableT", "BG": "rankTableBG" };
    document.querySelectorAll(".rank-table").forEach(t => t.classList.add("hidden-element"));
    const activeTable = document.getElementById(tableMap[activeTab]);
    if (activeTable) {
      activeTable.classList.remove("hidden-element");
      loadTableRows(activeTable);
    }

    const textInput = document.querySelector(".table-search");
    if (textInput) textInput.value = "";
    const rankInput = document.querySelector(".rank-filter");
    if (rankInput) rankInput.value = "";

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
  if (bonusCheck.checked) {
    total += 15;
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

function computeSubjectRang(grade, tab, year, index) {
  const selectedRangs = rangssub[tab][year][index];
  if (!selectedRangs) return 0;
  
  const scaledGrade = (year === "2024") ? grade : grade * 2;
  
  let r = 0;
  let floorGrade = Math.floor(scaledGrade);
  
  for (let i = floorGrade + 1; i < selectedRangs.length; i++) {
    r += selectedRangs[i];
  }
  
  const fractional = 1 - (scaledGrade - floorGrade);
  return Math.round(r + 1 + fractional * (selectedRangs[floorGrade] || 0));
}

function update() {
  const values = [];
  
  inputs.forEach((input, i) => {
    const val = parseFloat(input.value) || 0;
    values.push(val);
    
    const rankLabel = input.nextElementSibling;
    if (rankLabel && rankLabel.tagName === 'LABEL') {
      rankLabel.style.display = "";
      
      if (yearSelect.value === "2024" && activeTab !== "BG" && i === 7) {
        rankLabel.textContent = "indisponible";
      } else if (yearSelect.value === "2024" && activeTab === "T" && i === 1) {
        rankLabel.textContent = "indisponible";
      } else {
        rankLabel.textContent = computeSubjectRang(val, activeTab, yearSelect.value, i);
      }
    }
  });

  const avg = computeAverage(values);
  const rang = computeRang(avg, yearSelect.value, activeTab);
  let percentage = 100 * rang / Candidates[ yearSelect.value ][ activeTab ];
  
  if (percentage % 1 === 0) {
    resultDiv.textContent = "Rang ≈ " + rang + " (Top " + Math.trunc(percentage) + "%)";
  } else {
    resultDiv.textContent = "Rang ≈ " + rang + " (Top " + percentage.toFixed(2) + "%)";
  }
  if (rang <= Admise[yearSelect.value][activeTab]) {
    resultDiv3.textContent = "Admis";
    resultDiv3.classList.add("Admise");
    resultDiv3.classList.remove("Refuse");
  } else {
    resultDiv3.textContent = "Refusé";
    resultDiv3.classList.add("Refuse");
    resultDiv3.classList.remove("Admise");
  }
  resultDiv2.textContent = "Moyenne = " + avg.toFixed(2);
}

inputs.forEach(input => input.addEventListener("input", update));
yearSelect.addEventListener("change", update);

update();

let originalTableRows = [];
let searchTimeout = null;

function loadTableRows(table) {
  if (!table) return;
  const tbody = table.getElementsByTagName("tbody")[0];
  const rows = Array.from(tbody.getElementsByTagName("tr"));
  let lastSchoolText = "";
  let lastSchoolSubname = "";

  originalTableRows = rows.map(row => {
    const schoolCell = row.querySelector("td[rowspan]");
    if (schoolCell) {
      lastSchoolText = schoolCell.textContent;
      lastSchoolSubname = schoolCell.getAttribute("data-subname") || "";
    }

    const cells = Array.from(row.getElementsByTagName("td"));
    let specialtyCell, rankCell, capaciteCell;

    if (schoolCell) {
      specialtyCell = cells[1];
      rankCell = cells[2];
      capaciteCell = cells[3];
    } else {
      specialtyCell = cells[0];
      rankCell = cells[1];
      capaciteCell = cells[2];
    }

    return {
      schoolText: lastSchoolText,
      schoolSubname: lastSchoolSubname,
      specialtyText: specialtyCell ? specialtyCell.textContent : "",
      specialtySubname: specialtyCell ? (specialtyCell.getAttribute("data-subname") || "") : "",
      rankText: rankCell ? rankCell.textContent : "",
      capaciteText: capaciteCell ? capaciteCell.textContent : ""
    };
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector(".rank-table:not(.hidden-element)");
  loadTableRows(table);
});

function filterRankTable() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const activeTable = document.querySelector(".rank-table:not(.hidden-element)");
    if (activeTable) {
      executeFilter(activeTable);
    }
  }, 500);
}

function executeFilter(table) {
  const textInput = document.querySelector(".table-search");
  const rankInput = document.querySelector(".rank-filter");

  if (!textInput || !rankInput) return;

  const rawFilter = textInput.value.trim();
  const filter = cleanString(textInput.value);
  const maxRankThreshold = parseInt(rankInput.value, 10);

  const tbody = table.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";

  let activeSchool = "";
  let accumulatedRows = [];

  const isSubnameQuery = rawFilter !== "" && /^[A-Z]+$/.test(rawFilter);

  originalTableRows.forEach((rowData) => {
    let textConditionMatches = false;

    if (rawFilter === "") {
      textConditionMatches = true;
    } else if (isSubnameQuery) {
      const schoolSubnames = rowData.schoolSubname.split(/\s+/);
      const specialtySubnames = rowData.specialtySubname.split(/\s+/);
      textConditionMatches = schoolSubnames.includes(rawFilter) || specialtySubnames.includes(rawFilter);
    } else {
      const schoolSubnames = rowData.schoolSubname.split(/\s+/);
      const specialtySubnames = rowData.specialtySubname.split(/\s+/);

      textConditionMatches =
        cleanString(rowData.schoolText).includes(filter) ||
        cleanString(rowData.specialtyText).includes(filter) ||
        schoolSubnames.includes(rawFilter) ||
        specialtySubnames.includes(rawFilter);
    }

    let rankConditionMatches = true;
    if (!isNaN(maxRankThreshold)) {
      const parsedRowRank = parseInt(rowData.rankText.replace(/\s/g, ""), 10);
      if (isNaN(parsedRowRank) || parsedRowRank < maxRankThreshold) {
        rankConditionMatches = false;
      }
    }

    if (textConditionMatches && rankConditionMatches) {
      if (rowData.schoolText !== activeSchool) {
        renderGroup(accumulatedRows);
        activeSchool = rowData.schoolText;
        accumulatedRows = [rowData];
      } else {
        accumulatedRows.push(rowData);
      }
    }
  });

  renderGroup(accumulatedRows);

  function renderGroup(group) {
    if (group.length === 0) return;
    group.forEach((data, index) => {
      const tr = document.createElement("tr");
      if (index === 0) {
        const tdSchool = document.createElement("td");
        tdSchool.setAttribute("rowspan", group.length);
        tdSchool.setAttribute("data-subname", data.schoolSubname);
        tdSchool.textContent = data.schoolText;
        tr.appendChild(tdSchool);
      }
      const tdSpec = document.createElement("td");
      if (data.specialtySubname) tdSpec.setAttribute("data-subname", data.specialtySubname);
      tdSpec.textContent = data.specialtyText;
      tr.appendChild(tdSpec);

      const tdRank = document.createElement("td");
      tdRank.textContent = data.rankText;
      tr.appendChild(tdRank);

      if (data.capaciteText !== "") {
        const tdCapacite = document.createElement("td");
        tdCapacite.textContent = data.capaciteText;
        tr.appendChild(tdCapacite);
      }

      tbody.appendChild(tr);
    });
  }
}

function cleanString(str) {
  return str.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/i/g, "e");
}

const pageTabs = document.querySelectorAll('[data-page-target]');
const calculatorPage = document.getElementById('calculator');
const guidePage = document.getElementById('guide');

function switchGuideTable(tableTarget) {
    const tableTabs = guidePage.querySelectorAll('[data-table-target]');
    tableTabs.forEach(t => t.classList.remove('active'));
    const activeTab = guidePage.querySelector(`[data-table-target="${tableTarget}"]`);
    if (activeTab) activeTab.classList.add('active');

    document.querySelectorAll('.rank-table').forEach(t => t.classList.add('hidden-element'));
    const activeTable = document.getElementById(`rankTable${tableTarget}`);
    if (activeTable) {
        activeTable.classList.remove('hidden-element');
        loadTableRows(activeTable);
    }

    const textInput = document.querySelector('.table-search');
    if (textInput) textInput.value = '';
    const rankInput = document.querySelector('.rank-filter');
    if (rankInput) rankInput.value = '';
}

pageTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        pageTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.dataset.pageTarget;

        if (target === 'calculator') {
            calculatorPage.classList.remove('hidden-element');
            guidePage.classList.add('hidden-element');
        } else if (target === 'guide') {
            guidePage.classList.remove('hidden-element');
            calculatorPage.classList.add('hidden-element');

            const activeSectionTab = guidePage.querySelector('[data-table-target].active');
            const tableTarget = activeSectionTab ? activeSectionTab.dataset.tableTarget : 'MP';
            switchGuideTable(tableTarget);
        }
    });
});

guidePage.querySelectorAll('[data-table-target]').forEach(tab => {
    tab.addEventListener('click', () => {
        switchGuideTable(tab.dataset.tableTarget);
    });
});