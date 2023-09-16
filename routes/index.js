import {Router} from "express";
import users from '../data/users.json' assert {type: "json"};
import bcrypt from 'bcrypt'
import { __dirname } from "../app.js";
import authenticator from "../middlewares/authenticator.js";
const app = Router();

app.post("/login", (req, res) => {
    const user = users.filter(u => u.author_user == req.body.user && bcrypt.compareSync(req.body.password, u.author_pwd))[0];
    if (user && user.author_status) {
        req.session.user = user;
        return res.redirect("/admin.html")
    }
    return res.redirect('/home.html');
})

app.get('/home.html', (req, res) => {
    res.sendFile(__dirname+"/public/home.html");
})

app.get('/artigo/:id', (req, res) => {
    res.sendFile(__dirname+"/public/artigo.html");
})

app.get('/admin.html', authenticator, (req, res) => {
    res.sendFile(__dirname+'/public/admin.html');
})

export default app;