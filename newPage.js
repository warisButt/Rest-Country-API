const darkModefun2 = () => {
  console.log("Button clicked");
  let element = document.body;
  element.classList.toggle("dark-mode");
};

let getValue = sessionStorage.getItem("value");
let cardAPI = document.querySelector(".allapi");
const apiData = async () => {
  try {
    let response = await fetch(
      `https://restcountries.com/v3.1/name/${getValue}`
    );
    let data = await response.json();
    console.log(data);
    data.map((element) => {
      let cardCreate = document.createElement("div");
      cardCreate.classList.add("cardCreate");
      cardCreate.innerHTML = `
      <div class="countryCard"  >
      <div class="flag">
      <img id="flagImage" src="${
        element.flags.png
      }" alt="flag" width="580" height="410" >
      </div>
      <div class="description">
      <h3><span>${element.name.common}</span></h3>
      <br>
      <p id="pop"><span>Native Name: </span>${
        Object.values(element.name.nativeName)[0].common
      }</p>
      <p id="pop"><span>Population: </span>${element.population}</p>
      <p><span>Region: </span>${element.region}</p>
      <p><span>Sub Region: </span>${element.subregion}</p>
      <p><span>Top Level Domain: </span>${element.tld}</p>
      <p>Languages: ${Object.values(element.languages)[0]}</p>
      <p><span>Capital: </span>${element.capital}</p>
      <p><span>Border Countries: </span><button className="btn">${
        element.borders
      }</button></p>
      
      </div>
      </div>
      `;
      cardAPI.appendChild(cardCreate);
    });
  } catch (error) {
    console.log(error);
  }
};
apiData();

let backButton = document.getElementById("backButton");
backButton.addEventListener("click", () => {
  console.log("Back Button clicked");
  history.back();
});
