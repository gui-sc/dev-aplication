import { Router } from "express";
import hash from 'object-hash';
import fs from 'fs';
import bcrypt from 'bcrypt';
import { __dirname } from "../app.js";
import authenticator from "../middlewares/authenticator.js";
const app = Router();

app.get("/user-data", (req, res) => {
    return res.status(200).json({user: req.session.user ? req.session.user : null});
});

app.get('/all', authenticator,(req, res) => {
    const users = JSON.parse(fs.readFileSync(__dirname + '/data/users.json'));
    return res.status(200).json(users);
})

app.get("/:user", (req, res) => {
    const users = JSON.parse(fs.readFileSync(__dirname + '/data/users.json'));
    const user = users.find(u => u.author_user == req.params.user);
    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }
    return res.status(200).json({ user });
})

app.post("/create", authenticator, (req, res) => {
    const users = JSON.parse(fs.readFileSync(__dirname + '/data/users.json'));
    const user = users.find(u => u.author_email == req.body.email);
    if (user) {
        return res.status(409).json({ message: "Email já cadastrado" });
    }
    const { name, email, pwd } = req.body;
    const username = email.split("@")[0];
    const pwd_encrypt = bcrypt.hashSync(pwd, 10);
    const new_user = {
        author_id: hash({ name, email }),
        author_name: name,
        author_email: email,
        author_user: username,
        author_pwd: pwd_encrypt,
        author_level: "admin",
        author_status: true
    }

    users.push(new_user);
    fs.writeFileSync(__dirname + '\\data\\users.json', JSON.stringify(users));
    return res.status(201).redirect('/admin.html');
});

app.post("/update", authenticator, (req, res) => {
    const users = JSON.parse(fs.readFileSync(__dirname + '/data/users.json'));
    if (!req.body.id) {
        return res.status(400).json({ message: "Informe o ID!" });
    }
    const user = users.find(u => u.author_id == req.body.id);
    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }
    const { name, email, pwd } = req.body;
    let pwd_encrypt;
    let username;
    if (email) username = email.split("@")[0];
    if (pwd.trim() != '') pwd_encrypt = bcrypt.hashSync(pwd, 10);

    if (email) user.author_email = email;
    if (name) user.author_name = name;
    if (pwd) user.author_pwd = pwd_encrypt;
    if (email) user.author_user = username;
    const index = users.findIndex(u => u.author_id === user.author_id);
    users.splice(index, 1, user);
    fs.writeFileSync(__dirname + '\\data\\users.json', JSON.stringify(users));
    return res.status(204).redirect('/admin.html');
})


app.post("/change-status", authenticator, (req, res) => {
    const users = JSON.parse(fs.readFileSync(__dirname + '/data/users.json'));
    const user = users.find(u => u.athorid == req.body.id);
    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }
    user.author_status = !user.author_status;
    const index = users.findIndex(u => u.author_id === user.author_id);
    users.splice(index, 1, user);
    fs.writeFileSync(__dirname + '\\data\\users.json', JSON.stringify(users));
    return res.status(204);

})

export default app;