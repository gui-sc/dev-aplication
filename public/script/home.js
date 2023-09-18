const baseUrl = "http://localhost:3000"
let destaques = document.getElementsByClassName('destaques')[0];
let curtidos = document.getElementsByClassName('curtidos')[0];
let titulo = document.getElementsByClassName('titulo')[0];
let botoes = document.getElementsByClassName('botoes')[0];
let mostLiked;
let featured;
let user;
async function getUserData(){
    
    user = await fetch(baseUrl+"/users/user-data",{
        method: "GET"
    }).then(async (res) => {
        return await res.json().then(res => {return res.user});
    })
    console.log(user);
}
async function getMostLikedArticles() {
    mostLiked = await fetch(baseUrl+"/articles/most_liked", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (res) => {
        return await res.json().then(res => { return res });
    });
}

async function getFeaturedArticles(){
    featured = await fetch(baseUrl+"/articles/featured", {
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

    if(user){
        let h1 = document.createElement('h1');
        h1.classList.add('ola');
        h1.innerHTML = `Olá, ${user.author_name}`
        titulo.appendChild(h1);
    }else{
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
        curtidos.appendChild(div);
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
        destaques.appendChild(div);
    });
})();
