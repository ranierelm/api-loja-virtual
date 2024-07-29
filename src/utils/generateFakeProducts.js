import Product from '../models/product.js';
import sequelize from '../database/index.js';
import { faker } from '@faker-js/faker';

export default class FakeProducts {

  static async generateFakeProducts(quantity) {
    let products = [];

    for (let i = 0; i < quantity; i++) {
      products.push({
        sku: faker.number.int({ min: 1000000000, max: 9999999999 }),
        ean: faker.number.int({ min: 1000000000, max: 9999999999 }) * 1000,
        name: faker.commerce.productName(),
        brand: faker.company.name(),
        price: faker.commerce.price(),
        image_url: faker.image.url(),
        stock: 0,
        last_purchase_date: null,
      });
    }

    try {
      await sequelize.transaction(async (t) => {
        await Product.bulkCreate(products, { transaction: t });
      });
      console.log(`${quantity} produtos fakes foram criados com sucesso!`);
    } catch (error) {
      console.error('Erro ao salvar produtos:', error);
    }
  }
}

// Command-line execution (assuming Node.js environment)
if (process.argv[2] === 'generate') {
  const quantity = parseInt(process.argv[3], 10) || 10; // Default to 10 products if no quantity specified
  FakeProducts.generateFakeProducts(quantity)
    .then(() => process.exit(0)) // Exit successfully after generation
    .catch((error) => {
      console.error('Erro ao criar produtos fakes:', error);
      process.exit(1); // Exit with an error code
    });
}
