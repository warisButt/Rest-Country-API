document.getElementById("mySearch").size = "50";
document.getElementById("region").size = "50";
let cardAPI = document.querySelector(".allapi");

const darkModefun = () => {
  let element = document.body;
  element.classList.toggle("dark-mode");
};

function showData() {
  const url = "https://restcountries.com/v3.1/all";
  apiData(url);
}

const apiData = async (url) => {
  try {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    data.map((element) => {
      let cardCreate = document.createElement("div");
      cardCreate.classList.add("cardCreate");
      cardCreate.innerHTML = `
      <div class="countryCard"  >
      <div class="flag">
      <img src="${element.flags.png}" alt="flag" width="280" height="180" >
      </div>
      <div class="description">
      <h3><span>${element.name.common}</span></h3>
      <p id="pop"><span><b>Population:</b> </span>${element.population.toLocaleString()}</p>
      <p><span><b>Region:</b> </span>${element.region}</p>
      <p><span><b>Capital:</b> </span>${element.capital}</p>
      </div>
      </div>
      `;

      cardCreate.addEventListener("click", () => {
        window.location.assign(
          "file:///D:/Waris/Projects/Rest%20Country%20API/newPage.html"
        );
        sessionStorage.setItem("value", element.name.common);
      });
      cardAPI.appendChild(cardCreate);
    });
  } catch (error) {
    console.log(error);
  }
};

function searchByName() {
  let form = document.getElementById("form");
  let input = document.getElementById("mySearch");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let inputValue = input.value;
    console.log(inputValue);
    cardAPI.innerText = " ";
    let response = await fetch(
      `https://restcountries.com/v3.1/name/${inputValue}`
    );
    let data = await response.json();
    data.map((element) => {
      let newCard = document.createElement("div");
      newCard.classList.add("newCard");
      newCard.innerHTML = `
    <div class="countryCard"  >
    <div class="flag">
    <img src="${element.flags.png}" alt="flag" width="280" height="180" >
    </div>
    <div class="description">
    <h3><span>${element.name.common}</span></h3>
    <p id="pop"><span><b>Population:</b> </span>${element.population.toLocaleString()}</p>
    <p><span><b>Region:</b> </span>${element.region}</p>
    <p><span><b>Capital:</b> </span>${element.capital}</p>
    </div>
    </div>
    `;
      cardAPI.appendChild(newCard);
      cardAPI.addEventListener("click", () => {
        window.location.assign("./newPage.html");
        sessionStorage.setItem("value", element.name.common);
      });
    });
  });
}

function searchByRegion() {
  let secondForm = document.getElementById("secondForm");
  let region = document.getElementById("region");
  secondForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let regValue = region.value;
    console.log(regValue[0].name);
    cardAPI.innerText = " ";
    let response = await fetch(
      `https://restcountries.com/v3.1/region/${regValue}?fullText=true`
    );
    let regData = await response.json();

    regData.map((element) => {
      let regCard = document.createElement("div");
      regCard.classList.add("regCard");
      regCard.innerHTML = `
    <div class="countryCard"  >
    <div class="flag">
    <img src="${element.flags.png}" alt="flag" width="280" height="180" >
    </div>
    <div class="description">
    <div class="classNam">
    <h3><span>${element.name.common}</span></h3></div>
    <p id="pop"><span><b>Population:</b> </span>${element.population.toLocaleString()}</p>
    <p><span><b>Region:</b> </span>${element.region}</p>
    <p><span><b>Capital:</b> </span>${element.capital}</p>
    </div>
    </div>
    `;
      cardAPI.appendChild(regCard);
      regCard.addEventListener("click", (e) => {
        console.log(`${e.target.value}Clicked, after Search by Filter`);
        window.location.assign(
          "file:///D:/Waris/Projects/Rest%20Country%20API/newPage.html"
        );
        sessionStorage.setItem("value", element.name.common);
      });
    });
  });
}
showData();
