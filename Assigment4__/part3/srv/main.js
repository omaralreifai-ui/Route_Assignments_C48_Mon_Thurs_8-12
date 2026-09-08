const { config } = require('dotenv');
config();
const express = require('express');
const app = express();
app.use(express.json());

const { Pool } = require('pg');

// 1. 
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// 2 
app.post('/products', async (req, res) => {
  try {
    const { name, price, stock_quantity, supplier_id } = req.body;

    const dbRes = await pool.query(
      `INSERT INTO product (name, price, stock_quantity, supplier_id) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, price, stock_quantity, supplier_id]
    );

    res.status(201).json({
      message: 'Product created successfully',
      product: dbRes.rows[0]
    });
  } catch (err) {
    console.error('Database Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get('/products', async (req, res) => {
  try {
    const dbres = await pool.query('select * from product');
    res.status(200).json({ message: 'done', product: dbres.rows });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// 5 
app.post('/products/add_category', async (req, res) => {
  try {
    await pool.query('alter table product add column category varchar(50)');
    res.status(201).json({ message: 'Category column added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'error adding category column' });
  }
});

app.delete('/products/remove_category', async (req, res) => {
  try {
    await pool.query('alter table product drop column category');
    res.status(200).json({ message: 'Category column removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'error removing category column' });
  }
});

app.put('/products/name_not_null', async (req, res) => {
  try {
    await pool.query('alter table product alter column name set not null');
    res.status(200).json({ message: 'name column is now NOT NULL' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'error setting NOT NULL constraint' });
  }
});

// 7
app.put('/products/bread-price', async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE product SET price = 25.00 WHERE name = 'Bread' RETURNING *"
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Bread not found' });
    }
    res.status(200).json({ message: 'Bread price updated to 25.00', product: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'error updating bread price' });
  }
});

// 8 
app.delete('/products/eggs', async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM product WHERE name = 'Eggs' RETURNING *"
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Eggs not found' });
    }
    res.status(200).json({ message: 'Eggs deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'error deleting eggs' });
  }
});


app.put('/products/:id/category', async (req, res) => {
  const id_product = req.params.id;
  const { category } = req.body;
  try {
    const dbres = await pool.query(
      'update product set category = $1 where id = $2 RETURNING *',
      [category, id_product]
    );
    if (dbres.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Category updated', product: dbres.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'failed to update category' });
  }
});


app.get('/products/:id', async (req, res) => {
  const id_product = req.params.id;
  try {
    const dbres = await pool.query('select * from product where id = $1', [id_product]);
    if (dbres.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'done', product: dbres.rows });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

app.put('/products/:id', async (req, res) => {
  const id_product = req.params.id;
  const { name, price, stock_quantity, supplier_id } = req.body;
  try {
    const dbres = await pool.query(
      'update product set name = $1, price = $2, stock_quantity = $3, supplier_id = $4 where id = $5 RETURNING *',
      [name, price, stock_quantity, supplier_id, id_product]
    );
    if (dbres.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'done', newProduct: dbres.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'failed update' });
  }
});

app.delete('/products/:id', async (req, res) => {
  const idproduct = req.params.id;
  try {
    const dbres = await pool.query('delete from product where id = $1 returning *', [idproduct]);
    if (dbres.rows.length === 0) {
      return res.status(404).json({ message: 'error product not found' });
    }
    res.status(200).json({ message: 'done', product: dbres.rows });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// 3 
app.post('/suppliers', async (req, res) => {
  try {
    const { name, contact_number } = req.body;
    const suppdt = await pool.query(
      'insert into supplier (name, contact_number) values ($1, $2) returning *',
      [name, contact_number]
    );
    res.status(201).json({ message: 'supplier added', supplierInfo: suppdt.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'error add supplier' });
  }
});

app.get('/suppliers', async (req, res) => {
  try {
    const supdb = await pool.query('select * from supplier');
    if (supdb.rows.length === 0) {
      return res.status(404).json({ message: 'not found data' });
    }
    res.status(200).json({ message: 'data supplier', supplier: supdb.rows });
  } catch (err) {
    res.status(500).json({ message: 'error' });
  }
});


app.put('/suppliers/contact_length', async (req, res) => {
  try {
    await pool.query('alter table supplier alter column contact_number type varchar(15)');
    res.status(200).json({ message: 'contact_number changed to VARCHAR(15)' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'error changing contact_number type' });
  }
});

app.put('/suppliers/:id', async (req, res) => {
  const idsupp = req.params.id;
  const { name, contact_number } = req.body;
  try {
    const suppdb = await pool.query(
      'update supplier set name = $1, contact_number = $2 where id = $3 returning *',
      [name, contact_number, idsupp]
    );
    if (suppdb.rows.length === 0) {
      return res.status(404).json({ message: 'data not found' });
    }
    res.status(200).json({ message: 'data update', newdata: suppdb.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'error in server' });
  }
});

app.delete('/suppliers/:id', async (req, res) => {
  try {
    const idsupp = req.params.id;
    const suppdata = await pool.query(
      'delete from supplier where id = $1 returning *',
      [idsupp]
    );
    if (suppdata.rows.length === 0) {
      return res.status(404).json({ message: 'data not found' });
    }
    res.status(200).json({ message: 'delete data done' });
  } catch (err) {
    res.status(500).json({ message: 'error in server' });
  }
});

// 4 
app.post('/sales', async (req, res) => {
  try {
    const { product_id, quantity_sold, sale_date } = req.body;
    const dbres = await pool.query(
      'insert into sales (product_id, quantity_sold, sale_date) values ($1, $2, $3) returning *',
      [product_id, quantity_sold, sale_date]
    );
    res.status(201).json({ message: 'sale recorded', sale: dbres.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'error recording sale' });
  }
});

app.get('/sales', async (req, res) => {
  try {
    const dbres = await pool.query('select * from sales');
    res.status(200).json({ message: 'done', sales: dbres.rows });
  } catch (err) {
    res.status(500).json({ message: 'error fetching sales' });
  }
});

app.get('/sales/product/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const dbres = await pool.query(
      'select * from sales where product_id = $1',
      [productId]
    );
    res.status(200).json({ message: 'done', sales: dbres.rows });
  } catch (err) {
    res.status(500).json({ message: 'error fetching product sales' });
  }
});

// 6 
app.post('/initialize-data', async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const supplierResult = await client.query(
      'INSERT INTO supplier (name, contact_number) VALUES ($1, $2) RETURNING id',
      ['FreshFoods', '01001234567']
    );
    const supplierId = supplierResult.rows[0].id;

    const milkResult = await client.query(
      'INSERT INTO product (name, price, stock_quantity, supplier_id) VALUES ($1, $2, $3, $4) RETURNING id',
      ['Milk', 15.00, 50, supplierId]
    );
    await client.query(
      'INSERT INTO product (name, price, stock_quantity, supplier_id) VALUES ($1, $2, $3, $4)',
      ['Bread', 10.00, 30, supplierId]
    );
    await client.query(
      'INSERT INTO product (name, price, stock_quantity, supplier_id) VALUES ($1, $2, $3, $4)',
      ['Eggs', 20.00, 40, supplierId]
    );
    await client.query(
      'INSERT INTO sales (product_id, quantity_sold, sale_date) VALUES ($1, $2, $3)',
      [milkResult.rows[0].id, 2, '2025-05-20']
    );

    await client.query('COMMIT');
    res.status(201).json({ message: 'Initial data inserted successfully' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error initializing data:', err);
    res.status(500).json({ message: 'Error initializing data' });
  } finally {
    client.release();
  }
});

// 9
app.get('/reports/total-sold-per-product', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.id, p.name, SUM(s.quantity_sold) AS total_sold
      FROM sales s
      JOIN product p ON s.product_id = p.id
      GROUP BY p.id, p.name
    `);
    res.status(200).json({ message: 'done', report: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'error generating report' });
  }
});

// 10
app.get('/reports/highest-stock', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM product ORDER BY stock_quantity DESC LIMIT 1'
    );
    res.status(200).json({ message: 'done', product: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'error generating report' });
  }
});

// 11
app.get('/reports/suppliers-start-f', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM supplier WHERE name LIKE 'F%'"
    );
    res.status(200).json({ message: 'done', suppliers: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'error generating report' });
  }
});

// 12
app.get('/reports/never-sold', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*
      FROM product p
      LEFT JOIN sales s ON p.id = s.product_id
      WHERE s.id IS NULL
    `);
    res.status(200).json({ message: 'done', products: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'error generating report' });
  }
});

// 13
app.get('/reports/sales-details', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.name, s.quantity_sold, s.sale_date
      FROM sales s
      JOIN product p ON s.product_id = p.id
    `);
    res.status(200).json({ message: 'done', sales: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'error generating report' });
  }
});

// 14 
app.post('/admin/create-store-manager', async (req, res) => {
  try {
    await pool.query(`CREATE USER store_manager WITH PASSWORD 'store_manager_password'`);
    await pool.query(`GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO store_manager`);
    res.status(201).json({ message: 'store_manager created' });
  } catch (err) {
    console.error('Error creating store manager:', err);
    res.status(500).json({ message: 'Error creating store manager' });
  }
});

// 15
app.post('/admin/remove-update-permissions-from-store-manager', async (req, res) => {
  try {
    await pool.query(`REVOKE UPDATE ON ALL TABLES IN SCHEMA public FROM store_manager`);
    res.status(200).json({ message: 'Update permissions revoked from store_manager' });
  } catch (err) {
    console.error('Error revoking update permissions:', err);
    res.status(500).json({ message: 'Error revoking update permissions' });
  }
});

// 16
app.post('/admin/grant-delete-permissions-to-store-manager', async (req, res) => {
  try {
    await pool.query(`GRANT DELETE ON sales TO store_manager`);
    res.status(200).json({ message: 'Delete permissions granted to store_manager on sales table' });
  } catch (err) {
    console.error('Error granting delete permissions:', err);
    res.status(500).json({ message: 'Error granting delete permissions' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});