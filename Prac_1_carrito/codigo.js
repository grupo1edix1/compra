
//Variables 
//variables que almacena la entrada de datos del usuario
var artName, artPrice, artCount;
//variables que recopilan y almacen los datos introducidos
var artText;
var artArray;
//Botones y otros métodos de selección
var submitButton, printButton, resetButton;
var cardBlock, moneyBlock;
var paySelect;
var checkBox;
//Errores
var error1, error2, error3, error4, error5;
//Validaciones
var validPrice = /^\d+([.]\d*)?$/;
var validCard= /^\d{16}$/;
var validCVV= /^\d{3}$/;


//Declaración de clase Artículo
class Article {
    
	constructor (name, price, count){
		this.name = name;
		this.price = price;
		this.count = count;
	}

}
//Inicializamos las variables y los eventos en carga
window.addEventListener("load", () => {
	inicializarVariables();
	inicializarEventos();
});

function inicializarVariables(){
	error1 = document.getElementById("error1");
	error2 = document.getElementById("error2");
	error3 = document.getElementById("error3");
	error4 = document.getElementById("error4");
	error5 = document.getElementById("error5");
	submitButton = document.getElementById("submit");
	artText = document.getElementById("lart");
	price = document.getElementsByName("price");
	artTotal = document.getElementById("lcount");
	artArray = [];
	moneyBlock = document.getElementById("money");
	cardBlock = document.getElementById("card");
	paySelect = document.getElementById("spay");
	resetButton = document.getElementById("reset");
	checkBox = document.getElementById("cbox1");
	printButton = document.getElementById("print");
	printButton.disabled = true;
}

function inicializarEventos(){
	//Botón submit guarda los valores y los imprime por pantalla
	submitButton.addEventListener("click", () =>{
		artName = document.getElementById("fname").value;
		artPrice = parseFloat(document.getElementById("fprice").value);
		artCount = parseInt(document.getElementById("fcount").value);
		if (artName==undefined || artName==""){
			error1.style.display="inline";
		} else if (!document.getElementById("fprice").value.match(validPrice)) {
			error2.style.display="inline";
		} else {
			guardarValores();
			borrarErrores();
		}
	});
	//Selección de métodos de pago y muestra diferentes opciones
	paySelect.addEventListener('change', () => {
		switch (paySelect.value){
			case "tarjeta":
			cardBlock.style.display = "block";
			moneyBlock.style.display ="none";
			break;
			case "efectivo":
			cardBlock.style.display ="none";
			moneyBlock.style.display = "block";
			break;
			default:
			cardBlock.style.display ="none";
			moneyBlock.style.display="none";
			break;
		}	 
	});
	//Botón reset: Limpia formularios y reinicia valores
	resetButton.addEventListener("click", () => {
		document.getElementById("form1").reset();
		document.getElementById("form2").reset();
		artArray = [];
		cardBlock.style.display ="none";
		moneyBlock.style.display="none";
		borrarErrores();
	});
	//Habilita el botón imprimir
	checkBox.addEventListener("change", () =>{
		if (checkBox.checked == true){
			printButton.disabled = false;
		} else{
			printButton.disabled = true;
		}
	});
	//Botón impirmir. Muestra el alert dependiendo de la forma de pago
	printButton.addEventListener("click", () =>{
		let pay;
		if (paySelect.value=="tarjeta"){
			pay="Tarjeta de crédito";
		}else if (paySelect.value=="efectivo"){
			pay="Efectivo";
		}
		var cardName = document.getElementById("fcardname").value;
		if (pay=="tarjeta"){
			if (cardName==undefined || cardName==""){
				error3.style.display="inline";
			} else if (paySelect.value == "tarjeta" && !document.getElementById("fcardnumber").value.match(validCard)){
				error4.style.display="inline";
			} else if (paySelect.value == "tarjeta" && !document.getElementById("fcvv").value.match(validCVV)){
				error5.style.display="inline";
			}
		} else {
			imprimir(pay);
			borrarErrores();
		}
	});
}
//Funciones  

//Borra errores, quita la visibilidad de los errores
function borrarErrores(){
	var errors = document.getElementsByTagName("small");
	for (var i=0; i<errors.length; i++){
		errors[i].style.display="none";
	}
}	
//Muestra alert dependiendo de la forma de pago (Parámetro de entrada: String)
function imprimir(pay){
	if (pay != undefined){
	alert("Los artículos de mi carrito son: " + artText.value + "\n"
			+ "El precio total es: " + price[0].value + "\n" 
			+ "Forma de pago: " + pay);
	}else{
		alert("Seleccione método de pago.");
	}
}
//Guarda valores en array y muestra valores en el segundo formulario
function guardarValores(){
	var art = new Article(artName, artPrice, artCount);
	artArray.push(art);
	var total = arrayMostrar(artArray);
	document.getElementById("form1").reset();
	artText.value=total.name;
	for (var i=0; i<price.length; i++){

		price[i].value=total.price + " €";
	}
	artTotal.value=total.count;
}
/*Concatena los datos del array y hace el sumatorio del precio y las unidades (Parámetro de entrada: Array y devuelve un
diccionario con tres claves)*/
function arrayMostrar(array){
	var string1 = {name:"", price:0, count:0};
	for (var i = 0; i<array.length; i++){
		if (i==0){
			string1.name=array[i].name + string1.name;
		}else{
			string1.name = array[i].name.concat(", ", string1.name);
		}
	string1.price = array[i].price * array[i].count + string1.price;
	string1.count = array[i].count + string1.count;
	}
	return string1;
}