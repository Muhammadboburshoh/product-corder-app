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

const loginSql = `
  select user_id, username from users where username = $1 and password = crypt($2, password);

`

router.get('/', async function(req, res, next) {

  const orders = await rows(ordersSqlQuery)

  if(req.session.userId){
    res.render('admin', {orders});
  } else {
    res.redirect('/admin/login')
  }

});

router.get('/login',  (req, res) => {

  if(req.session.userId) {
    res.redirect('/admin')
  }
  res.render('login')
})

router.post('/login', async (req, res) => {

  if(req.session.userId) {
    res.redirect('/admin')
  }

  const { username, password } = req.body


  const [login] = await rows(loginSql, username, password)

  if(login) {
    req.session.userId = login.user_id

    res.redirect('/admin')
  } else {
    res.redirect('/admin/login')
  }
})

module.exports = router;
