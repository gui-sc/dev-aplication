const baseUrl = "http://localhost:3000"
let usuarios = document.getElementsByClassName('usuarios')[0];
let titulo = document.getElementsByClassName('titulo')[0];
let botoes = document.getElementsByClassName('botoes')[0];
let users;
let userData;
async function getUserData() {

    userData = await fetch(baseUrl + "/users/user-data", {
        method: "GET"
    }).then(async (res) => {
        return await res.json().then(res => { return res.user });
    })
    
}
async function getArticleData() {

    users = await fetch(baseUrl + "/users/all", {
        method: "GET"
    }).then(async (res) => {
        return await res.json();
    })
}

(async () => {
    await getArticleData();
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
    } else {
        let btn = document.createElement('button');
        btn.classList.add('btnlogin');
        btn.innerHTML = "Login";
        let a = document.createElement('a');
        a.setAttribute('href', './login.html');
        a.appendChild(btn);
        botoes.appendChild(a);
    }


    users.forEach(user => {
        let div = document.createElement('div');
        div.classList.add('cards');
        let a = document.createElement('a');
        a.setAttribute('href', `${baseUrl}/editar/usuario/${user.author_user}`);
        a.setAttribute('target', '_self');
        let h1 = document.createElement('h1');
        h1.classList.add('titulo');
        h1.innerHTML = user.author_user;
        let p = document.createElement('p');
        p.classList.add('descricao');
        p.innerHTML = user.author_email;
        a.append(h1, p);
        div.appendChild(a);
        usuarios.appendChild(div);
    });
})();
