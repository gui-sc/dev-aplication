let container = document.getElementsByClassName('container')[0];

async function getArticles() {
    return axios("http://localhost:3000/articles/most_liked", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (res) => {
        const json = await res.json().then(json => json);
        return json;
    });
}

const lista = getArticles();
setTimeout(() => {
    console.log(lista);
}, 2000);
// lista.forEach(artigo => {
//     let div = document.createElement('div');
//     div.classList.add('cards');
//     let a = document.createElement('a');
//     a.setAttribute('href', 'http://www.google.com');
//     let h1 = document.createElement('h1');
//     h1.classList.add('titulo');
//     h1.innerHTML = artigo.title;
//     let p = document.createElement('p');
//     p.classList.add('descricao');
//     p.innerHTML = artigo.description;
//     a.append(h1, p);
//     div.appendChild(a);
//     container.appendChild(div);
// });