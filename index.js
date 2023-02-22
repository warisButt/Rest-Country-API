document.getElementById("mySearch").size = "50";
let cardAPI = document.querySelector(".allapi");

const darkModefun = () => {
  let element = document.body;
  let navColor = document.getElementById("nav");
  if (navColor.style.background == "grey") {
    navColor.style.background = "rgb(235, 232, 232)";
  } else {
    navColor.style.background = "grey";
  }

  let searchColor = document.getElementById("mySearch");
  if (searchColor.style.background == "grey") {
    searchColor.style.background = "rgb(245, 241, 241)";
  } else {
    searchColor.style.background = "grey";
  }
  let regionColor=document.getElementById("region");
  if (regionColor.style.background == "grey") {
    regionColor.style.background = "rgb(245, 241, 241)";
  } else {
    regionColor.style.background = "grey";
  }

 
  element.classList.toggle("dark-mode");
};

const createCard = (element) => {
  let cardCreate = document.createElement("div");
  cardCreate.classList.add("cardCreate");
  cardCreate.innerHTML = `
      <div class="countryCard"  >
      <div class="flag">
      <img src="${element.flags.png}" alt="flag" width="280" height="180" >
      </div>
      <div class="description">
      <h3><span>${element.name.common}</span></h3>
      <br>
      <p id="pop"><span><b>Population:</b> </span>${element.population.toLocaleString()}</p>
      <p><span><b>Region:</b> </span>${element.region}</p>
      <p><span><b>Capital:</b> </span>${element.capital}</p>
      </div>
      </div>
      `;
  cardCreate.addEventListener("click", () => {
    window.location.assign("./newPage.html");
    sessionStorage.setItem("value", element.name.common);
  });
  cardAPI.appendChild(cardCreate);
};

const apiData = async (url) => {
  try {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    data.forEach((element) => createCard(element));
  } catch (error) {
    console.log(error);
  }
};

const searchByName = async (inputValue) => {
  console.log(inputValue);
  cardAPI.innerText = " ";
  let response = await fetch(
    `https://restcountries.com/v3.1/name/${inputValue}`
  );
  let data = await response.json();
  data.forEach((element) => createCard(element));
};

const searchByRegion = async (regValue) => {
  console.log(regValue[1].name);
  cardAPI.innerText = " ";
  let response = await fetch(
    `https://restcountries.com/v3.1/region/${regValue}?fullText=true`
  );
  let regData = await response.json();
  regData.forEach((element) => createCard(element));
};

const showData = () => {
  const url = "https://restcountries.com/v3.1/all";
  apiData(url);
};

const form = document.getElementById("form");
const input = document.getElementById("mySearch");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let inputValue = input.value;
  searchByName(inputValue);
});

const secondForm = document.getElementById("secondForm");
const region = document.getElementById("region");
secondForm.addEventListener("change", async (e) => {
  e.preventDefault();
  let regValue = region.value;
  searchByRegion(regValue);
});

showData();
