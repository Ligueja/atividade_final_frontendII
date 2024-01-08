const cartoesEl = document.getElementById("cartoes");
const paginacao = document.getElementById("paginacao");

let pagina = 1;

const instance = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

async function carregarPersonagens(personagens) {
    const fragmento = document.createDocumentFragment();

    // Limitar a exibição a 6 personagens por página, como consta no exemplo enviado na atividade
    const personagensExibidos = personagens.slice(0, 6);

    personagensExibidos.forEach((personagem) => {
        const cartao = document.createElement('div');
        cartao.classList.add('cartao');

        const imagem = document.createElement('img');
        imagem.classList.add('avatar');
        imagem.src = personagem.image;
        imagem.alt = 'Avatar';

        const nome = document.createElement('p');
        nome.classList.add('cartao_nome');
        nome.textContent = personagem.name;

        const statusEspecie = document.createElement('p');
        statusEspecie.classList.add('cartao_status_especie');
        statusEspecie.textContent = `${personagem.status} - ${personagem.species}`;

        const localizacao = document.createElement('p');
        localizacao.classList.add('localiza');
        localizacao.textContent = `Última localização conhecida:`;

        const uLocalizacao = document.createElement('strong');
        uLocalizacao.classList.add('uLocaliza');
        uLocalizacao.textContent = personagem.location.name;

        cartao.appendChild(imagem);
        cartao.appendChild(nome);
        cartao.appendChild(statusEspecie);
        cartao.appendChild(localizacao);
        cartao.appendChild(uLocalizacao);

       fragmento.appendChild(cartao);
    });

    // Limpar os cartões antigos antes de adicionar os novos
    cartoesEl.innerHTML = "";

    // Adicionar os novos cartões ao cartoesEl
    cartoesEl.appendChild(fragmento);
}

async function paginacaoPersonagens(pagina) {
    if (pagina < 1) {
        return;
    }

    try {
        const url = `/character?page=${pagina}`;
        const resposta = await instance.get(url);
        

        if (resposta.data && resposta.data.results) {
            const personagens = resposta.data.results;

            cartoesEl.innerHTML = "";

            carregarPersonagens(personagens);
        } else {
            console.error("Resposta da API inválida:", resposta);
        }
    } catch (erro) {
        console.error("Erro ao obter personagens:", erro);
    }
}


function voltar() {
    pagina--;
    paginacaoPersonagens(pagina);
  }
  
  function proximo() {
    pagina++;
    paginacaoPersonagens(pagina);
}

function criarMenuPaginacao() {
    const botaoAnterior = document.createElement('button')
    botaoAnterior.innerHTML = 'Anterior'
    botaoAnterior.addEventListener('click', voltar)
  
    const botaoProximo = document.createElement('button')
    botaoProximo.innerHTML = 'Próximo'
    botaoProximo.addEventListener('click', proximo)
  
    paginacao.appendChild(botaoAnterior)
    paginacao.appendChild(botaoProximo)
}

paginacaoPersonagens(pagina)

criarMenuPaginacao()
  
async function dadosFooter() {
  const resposta1 = await instance.get("/character");

  const personagens = resposta1.data.info.count;
  console.log("Total de personagens: " + personagens);

  document.getElementById("qtdPersonagens").innerHTML = `PERSONAGENS: ${personagens}`;

  const resposta2 = await instance.get("/location");

  const localizao = resposta2.data.info.count;
  console.log("Total de localizações: " + localizao);

  document.getElementById("qtdLocalizacoes").innerHTML = `LOCALIZAÇÕES: ${localizao}`;

  const resposta3 = await instance.get("/episode");

  const episodio = resposta3.data.info.count;
  console.log("Total de episódios: " + episodio);

  document.getElementById("qtdEpisodios").innerHTML = `EPISÓDIOS: ${episodio}`;
}

dadosFooter();
