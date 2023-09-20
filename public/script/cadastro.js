let baseUrl = "http://localhost:3000";
let userData;
let titulo = document.getElementsByClassName('titulo')[0];
let botoes = document.getElementsByClassName('botoes')[0];
async function getUserData() {

    userData = await fetch(baseUrl + "/users/user-data", {
        method: "GET"
    }).then(async (res) => {
        return await res.json().then(res => { return res.user });
    })

}

(async () => {
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
            a.setAttribute('href', baseUrl + '/admin.html');
            a.appendChild(btn);
            botoes.appendChild(a);
        }
    } else {
        let btn = document.createElement('button');
        btn.classList.add('btnlogin');
        btn.innerHTML = "Login";
        let a = document.createElement('a');
        a.setAttribute('href', baseUrl + '/login.html');
        a.appendChild(btn);
        botoes.appendChild(a);
    }
})()