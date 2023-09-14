import {Router} from "express";
import users from '../data/users.json' assert {type: "json"};
import bcrypt from 'bcrypt'
import { __dirname } from "../app.js";
const app = Router();

app.post("/login", (req, res) => {
    const user = users.filter(u => u.author_user == req.body.user && bcrypt.compareSync(req.body.pwd, u.author_pwd))[0];
    if (user && user.author_status) {
        req.session.user = user;
        return res.status(200).json({ message: "Success", user });
    }
    return res.status(401).json({ message: "Credenciais inválidas!" });
})

app.get('/home.html', (req, res) => {
    res.sendFile(__dirname+"/public/home.html");
})

app.get('/artigo/:id', (req, res) => {
    res.sendFile(__dirname+"/public/artigo.html");
})

export default app;