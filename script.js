const URL_FILMES = 'https://rafaelacsalfonii.github.io/desenv_web/filmes.json';

function criarEstrelas(rating) {
  let estrelas = '';
  for (let i = 0; i < rating; i++) {
    estrelas += '★';
  }
  return estrelas;
}

function criarCardFilme(filme) {

  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('img');
  img.src = filme.imagem;
  img.alt = filme.nome;

  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');

  const titulo = document.createElement('h2');
  titulo.textContent = filme.nome;

  const descricao = document.createElement('p');
  descricao.textContent = filme.descricao;

  const genero = document.createElement('p');
  genero.textContent = `Gênero: ${filme.genero}`;

  const duracao = document.createElement('p');
  duracao.textContent = `Duração: ${filme.duracao}`;

  const similares = document.createElement('p');
  similares.textContent = `Títulos semelhantes: ${filme.tituloSemelhantes}`;

  let estrelas = '';
  if (filme.rating && filme.rating <= 5) {
    estrelas = criarEstrelas(filme.rating);
  }

  const rating = document.createElement('div');
  rating.classList.add('rating');
  rating.textContent = estrelas;

  cardContent.appendChild(titulo);
  cardContent.appendChild(descricao);
  cardContent.appendChild(genero);
  cardContent.appendChild(duracao);
  cardContent.appendChild(similares);
  if (estrelas) {
    cardContent.appendChild(rating);
  }

  card.appendChild(img);
  card.appendChild(cardContent);

  return card;
}

async function carregarFilmes() {
  try {
    const response = await fetch(URL_FILMES);

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.status}`);
    }

    const filmes = await response.json();

    const filmesMaiores18 = filmes.filter(filme => filme.classificacao >= 18);

    const catalogo = document.getElementById('catalogo');

    filmesMaiores18.forEach(filme => {
      const card = criarCardFilme(filme);
      catalogo.appendChild(card);
    });

  } catch (error) {
    console.error('Ocorreu um erro:', error);
  }
}

window.addEventListener('DOMContentLoaded', carregarFilmes);