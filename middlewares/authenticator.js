export default (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Efetue Login!" });
    }
    if (!req.session.user.author_status) {
        return res.status(401).json({ message: "Você não tem permissão para logar, consulte um admin." });
    }
    if (req.session.user.author_level != "admin") {
        return res.status(401).json({ message: "Você não pode efetuar esta ação!" });
    }
    next();
}