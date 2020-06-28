const {pool}= require('../pool');
const  express =require ('express');
const app = express();
app.use(express.json());
const mysql = require('mysql');



// 1. api/Get/products- json of all the products
app.route ('/api/products')
.get((req,res) => {
    pool.query('SELECT * FROM products',(err,results,fields)=>{
        if(err)throw err;
        res.json(results);
    });
});   



// 2. delete by id-delete product number six

app.route ('/api/products/delete')
.get((req,res) => {
    pool.query('DELETE  FROM products WHERE id=6',(err,results,fields)=>{
        if(err)throw err;
        res.json(results.affectedRows);
    });
});   


//3.api/post/product
//להוסיף מוצר ל database ולהחזיר את id שלו

// הוספת מוצר ל database
app.route ('/api/post/products')
.post((req,res) => {
    pool.query('INSERT INTO products(id,name,year,price,rating) VALUES (6,iphone,2022,3500,7),(7,computer,2021,4000,6),(8,iphone,2022,3500,7)',(err,results,fields)=>{
    if(err)throw err;
        
    res.json(results.insertId);
    });
    
    });
   
//4.GET/products/:id
//get product id

app.route('/products/:id')
.get((req,res) => {
    const productID =req.params.id;

    const sql=`SELECT *FROM products WHERE id=${pool.escape(productID)}`;
    console.log(sql);
   
    pool.query(sql,(err,results,fields)=>{
        if(err)throw err;
        res.json(results);
    });
})


//עדכון משתמש
.put((req,res)=>{
const {productID}=req.body;
const {name}= req.body;

pool.query('UPDATE products SET name=? WHERE id=?',[name],(err,results,fields)=>{
if(err)throw err;
res.json({success:results.changedRows> 0});

});
})

//delete
.delete((req,res)=>{
    const  productID=req.params.id;

    pool.query('DELETE  FROM products  WHERE id=?',productID,(err,results,fields)=>{
    if(err)throw err;
    res.json({success:results.affectedRows > 0});
    
    });
    
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));