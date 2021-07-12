const { buildSchema } = require("graphql");
const Producto = require("../models/producto");
const logger = require("../winstonConfig");

const schema = buildSchema(`
    type Query {
      productos: [Producto!]
    }
    type Producto {
        _id: String!,
        title: String!,
        price: Float!,
        thumbnail: String!
    }
    input AddProductoInput {
        title: String!,
        price: Float!,
        thumbnail: String!
    }
    type Mutation {
        addProducto(input: AddProductoInput!) : Producto!
    }
`);

const root = {
  addProducto: async(args) => {
    try {
      const { title, price, thumbnail } = args.input;
      const newProducto = new Producto({
        title: title,
        price: price,
        thumbnail: thumbnail,
      });
      await newProducto.save();
      return newProducto;
    } catch (err) {
      logger.info(err);
      logger.error(err);
    }
  },
};

module.exports = {
  root,
  schema,
};
