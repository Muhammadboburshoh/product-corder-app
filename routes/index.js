var express = require('express');
var router = express.Router();

var { rows } = require('../util/database')

const productsSqlQuery = `
  select * from products
`

const tableSqlQuery = `
  select * from tables
`

const orderSqlQuery = `
  insert into orders(table_id, product_id) values ($1, $2) returning *;
`

/* GET home page. */
router.get('/', async function(req, res, next) {

  const products = await rows(productsSqlQuery)

  const tables = await rows(tableSqlQuery)

  res.render('index', { products, tables });
});

router.post('/', async function(req, res, next) {

  var order = req.body

  let newOrder = await rows(orderSqlQuery, order.table_id, order.product_id)

  if (newOrder) {
    res.send('Buyurtma berildi')
  } else {
    res.send('Buyurtma berishda mupmmo bo\'ldi qaytadan urinib ko\'ring')
  }

  // console.log(newOrder)

});

module.exports = router;
