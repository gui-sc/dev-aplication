let baseUrl = "http://localhost:3000";
let id = window.location.pathname.split("/").pop();
let user;
let idInput = document.getElementById('id');
let nameInput = document.getElementById('name');
let email = document.getElementById('email');
let pwd = document.getElementById('pwd');
let form = document.getElementsByTagName('form')[0];
let btnStatus = form.getElementsByTagName('button')[1];
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
    await fetch(`${baseUrl}/users/change-status`,{
        method: 'post',
        body: {
            id: user.author_id
        }
    }).then(res => {
        alert('Status alterado');
    })
}



(async () => {
    await getUser();
    if (user) {
        idInput.value = user.author_id;
        nameInput.value = user.author_name;
        email.value = user.author_email;
        pwd.value = user.author_pwd;
        btnStatus.innerHTML = user.author_status ? 'Desativar Usuário' : 'Ativar Usuário';
        form.appendChild(btnStatus);
    }
})()