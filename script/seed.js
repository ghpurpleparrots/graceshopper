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
      city: 'New York',
      state: 'NY',
      zipCode: '10004',
      phoneNumber: '1234567891'
    }),
    User.create({
      name: 'Murphy',
      email: 'murphy@email.com',
      password: '123',
      address: '1 Main St',
      city: 'New York',
      state: 'ny',
      zipCode: '10004',
      phoneNumber: '1234567891'
    }),
    User.create({
      name: 'Lars',
      email: 'lars@email.com',
      password: '123',
      address: '1 Dean St',
      city: 'Brooklyn',
      state: 'ny',
      zipCode: '11217',
      phoneNumber: '1234567891'
    }),
    User.create({
      name: 'Potato',
      email: 'potato@email.com',
      password: '123',
      address: '1 Main St',
      city: 'New York',
      state: 'ny',
      zipCode: '10004',
      phoneNumber: '1234567891'
    })
  ])

  const products = await Promise.all([
    Product.create({
      category: 'container',
      name: 'Cone',
      quantity: 1000,
      imageUrl:
        'https://cdnimg.webstaurantstore.com/images/products/extra_large/67189/506952.jpg'
    }),
    Product.create({
      category: 'container',
      name: 'Cup',
      quantity: 1000,
      imageUrl:
        'https://cdnimg.webstaurantstore.com/images/products/extra_large/28786/507244.jpg'
    }),
    Product.create({
      category: 'flavor',
      name: 'Chocolate',
      quantity: 1000,
      imageUrl:
        'http://pluspng.com/img-png/ice-cream-scoop-png-hd-k-piti-chocolate-and-salted-caramel-and-almonds-ice-cream-800.png'
    }),
    Product.create({
      category: 'flavor',
      name: 'Caramel',
      quantity: 1000,
      imageUrl:
        'https://www.marshfield-icecream.co.uk/wp-content/uploads/2017/05/Salted-Caramel-Scoop.png'
    }),
    Product.create({
      category: 'flavor',
      name: 'Coffee',
      quantity: 1000,
      imageUrl:
        'https://cdn.carvel.com/-/media/carvel/menu/ice-cream/scooped/45-coffee_and_cream.png?v=1&d=20180327T225022Z'
    }),
    Product.create({
      category: 'flavor',
      name: 'Butter Pecan',
      quantity: 1000,
      imageUrl:
        'https://homemadebrand.com/wp-content/uploads/2018/04/butter_pecan_scoop.png'
    }),
    Product.create({
      category: 'flavor',
      name: 'Strawberry',
      quantity: 1000,
      imageUrl:
        'https://www.sccpre.cat/mypng/full/30-305988_ice-cream-scoop-png-strawberry-ice-cream-scoop.png'
    }),
    Product.create({
      category: 'flavor',
      name: 'Rum Raisin',
      quantity: 1000,
      imageUrl:
        'https://www.anchorfoodprofessionals.com/content/dam/fonterra-brands-new-zealand/tiptop/images/product-details/variation-images/scoops/rum-raisin-720x480.png'
    }),
    Product.create({
      category: 'flavor',
      name: 'Vanilla',
      quantity: 1000,
      imageUrl:
        'https://www.dsmenu.com/user-folder/images/0/693/1441593186-693.jpg'
    }),
    Product.create({
      category: 'flavor',
      name: 'Cookie Dough',
      quantity: 1000,
      imageUrl:
        'https://homemadebrand.com/wp-content/uploads/2018/06/HM-ChocolateChipCookieDough_Scoop.png'
    }),
    Product.create({
      category: 'flavor',
      name: 'Mint Chocolate Chip',
      quantity: 1000,
      imageUrl:
        'https://homemadebrand.com/wp-content/uploads/2018/06/HM-MintChocolateChip_Scoop.png'
    }),
    Product.create({
      category: 'topping',
      name: 'Walnuts',
      quantity: 1000,
      imageUrl: 'https://www.icebergicecream.com/images/wet%20walnuts.png'
    }),
    Product.create({
      category: 'topping',
      name: 'Strawberries',
      quantity: 1000,
      imageUrl:
        'https://d2bnh4l4ivgux0.cloudfront.net/fit-in/0x450/unshoppable_producs/dd6cddb1-7c1e-4677-8cd8-966e9187b991.png'
    }),
    Product.create({
      category: 'topping',
      name: 'Bananas',
      quantity: 1000,
      imageUrl:
        'https://t3.ftcdn.net/jpg/01/42/08/50/240_F_142085026_4R6IGK2rt4JxQyYaWB60aopJvWogcnVW.jpg'
    }),
    Product.create({
      category: 'topping',
      name: 'Chocolate Pretzels',
      quantity: 1000,
      imageUrl:
        'https://www.abdallahcandies.com/wp-content/uploads/2017/11/0725-DARK-PRETZELS.png'
    }),
    Product.create({
      category: 'topping',
      name: 'Chocolate Chips',
      quantity: 1000,
      imageUrl:
        'https://www.znaturalfoods.com/1168-large_default/dark-chocolate-chips-organic-raw.jpg'
    }),
    Product.create({
      category: 'topping',
      name: 'Sprinkles',
      quantity: 1000,
      imageUrl:
        'https://cdn3.volusion.com/herjp.syepu/v/vspfiles/photos/709642-2.png'
    }),
    Product.create({
      category: 'topping',
      name: 'Chocolate Sprinkles',
      quantity: 1000,
      imageUrl:
        'http://www.drinksecrets.com/images/ingredients/megahuge/xxl_chocolate_sprinkles.png'
    }),
    Product.create({
      category: 'topping',
      name: 'Hot Fudge',
      quantity: 1000,
      imageUrl:
        'https://i.pinimg.com/originals/60/78/fb/6078fb2cc7f7de842144cfe47a1540a5.png'
    }),
    Product.create({
      category: 'topping',
      name: 'Caramel',
      quantity: 1000,
      imageUrl:
        'https://wholelifestylenutrition.com/wp-content/uploads/Salted-Caramel.png'
    }),
    Product.create({
      category: 'topping',
      name: "Reese's Pieces",
      quantity: 1000,
      imageUrl:
        'https://i.pinimg.com/originals/b9/b2/1f/b9b21f3afca23bc34327388c9f748623.png'
    }),
    Product.create({
      category: 'topping',
      name: 'Whipped Cream',
      quantity: 1000,
      imageUrl: 'https://static.cakezone.com/gifts/thumbs/whipped-cream.png'
    })
  ])

  await Order.bulkCreate([
    {
      price: 5.0,
      status: 'inCart',
      userId: 1,
      orderInfo: [
        {
          orderId: 1,
          groupId: 1,
          qty: 1,
          container: 2,
          flavor: 11,
          toppings: [12, 16, 22]
        },
        {
          orderId: 1,
          groupdId: 2,
          qty: 1,
          container: 2,
          flavor: 6,
          toppings: [12, 16, 18]
        }
      ]
    },
    {
      price: 10.0,
      status: 'inCart',
      userId: 2,
      orderInfo: [
        {
          orderId: 2,
          groupId: 1,
          qty: 1,
          container: 2,
          flavor: 6,
          toppings: [12, 16, 18]
        },
        {
          orderId: 2,
          groupdId: 2,
          qty: 1,
          container: 2,
          flavor: 3,
          toppings: [12, 15, 18, 19]
        }
      ]
    },
    {
      price: 10.0,
      status: 'inCart',
      userId: 2,
      orderInfo: []
    }
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
