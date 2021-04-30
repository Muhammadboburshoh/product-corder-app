const orderButtons = document.querySelectorAll('#order_button')
const productIds = document.querySelectorAll('.product_id')

const tableId = document.querySelectorAll('#table')

const productItems = document.querySelectorAll('#product_item')


for(let i = 0; i <= orderButtons.length - 1; i++) {

  orderButtons[i].addEventListener('click', () => {

    table_id = tableId[i].value
    product_id = productItems[i].dataset.id

    orderFunction(product_id, table_id)
  })
}



const serverURL = 'http://localhost:3000/'

async function orderFunction (product_id, table_id) {

  const response = await fetch(serverURL , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      table_id,
      product_id,
    })
  })


  if(response.status >= 200 && response.status <= 299) {
    alert('Buyurtma berildi!')
  } else {
    alert("Buyurtma berishda muommo bo'ldi!")
  }
}

