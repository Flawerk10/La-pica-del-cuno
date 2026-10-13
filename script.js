const D = {
  Hamburguesa:{e:"🍔",i:["Pan de hamburguesa","Carne de vacuno","Doble carne","Queso cheddar","Queso suizo","Queso azul","Camarones apanados","Tocino","Jamón","Jamón serrano","Lechuga","Rúcula","Tomate","Cebolla","Cebolla caramelizada","Aros de cebolla","Pepinillos","Palta","Champiñones","Pimentón","Huevo","Ají jalapeño","Salsa BBQ","Mayonesa","Ketchup","Mostaza","Guacamole","Salsa de ajo","Salsa picante"]},
  Pizza:{e:"🍕",i:["Salsa de tomate","Queso mozzarella","Queso azul","Pepperoni","Jamón serrano","Jamón","Tocino","Chorizo","Carne molida","Pollo","Carne","Salame","Anchoas","Salmón ahumado","Champiñones","Aceitunas","Cebolla","Pimentón","Tomate","Tomate cherry","Choclo","Piña","Jalapeño","Palmitos","Albahaca","Orégano","Salsa pesto","Extra queso"]},
  Handroll:{e:"🍣",i:["Arroz","Alga nori","Pollo","Camarón","Salmón","Queso crema","Palta","Pepino","Cebollín","Sésamo"]},
  Shawarma:{e:"🌯",i:["Pan pita","Pollo","Carne de vacuno","Carne de cordero","Lechuga","Queso cheddar","Tomate","Pepino","Cebolla","Cebolla morada","Palta","Papas fritas","Queso","Aceitunas","Choclo","Guacamole","Hummus","Salsa de ajo","Salsa de yogur","Salsa tahini","Salsa picante","Cilantro","Perejil"]},
  Taco:{e:"🌮",i:["Tortilla de maíz","Tortilla de harina","Pollo","Carne de vacuno","Carne al pastor","Camarón","Lechuga","Tomate","Cebolla","Cilantro","Palta","Guacamole","Pico de gallo","Choclo","Frijoles","Queso cheddar","Queso","Ají jalapeño","Salsa picante","Crema agria","Limón"]}
};
let prod = "", dec = [];
const $ = id => document.getElementById(id);

function tipo(n){
  if (/^pan\b|arroz|nori|tortilla/i.test(n)) return "pan";
  if (/carne|pollo|pepperoni|chorizo|salame|vacuno|cordero|camar|salm|anchoa/i.test(n)) return "carne";
  if (/queso/i.test(n)) return "queso";
  if (/tocino|jam/i.test(n)) return "tocino";
  if (/salsa|mayo|ketchup|mostaza|guacamole|hummus|pesto|crema|pico de gallo/i.test(n)) return "salsa";
  if (/lechuga|rúcula|tomate|cebo|pepin|palta|champi|pimen|jalape|ají|aceituna|choclo|piña|palmito|albahaca|cilantro|perejil|orégano|limón|frijol/i.test(n)) return "veg";
  return "otro";
}
function show(id){
  document.querySelectorAll("main > section").forEach(s => s.hidden = s.id !== id);
  window.scrollTo(0,0);
}
$("menu").innerHTML = Object.keys(D).map(k =>
  `<button onclick="empezar('${k}')">${D[k].e} ${k}</button>`).join("");

const M = [
  {c:"Hamburguesa",n:"Clásica",p:6900,d:["Pan de hamburguesa","Carne de vacuno","Lechuga","Tomate","Mayonesa"]},
  {c:"Hamburguesa",n:"Cheeseburger",p:7900,d:["Pan de hamburguesa","Carne de vacuno","Queso cheddar","Pepinillos","Ketchup","Mostaza"]},
  {c:"Hamburguesa",n:"Doble BBQ",p:9900,d:["Pan de hamburguesa","Doble carne","Tocino","Queso cheddar","Cebolla caramelizada","Salsa BBQ"]},
  {c:"Pizza",n:"Margarita",p:9500,d:["Salsa de tomate","Queso mozzarella","Albahaca","Orégano"]},
  {c:"Pizza",n:"Pepperoni",p:11500,d:["Salsa de tomate","Queso mozzarella","Pepperoni"]},
  {c:"Pizza",n:"Hawaiana",p:11000,d:["Salsa de tomate","Queso mozzarella","Jamón","Piña"]},
  {c:"Handroll",n:"Salmón queso crema",p:4200,d:["Arroz","Alga nori","Salmón","Queso crema"]},
  {c:"Handroll",n:"Camarón palta",p:4600,d:["Arroz","Alga nori","Camarón","Palta"]},
  {c:"Handroll",n:"Pollo palta",p:3800,d:["Arroz","Alga nori","Pollo","Palta","Cebollín"]},
  {c:"Shawarma",n:"De pollo",p:5900,d:["Pan pita","Pollo","Lechuga","Tomate","Salsa de ajo"]},
  {c:"Shawarma",n:"De vacuno",p:6500,d:["Pan pita","Carne de vacuno","Cebolla morada","Pepino","Salsa tahini"]},
  {c:"Shawarma",n:"Mixto",p:7200,d:["Pan pita","Pollo","Carne de vacuno","Lechuga","Papas fritas","Salsa de yogur"]},
  {c:"Taco",n:"De pollo (3 un.)",p:5900,d:["Tortilla de maíz","Pollo","Lechuga","Tomate","Crema agria"]},
  {c:"Taco",n:"De vacuno (3 un.)",p:6500,d:["Tortilla de maíz","Carne de vacuno","Cebolla","Cilantro","Salsa picante"]},
  {c:"Taco",n:"De camarón (3 un.)",p:7200,d:["Tortilla de harina","Camarón","Palta","Pico de gallo","Limón"]}
];
const precio = v => "$" + v.toLocaleString("es-CL");
$("carta").innerHTML = Object.keys(D).map(c =>
  "<h3>" + D[c].e + " " + c + "s</h3><div class=\"platos\">" +
  M.map((m, i) => m.c !== c ? "" :
    `<div class="plato"><b>${m.n}</b><small>${m.d.join(", ")}</small><div class="pie"><span class="precio">${precio(m.p)}</span><button onclick="pedir(${i})">Pedir</button></div></div>`).join("") +
  "</div>").join("");
function pedir(i){
  const m = M[i];
  agregar({n: m.n + " (" + m.c + ")", d: m.d, p: m.p});
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
  const p = BASE[prod] + el.reduce((a, x) => a + (EXTRA[tipo(x)] || 0), 0);
  custom = {n: "Tu " + prod + (prod === "Taco" ? " (3 un.)" : "") + " personalizado", d: el, p: p};
  $("btnAgregar").hidden = el.length === 0;
  $("resumen").innerHTML = "<h3>Tu " + esc(prod) + "</h3>" +
    (el.length ? "<p>Ingredientes seleccionados:</p>" + el.map(x => "<p>✓ " + esc(x) + "</p>").join("") +
                 "<p><b>Precio: " + precio(p) + "</b></p>"
               : "<p>No seleccionaste ingredientes.</p>");
  show("final");
}
function enviar(e){
  e.preventDefault();
  $("ok").textContent = "¡Gracias " + $("nombre").value + "! Tu mensaje fue enviado correctamente.";
  e.target.reset();
}

// ---------- CARRO ----------
// Precio base de cada producto armado (CLP). Los ingredientes se cobran según su tipo.
const BASE = {Hamburguesa:4500, Pizza:7500, Handroll:2800, Shawarma:4000, Taco:4000};
const EXTRA = {pan:0, carne:1500, queso:700, tocino:800, veg:300, salsa:0, otro:400};
let carro = [], custom = null, tt;
try { carro = JSON.parse(localStorage.getItem("carro") || "[]"); } catch (e) { carro = []; }
if (!Array.isArray(carro)) carro = [];
carro = carro.filter(x => x && typeof x.n === "string" && Array.isArray(x.d) && Number.isFinite(x.p) && Number.isInteger(x.q) && x.q > 0);

function esc(t){ return String(t).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function guardar(){ try { localStorage.setItem("carro", JSON.stringify(carro)); } catch (e) {} }
function aviso(t){
  const e = $("toast"); e.textContent = t; e.classList.add("on");
  clearTimeout(tt); tt = setTimeout(() => e.classList.remove("on"), 1800);
}
function agregar(item){
  const k = item.n + "|" + item.d.join(",");
  const ex = carro.find(x => x.n + "|" + x.d.join(",") === k);
  ex ? ex.q++ : carro.push({n: item.n, d: item.d, p: item.p, q: 1});
  guardar(); pintarCarro(); aviso(item.n + " agregado al carro");
}
function agregarPersonalizado(){
  if (!custom || !custom.d.length) return;
  agregar(custom); show("carrito");
}
function cambiar(i, d){
  carro[i].q += d;
  if (carro[i].q <= 0) carro.splice(i, 1);
  guardar(); pintarCarro();
}
function quitar(i){ carro.splice(i, 1); guardar(); pintarCarro(); }
function vaciar(){ carro = []; guardar(); pintarCarro(); }
function totalCarro(){ return carro.reduce((a, x) => a + x.p * x.q, 0); }
function pintarCarro(){
  const n = carro.reduce((a, x) => a + x.q, 0);
  $("navCarro").textContent = "🛒 Carro (" + n + ")";
  $("items").innerHTML = carro.map((x, i) =>
    `<div class="item"><div class="info"><b>${esc(x.n)}</b><small>${esc(x.d.join(", "))}</small></div>` +
    `<div class="cant"><button aria-label="Quitar uno" onclick="cambiar(${i},-1)">−</button><span>${x.q}</span><button aria-label="Agregar uno" onclick="cambiar(${i},1)">+</button></div>` +
    `<div class="sub">${precio(x.p * x.q)}</div><button class="quitar" onclick="quitar(${i})">Quitar</button></div>`).join("");
  $("carroVacio").hidden = carro.length > 0;
  $("pieCarro").hidden = carro.length === 0;
  $("total").textContent = "Total: " + precio(totalCarro());
}
function confirmar(){
  if (!carro.length) return;
  $("ticket").innerHTML = carro.map(x =>
    `<p><b>${x.q} × ${esc(x.n)}</b> — ${precio(x.p * x.q)}<br><small>${esc(x.d.join(", "))}</small></p>`).join("") +
    `<p><b>Total: ${precio(totalCarro())}</b></p>`;
  vaciar(); show("confirmado");
}
pintarCarro();
