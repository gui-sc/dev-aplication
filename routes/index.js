import {Router} from "express";
import users from '../data/users.json' assert {type: "json"};
import bcrypt from 'bcrypt'
import { __dirname } from "../app.js";
import authenticator from "../middlewares/authenticator.js";
const app = Router();

app.post("/login", (req, res) => {
    const user = users.find(u => u.author_user == req.body.user && bcrypt.compareSync(req.body.password, u.author_pwd));
    if (user && user.author_status) {
        req.session.user = user;
        return res.redirect("/admin.html")
    }
    return res.redirect('/home.html');
})

app.get('/', (req, res) => {
    res.redirect('/home.html');
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

app.get('/login.html', (req, res) => {
    res.sendFile(__dirname+'/public/login.html');
})

app.get('/cadastro.html',authenticator, (req, res) => {
    res.sendFile(__dirname+'/public/cadastro.html');
})

app.get('/cadastroartigo.html', authenticator, (req, res) => {
    res.sendFile(__dirname+'/public/cadastroartigo.html');
})

app.get('/listausuarios.html', authenticator, (req, res) => {
    res.sendFile(__dirname+'/public/listausuarios.html')
})


app.get('/listaartigos.html', authenticator, (req, res) => {
    res.sendFile(__dirname+'/public/listartigos.html')
})

app.get('/editar/artigo/:id', authenticator,(req, res)=>{
    res.sendFile(__dirname+'/public/editarartigo.html');
})

app.get('/editar/usuario/:id', authenticator,(req, res)=>{
    res.sendFile(__dirname+'/public/editar.html');
})

export default app;