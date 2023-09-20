let baseUrl = "http://localhost:3000";
let id = window.location.pathname.split("/").pop();
let user;
let idInput = document.getElementById('id');
let nameInput = document.getElementById('name');
let email = document.getElementById('email');
let pwd = document.getElementById('pwd');
let form = document.getElementsByTagName('form')[0];
let btnStatus = form.getElementsByTagName('button')[1];
let titulo = document.getElementsByClassName('titulo')[0];
let botoes = document.getElementsByClassName('botoes')[0];
let userData;
async function logoff() {
    await fetch(baseUrl + '/users/logoff', {
        method: 'post'
    });
}
async function getUserData() {

    userData = await fetch(baseUrl + "/users/user-data", {
        method: "GET"
    }).then(async (res) => {
        return await res.json().then(res => { return res.user });
    })
    
}
async function getUser() {
    user = await fetch(`${baseUrl}/users/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (res) => {
        return await res.json().then(res => { return res.user });
    });
}

async function changeStatus() {
    await fetch(`${baseUrl}/users/change-status`, {
        method: 'post',
        body: {
            id: user.author_id
        }
    }).then(window.location.replace('../../admin.html'));
}



(async () => {
    await getUser();
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

    if (user) {
        idInput.value = user.author_id;
        nameInput.value = user.author_name;
        email.value = user.author_email;
        btnStatus.innerHTML = user.author_status ? 'Desativar Usuário' : 'Ativar Usuário';
        form.appendChild(btnStatus);
    }
})()