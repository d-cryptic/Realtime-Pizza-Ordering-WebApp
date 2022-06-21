const homeController = () => {
  // factory patterns
  return {
    index(req, res) {
      res.render("home");
    },
  };
};

module.exports = homeController;
