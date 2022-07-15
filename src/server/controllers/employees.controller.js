import query from "../db/utils";

export const findAll = async () => {
  return await query("SELECT * FROM employees");
};

export const findOneById = async (id)  => {
    return await query("SELECT * FROM employees WHERE EmployeeID = ?", [id]);
};

export const createOne = async (employee)  => {
    return await query("INSERT INTO employees SET ?", [employee]);
};

export const updateOne = async (employee, id)  => {
    return await query("UPDATE employees SET ? WHERE EmployeeID = ?", [
        employee,
        id,
    ]);
};

export const deleteOne = async (id)  => {
    return await query("DELETE FROM employees WHERE EmployeeID = ?", [id]);
};