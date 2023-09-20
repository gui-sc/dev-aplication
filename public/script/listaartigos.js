const baseUrl = "http://localhost:3000"
let artigos = document.getElementsByClassName('artigos')[0];
let articles;
async function getArticleData(){
    
    articles = await fetch(baseUrl+"/articles/all",{
        method: "GET"
    }).then(async (res) => {
        return await res.json();
    })
}

(async () => {
    await getArticleData();

    articles.forEach(artigo => {
        let div = document.createElement('div');
        div.classList.add('cards');
        let a = document.createElement('a');
        a.setAttribute('href', `${baseUrl}/editar/artigo/${artigo.kb_id}`);
        a.setAttribute('target', '_self');
        let h1 = document.createElement('h1');
        h1.classList.add('titulo');
        h1.innerHTML = artigo.kb_title;
        let p = document.createElement('p');
        p.classList.add('descricao');
        p.innerHTML = artigo.kb_author_email;
        a.append(h1, p);
        div.appendChild(a);
        artigos.appendChild(div);
    });
})();
