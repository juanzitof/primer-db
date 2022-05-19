const express = require('express')
const fs = require('fs')
const { knexMySql, knexSQLite } = require("../db/db.js");

const {Router} = express

let router = new Router()

router.get('/productos', (req, res) => {   
    knexMySql
    .from("productos")
    .select("*")
    .then((resp) => {
      res.render("productos", { data: resp });
    })
    .catch((err) => {
      console.log(err);
    });
})

router.get('/productos/:id', (req, res) => {
knexMySql
    .from("productos")
    .select("*")
    .where({ id: req.params.id })
    .then((resp) => {
        console.log(resp[0])
        res.render('uploaded', { data: resp });
    })
    .catch((err) => {
      console.log(err);
    });
})

router.post('/productos', (req, res) => {
    let objNew = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
      };
      knexMySql("productos")
        .insert(objNew)
        .then(() => {
          console.log("Registro ok!");
          res.send({ message: "Registro ok!" })
        })
        .catch((err) => {
          console.log(err);
        });
})

router.put('/productos/:id', (req, res) => {
    knexMySql("productos")
    .where({ id: req.params.id })
    .update({ title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail })
    .then(() => {
      res.send({ data: "User updated" });
    })
    .catch((err) => {
      console.log(err);
    });
})



router.delete('/productos/:id', (req, res) => {
    knexMySql("productos")
    .where({ id: req.params.id })
    .del()
    .then(() => {
      res.send({ data: "User deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
})

module.exports = router