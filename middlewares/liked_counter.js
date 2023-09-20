
import { __dirname } from '../app.js';
import fs from 'fs';
export default (req, res, next) => {
    const articles = JSON.parse(fs.readFileSync(__dirname + '/data/articles.json'));
    const { id } = req.body;
    const index = articles.findIndex(a => a.kb_id === id);
    if (index === -1) return res.status(404).json({ message: "Article not found" });
    const article = articles[index];
    article.kb_liked_count++;
    req.session.index = index;
    req.session.article = article;
    next();
}