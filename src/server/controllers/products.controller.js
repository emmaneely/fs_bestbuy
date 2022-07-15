import query from "../db/utils";

export const findAll = async () => {
  return await query("SELECT * FROM products");
};

export const findOneById = async (id)  => {
    return await query("SELECT * FROM products WHERE ProductID = ?", [id]);
};

export const createOne = async (product)  => {
    return await query("INSERT INTO products SET ?", [product]);
};

export const updateOne = async (product, id)  => {
    return await query("UPDATE products SET ? WHERE ProductID = ?", [
        product,
        id,
    ]);
};

export const deleteOne = async (id)  => {
    return await query("DELETE FROM products WHERE ProductID = ?", [id]);
};