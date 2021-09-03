const { connectDatabase } = require('../utils/helper');
connectDatabase();

const Product = require('../Models/Product');

const createProducts = async (rounds) => {
  const colors = ["red", "green", "blue", "orange", "yellow", "purple", "gray", "pink"];
  const names = ['bag', 'shoe', 'shirt', 'skirt', 'table', 'chair', 'tablet', 'mouse'];
  for (let i = 0; i < rounds; i++) {
    const name = colors[Math.floor(Math.random() * colors.length)] + names[Math.floor(Math.random() * names.length)];
    const price = Math.floor(Math.random() * 9999) + 1;
    const remain = Math.floor(Math.random() * 10) + 1;

    const product = new Product({
      name,
      price,
      detail: "Create from seed function...",
      remain,
    });
    await product.save();
  }
  console.log("All products created...");
}

// createProducts(20);