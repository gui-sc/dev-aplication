export default (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).redirect('/login.html');
    }

    if (req.session.user.author_level != "admin") {
        return res.status(401).redirect('/home.html');
    }
    next();
}