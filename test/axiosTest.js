const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const productoTest = {
	title: 'fake Paleta de padel',
	price: 15000,
	thumbnail: __dirname + '\\assets\\BK-EXAGON-GREEN-1024x1024.png'
};
const baseURL = 'http://localhost:8080/api/productos';

const before = async () => {
	try {
		const productos = await axios.get(`${baseURL}/listar`);
		const productoExists = productos.data.filter((el) => el.title === productoTest.title);
		if (!!productoExists.length) {
			await axios.delete(`${baseURL}/borrar/${productoExists[0]._id}`);
		}
		const productoUpdatedExists = productos.data.filter((el) => el.title === `${productoTest.title} UPDATED`);
		if (!!productoUpdatedExists.length) {
			await axios.delete(`${baseURL}/borrar/${productoUpdatedExists[0]._id}`);
		}
	} catch (err) {
		console.log('Error: ', err.message);
	}
};
const getProducto = async () => {
	try {
		const response = await axios.get(`${baseURL}/listar`);
		console.log('GET');
		console.log(response.data);
	} catch (err) {
		console.log('GET Error: ', err.message);
	}
};

const postProducto = async () => {
	try {
        console.log(productoTest.thumbnail)
		const body = new FormData();
		body.append('title', productoTest.title);
		body.append('price', productoTest.price);
		body.append('thumbnail', fs.createReadStream(productoTest.thumbnail));
		const response = await axios({
			method: 'post',
			url: `${baseURL}/guardar`,
			data: body,
		});
		console.log('POST');
		console.log(response.data);
	} catch (err) {
		console.log('POST Error: ', err.message);
	}
};

const putProducto = async () => {
	try {
		const body = new FormData();
		body.append('title', `${productoTest.title} UPDATED`);
		body.append('price', `${productoTest.price}`);
		body.append('thumbnail', fs.createReadStream(productoTest.thumbnail));
		const productos = await axios.get(`${baseURL}/listar`);
		const productoExists = productos.data.filter((el) => el.title === productoTest.title);
		const response = await axios.put({
			url: `${baseURL}/actualizar/${productoExists[0]._id}`,
			data: body
		});
		console.log('PUT');
		console.log(response.data);
	} catch (err) {
		console.log('PUT Error: ', err.message);
	}
};

const deleteProducto = async (title) => {
	try {
		const productos = await axios.get(`${baseURL}/listar`);
		const productoExists = productos.data.filter((el) => el.title === title);
		const response = await axios.put(`${baseURL}/borrar/${productoExists[0]._id}`);
		console.log('DELETE');
		console.log(response.data);
	} catch (err) {
		console.log('DELETE Error: ', err.message);
	}
};

(async () => {
	console.log('Test Axios');
	await before();
	await getProducto();
	await postProducto();
	await putProducto();
	await deleteProducto(`${productoTest.title} UPDATED`);
})();
