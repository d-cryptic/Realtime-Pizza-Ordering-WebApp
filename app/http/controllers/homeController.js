const Menu = require("../../models/menu");

const homeController = () => {
  // factory patterns
  return {
    async index(req, res) {
      //   Menu.find().then((pizzas) => {
      //     return res.render("home", { pizzas: pizzas });
      //   });

      const pizzas = await Menu.find();
      return res.render("home", { pizzas: pizzas });
    },
  };
};

module.exports = homeController;
