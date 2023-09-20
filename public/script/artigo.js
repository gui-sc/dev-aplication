let id = window.location.pathname.split("/").pop();
let baseUrl = "http://localhost:3000";
let container = document.getElementsByClassName('container')[0];
let titulo = document.getElementsByClassName('titulo')[0];
let botoes = document.getElementsByClassName('botoes')[0];
let likeDiv = document.getElementsByClassName('likeIn')[0];
let likesComponent = document.getElementsByTagName('h4')[0];
let rodape = document.getElementsByTagName('footer')[0];
let article;
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

async function like() {
    await fetch(baseUrl + '/articles/like', {
        method: 'put',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id
        })
    }).then(async res => {
        await res.json().then(res => {
            likesComponent.innerHTML = `Likes: ${res.likes}`
        });
    })
}
(async () => {
    await getUserData();
    await getArticle();

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
            a.setAttribute('href', baseUrl + '/admin.html');
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
        a.setAttribute('href', baseUrl + '/login.html');
        a.appendChild(btn);
        botoes.appendChild(a);
    }

    let btn = document.createElement('button');
    btn.classList.add('btnlogin');
    btn.innerHTML = "Curtir";
    let a = document.createElement('a');
    a.setAttribute('onclick', 'like()');
    a.appendChild(btn);
    likeDiv.appendChild(a);

    let div = document.createElement('div');
    let h1 = document.createElement('h1');
    h1.innerHTML = article.kb_title;
    let div1 = document.createElement('div');
    div1.innerHTML = article.kb_body;
    div.append(h1, div1);
    container.appendChild(div);
    likesComponent.innerHTML = `Likes: ${article.kb_liked_count}`

    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    let p3 = document.createElement('p');
    let a1 = document.createElement('a');
    a1.setAttribute('href', article.kb_permalink);
    a1.setAttribute('target', '_blank');
    p1.innerHTML = 'Publicado em: ' + article.kb_published_date;
    rodape.appendChild(p1);
    p2.innerHTML = 'Email do autor: ' + article.kb_author_email;
    rodape.appendChild(p2);
    p3.innerHTML = 'Saiba mais';
    a1.appendChild(p3);
    rodape.appendChild(a1);

})();
