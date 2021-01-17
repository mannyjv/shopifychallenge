'use strict'

const {blue, green, magenta, cyan} = require('chalk')
const db = require('../server/db')
const {User, Product, Order, ProductOrder} = require('../server/db/models')

const ordersArr = [
  {completed: false},
  {completed: true},
  {completed: true},

  {completed: true},
  {completed: false},
  {completed: true},

  {completed: true},
  {completed: true},
  {completed: true},

  {completed: true},
  {completed: true},
  {completed: false},

  {completed: true},
  {completed: true},
  {completed: true},

  {completed: false},
  {completed: true},
  {completed: true},

  {completed: true},
  {completed: true},
  {completed: true}
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', admin: true}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'jam@msn.net', password: '456'}),
    User.create({email: 'babyyodalover@aol.com', password: 'yoda4ever'}),
    User.create({email: 'darthmaul@sith.gov', password: 'iluvthedarkside'}),
    User.create({
      email: 'obiwan@jediacademy.edu',
      password: 'padawan',
      admin: true
    }),
    User.create({
      email: 'bigyoda@thecouncil.org',
      password: 'amialone?',
      admin: true
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Blond Woman Smiling',
      description:
        'A young woman stands in front of a van and poses for a picture',
      imageUrl:
        'https://st2.depositphotos.com/4218696/42928/i/1600/depositphotos_429288578-stock-photo-joyful-young-blonde-lady-posing.jpg',
      price: 8.99
    }),
    Product.create({
      name: 'White Sports Car',
      description: 'An Audi R8. Picture taken from the left side of the car',
      imageUrl:
        'https://static3.depositphotos.com/1007829/244/i/950/depositphotos_2445649-stock-photo-white-sports-car.jpg',
      price: 10.99
    }),
    Product.create({
      name: 'Blue Butterflies',
      description: 'Three blue butterflies flying gracefully above water',
      imageUrl:
        'https://static9.depositphotos.com/1064045/1188/i/950/depositphotos_11889482-stock-photo-butterfly.jpg',
      price: 4.99
    }),
    Product.create({
      name: 'Two Bicyclists',
      description: 'Two bike riders enjoying a bike ride on a fall day',
      imageUrl:
        'https://st3.depositphotos.com/9843368/12606/i/950/depositphotos_126063836-stock-photo-cyclists-in-autumn-park.jpg',
      price: 8.99
    }),
    Product.create({
      name: 'Surfer',
      description:
        'A surfer walks into the sunset about to catch a gnarly wave',
      imageUrl:
        'https://st.depositphotos.com/1000151/2571/i/950/depositphotos_25712781-stock-photo-surfing-on-bali.jpg',
      price: 12.99
    }),
    Product.create({
      name: 'Cups Of Coffee',
      description: 'Various cups of coffee with a croissant on the side',
      imageUrl:
        'https://st3.depositphotos.com/9881890/14561/i/1600/depositphotos_145612499-stock-photo-cups-of-fresh-made-coffee.jpg',
      price: 11.5
    }),
    Product.create({
      name: 'Fruit Glory',
      description: 'A colorful array of fruit',
      imageUrl:
        'https://static8.depositphotos.com/1016676/815/i/950/depositphotos_8156139-stock-photo-fruits.jpg',
      price: 5.99
    }),
    Product.create({
      name: 'Soccer Kick',
      description: 'A blonde boy kicks a penalty',
      imageUrl:
        'https://st.depositphotos.com/2166845/4842/i/950/depositphotos_48429149-stock-photo-kids-soccer-penalty-kick.jpg',
      price: 4.99
    }),
    Product.create({
      name: 'Flower Shot',
      description: 'A woman fires a gun that shoots out red roses ',
      imageUrl:
        'https://st3.depositphotos.com/15583058/19080/i/1600/depositphotos_190803806-stock-photo-woman-shooting-gun-red-roses.jpg',
      price: 10.99
    })
  ])

  const orders = await Promise.all(
    ordersArr.map(order => {
      return Order.create(order)
    })
  )

  const associations1 = await Promise.all([
    users[0].setOrders(orders.slice(0, 3)), // firsr should have the first 3 orders in the orders array
    users[1].setOrders(orders.slice(3, 6)),
    users[2].setOrders(orders.slice(6, 9)),
    users[3].setOrders(orders.slice(9, 12)),
    users[4].setOrders(orders.slice(12, 15)),
    users[5].setOrders(orders.slice(15, 18)),
    users[6].setOrders(orders.slice(18, 21))
  ])
  const associations2 = await Promise.all([
    products[0].addOrders(orders.slice(0, 3)),
    products[1].addOrders(orders.slice(3, 6)),
    products[2].addOrders(orders.slice(6, 9)),
    products[3].addOrders(orders.slice(9, 12)),
    products[4].addOrders(orders.slice(12, 15)),
    products[5].addOrders(orders.slice(15, 18)),
    products[6].addOrders(orders.slice(18, 21))
  ])
  const associations3 = await Promise.all([
    orders[0].addProducts(products.slice(0, 3)),
    orders[1].addProducts(products.slice(3, 6)),
    orders[2].addProducts(products.slice(6, 9)),
    orders[3].addProducts(products.slice(9, 12)),
    orders[4].addProducts(products.slice(12, 15)),
    orders[5].addProducts(products.slice(15, 18)),
    orders[6].addProducts(products.slice(18, 21))
  ])

  const productOrders = await ProductOrder.findAll()
  for (let i = 0; i < productOrders.length; i++) {
    await productOrders[i].update({
      quantity: i + 1,
      savedPrice: 30.0 + i
    })
  }

  console.log(blue(`seeded ${users.length} users`))
  console.log(cyan(`seeded ${products.length} products`))
  console.log(magenta(`seeded ${productOrders.length} product orders`))
  console.log(green(`seeded successfully!`))
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
