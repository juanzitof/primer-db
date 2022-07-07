const socket = io.connect();

const date = new Date();
const clientEmail = document.querySelector("#userEmail");
const message = document.querySelector("#message");
const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const sendClientMsg = () => {
	if (clientEmail.value !== "" && clientEmail.value.match(mailFormat)) {
		const messageSchema = {
			author: {
				id: email,
				nombre: document.getElementById("userFirstName").value,
				apellido: document.getElementById("userLastName").value,
				edad: document.getElementById("userAge").value,
				alias: document.getElementById("userAlias").value,
				avatar: document.getElementById("userURL").value,
			},
			text: message,
		};
		
		socket.emit("clientMsg", messageSchema);

		message.value = "";
	} else {
		console.error("Formato incorrecto de email");
		alert(
			"El formato de email ingresado no es correcto, ingreselo nuevamente!"
		);
	}
};

document.querySelector("#sendMsg").addEventListener("click", () => {

	sendClientMsg();
});

const writeMsgs = (msgs) => {
	const msgsHTML = msgs
		.map(
			(msg) =>
				`Fecha: ${msg.date} - Nombre: ${msg.clientEmail} -> Mensaje: ${msg.message}`
		)
		.join("<br>");
	document.querySelector("p").innerHTML = msgsHTML;
};

socket.on("ServerMsgs", (msgs) => {
	writeMsgs(msgs);
});

const title = document.querySelector("#title");
const price = document.querySelector("#price");
const thumbnail = document.querySelector("#thumbnail");

const addProduct = (evt) => {
	let producto = {
		title: title.value,
		price: price.value,
		thumbnail: thumbnail.value,
	};

	socket.emit("newProducto", producto);
	title.value = "";
	price.value = "";
	thumbnail.value = "";
};

const renderTable = (data) => {
	const productosHTML = data
		.map((elem) => {
			return `<tr>
				<td>${elem.title}</td>
				<td>${elem.price}</td>
				<td class="d-flex justify-content-center">
					<img src=${elem.thumbnail} width="60px" height="60px" />
				</td>
				</tr>`;
		})
		.join(" ");
	console.log(productosHTML);
	document.querySelector("#productos").value = "";
	document.querySelector("#productos").innerHTML = productosHTML;
};

socket.on("productos", (productos) => {
	console.log(productos);
	renderTable(productos);
});

