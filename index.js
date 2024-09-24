const express = require('express');
let cors = require('cors');
const { resolve } = require('path');

const app = express();
app.use(cors());
const port = 3000;

app.use(express.static('static'));

//Endpoint 1
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let total = newItemPrice + cartTotal;
  res.send(total.toString());
});

//Endpoint 2
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  let discount = isMember ? 0.1 : 0;
  let finalPrice = cartTotal - cartTotal * discount;
  res.send(finalPrice.toString());
});

//Endpoint 3
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let taxRate = 0.05;
  let taxAmount = cartTotal * taxRate;
  res.send(taxAmount.toString());
});

//Endpoint 4
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let deliveryDays;
  if (shippingMethod.toLowerCase() === 'standard') {
    deliveryDays = Math.ceil(distance / 50);
  } else if (shippingMethod.toLowerCase() === 'express') {
    deliveryDays = Math.ceil(distance / 100);
  } else {
    deliveryDays = 'Invalid shipping method';
  }
  res.send(deliveryDays.toString());
});

//Endpoint 5
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

//Endpoint 6
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * 2;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
