
DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products
(
    item_id INTEGER NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    dept_name VARCHAR(30) NOT NULL,
    price DECIMAL(8, 2) NOT NULL,
    stock_qty INTEGER NOT NULL
);

INSERT INTO products
    (item_id, product_name, dept_name, price, stock_qty)
VALUES
    (3298, "Rubber Duck", "Home and Bath", 4.99, 103),
    (2199, "TV Antenna", "Home Electronics", 12.99, 67),
    (9022, "VCR", "Home Electronics", 76.99, 39),
    (8720, "Rotary Phone", "Home Electronics", 50.99, 60),
    (1010, "Tupperware Set (12pc.)", "Home and Bath", 24.99, 190),
    (5199, "Tape Deck Car Stereo", "Auto", 129.99, 83),
    (7766, "Case of Motor Oil (24x32oz.)", "Auto", 62.99, 22),
    (6660, "Diamond Ring", "Jewelry", 1299.99, 13);











