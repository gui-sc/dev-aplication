const baseUrl = "http://localhost:3000"
let usuarios = document.getElementsByClassName('usuarios')[0];
let users;
async function getArticleData(){
    
    users = await fetch(baseUrl+"/users/all",{
        method: "GET"
    }).then(async (res) => {
        return await res.json();
    })
}

(async () => {
    await getArticleData();

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
