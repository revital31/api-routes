const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 12,
    host: 'localhost',
    user: 'revital1',
    password: '123456',
    database: 'jbh_shop'
    //insecureAuth : true
});


//pool events

pool.on('connection', (conn) => {
    console.log(`New connection id:${conn.threadId}`)
});


pool.on('acquire', (conn) => {
    console.log(`Acquire connection id:${conn.threadId}`)
});


pool.on('enqueue', (conn) => {
    console.log('waiting for available connection slot');
});


pool.on('release', (conn) => {
    console.log('Connection %d released', conn.threadId);
});

pool.query()


module.exports={pool};