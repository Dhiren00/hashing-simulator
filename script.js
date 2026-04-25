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
  let h2Val = Number(document.getElementById("h2Input").value);
  return h2Val - (key % h2Val);
}

function updateFormula() {
  let method = document.getElementById("method").value;
  let formula = document.getElementById("formula");
  let h2Input = document.getElementById("h2Input");

  if (method === "linear") {
    formula.innerHTML = "Linear Probing: index = (h(key) + i) % tableSize";
    h2Input.style.display = "none";
  } 
  else if (method === "quadratic") {
    formula.innerHTML = "Quadratic Probing: index = (h(key) + i²) % tableSize";
    h2Input.style.display = "none";
  } 
  else {
    formula.innerHTML = "Double Hashing: index = (h1(key) + i × h2(key)) % tableSize";
    h2Input.style.display = "block";
  }
}

function insertKey() {
  let keyInput = document.getElementById("keyInput");
  let h2Input = document.getElementById("h2Input");

  let key = Number(keyInput.value);
  let method = document.getElementById("method").value;
  let steps = document.getElementById("steps");

  if (keyInput.value === "") {
    alert("Please enter a key");
    return;
  }

  if (method === "double") {
    if (h2Input.value === "") {
      alert("Please enter h2 value for Double Hashing");
      return;
    }

    if (Number(h2Input.value) <= 0) {
      alert("h2 value must be positive");
      return;
    }

    h2Input.disabled = true;
  }

  let h = hash1(key);
  let stepText = `Hash value: ${key} % ${tableSize} = ${h}<br>`;

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

    stepText += `Trying index ${index}<br>`;

    if (hashTable[index] === null) {
      hashTable[index] = key;
      stepText += `<b>Inserted at index ${index}</b>`;
      steps.innerHTML = stepText;
      displayTable(index, "found");
      return;
    } 
    else {
      stepText += `Collision at index ${index}<br>`;
    }
  }

  steps.innerHTML = stepText + "<b>Hash table is full!</b>";
}

function searchKey() {
  let keyInput = document.getElementById("keyInput");
  let h2Input = document.getElementById("h2Input");

  let key = Number(keyInput.value);
  let method = document.getElementById("method").value;
  let steps = document.getElementById("steps");

  if (keyInput.value === "") {
    alert("Please enter a key");
    return;
  }

  if (method === "double" && h2Input.value === "") {
    alert("Please enter h2 value for Double Hashing");
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

  let h2Input = document.getElementById("h2Input");
  h2Input.disabled = false;
  h2Input.value = "";

  document.getElementById("steps").innerHTML = "Hash table reset.";
  displayTable();
  updateFormula();
}

displayTable();
updateFormula();