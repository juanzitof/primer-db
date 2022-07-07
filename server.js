import "dotenv/config";
import fs from "fs";
import mongoose from "mongoose";
import { fakeProductsRouter } from "./routers/productsFaker";

const express = require("express");
const productos = require("./routes/productos.js");
const http = require("http");
const { knexMySql, knexSQLite } = require("./db/db.js");

const app = express();
const server = http.createServer(app);

mongoose
	.connect(
      "mongodb+srv://juan:<juan.coder>@cluster0.vmxkj.mongodb.net/?retryWrites=true&w=majority"
	)
	.then(() => console.log("Base de datos MongoDB conectada"))
	.catch((err) => console.log(err));

  import MongoContainer from "./containers/containerMongo.js";

    import messagesSchema from "./models/messages";
    const containerMongoMessages = new MongoContainer("messages", messagesSchema);

    const saveMessages = (message) => {
	  containerMongoMessages.save(message);
};

import { normalize, denormalize, schema } from "normalizr";

import util from "util";



const messageSchema = new schema.Entity("message");


const authorSchema = new schema.Entity(
	"author",
	{
		autor: messageSchema,
	},
	{ idAttribute: "email" }
);

const print = (obj) => {
	console.log(util.inspect(obj, false, 12, true));
};

io.on("connection", (socket) => {

	console.log("Nuevo cliente conectado");
	
	socket.emit("ServerMsgs", containerMongoMessages.getAll());
	socket.emit("producto", productos);
	socket.on("newProduct", (data) => {
		let newID = productos.length + 1;
		let newTitle = data.title;
		let newPrice = data.price;
		let newThumbnail = data.thumbnail;
		const product = {
			id: newID,
			title: newTitle,
			price: newPrice,
			thumbnail: newThumbnail,
		};
		productos.push(productos)
		io.sockets.emit("productos", productos);
	});

	socket.on("clientMsg", (data) => {

		saveMessages(data);
		io.sockets.emit("ServerMsgs", containerMongoMessages.getAll());
	});
});

let admin = true;
const authError = {
	error: -1,
	description: "No posee los permisos para llevar adelante esta acción",
};

app.set("views", "./views");
app.set("view engine", "ejs");

const { Server } = require("socket.io");
const moment = require("moment");
const io = new Server(server);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", productos);

app.get("/", (req, res) => {
  knexMySql
    .from("productos")
    .select("*")
    .then((resp) => {
      res.render("index", { data: resp });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/", (req, res) => {
  let objNew = {
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
  };
  knexMySql("productos")
    .insert(objNew)
    .then(() => {
      console.log("Registro ok!");
    })
    .catch((err) => {
      console.log(err);
    });
});



// Desafio mock

import { Router } from "express";
import faker from "faker";

faker.locale = "es";

export const fakeProductsRouter = Router();

const generateFakeProducts = () => {
	return {
		name: faker.commerce.productName(),
		price: faker.commerce.price(),
		image: faker.image.image(),
	};
};

const getFakeProducts = (quantity) => {
	const products = [];
	for (let i = 0; i < quantity; i++) {
		products.push(generateFakeProducts());
	}
	return products;
};

// endpoint

fakeProductsRouter.get("/", (res, res) => {
	const products = getFakeProducts(5);
	res.render("products.test", { products });
});

const PORT = process.env.PORT || 8080;



app.get("/", (req, res) => {
  knexMySql
    .from("productos")
    .select("*")
    .then((resp) => {
      res.render("index", { data: resp });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/", (req, res) => {
  let objNew = {
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
  };
  knexMySql("productos")
    .insert(objNew)
    .then(() => {
      console.log("Registro ok!");
    })
    .catch((err) => {
      console.log(err);
    });
});

server.listen(PORT, () => {
  console.log(
    `Servidor http creado con express escuchando en el puerto ${PORT}`
  );
});