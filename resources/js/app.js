let addToCart = document.querySelectorAll(".add-to-cart");

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    console.log("clicked");
  });
});
