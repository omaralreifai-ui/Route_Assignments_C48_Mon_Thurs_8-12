// const { config } = require('./config');
// config();
const express = require('express');
const app = express();
const { Pool } = require('pg');

// 1:

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'OsamaJabr',
    password: 'password',
    port: 5432
});

app.use(express.json());
app.listen(3000, () => {
    pool.connect((err) => {
        if (err) {
            console.error('Error acquiring client', err.stack);
            return;
        }
    });
    console.log(`Server is running on port 3000`);
});
app.get('/health', async (req, res) => {
    try {
        const result = await pool.query('SELECT 1');
        res.status(200).json({ message: 'Server is healthy', database: 'connected', result: result.rows });
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).json({ message: 'Database connection error' });
    }
    });

    // 2:
    app.get('/products', async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM product');
            res.status(200).json({ products: result.rows });
        } catch (err) {
            console.error('Error fetching products:', err);
            res.status(500).json({ message: 'Error fetching products' });
        }
    });
    app.post('/products', async (req, res) => {
        const { productName, productPrice, stockQuantity, supplierId } = req.body;
        try {
            const result = await pool.query(
                `INSERT INTO product (name,price, stock_quantity, supplier_id) VALUES ($1, $2, $3, $4) RETURNING *`,
                [productName, productPrice, stockQuantity, supplierId]
            );
            res.status(201).json({ message: 'Product created', product: result.rows });
        } catch (err) {
            console.error('Error creating product:', err);
            res.status(500).json({ message: 'Error creating product' });
        }
    });

    app.get('/products/:id', async (req, res) => {
        const productId = req.params.id;
        try {
            const result = await pool.query('SELECT * FROM product WHERE id = $1', [productId]);
            if (result.rows.length === 0) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            res.status(200).json({ product: result.rows[0] });
        } catch (err) {
            console.error('Error fetching product:', err);
            res.status(500).json({ message: 'Error fetching product' });
        }
    });

    app.put('/products/bread', async (req, res) => {
        try {
            const result = await pool.query(
                "UPDATE product SET price = $1 WHERE name = 'Bread' RETURNING *",
                [25.00]
            );
            if (result.rows.length === 0) {
                res.status(404).json({ message: 'Bread not found' });
                return;
            }
            res.status(200).json({ message: 'Bread price updated', product: result.rows[0] });
        } catch (err) {
            console.error('Error updating Bread price:', err);
            res.status(500).json({ message: 'Error updating Bread price' });
        }
    });

    app.put('/products/:id', async (req, res) => {
        const productId = req.params.id;
        const { productName, productPrice, stockQuantity, supplierId } = req.body;
        try {
            const result = await pool.query(
                `UPDATE product SET name = $1, price = $2, stock_quantity = $3, supplier_id = $4 WHERE id = $5 RETURNING *`,
                [productName, productPrice, stockQuantity, supplierId, productId]
            );
            if (result.rows.length === 0) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            res.status(200).json({ message: 'Product updated', product: result.rows[0] });
        } catch (err) {
            console.error('Error updating product:', err);
            res.status(500).json({ message: 'Error updating product' });
        }
    });

    app.delete('/products/eggs', async (req, res) => {
        try {
            const result = await pool.query(
                "DELETE FROM product WHERE name = 'Eggs' RETURNING *"
            );
            if (result.rows.length === 0) {
                res.status(404).json({ message: 'Eggs not found' });
                return;
            }
            res.status(200).json({ message: 'Eggs deleted', product: result.rows[0] });
        } catch (err) {
            console.error('Error deleting Eggs:', err);
            res.status(500).json({ message: 'Error deleting Eggs' });
        }
    });

    app.delete('/products/:id', async (req, res) => {
        const productId = req.params.id;
        try {
            const result = await pool.query('DELETE FROM product WHERE id = $1 RETURNING *', [productId]);
            if (result.rows.length === 0) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            res.status(200).json({ message: 'Product deleted', product: result.rows[0] });
        } catch (err) {
            console.error('Error deleting product:', err);
            res.status(500).json({ message: 'Error deleting product' });
        }
    });
// 3:

app.post('/suppliers', async (req, res) => {
    const { supplierName, supplierPhone } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO supplier (name, contact_number) VALUES ($1, $2) RETURNING *',
            [supplierName, supplierPhone]
        );
        res.status(201).json({ message: 'Supplier created', supplier: result.rows[0] });
    } catch (err) {
        console.error('Error creating supplier:', err);
        res.status(500).json({ message: 'Error creating supplier' });
    }
});
app.get('/suppliers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM supplier');
        res.status(200).json({ suppliers: result.rows });
    } catch (err) {
        console.error('Error fetching suppliers:', err);
        res.status(500).json({ message: 'Error fetching suppliers' });
    }
});
app.put('/suppliers/:id', async (req, res) => {
    const supplierId = req.params.id;
    const { supplierName, supplierPhone } = req.body;
    try {
        const result = await pool.query(
            'UPDATE supplier SET name = $1, contact_number = $2 WHERE id = $3 RETURNING *',
            [supplierName, supplierPhone, supplierId]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Supplier not found' });
            return;
        }
        res.status(200).json({ message: 'Supplier updated', supplier: result.rows[0] });
    } catch (err) {
        console.error('Error updating supplier:', err);
        res.status(500).json({ message: 'Error updating supplier' });
    }
});
app.delete('/suppliers/:id', async (req, res) => {
    const supplierId = req.params.id;
    try {
        const result = await pool.query('DELETE FROM supplier WHERE id = $1 RETURNING *', [supplierId]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Supplier not found' });
            return;
        }
        res.status(200).json({ message: 'Supplier deleted', supplier: result.rows[0] });
    } catch (err) {
        console.error('Error deleting supplier:', err);
        res.status(500).json({ message: 'Error deleting supplier' });
    }
});
// 4:
app.post('/sales', async (req, res) => {
    const { productId, quantitySold } = req.body;
    try {
        const foundProduct = await pool.query('SELECT * FROM product WHERE id = $1', [productId]);
        if (foundProduct.rows.length === 0) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        const product = foundProduct.rows[0];
        if (product.stock_quantity < quantitySold) {
            res.status(400).json({ message: 'Insufficient stock' });
            return;
        }
        const result = await pool.query(
            'INSERT INTO sales (product_id, quantity_sold) VALUES ($1, $2) RETURNING *',
            [productId, quantitySold]
        );
        await pool.query(
            'UPDATE product SET stock_quantity = stock_quantity - $1 WHERE id = $2',
            [quantitySold, productId]
        );
        res.status(201).json({ message: 'Sale recorded', sale: result.rows[0] });
    } catch (err) {
        console.error('Error recording sale:', err);
        res.status(500).json({ message: 'Error recording sale' });
    }
});
app.get('/sales', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM sales');
        res.status(200).json({ sales: result.rows });
    } catch (err) {
        console.error('Error fetching sales:', err);
        res.status(500).json({ message: 'Error fetching sales' });
    }
});
app.get('/sales/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM sales WHERE product_id = $1', [productId]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Sale not found' });
            return;
        }
        res.status(200).json({ sale: result.rows[0] });
    } catch (err) {
        console.error('Error fetching sale:', err);
        res.status(500).json({ message: 'Error fetching sale' });
    }
});
// 5: 
app.get('/product/Category',async (req, res) => {
    try {
        const result = await pool.query("AlTER TABLE product ADD COLUMN Category VARCHAR(50) DEFAULT 'Unknown'");
        res.status(200).json({ message: 'Category column added', result: result.rows });
    } catch (err) {
        console.error('Error adding category column:', err);
        res.status(500).json({ message: 'Error adding category column' });
    }
});
app.get('/product/remove-category',async (req, res) => {
    try {
        const result = await pool.query("AlTER TABLE product DROP COLUMN Category");
        res.status(200).json({ message: 'Category column removed', result: result.rows });
    } catch (err) {
        console.error('Error removing category column:', err);
        res.status(500).json({ message: 'Error removing category column' });
    }
});
app.get('/product/change-contactNumber',async (req, res) => {
    try {
        const result = await pool.query("AlTER TABLE supplier ALTER COLUMN contact_number TYPE VARCHAR(20)");
        res.status(200).json({ message: 'Contact number column type changed', result: result.rows });
    } catch (err) {
        console.error('Error changing contact number column type:', err);
        res.status(500).json({ message: 'Error changing contact number column type' });
    }
});
app.get('/product/add-Not-Null-to-product-name',async (req, res) => {
    try {
        const result = await pool.query("AlTER TABLE product ALTER COLUMN name SET NOT NULL");
        res.status(200).json({ message: 'Not null constraint added to product name', result: result.rows });
    } catch (err) {
        console.error('Error adding not null constraint to product name:', err);
        res.status(500).json({ message: 'Error adding not null constraint to product name' });
    }
});

// 6:
function addSupplier(supplierName, supplierPhone) {
    return new Promise((resolve, reject) => {
        pool.query(
            'INSERT INTO supplier (name, contact_number) VALUES ($1, $2) RETURNING *',
            [supplierName, supplierPhone],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows[0]);
                }
            }
        );
    });
}

function addProduct(productName, productPrice, stockQuantity, supplierId) {
    return new Promise((resolve, reject) => {
        pool.query(
            'INSERT INTO product (name, price, stock_quantity, supplier_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [productName, productPrice, stockQuantity, supplierId],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows[0]);
                }
            }
        );
    });
}

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
// 7:


app.get('/products/bread', async (req, res) => {
    try {
        const result = await pool.query(
            "UPDATE product SET price = $1 WHERE name = 'Bread' RETURNING *",
            [25.00]
        );
        if (!result.rows[0]) {
            res.status(404).json({ message: 'Bread not found' });
            return;
        }
        res.status(200).json({ product: result.rows[0]  });  
    } catch (err) {
        console.error('Error updating bread price:', err);
        res.status(500).json({ message: 'Error updating bread price' });
    }
});

app.get('/reports/total-sold', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT p.id, p.name, COALESCE(SUM(s.quantity_sold), 0) AS total_quantity_sold
            FROM product p
            LEFT JOIN sales s ON s.product_id = p.id
            GROUP BY p.id, p.name
            ORDER BY p.id
        `);
        res.status(200).json({ products: result.rows });
    } catch (err) {
        console.error('Error generating total sold report:', err);
        res.status(500).json({ message: 'Error generating total sold report' });
    }
});

app.get('/reports/highest-stock', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM product
            WHERE stock_quantity = (SELECT MAX(stock_quantity) FROM product)
        `);
        res.status(200).json({ products: result.rows });
    } catch (err) {
        console.error('Error generating highest stock report:', err);
        res.status(500).json({ message: 'Error generating highest stock report' });
    }
});

app.get('/reports/suppliers-starting-f', async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM supplier WHERE name LIKE 'F%'"
        );
        res.status(200).json({ suppliers: result.rows });
    } catch (err) {
        console.error('Error generating supplier report:', err);
        res.status(500).json({ message: 'Error generating supplier report' });
    }
});

app.get('/reports/never-sold', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT p.*
            FROM product p
            LEFT JOIN sales s ON s.product_id = p.id
            WHERE s.product_id IS NULL
        `);
        res.status(200).json({ products: result.rows });
    } catch (err) {
        console.error('Error generating never sold report:', err);
        res.status(500).json({ message: 'Error generating never sold report' });
    }
});
app.get('/reports/allSalesInfo', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT p.name, s.quantity_sold, s.sale_date
            FROM product p
            JOIN sales s ON s.product_id = p.id
            ORDER BY s.sale_date DESC
        `);
        res.status(200).json({ sales: result.rows });
    } catch (err) {
        console.error('Error generating all sales info report:', err);
        res.status(500).json({ message: 'Error generating all sales info report' });
    }
});
app.post('/admin/create-store-manager', async (req, res) => {
    try {
        await pool.query(`CREATE USER store_manager WITH PASSWORD $1`, ['store_manager_password']);
        await pool.query(`GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO store_manager`);
        res.status(201).json({ message: 'store_manager created' });
    } catch (err) {
        console.error('Error creating store manager:', err);
        res.status(500).json({ message: 'Error creating store manager' });
    }
});
app.get('/admin/remove-update-permissions-from-store-manager', async (req, res) => {
    try {
        await pool.query(`REVOKE UPDATE ON ALL TABLES IN SCHEMA public FROM store_manager`);
        res.status(200).json({ message: 'Update permissions revoked from store_manager' });
    } catch (err) {
        console.error('Error revoking update permissions:', err);
        res.status(500).json({ message: 'Error revoking update permissions' });
    }   
});
app.get('/admin/grant-delete-permissions-to-store-manager', async (req, res) => {
    try {
        await pool.query(`GRANT DELETE ON ALL TABLES IN SCHEMA public TO store_manager`);
        res.status(200).json({ message: 'Delete permissions granted to store_manager' });
    } catch (err) {
        console.error('Error granting delete permissions:', err);
        res.status(500).json({ message: 'Error granting delete permissions' });
    }
});