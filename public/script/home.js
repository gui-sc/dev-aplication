const baseUrl = "http://localhost:3000"
let destaques = document.getElementsByClassName('destaques');
let curtidos = document.getElementsByClassName('curtidos');
let titulo = document.getElementsByClassName('titulo')[0];
let botoes = document.getElementsByClassName('botoes')[0];
let resultados = document.getElementsByClassName('resultados');
let keywordInput = document.getElementById('keyword');
let mostLiked;
let featured;
let user;
let results;

async function logoff() {
    await fetch(baseUrl + '/users/logoff', {
        method: 'post'
    }).then(window.location.reload());
}
async function getUserData() {

    user = await fetch(baseUrl + "/users/user-data", {
        method: "GET"
    }).then(async (res) => {
        return await res.json().then(res => { return res.user });
    })

}
async function getMostLikedArticles() {
    mostLiked = await fetch(baseUrl + "/articles/most_liked", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (res) => {
        return await res.json().then(res => { return res });
    });
}

async function search() {
    if (keywordInput.value.trim() != '') {
        results = await fetch(`${baseUrl}/articles/keywords/${keywordInput.value}`, {
            method: 'GET'
        }).then(async res => {
            return await res.json()
        })

        results.forEach(artigo => {
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
            resultados[1].appendChild(div);
        });
        resultados[0].removeAttribute('style');
        resultados[1].removeAttribute('style');
        curtidos[0].setAttribute('style', 'display: none;');
        curtidos[1].setAttribute('style', 'display: none;');
        destaques[0].setAttribute('style', 'display: none;');
        destaques[1].setAttribute('style', 'display: none;');
    } else {
        resultados[0].setAttribute('style', 'display: none;');
        resultados[1].setAttribute('style', 'display: none;');
        curtidos[0].removeAttribute('style');
        curtidos[1].removeAttribute('style');
        destaques[0].removeAttribute('style');
        destaques[1].removeAttribute('style');
    }
}

async function getFeaturedArticles() {
    featured = await fetch(baseUrl + "/articles/featured", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (res) => {
        return await res.json().then(res => { return res });
    });
}
(async () => {
    await getMostLikedArticles();
    await getFeaturedArticles();
    await getUserData();

    if (user) {
        let h1 = document.createElement('p');
        h1.classList.add('ola');
        h1.innerHTML = `Olá, ${user.author_name}`
        titulo.appendChild(h1);
        if (user.author_level == 'admin') {
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

    mostLiked.forEach(artigo => {
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
        curtidos[1].appendChild(div);
    });

    featured.forEach(artigo => {
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
        destaques[1].appendChild(div);
    });
})();
