document.getElementById("mySearch").size = "50";
document.getElementById("region").size = "50";
let input = document.getElementById("mySearch");

const darkModefun = () => {
  let element = document.body;
  element.classList.toggle("dark-mode");
};

const searchFun = () => {};

let cardAPI = document.querySelector(".allapi");
const apiData = async () => {
  try {
    let response = await fetch("https://restcountries.com/v3.1/all");
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
      <p id="pop"><span>Population: </span>${element.population}</p>
      <p><span>Region: </span>${element.region}</p>
      <p><span>Capital: </span>${element.capital}</p>
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
apiData();
