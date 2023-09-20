let id = window.location.pathname.split("/").pop();
let baseUrl = "http://localhost:3000";
let article;
let idInput = document.getElementById('id');
let title = document.getElementById('title');
let body = document.getElementById('body');
let permalink = document.getElementById('permalink');
let keywords = document.getElementById('keywords');
let checkbox = document.getElementById('featured');
let titulo = document.getElementsByClassName('titulo')[0];
let botoes = document.getElementsByClassName('botoes')[0];
let userData;
async function logoff() {
    await fetch(baseUrl + '/users/logoff', {
        method: 'post'
    }).then(window.location.replace('../../home.html'));
}
async function getUserData() {

    userData = await fetch(baseUrl + "/users/user-data", {
        method: "GET"
    }).then(async (res) => {
        return await res.json().then(res => { return res.user });
    })
    
}
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
    await fetch(`http://localhost:3000/articles/${article.kb_id}`, {
        method: 'delete'
    }).then(window.location.replace('../../admin.html'));
}

(async () => {
    await getArticle();
    await getUserData();
    if (userData) {
        let h1 = document.createElement('p');
        h1.classList.add('ola');
        h1.innerHTML = `Olá, ${userData.author_name}`
        titulo.appendChild(h1);
        if (userData.author_level == 'admin') {
            let btn = document.createElement('button');
            btn.classList.add('btnlogin');
            btn.innerHTML = "Admin";
            let a = document.createElement('a');
            a.setAttribute('href', './admin.html');
            a.appendChild(btn);
            botoes.appendChild(a);
        }
        let btn = document.createElement('button');
        btn.classList.add('btnlogin');
        btn.innerHTML = "Sair";
        let a = document.createElement('a');
        a.setAttribute('onclick', 'logoff()');
        a.appendChild(btn);
        botoes.appendChild(a);
    } else {
        let btn = document.createElement('button');
        btn.classList.add('btnlogin');
        btn.innerHTML = "Login";
        let a = document.createElement('a');
        a.setAttribute('href', './login.html');
        a.appendChild(btn);
        botoes.appendChild(a);
    }

    if (article) {
        idInput.value = article.kb_id;
        title.value = article.kb_title;
        body.value = article.kb_body;
        permalink.value = article.kb_permalink;
        keywords.value = article.kb_keywords;
        checkbox.checked = article.kb_featured;
    }
})()