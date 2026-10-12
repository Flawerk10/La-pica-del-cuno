const D = {
  Hamburguesa:{e:"🍔",i:["Pan de hamburguesa","Carne de vacuno","Doble carne","Queso cheddar","Queso suizo","Queso azul","Camarones apanados","Tocino","Jamón","Jamón serrano","Lechuga","Rúcula","Tomate","Cebolla","Cebolla caramelizada","Aros de cebolla","Pepinillos","Palta","Champiñones","Pimentón","Huevo","Ají jalapeño","Salsa BBQ","Mayonesa","Ketchup","Mostaza","Guacamole","Salsa de ajo","Salsa picante"]},
  Pizza:{e:"🍕",i:["Salsa de tomate","Queso mozzarella","Queso azul","Pepperoni","Jamón serrano","Jamón","Tocino","Chorizo","Carne molida","Pollo","Carne","Salame","Anchoas","Salmón ahumado","Champiñones","Aceitunas","Cebolla","Pimentón","Tomate","Tomate cherry","Choclo","Piña","Jalapeño","Palmitos","Albahaca","Orégano","Salsa pesto","Extra queso"]},
  Handroll:{e:"🍣",i:["Arroz","Alga nori","Pollo","Camarón","Salmón","Queso crema","Palta","Pepino","Cebollín","Sésamo"]},
  Shawarma:{e:"🌯",i:["Pan pita","Pollo","Carne de vacuno","Carne de cordero","Lechuga","Queso cheddar","Tomate","Pepino","Cebolla","Cebolla morada","Palta","Papas fritas","Queso","Aceitunas","Choclo","Guacamole","Hummus","Salsa de ajo","Salsa de yogur","Salsa tahini","Salsa picante","Cilantro","Perejil"]}
};
let prod = "", dec = [];
const $ = id => document.getElementById(id);

function tipo(n){
  if (/^pan\b|arroz|nori/i.test(n)) return "pan";
  if (/carne|pollo|pepperoni|chorizo|salame|vacuno|cordero|camar|salm|anchoa/i.test(n)) return "carne";
  if (/queso/i.test(n)) return "queso";
  if (/tocino|jam/i.test(n)) return "tocino";
  if (/salsa|mayo|ketchup|mostaza|guacamole|hummus|pesto/i.test(n)) return "salsa";
  if (/lechuga|rúcula|tomate|cebo|pepin|palta|champi|pimen|jalape|ají|aceituna|choclo|piña|palmito|albahaca|cilantro|perejil|orégano/i.test(n)) return "veg";
  return "otro";
}
function show(id){
  document.querySelectorAll("main > section").forEach(s => s.hidden = s.id !== id);
  window.scrollTo(0,0);
}
$("menu").innerHTML = Object.keys(D).map(k =>
  `<button onclick="empezar('${k}')">${D[k].e} ${k}</button>`).join("");

const M = [
  {c:"Hamburguesa",n:"Clásica",p:5900,d:["Pan de hamburguesa","Carne de vacuno","Lechuga","Tomate","Mayonesa"]},
  {c:"Hamburguesa",n:"Cheeseburger",p:6500,d:["Pan de hamburguesa","Carne de vacuno","Queso cheddar","Pepinillos","Ketchup","Mostaza"]},
  {c:"Hamburguesa",n:"Doble BBQ",p:7900,d:["Pan de hamburguesa","Doble carne","Tocino","Queso cheddar","Cebolla caramelizada","Salsa BBQ"]},
  {c:"Pizza",n:"Margarita",p:8900,d:["Salsa de tomate","Queso mozzarella","Albahaca","Orégano"]},
  {c:"Pizza",n:"Pepperoni",p:9900,d:["Salsa de tomate","Queso mozzarella","Pepperoni"]},
  {c:"Pizza",n:"Hawaiana",p:9500,d:["Salsa de tomate","Queso mozzarella","Jamón","Piña"]},
  {c:"Handroll",n:"Salmón queso crema",p:4900,d:["Arroz","Alga nori","Salmón","Queso crema"]},
  {c:"Handroll",n:"Camarón palta",p:5200,d:["Arroz","Alga nori","Camarón","Palta"]},
  {c:"Handroll",n:"Pollo palta",p:4500,d:["Arroz","Alga nori","Pollo","Palta","Cebollín"]},
  {c:"Shawarma",n:"De pollo",p:4900,d:["Pan pita","Pollo","Lechuga","Tomate","Salsa de ajo"]},
  {c:"Shawarma",n:"De vacuno",p:5500,d:["Pan pita","Carne de vacuno","Cebolla morada","Pepino","Salsa tahini"]},
  {c:"Shawarma",n:"Mixto",p:6500,d:["Pan pita","Pollo","Carne de vacuno","Lechuga","Papas fritas","Salsa de yogur"]}
];
const precio = v => "$" + v.toLocaleString("es-CL");
$("carta").innerHTML = Object.keys(D).map(c =>
  "<h3>" + D[c].e + " " + c + "s</h3><div class=\"platos\">" +
  M.map((m, i) => m.c !== c ? "" :
    `<div class="plato"><b>${m.n}</b><small>${m.d.join(", ")}</small><div class="pie"><span class="precio">${precio(m.p)}</span><button onclick="pedir(${i})">Pedir</button></div></div>`).join("") +
  "</div>").join("");
function pedir(i){
  const m = M[i];
  $("resumen").innerHTML = "<h3>" + m.n + " (" + m.c + ")</h3>" +
    m.d.map(x => "<p>✓ " + x + "</p>").join("") + "<p><b>Total: " + precio(m.p) + "</b></p>";
  show("final");
}
function empezar(p){ prod = p; dec = []; show("armar"); pintar(); }
function decidir(si){
  const n = D[prod].i.length;
  if (dec.length >= n) return;
  dec.push(si);
  dec.length === n ? terminar() : pintar();
}
function atras(){ if (dec.length) { dec.pop(); pintar(); } }
function elegidos(){ return D[prod].i.filter((_, k) => dec[k]); }

function pintar(){
  const ing = D[prod].i, n = ing.length, p = dec.length, el = elegidos();
  $("titulo").textContent = "Personaliza tu " + prod;
  $("cont").textContent = "Ingrediente " + (p + 1) + " de " + n;
  $("barra").style.width = (p / n * 100) + "%";
  $("actual").textContent = ing[p];
  $("atras").disabled = p === 0;
  $("lista").innerHTML = el.map(x => "<li>" + x + "</li>").join("");
  $("vacio").hidden = el.length > 0;
  $("visual").innerHTML = `<div class="em">${D[prod].e}</div>` +
    el.map(x => `<div class="capa ${tipo(x)}">${x}</div>`).join("");
}
function terminar(){
  const el = elegidos();
  $("resumen").innerHTML = "<h3>Tu " + prod + "</h3>" +
    (el.length ? "<p>Ingredientes seleccionados:</p>" + el.map(x => "<p>✓ " + x + "</p>").join("")
               : "<p>No seleccionaste ingredientes.</p>");
  show("final");
}
function enviar(e){
  e.preventDefault();
  $("ok").textContent = "¡Gracias " + $("nombre").value + "! Tu mensaje fue enviado correctamente.";
  e.target.reset();
}
