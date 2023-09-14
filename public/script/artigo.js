let id = window.location.pathname.split("/")[2];
let container = document.getElementsByClassName('container')[0];
let article;
async function getArticle() {
    article = await fetch(`http://localhost:3000/articles/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (res) => {
        return await res.json().then(res => { return res.article });
    });
}
(async () => {
    await getArticle();
    console.log(article);
    let div = document.createElement('div');
    let h1 = document.createElement('h1');
    h1.innerHTML = article.kb_title;
    let div1 = document.createElement('div');
    div1.innerHTML = article.kb_body;
    div.append(h1, div1);
    container.appendChild(div);
    
})();
