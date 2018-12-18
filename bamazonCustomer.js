var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

var lastItem = "";

connection.connect(function (err) {
    if (err) throw err;
    firstPage();
});

function firstPage() {
    console.log("*******************************************");
    console.log("*            Welcome to Bamazon           *");
    console.log("*Online Shopping Mega-Experience-Warehouse*")
    console.log("*                                         *")
    console.log("*******************************************");
    console.log("*******************************************");
    console.log("*******************************************");
    console.log("*******************************************");
    console.log("*          Our Current Inventory          *")
    console.log("*******************************************");
    console.log("*******************************************");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < 5; i++) {
            console.log(`------------------------`);
            console.log(`ID: ${res[i].item_id}\nProduct: ${res[i].product_name}\nDepartment: ${res[i].dept_name}\nPrice: $${res[i].price}\nQTY: ${res[i].stock_qty}`);
        }
    });
    userInput();
}

function userInput() {
    inquirer.prompt([
        {
            type: "input",
            name: "product_id",
            message: "ENTER THE PRODUCT ID FOR THE PRODUCT THAT YOU WISH TO PURCHASE:"
        }
    ]).then(function (res1) {
        connection.query(
            "SELECT * FROM products WHERE ?",
            {
                item_id: res1.product_id
            },
            function (err, res2) {
                var prod = res2[0].product_name;
                lastItem = prod;

                if (err) throw err;
                inquirer.prompt([
                    {
                        type: "input",
                        name: "qty",
                        message: "ENTER THE QTY THAT YOU WOULD LIKE TO PURCHASE:"
                    }
                ]).then(function (res3) {
                    var qty = res3.qty;
                    var newQty = ((res2[0].stock_qty) - (qty));
                    if (newQty > 0) {
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_qty: newQty
                                },
                                {
                                    product_name: prod
                                }
                            ],
                        )
                        console.log("**************************************");
                        console.log(`You are purchasing ${qty} ${prod}'s`)
                        console.log("**************************************");
                        console.log("");
                        console.log("");
                        update();
                    } else {
                        console.log("INSUFFICIENT STOCK QTY");
                        userInput();
                    }
                })
            })
    })
}

function update() {
    connection.query("SELECT * FROM products WHERE product_name =?", lastItem, function (err, data) {
        if (err) throw err;
        
        console.log("***************************************");
        console.log("*      BAMAZON WAREHOUSE UPDATED      *");
        console.log("***************************************");

        data.forEach(function (resultObj) {
            console.log("ID: " + resultObj.item_id);
            console.log("Product: " + resultObj.product_name);
            console.log("New Qty: " + resultObj.stock_qty);
        });
    })
    connection.end();

}

