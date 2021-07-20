import * as negocio from "../negocio/productos.js";

export const productosVista = async (req, res) => {
  try {
    const lista = await negocio.getProductos();
    if (!lista.length) throw Error();
    res.render("productos-vista", { lista: lista, existe: true });
  } catch (err) {
    res.render("productos-vista", { lista: [], existe: false });
  }
};

export const productosRegistrar = (req, res) => {
  res.render("ingreso-producto");
};
