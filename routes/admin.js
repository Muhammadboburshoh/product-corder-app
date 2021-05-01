var express = require('express');
var router = express.Router();

const { rows } = require('../util/database')

const ordersSqlQuery = `
  select
    o.order_id,
    t.table_number,
    p.product_name as name,
    p.product_price as price,
    p.product_photo as photo
  from
    orders as o
  join
    products as p on p.product_id = o.product_id
  join
    tables as t on t.table_id = o.table_id
  ;
`

router.get('/', async function(req, res, next) {

  const orders = await rows(ordersSqlQuery)

  res.render('admin', {orders});
});

module.exports = router;
