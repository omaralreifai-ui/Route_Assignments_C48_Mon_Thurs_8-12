CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL check (price >= 0),
    stock_quantity int NOT NULL check (stock_quantity >= 0),
    supplier_id int REFERENCES supplier(id)
);