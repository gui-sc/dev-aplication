import { Router } from "express";
import hash from 'object-hash';
import fs from 'fs';
import authenticator from "../middlewares/authenticator.js";
import liked_counter from "../middlewares/liked_counter.js";
import { __dirname } from "../app.js";
const app = Router();

app.get('/all', (req, res) => {
    const articles = JSON.parse(fs.readFileSync(__dirname + '/data/articles.json'));
    return res.status(200).json(articles);
})

app.get("/most_liked", async (req, res) => {
    const articles = JSON.parse(fs.readFileSync(__dirname + '/data/articles.json'));
    const sortArticles = articles.sort((x, y) => x.kb_liked_count - y.kb_liked_count).slice(0, 10).reverse();
    return res.status(200).json(sortArticles);
})

app.get("/featured", (req, res) => {
    const articles = JSON.parse(fs.readFileSync(__dirname + '/data/articles.json'));
    const featured = articles.filter(a => a.kb_featured);
    return res.status(200).json(featured);
})
app.get("/:id", (req, res) => {
    const articles = JSON.parse(fs.readFileSync(__dirname + '/data/articles.json'));
    const { id } = req.params;
    const article = articles.filter(a => a.kb_id == id)[0];
    if (!article) {
        return res.status(404).json({ message: "Article not found" });
    }
    return res.status(200).json({ article });
})


app.get("/keywords/:keyword", (req, res) => {
    const articles = JSON.parse(fs.readFileSync(__dirname + '/data/articles.json'));
    const { keyword } = req.params;
    const article = articles.filter(a => a.kb_keywords == keyword);
    return res.status(200).json(article);
})

app.post("/create", authenticator, (req, res) => {
    const articles = JSON.parse(fs.readFileSync(__dirname + '/data/articles.json'));
    const { title, body, permalink, keywords } = req.body;
    const id = hash({ title, body });
    if (articles.filter(a => a.kb_id === id).length > 0) return res.status(409).json({ message: "Artigo já criado!" });
    const new_article = {
        kb_id: id,
        kb_title: title,
        kb_body: body,
        kb_permalink: permalink,
        kb_keywords: keywords,
        kb_liked_count: 0,
        kb_published: true,
        kb_suggestion: false,
        kb_featured: false,
        kb_author_email: req.session.user.author_email,
        kb_published_date: new Date().toISOString().split("T")[0]
    }

    articles.push(new_article);

    fs.writeFileSync(__dirname + '\\data\\articles.json', JSON.stringify(articles));
    return res.status(201).redirect('/admin.html');
})

app.post("/update", authenticator, (req, res) => {
    const articles = JSON.parse(fs.readFileSync(__dirname + '/data/articles.json'));
    const { id } = req.body;
    const article = articles.filter(a => a.kb_id == id)[0];
    if (!article) {
        return res.status(404).json({ message: "Article not found" });
    }
    const { title, body, permalink, keywords } = req.body;
    if (title) article.kb_title = title;
    if (body) article.kb_body = body;
    if (permalink) article.kb_permalink = permalink;
    if (keywords) article.kb_keywords = keywords;

    const index = articles.findIndex(a => a.kb_id === article.kb_id);
    articles.splice(index, 1, article);
    fs.writeFileSync(__dirname + '\\data\\articles.json', JSON.stringify(articles));
    return res.status(204).redirect('/admin.html');
})

app.put("/like", liked_counter, (req, res) => {
    const articles = JSON.parse(fs.readFileSync(__dirname + '/data/articles.json'));
    articles.splice(req.session.index, 1, req.session.article);

    fs.writeFileSync(__dirname + '\\data\\articles.json', JSON.stringify(articles));
    return res.status(200).json({ likes: req.session.article.kb_liked_count });
})

app.delete("/:id", authenticator, (req, res) => {
    const articles = JSON.parse(fs.readFileSync(__dirname + '/data/articles.json'));
    const { id } = req.params;
    const article = articles.filter(a => a.kb_id == id)[0];
    if (!article) {
        return res.status(404).json({ message: "Article not found" });
    }
    const index = articles.findIndex(a => a.kb_id === article.kb_id);
    articles.splice(index, 1);
    fs.writeFileSync(__dirname + '\\data\\articles.json', JSON.stringify(articles));
    return res.status(204).redirect('http://localhos:3000/admin.html');
})

export default app;