document.getElementById('order-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const nombre = data.get('nombre');
  const tel = data.get('telefono');
  const zona = data.get('zona');
  const detalle = data.get('detalle') || 'Sin detalle';

  const mensaje = `Hola, soy ${nombre}.%0A Tel: ${tel}%0A Zona: ${zona}%0A Pedido: ${detalle}`;
  const url = `https://wa.me/59170000000?text=${mensaje}`; // 👈 cambia aquí tu número
  window.open(url, '_blank');
});

// 🛒 Carrito de compras
let cart = [];

function updateCart() {
  const list = document.getElementById('cart-list');
  const totalEl = document.getElementById('cart-total');
  list.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} - Bs ${item.price}`;
    
    // Botón eliminar
    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.style.marginLeft = "10px";
    btn.onclick = () => {
      cart.splice(index, 1);
      updateCart();
    };
    li.appendChild(btn);

    list.appendChild(li);
  });

  totalEl.textContent = total;
  
  // Rellenar textarea con el pedido
  const textarea = document.querySelector('textarea[name="detalle"]');
  textarea.value = cart.map(i => `${i.name} (Bs ${i.price})`).join(", ");
}

// Botones "Agregar"
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.name;
    const price = Number(btn.dataset.price);
    cart.push({ name, price });
    updateCart();
  });
});

// 📲 Envío por WhatsApp
document.getElementById('order-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const nombre = data.get('nombre');
  const tel = data.get('telefono');
  const zona = data.get('zona');
  const detalle = data.get('detalle') || 'Sin detalle';

  const mensaje = `Hola, soy ${nombre}.%0A` +
                  `Tel: ${tel}%0A` +
                  `Zona: ${zona}%0A` +
                  `Pedido: ${detalle}`;
  const url = `https://wa.me/59170000000?text=${mensaje}`; // 👈 cambia aquí tu número
  window.open(url, '_blank');
});
