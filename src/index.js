import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';





function openLoading() {
  document.body.classList.add("loading");
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".home__search__bar");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      openLoading();
      const input = document.querySelector('.searchInput');
      const searchValue = input ? input.value : '';
      window.location.href = `movies.html?search=${encodeURIComponent(searchValue)}`;
    });
  }
});


async function main() {
  const movies= await fetch(
      `https://www.omdbapi.com/?s=${moviesData}&apikey=43083548`,
    );
    const moviesData = movies.json();
  console.log (moviesData);
}

main();








const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
