
const pageForm = document.getElementById("page-form");
const pageResults = document.getElementById("page-results");

if (pageForm) {
  const range = document.getElementById("confidence");
  const rangeValue = document.getElementById("rangeValue");

  range.addEventListener("input", function () {
    rangeValue.textContent = range.value;
  });
}

if (pageResults) {
  const resultsGrid = document.getElementById("resultsGrid");
  const raw = document.getElementById("raw");

  const params = new URLSearchParams(window.location.search);


  raw.textContent = window.location.search || "(no query string found)";


  const seenKeys = {};
  for (const [key, value] of params.entries()) {
    if (!seenKeys[key]) seenKeys[key] = [];
    seenKeys[key].push(value);
  }

  const keys = Object.keys(seenKeys);

  if (keys.length === 0) {
    resultsGrid.innerHTML =
      '<div class="result-item"><div class="k">No data</div><div class="v">(Submit the form first.)</div></div>';
  } else {
    let html = "";
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      const values = seenKeys[k];
      const pretty = values.length > 1 ? values.join(", ") : values[0];

      html +=
        '<div class="result-item">' +
          '<div class="k">' + k + '</div>' +
          '<div class="v">' + (pretty || "(blank)") + '</div>' +
        '</div>';
    }
    resultsGrid.innerHTML = html;
  }
}
