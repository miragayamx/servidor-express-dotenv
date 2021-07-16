const request = require('supertest')('http://localhost:8080/api/productos');
const expect = require('chai').expect;
const generador = require('./util/producto');

describe('test productos', () => {
	describe('GET', () => {
		it('deberia retornar un status 200', async () => {
			const response = await request.get('/listar');
			expect(response.status).to.eql(200);
		});
	});

	const producto = generador.get();

	describe('POST', () => {
		it('deberia incorporar un producto', async () => {
			const response = await request
				.post('/guardar')
				.field('title', producto.title)
				.field('price', producto.price)
				.attach('thumbnail', producto.thumbnail);
			expect(response.status).to.eql(201);

			const item = response.body;
			expect(item).to.include.keys('title', 'price', 'thumbnail');
			expect(item.title).to.eql(producto.title);
			expect(item.price).to.eql(producto.price);
		});
	});

	const newProducto = generador.get();

	describe('PUT', () => {
		it('deberia actualizar un producto', async () => {
			const getProducts = await request.get('/listar');
			const findProduct = getProducts.body.filter((el) => el.title === producto.title);
			const response = await request
				.put(`/actualizar/${findProduct[0]._id}`)
				.field('title', newProducto.title)
				.field('price', newProducto.price)
				.attach('thumbnail', newProducto.thumbnail);
			expect(response.status).to.eql(200);

			const item = response.body;
			expect(item).to.include.keys('title', 'price', 'thumbnail');
			expect(item.title).to.eql(newProducto.title);
			expect(item.price).to.eql(newProducto.price);
		});
	});

	describe('Delete', () => {
		it('deberia borrar un producto', async () => {
			const getProducts = await request.get('/listar');
			const findProduct = getProducts.body.filter((el) => el.title === newProducto.title);
			const response = await request.delete(`/borrar/${findProduct[0]._id}`);
			expect(response.status).to.eql(200);
		});
	});
});
