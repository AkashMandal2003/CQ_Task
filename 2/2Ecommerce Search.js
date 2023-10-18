const express = require('express');
const app = express();
const fs = require('fs');

const products = JSON.parse(fs.readFileSync('2ES.json', 'utf-8'));

app.get('/products', (req, res) => {
  const category = req.query.category;
  if (!category) {
    return res.status(400).json({ error: 'Category parameter is missing' });
  }

  const filteredProducts = products.filter(product => product.Category === category);
  res.json(filteredProducts);
});

app.get('/filterproducts', (req, res) => {
  const category = req.query.category;
  const price = parseFloat(req.query.price);

  if (!category || isNaN(price)) {
    return res.status(400).json({ error: 'Category and/or price parameter is missing or invalid' });
  }

  const filteredProducts = products.filter(product => product.Category === category && product.Price >= price);
  res.json(filteredProducts);
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
