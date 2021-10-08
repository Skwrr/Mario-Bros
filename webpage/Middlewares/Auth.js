const Auth = (req, res, next) => {
  if (!req.user) return res.redirect('https://krypton.sergioesquina.repl.co/login')
  else next();
};

module.exports = Auth;
