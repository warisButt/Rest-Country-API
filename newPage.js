const darkModefun2 = () => {
  console.log("Button clicked");
  let element = document.body;
  element.classList.toggle("dark-mode");
  let navColor = document.getElementById("nav");
  if (navColor.style.background == "grey") {
    navColor.style.background = "rgb(255 255 255)";
  } else {
    navColor.style.background = "grey";
  }

  let searchColor = document.getElementById("mySearch");
  if (searchColor.style.background == "grey") {
    searchColor.style.background = "rgb(245, 241, 241)";
    // searchColor.style.color = "black";
  } else {
    searchColor.style.background = "grey";
    // searchColor.style.color = "white";
  }
  let backButtonColor = document.getElementById("backButton");
  if (backButtonColor.style.background == "grey") {
    backButtonColor.style.background = "white";
    // searchColor.style.color = "black";
  } else {
    backButtonColor.style.background = "grey";
    // searchColor.style.color = "white";
  }
};

async function fetchData(countryCode) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`
    );
    const data = await response.json();
    const countryName = data[0].name.common;

    return countryName;
  } catch (error) {
    console.error(error);
  }
}

let getValue = sessionStorage.getItem("value");
let cardAPI = document.querySelector(".allapi");

const apiData = async () => {
  try {
    let response = await fetch(
      `https://restcountries.com/v3.1/name/${getValue}?fullText=true`
    );
    let data = await response.json();
    console.log(data);

    try {
      data.map(async (element) => {
        let cardCreate = document.createElement("div");
        cardCreate.classList.add("cardCreate");

        let borderCountries = [];

        if (Array.isArray(element.borders)) {
          borderCountries = await Promise.all(
            element.borders.map((borderCode) => fetchData(borderCode))
          );
        }

        cardCreate.innerHTML = `
            <div id="card2">
              <div class="flag">
                <img id="flagImage" src="${
                  element.flags.png
                }" alt="flag" width="580" height="410">
              </div>
             
             
               
              
              

              <div class="des1">
                
              <h2><span>${element.name.common}</span></h2>
              <br>
                <p id="pop"><span><b>Native Name:</b> </span>${
                  Object.values(element.name.nativeName)[0].common
                }</p>
                <p id="pop"><span><b>Population:</b> </span>${element.population.toLocaleString()}</p>
                <p><span><b>Region:</b> </span>${element.region}</p>
                <p><span><b>Sub Region:</b> </span>${element.subregion}</p>
                <p><span><b>Capital:</b> </span>${element.capital}</p>
                </div>

                <div class ="des2">
                
                <p><span><b>Top Level Domain:</b> </span>${element.tld}</p>
                <p><b>Currencies:</b>  ${
                  Object.values(element.currencies)[0].name
                }</p>
                <p><b>Languages:</b> ${Object.values(element.languages)}</p>
                </div>

                <div class="des3">
                <p><span><b>Border Countries:</b> </span>
    <div class="button-container">
      ${
        borderCountries.length > 0
          ? borderCountries
              .map(
                (borderCountry) => `<button id="btn">${borderCountry}</button>`
              )
              .join(" ")
          : "None"
      }
    </div>
   
  </p>

              </div>   
            </div>
          `;
        cardAPI.appendChild(cardCreate);
      });
    } catch (error) {
      console.error("Error occurred during data mapping: ", error);
    }
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
