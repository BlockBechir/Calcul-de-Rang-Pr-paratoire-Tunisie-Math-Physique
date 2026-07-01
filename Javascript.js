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
  2024: { "MP": 1714, "PC": 1235, "T": 768, "BG": 328 },
  2023: { "MP": 1709, "PC": 1148, "T": 711, "BG": 304 },
  2022: { "MP": 0, "PC": 0, "T": 0, "BG": 0 }
}

const Admise = {
  2025: { "MP": 1326, "PC": 1045, "T": 689, "BG": 253 },
  2024: { "MP": 1410, "PC": 1030, "T": 686, "BG": 290 },
  2023: { "MP": 1402, "PC": 978, "T": 610, "BG": 254 },
  2022: { "MP": 0, "PC": 1030, "T": 686, "BG": 290 }
}

const rangsMP = {
  2025: [ 1, 10, 18, 55, 90, 138, 160, 150, 167, 163, 161, 136, 105, 66, 55, 29, 15, 0, 2, 0 ],
  2024: [ 5, 29, 57, 134, 181, 209, 209, 224, 201, 162, 121, 78, 58, 30, 7, 6, 2, 0, 0, 0 ],
  2023: [ 0, 10, 28, 43, 89, 136, 186, 182, 201, 167, 187, 141, 129, 84, 63, 40, 17, 5, 0, 0, 0 ],
  2022: [40,60,213,329,319,237,217,129,74,63,36,30,19,13,4,1,1,0,0,0]
};

const rangsPC = {
  2025: [ 0, 1, 13, 52, 90, 150, 174, 165, 143, 118, 99, 85, 42, 28, 13, 9, 2, 1, 0, 0 ],
  2024: [ 4, 10, 31, 93, 150, 183, 203, 157, 131, 96, 67, 40, 35, 22, 6, 6, 0, 0, 0 ],
  2023: [ 1, 5, 15, 21, 66, 102, 138, 163, 169, 181, 103, 81, 49, 31, 9, 6, 6, 1, 0, 0, 0 ],
  2022: [22,46,211,325,318,219,148,67,30,16,9,4,2,0,1,0,0,0,0,0]
};

const rangsT = {
  2025: [ 0, 2, 12, 33, 58, 87, 121, 100, 97, 86, 74, 35, 26, 9, 9, 1, 1, 0, 0, 0 ],
  2024: [ 2, 3, 26, 36, 84, 107, 107, 120, 116, 58, 49, 35, 18, 4, 0, 0, 2, 0, 0, 0 ],
  2023: [0, 1, 15, 41, 55, 86, 106, 93, 89, 73, 42, 50, 22, 24, 10, 0, 2, 1, 0, 0],
  2022: [31, 28, 95, 177, 176, 119, 103, 59, 33, 19, 12, 3, 0, 0, 0, 0, 0, 0, 0, 0]
};

const rangsBG = {
  2025: [ 0, 0, 0, 2, 9, 26, 52, 69, 46, 37, 26, 13, 6, 4, 1, 1, 0, 0, 0, 0 ],
  2024: [ 0, 0, 0, 5, 22, 45, 75, 60, 38, 38, 21, 14, 4, 2, 3, 0, 0, 0, 0, 0 ],
  2023: [0, 0, 6, 18, 31, 39, 58, 60, 34, 31, 15, 4, 4, 2, 1, 0, 0, 0, 0, 0],
  2022: [9, 0, 19, 54, 113, 73, 48, 19, 11, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

const rangs = { "MP": rangsMP, "PC": rangsPC, "T": rangsT, "BG": rangsBG };

const rangsMPsub = {
  2025: [
    [7, 9, 19, 39, 38, 52, 63, 67, 74, 77, 61, 66, 63, 57, 69, 54, 55, 54, 56, 56, 59, 52, 40, 32, 51, 46, 28, 29, 36, 20, 19, 18, 21, 9, 7, 6, 6, 3, 3, 3, 0] ,
    [16, 18, 14, 35, 39, 43, 62, 63, 67, 66, 71, 73, 74, 80, 74, 73, 58, 72, 53, 65, 66, 43, 35, 41, 23, 29, 25, 25, 20, 17, 15, 15, 14, 9, 5, 12, 4, 3, 2, 1, 3, 0] ,
    [1, 8, 15, 19, 34, 31, 33, 24, 41, 40, 48, 57, 45, 49, 53, 63, 65, 66, 73, 56, 71, 61, 64, 58, 57, 74, 68, 42, 53, 37, 22, 30, 11, 19, 16, 12, 4, 0, 3, 1, 1] ,
    [6, 10, 17, 12, 20, 39, 16, 29, 38, 34, 45, 30, 49, 67, 56, 56, 68, 82, 75, 91, 72, 86, 69, 68, 70, 67, 56, 43, 27, 37, 22, 11, 15, 4, 5, 13, 4, 5, 1, 0, 1] ,
    [6, 27, 25, 22, 33, 39, 33, 49, 42, 43, 61, 42, 57, 75, 49, 60, 66, 57, 59, 72, 56, 56, 64, 58, 47, 61, 51, 43, 36, 27, 24, 20, 12, 16, 15, 6, 1, 3, 2, 0, 0] ,
    [0, 1, 3, 4, 6, 7, 8, 12, 20, 20, 18, 18, 34, 24, 37, 32, 33, 41, 41, 46, 48, 46, 62, 55, 67, 63, 72, 75, 80, 79, 75, 67, 77, 71, 67, 42, 34, 26, 4, 2, 0] ,
    [0, 0, 0, 1, 0, 1, 5, 9, 7, 10, 22, 27, 42, 75, 83, 118, -1, 143, 130, 141, 116, 101, 90, 78, 69, 53, 47, -1, 35, 45, 36, 4, 12, 9, 7, 4, 4, 3, 0, 1, 0] ,
    [1, 3, 4, 5, 8, 6, 9, 16, 15, 21, 27, 44, 51, 60, 68, 82, 87, 90, 87, 78, 109, 98, 73, 71, 64, 68, 52, 55, 41, 30, 29, 22, 11, 11, 10, 7, 1, 4, 3, 3, 1]
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
  ],
  2023: [
  [37,59,102,124,172,133,147,146,118,135,108,93,97,73,61,37,37,24,20,6,1],
  [14,31,33,63,111,104,155,174,182,192,168,147,122,85,61,40,19,6,6,1],
  [38,55,39,44,65,71,79,97,112,147,148,146,172,154,137,99,72,25,11,6],
  [20,38,76,117,162,189,184,175,164,133,121,81,77,61,42,36,23,9,10,2,2],
  [58,54,64,66,92,102,98,93,112,121,133,118,135,101,106,100,74,52,26,8,1],
  [20,28,42,59,79,93,83,106,108,140,115,172,161,164,124,110,67,30,11],
  [6,10,39,62,113,171,261,276,261,109,159,108,72,31,25,14,2,2,1],
  [7,21,46,73,119,175,184,221,204,174,124,96,80,57,50,49,22,11,5,2]
  ],
  2022: [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ]
};

const rangsPCsub = {
  2025: [
    [0, 5, 9, 10, 25, 31, 32, 42, 41, 43, 57, 61, 60, 64, 64, 77, 57, 72, 51, 36, 50, 42, 31, 28, 29, 33, 28, 12, 21, 17, 17, 9, 9, 7, 5, 3, 3, 3, 2, 0, 2] ,
    [3, 4, 11, 11, 15, 15, 24, 46, 37, 44, 44, 39, 38, 49, 40, 43, 30, 38, 34, 26, 26, 36, 35, 36, 46, 31, 32, 43, 35, 30, 42, 36, 34, 29, 29, 26, 29, 16, 11, 0, 0] ,
    [1, 1, 17, 27, 36, 34, 47, 46, 52, 68, 54, 65, 53, 56, 68, 61, 52, 65, 41, 40, 46, 34, 36, 31, 32, 14, 29, 15, 18, 11, 9, 8, 5, 2, 3, 1, 2, 4, 0, 0, 2] ,
    [1, 3, 10, 17, 25, 30, 32, 46, 46, 72, 58, 76, 65, 78, 58, 68, 63, 67, 45, 40, 39, 38, 37, 33, 34, 21, 14, 16, 13, 7, 6, 5, 2, 4, 1, 3, 0, 0, 1, 2, 1] ,
    [17, 30, 29, 36, 42, 38, 46, 54, 54, 65, 49, 53, 67, 42, 46, 48, 59, 42, 59, 39, 32, 27, 36, 30, 24, 22, 16, 20, 12, 6, 12, 12, 10, 3, 2, 3, 3, 2, 0, 1] ,
    [1, 0, 4, 12, 18, 23, 26, 35, 42, 44, 46, 51, 47, 37, 57, 45, 55, 41, 50, 52, 36, 39, 41, 34, 50, 38, 50, 43, 21, 26, 25, 24, 24, 19, 11, 6, 7, 6, 0, 0, 1] ,
    [0, 0, 1, 0, 4, 0, 1, 11, 8, 18, 27, 37, 63, 98, 122, 124, 0, 117, 109, 85, 98, 60, 60, 36, 37, 25, 15, 1, 6, 6, 7, 3, 0, 3, 1, 2, 2, 0, 0, 1, 1] ,
    [2, 1, 1, 1, 3, 2, 9, 12, 17, 23, 39, 53, 59, 65, 74, 78, 76, 86, 69, 71, 72, 72, 62, 57, 48, 31, 22, 21, 24, 11, 3, 6, 8, 2, 0, 0, 0, 1, 1, 1, 0]
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
  ],
  2023: [
    [11,40,59,81,94,134,120,131,125,110,81,71,37,26,14,9,4,4,1],
    [88,140,163,139,107,100,59,60,63,39,38,35,32,30,19,16,6,8,3,3],
    [7,12,17,23,38,34,63,61,84,98,136,174,145,107,65,50,16,12,6,2],
    [7,14,35,45,74,81,127,150,142,103,91,83,68,40,32,21,16,12,8,1,1],
    [40,52,77,100,90,114,104,99,94,78,59,65,53,45,30,21,13,10,5,1],
    [13,45,51,64,87,88,100,92,90,97,77,87,79,72,53,33,15,4,2,0,0],
    [6,19,56,38,154,202,218,178,55,93,58,38,18,7,3,5,1,1],
    [3,11,28,75,93,129,180,168,131,118,72,43,42,19,17,10,4,3,1,3]
  ],
  2022: [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ]
};

const rangsTsub = {
  2025: [
    [2, 7, 12, 16, 14, 15, 22, 29, 34, 37, 35, 50, 35, 20, 39, 41, 36, 35, 30, 33, 30, 27, 25, 26, 17, 14, 18, 14, 16, 4, 7, 2, 2, 4, 2, 2, 1, 0, 0, 0, 1] ,
    [0, 0, 3, 5, 5, 11, 10, 19, 21, 27, 31, 30, 53, 46, 49, 63, 55, 53, 49, 42, 40, 35, 21, 19, 16, 12, 9, 11, 8, 6, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1] ,
    [1, 1, 6, 14, 10, 28, 25, 34, 31, 36, 40, 23, 37, 37, 45, 26, 34, 37, 31, 31, 24, 22, 23, 28, 23, 28, 14, 13, 11, 10, 9, 3, 7, 4, 1, 0, 3, 0, 1, 0, 0] ,
    [2, 6, 4, 16, 19, 21, 29, 35, 33, 25, 30, 44, 46, 44, 46, 31, 32, 30, 32, 29, 41, 33, 22, 23, 21, 14, 14, 6, 9, 8, 1, 1, 2, 0, 2, 0, 0, 1, 1, 0, 1] ,
    [7, 16, 19, 23, 32, 37, 29, 38, 33, 42, 39, 21, 33, 45, 25, 36, 28, 18, 25, 41, 22, 24, 25, 13, 15, 14, 10, 3, 11, 6, 7, 1, 0, 2, 1, 0, 3, 1, 2, 1, 0] ,
    [0, 3, 8, 12, 14, 23, 22, 21, 41, 34, 29, 28, 35, 30, 39, 18, 24, 26, 25, 22, 31, 22, 34, 25, 19, 19, 28, 31, 28, 7, 8, 20, 10, 6, 7, 4, 1, 0, 1, 1, 0] ,
    [1, 0, 0, 2, 3, 0, 5, 8, 18, 15, 29, 40, 62, 63, 77, 84, 1, 69, 60, 39, 51, 37, 28, 10, 16, 7, 4, 1, 6, 4, 1, 1, 3, 1, 1, 1, 0, 0, 0, 1, 1] ,
    [0, 1, 0, 2, 3, 3, 12, 9, 17, 21, 27, 41, 33, 37, 57, 44, 55, 49, 51, 38, 39, 40, 42, 28, 25, 15, 11, 13, 2, 5, 6, 6, 1, 1, 1, 0, 8, 1, 1, 0, 1]
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
  ],
  2023: [
  [14, 31, 40, 55, 66, 77, 72, 69, 60, 61, 45, 36, 31, 18, 14, 7, 8, 7, 1, 2],
  [2, 2, 6, 11, 26, 55, 80, 87, 97, 91, 82, 68, 44, 34, 12, 11, 3, 2, 1, 0],
  [55, 50, 45, 40, 50, 58, 53, 53, 50, 64, 43, 40, 30, 33, 23, 12, 8, 4, 1, 1],
  [5, 22, 36, 55, 85, 76, 83, 79, 73, 57, 45, 29, 24, 17, 10, 9, 6, 4, 1, 0],
  [41, 30, 37, 51, 50, 45, 50, 51, 42, 54, 49, 51, 41, 32, 32, 23, 23, 9, 2, 0, 0],
  [11, 63, 52, 52, 52, 53, 68, 45, 59, 41, 45, 40, 42, 33, 34, 17, 5, 1, 0, 0],
  [2, 6, 19, 17, 54, 74, 125, 68, 123, 97, 61, 23, 23, 11, 7, 1, 2, 2, 0, 0],
  [3, 3, 15, 31, 50, 79, 85, 100, 70, 62, 53, 67, 30, 25, 11, 11, 7, 8, 4, 1]
  ],
  2022: [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ]
};

const rangsBGsub = {
  2025: [
    [0, 1, 1, 1, 0, 2, 2, 2, 4, 4, 6, 4, 8, 7, 7, 7, 13, 13, 18, 18, 17, 18, 13, 20, 18, 13, 11, 5, 15, 11, 6, 7, 7, 5, 5, 0, 1, 3, 1, 1, 0] ,
    [5, 3, 5, 4, 11, 7, 8, 14, 11, 12, 10, 14, 5, 14, 9, 8, 8, 13, 10, 13, 7, 12, 10, 5, 17, 13, 6, 6, 4, 7, 9, 2, 4, 2, 5, 5, 1, 0, 0, 1, 2] ,
    [1, 1, 6, 2, 4, 6, 10, 16, 17, 21, 18, 20, 13, 14, 16, 18, 18, 16, 14, 13, 11, 11, 9, 2, 5, 6, 3, 0, 3, 2, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1] ,
    [0, 0, 4, 3, 1, 2, 5, 5, 9, 8, 15, 16, 16, 9, 22, 18, 18, 10, 17, 16, 17, 11, 7, 6, 12, 8, 2, 7, 7, 5, 2, 0, 2, 0, 13, 0, 0, 0, 1, 0, 1] ,
    [10, 7, 9, 16, 2, 17, 12, 19, 15, 9, 10, 12, 10, 20, 16, 9, 12, 10, 13, 9, 14, 7, 4, 3, 4, 5, 2, 3, 4, 1, 0, 1, 2, 1, 0, 2, 0, 1, 0, 1, 0] ,
    [0, 0, 1, 5, 17, 11, 16, 13, 15, 16, 19, 7, 17, 19, 14, 8, 10, 13, 8, 5, 7, 11, 9, 5, 6, 7, 8, 5, 5, 5, 3, 3, 1, 2, 3, 1, 1, 0, 0, 1, 1] ,
    [0, 1, 1, 0, 0, 0, 1, 2, 5, 8, 7, 7, 17, 20, 33, 31, 1, 24, 30, 35, 23, 16, 9, 8, 8, 1, 2, 1, 0, 4, 0, 1, 3, 0, 1, 0, 0, 0, 0, 1, 1] ,
    [0, 0, 0, 1, 1, 2, 4, 8, 10, 13, 16, 16, 16, 12, 26, 22, 13, 14, 18, 16, 13, 7, 12, 9, 7, 8, 6, 1, 2, 6, 5, 4, 1, 0, 1, 0, 0, 1, 2, 0, 0] ,
    [4, 4, 4, 9, 7, 11, 13, 7, 10, 12, 10, 16, 15, 11, 13, 15, 14, 10, 12, 9, 6, 14, 14, 8, 8, 6, 4, 8, 4, 0, 3, 5, 0, 1, 0, 2, 2, 0, 0, 1, 0] ,
    [1, 0, 1, 1, 0, 0, 0, 0, 2, 1, 6, 15, 7, 11, 14, 22, 15, 30, 21, 15, 20, 14, 12, 18, 13, 15, 15, 9, 10, 3, 1, 3, 2, 3, 1, 1, 0, 0, 0, 0, 1] ,
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 3, 4, 9, 12, 20, 22, 23, 16, 26, 14, 23, 19, 19, 12, 13, 11, 6, 9, 11, 6, 3, 2, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0]
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
  ],
  2023: [
    [23, 30, 29, 30, 25, 30, 24, 18, 15, 17, 10, 14, 14, 5, 7, 3, 4, 1, 2, 5],
    [9, 12, 15, 24, 29, 29, 39, 24, 28, 30, 12, 20, 10, 11, 5, 3, 1, 2, 2, 0],
    [26, 14, 29, 27, 32, 24, 21, 23, 23, 23, 11, 18, 8, 10, 5, 2, 3, 3, 2, 0],
    [16, 11, 20, 27, 31, 36, 30, 30, 27, 15, 26, 12, 10, 4, 5, 1, 1, 1, 1, 1],
    [11, 28, 18, 38, 30, 24, 21, 25, 26, 28, 14, 18, 11, 6, 5, 1, 1, 0, 0, 0, 0],
    [6, 12, 26, 30, 40, 28, 22, 18, 22, 18, 21, 12, 17, 17, 9, 3, 4, 0, 0, 0],
    [2, 8, 7, 22, 47, 72, 44, 47, 24, 14, 5, 6, 4, 1, 1, 1, 0, 0, 0, 0],
    [1, 5, 9, 27, 27, 34, 35, 35, 33, 30, 26, 16, 12, 6, 6, 5, 0, 0, 0, 0],
    [5, 7, 16, 21, 25, 23, 48, 36, 25, 24, 27, 16, 18, 6, 6, 1, 1, 0, 0, 0],
    [1, 4, 17, 19, 29, 31, 39, 39, 37, 32, 28, 16, 12, 1, 2, 0, 0, 0, 0, 0],
    [6, 13, 29, 51, 45, 30, 40, 33, 17, 9, 13, 8, 4, 3, 3, 1, 0, 0, 0, 0]
  ],
  2022: [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
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
  let r = 1, floorAvg = Math.floor(avg);
  for (let i = floorAvg + 1; i < selectedRangs.length; i++) r += selectedRangs[i];
  const fractional = 1 - (avg - floorAvg);
  return Math.round(r + fractional * (selectedRangs[floorAvg] || 0));
}

function computeSubjectRang(grade, tab, year, index) {
  const selectedRangs = rangssub[tab][year][index];
  if (!selectedRangs) return 0;
  
  const scaledGrade = (year === "2025") ? grade * 2 : grade;  
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
    
    let rankLabel = input.nextElementSibling;
    
    if (yearSelect.value === "2022") {
      if (rankLabel && rankLabel.tagName === 'LABEL') {
        rankLabel.remove();
      }
    } else {
      if (!rankLabel || rankLabel.tagName !== 'LABEL') {
        rankLabel = document.createElement('label');
        input.insertAdjacentElement('afterend', rankLabel);
      }
      
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

  if (yearSelect.value === "2022") {
    // Hide rank/percentage and Admis/Refusé entirely for 2022
    resultDiv.textContent = "";
    resultDiv3.textContent = "";
    resultDiv3.classList.remove("Admise", "Refuse");
  } else {
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