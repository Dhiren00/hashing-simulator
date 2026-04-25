let tableSize = 10;
let hashTable = new Array(tableSize).fill(null);

function displayTable(highlightIndex = -1, highlightType = "") {
  let tableDiv = document.getElementById("table");
  tableDiv.innerHTML = "";

  for (let i = 0; i < tableSize; i++) {
    let cell = document.createElement("div");
    cell.className = "cell";

    if (hashTable[i] === null) {
      cell.innerHTML = `Index ${i}<br><span class="empty">Empty</span>`;
    } else {
      cell.innerHTML = `Index ${i}<br>${hashTable[i]}`;
      cell.classList.add("filled");
    }

    if (i === highlightIndex) {
      cell.classList.add(highlightType);
    }

    tableDiv.appendChild(cell);
  }
}

function hash1(key) {
  return key % tableSize;
}

function hash2(key) {
  return 7 - (key % 7);
}

function insertKey() {
  let key = Number(document.getElementById("keyInput").value);
  let method = document.getElementById("method").value;
  let steps = document.getElementById("steps");

  if (document.getElementById("keyInput").value === "") {
    alert("Please enter a key");
    return;
  }

  let h = hash1(key);
  let stepText = `Hash value: ${key} % ${tableSize} = ${h}<br>`;

  for (let i = 0; i < tableSize; i++) {
    let index;

    if (method === "linear") {
      index = (h + i) % tableSize;
      document.getElementById("formula").innerHTML =
        "Linear Probing: index = (h(key) + i) % tableSize";
    } 
    else if (method === "quadratic") {
      index = (h + i * i) % tableSize;
      document.getElementById("formula").innerHTML =
        "Quadratic Probing: index = (h(key) + i²) % tableSize";
    } 
    else {
      index = (h + i * hash2(key)) % tableSize;
      document.getElementById("formula").innerHTML =
        "Double Hashing: index = (h1(key) + i × h2(key)) % tableSize";
    }

    stepText += `Trying index ${index}<br>`;

    if (hashTable[index] === null) {
      hashTable[index] = key;
      stepText += `<b>Key ${key} inserted at index ${index}</b>`;
      steps.innerHTML = stepText;
      displayTable(index, "found");
      return;
    } else {
      stepText += `Collision at index ${index}<br>`;
    }
  }

  steps.innerHTML = stepText + "<b>Hash table is full!</b>";
}

function searchKey() {
  let key = Number(document.getElementById("keyInput").value);
  let method = document.getElementById("method").value;
  let steps = document.getElementById("steps");

  if (document.getElementById("keyInput").value === "") {
    alert("Please enter a key");
    return;
  }

  let h = hash1(key);
  let stepText = `Searching for ${key}<br>`;

  for (let i = 0; i < tableSize; i++) {
    let index;

    if (method === "linear") {
      index = (h + i) % tableSize;
    } 
    else if (method === "quadratic") {
      index = (h + i * i) % tableSize;
    } 
    else {
      index = (h + i * hash2(key)) % tableSize;
    }

    stepText += `Checking index ${index}<br>`;

    if (hashTable[index] === key) {
      stepText += `<b>Key found at index ${index}</b>`;
      steps.innerHTML = stepText;
      displayTable(index, "found");
      return;
    }
  }

  steps.innerHTML = stepText + "<b>Key not found</b>";
  displayTable();
}

function resetTable() {
  hashTable = new Array(tableSize).fill(null);
  document.getElementById("steps").innerHTML = "Hash table reset successfully.";
  displayTable();
}

displayTable();