let id = window.location.pathname.split("/").pop();
let article;
let idInput = document.getElementById('id');
let title = document.getElementById('title');
let body = document.getElementById('body');
let permalink = document.getElementById('permalink');
let keywords = document.getElementById('keywords');
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

async function deleteArticle() {
    await fetch(`http://localhost:3000/articles/delete/${article.kb_id}`, {
        method: 'delete'
    }).then(res => alert('deletado'));
}

(async () => {
    await getArticle();
    if (article) {
        idInput.value = article.kb_id;
        title.value = article.kb_title;
        body.value = article.kb_body;
        permalink.value = article.kb_permalink;
        keywords.value = article.kb_keywords;
    }
})()