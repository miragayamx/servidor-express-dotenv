const { buildSchema } = require('graphql');

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


const root;

module.exports = {
    root,
    schema
}