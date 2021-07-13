const Auth = (req, res, next) => {
  if (!req.user) return res.redirect('https://sepoxcraft48yt.sergioesquina.repl.co/api/callback')
  else next();
};

module.exports = Auth;
