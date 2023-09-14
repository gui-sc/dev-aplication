let container = document.getElementsByClassName('container')[0];
let article;
async function getArticles() {
    article = await fetch("http://localhost:3000/articles/most_liked", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (res) => {
        return await res.json().then(res => { return res });
    });
}
(async () => {
    await getArticles();

    article.forEach(artigo => {
        let div = document.createElement('div');
        div.classList.add('cards');
        let a = document.createElement('a');
        a.setAttribute('href', `http://localhost:3000/artigo/${artigo.kb_id}`);
        a.setAttribute('target', '_blank');
        let h1 = document.createElement('h1');
        h1.classList.add('titulo');
        h1.innerHTML = artigo.kb_title;
        let p = document.createElement('p');
        p.classList.add('descricao');
        p.innerHTML = artigo.kb_author_email;
        a.append(h1, p);
        div.appendChild(a);
        container.appendChild(div);
    });
})();
