"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

// // ///////////////////////////////////////
// // const renderCountry = function (data) {
// //   // console.log(data);
// //   for (const [key, value] of Object.entries(data)) {
// //     console.log(key, value);
// //     for (const lang of Object.values(value.languages)) {
// //       console.log(lang);
// //       // const lang = Object.values(value.languages).join(',');
// //       const html = `
// //       <article class="country">
// //       <img class="country__img" src="${value.flags.svg}" />
// //       <div class="country__data">
// //       <h3 class="country__name">${value.name.common}</h3>
// //       <h3 class="country__region">${value.capital}</h3>
// //       <h4 class="country__region">${value.region}</h4>
// //       <p class="country__row"><span>👫</span>${(
// //         +value.population / 1000000
// //       ).toFixed(1)}M</p>
// //       <p class="country__row"><span>🗣️</span>${lang}</p>

// //       </div>
// //       </article>
// //       `;

// //       countriesContainer.insertAdjacentHTML('beforeend', html);
// //       countriesContainer.style.opacity = 1;
// //     }
// //   }
// // };

// // const getCountryData = function (country) {
// //   fetch(`https://restcountries.com/v3.1/all`)
// //     .then(response => {
// //       console.log(response);
// //       return response.json();
// //     })
// //     .then(data => {
// //       console.log(data);
// //     })
// //     .catch(err => console.log(err.message));
// // };

// // getCountryData();

// const getCountryData = async function () {
//   try {
//     const response = await fetch('https://restcountries.com/v3.1/all');

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     for (const i of data) {
//       // console.log(i);
//       const validData = data.filter(
//         item => item !== undefined && item !== null
//       );

//       // Step 2: Extract the 'languages' property from each valid object
//       const languagesList = validData.map(item => item.languages);

//       console.log(languagesList);
//       // Check if 'languages' exists and is an object before calling Object.values
//       // if (i.languages && typeof i.languages === 'object') {
//       //   console.log(Object.values(i.languages));
//       // } else {
//       //   console.log('No languages property or invalid format');
//       // }
//     }
//   } catch (err) {
//     console.error('Error fetching country data:', err.message);
//   }
// };

// getCountryData();

const renderCountry = function (data) {
  console.log(data);
  for (const [key, value] of Object.entries(data)) {
    console.log(key, value);

    // const lang = Object.values(value.languages).join(',');
    const html = `
        <article class="country">
        <img class="country__img" src="${value.flags.svg}" />
        <div class="country__data">
        <h3 class="country__name">${value.name.common}</h3>
        <h3 class="country__region">${value.capital}</h3>
        <h4 class="country__region">${value.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +value.population / 1000000
        ).toFixed(1)}M</p>
        
  
        </div>
        </article>
        `;
    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  }
};

const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const country = data.countryName.toLowerCase();
      return fetch(`https://restcountries.com/v3.1/name/${country}`);
    })
    .then((response) => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`);

      return response.json();
    })
    .then((data) => renderCountry(data))
    .catch((err) => console.error(`${err.message}`));
};

whereAmI(17.329, 76.834);
