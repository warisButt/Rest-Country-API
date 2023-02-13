const darkModefun2 = () => {
  console.log("Button clicked");
  let element = document.body;
  element.classList.toggle("dark-mode");
};

let getValue = sessionStorage.getItem("value");
let cardAPI = document.querySelector(".allapi");
// let getRegion = sessionStorage.getItem("avalue");
const apiData = async () => {
  try {
    let response = await fetch(
      `https://restcountries.com/v3.1/name/${getValue}?fullText=true`
      // `https://restcountries.com/v3.1/region/${getRegion}`
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
      <p id="pop"><span><b>Native Name:</b> </span>${
        Object.values(element.name.nativeName)[0].common
      }</p>
      <p id="pop"><span><b>Population:</b> </span>${element.population.toLocaleString()}</p>
      <p><span><b>Region:</b> </span>${element.region}</p>
      <p><span><b>Sub Region:</b> </span>${element.subregion}</p>
      <p><span><b>Top Level Domain:</b> </span>${element.tld}</p>
      <p><b>Languages:</b> ${Object.values(element.languages)[0]}</p>
      <p><span><b>Capital:</b> </span>${element.capital}</p>
      <p><span><b>Border Countries:</b> </span>${element.borders}</p>
      
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
