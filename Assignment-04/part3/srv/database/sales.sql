CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    product_id int REFERENCES product(id),
    quantity_sold int NOT NULL check (quantity_sold >= 0),
    sale_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);