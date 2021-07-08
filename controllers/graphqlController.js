const { buildSchema } = require("graphql");
const Producto = require("../models/producto");

const schema = buildSchema(`
    type Producto {
        id: String!,
        title: String!,
        price: float!,
        thumbnail: String!
    }
    input AddProductoInput {
        title: String!,
        price: float!,
        thumbnail: String!
    }
    type Mutation {
        addProducto(data: AddProductoInput) : Producto!
    }
`);

const root = {
  addProducto: (args) => {
    try {
      const newProducto = new Producto({
        title: args.title,
        price: args.price,
        thumbnail: args.thumbnail,
      });
      await newProducto.save();
      return newProducto;
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = {
  root,
  schema,
};
