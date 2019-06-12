'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  Order,
  OrderProducts,
  ItemQuantity
} = require('../server/db/models')

async function seed() {
  await db.sync()
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      name: 'Cody',
      email: 'cody@email.com',
      password: '123',
      address: '1 Main St',
      phoneNumber: '1234567891'
    }),
    User.create({
      name: 'Murphy',
      email: 'murphy@email.com',
      password: '123',
      address: '1 Main St',
      phoneNumber: '1234567891'
    })
  ])

  const products = await Promise.all([
    Product.create({category: 'container', name: 'Cone', quantity: 1000}),
    Product.create({category: 'flavor', name: 'Strawberry', quantity: 100}),
    Product.create({category: 'flavor', name: 'Rum Raisin', quantity: 1000}),
    Product.create({
      category: 'flavor',
      name: 'Mint Chocolate Chip',
      quantity: 1000
    }),
    Product.create({category: 'topping', name: 'Walnuts', quantity: 1000}),
    Product.create({category: 'topping', name: 'Strawberries', quantity: 1000}),
    Product.create({category: 'topping', name: 'Bananas', quantity: 1000})
  ])

  await Order.bulkCreate([
    {price: 5.0, status: 'inCart', userId: 1},
    {price: 10.0, status: 'inCart', userId: 2}
  ])

  await OrderProducts.bulkCreate([
    {orderId: 1, productId: 1, groupId: 1},
    {orderId: 1, productId: 2, groupId: 1},
    {orderId: 1, productId: 3, groupId: 1},
    {orderId: 1, productId: 1, groupId: 2},
    {orderId: 1, productId: 2, groupId: 2},
    {orderId: 1, productId: 3, groupId: 2}
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
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
