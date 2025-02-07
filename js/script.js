document.addEventListener("DOMContentLoaded", () => {
    fetch("https://rafaelescalfoni.github.io/desenv_web/filmes.json")
        .then(response => response.json())
        .then(data => displayMovies(data));
  });
  
  function displayMovies(movies) {
    const catalog = document.getElementById("catalogo");
    catalog.innerHTML = "";
    
    movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("card");
        
        card.innerHTML = `
            <img src="${movie.figura}" alt="${movie.titulo}">
            <h2>${movie.titulo}</h2>
            <p>${movie.resumo}</p>
            <span class="age-rating ${getAgeClass(movie.classificacao)}">${movie.classificacao}</span>
        `;
        catalog.appendChild(card);
    });
  }
  
  function getAgeClass(age) {
    if (age <= 14) return "age-green";
    if (age > 14 && age < 18) return "age-yellow";
    return "age-red";
  }