const db = require('../index').db;
const generateAccessToken = require('../jwt/generate').generateAccessToken;
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
require('dotenv').config();


// async function register(req, res) {
//     const username = req.body.username;
//     const password = req.body.password;
//     const hashed_password = CryptoJS.SHA256(password).toString();
//     const sql = 'INSERT INTO users( username, password, role) VALUES (?,?,?)';
//     db.run(sql, [username, hashed_password, 0], (err) => {
//         if (err) {
//             res.send(JSON.stringify( { status: 'Error'} ));
//         }
//         res.send(JSON.stringify( { status: 'User created'} ));
//     })
// }

async function register(req, res){
    const username = req.body.username;
    const password = req.body.password;
    const hashed_password = CryptoJS.SHA256(password).toString();
    const sql = 'INSERT INTO users(username, password,role) VALUES (?,?,?)';
    db.run(sql, [username,hashed_password, 0],(err)=>{
        if(err){
            res.send(JSON.stringify({status:'Error Reigstering'}));
        }
            res.send(JSON.stringify({status: 'User Created'}));
    })
}


// async function login(req,res){
//     const username = req.body.username;
//     const password = req.body.password;
//     const hashed_password = CryptoJS.SHA256(password).toString();
//     const sql = 'SELECT * FROM users WHERE username=?';
//     db.get(sql,[username],(err,row)=>{
//         if(username === row.username && hashed_password === row.password){
//             console.log(row.password);
//             const token = generateAccessToken(username,row.role);
//             res.send(JSON.stringify({status: 'Logged in', jwt: token}));
//        }else{
//            res.send(JSON.stringify({status:'Wrong credentials'}));
//        }
//     })
// }

async function login( req, res ) {
    const username = req.body.username
    const password = req.body.password
    const hashed_password = CryptoJS.SHA256(password).toString();
    let token = generateAccessToken(username)
    console.log(token)
    const sql = "SELECT * from users WHERE username = ?"
    db.get(sql,[username], function(err, row){
        console.log(row);
      if(username == row.username && hashed_password == row.password) {
          res.send(JSON.stringify({status: "Logged in",jwt:token}));
      }else {
          res.send(JSON.stringify({status: "Wrong credentials"}));
      }
    }) 
  }  


async function deleteUser(req, res) {
    db.run('DELETE FROM users WHERE id=?', [req.params.id],
    (err)=>{
        if(err){
            res.send(JSON.stringify({response:'Something went wrong'}));
        }
        res.send(JSON.stringify({response:'User Deleted'}));
    }
    )
    
}

module.exports = { register, login, deleteUser}