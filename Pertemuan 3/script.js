
console.log("Selamat datang di Toko Kopi Terogonk");

const qtyInputs = document.querySelectorAll(".qty");
const totalItemsEl = document.getElementById("totalItems");
const totalPriceEl = document.getElementById("totalPrice");
const orderBtn = document.getElementById("orderBtn");

function updateTotal() {
  let totalItems = 0;
  let totalPrice = 0;

  qtyInputs.forEach(input => {
    const qty = parseInt(input.value) || 0;
    const price = parseInt(input.dataset.price);
    totalItems += qty;
    totalPrice += qty * price;
  });

  totalItemsEl.textContent = totalItems;
  totalPriceEl.textContent = totalPrice.toLocaleString("id-ID");
}

// Update otomatis saat input berubah
qtyInputs.forEach(input => {
  input.addEventListener("input", updateTotal);
});

// Tampilkan ringkasan saat klik tombol
orderBtn.addEventListener("click", () => {
  updateTotal();
  alert(`Kamu memesan ${totalItemsEl.textContent} minuman dengan total Rp ${totalPriceEl.textContent}`);
});
const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {
  qtyInputs.forEach(input => {
    input.value = 0;
  });

  totalItemsEl.textContent = "0";
  totalPriceEl.textContent = "0";
  
  checkoutResult.style.display = "none";
  checkoutList.innerHTML = "";
  checkoutTotal.textContent = "";
  waLink.href = "#";

  alert("Pesanan telah di-reset!");
});

const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutResult = document.getElementById("checkoutResult");
const checkoutList = document.getElementById("checkoutList");
const checkoutTotal = document.getElementById("checkoutTotal");
const waLink = document.getElementById("waLink");

checkoutBtn.addEventListener("click", () => {
  checkoutList.innerHTML = "";
  let totalItems = 0;
  let totalPrice = 0;
  let orderText = "Halo, saya ingin memesan:\n";

  qtyInputs.forEach(input => {
    const qty = parseInt(input.value) || 0;
    const price = parseInt(input.dataset.price);
    const itemName = input.closest(".menu-item").querySelector("h3").textContent;

    if (qty > 0) {
      const itemTotal = qty * price;
      const itemLine = `${itemName} (${qty}x) - Rp ${itemTotal.toLocaleString("id-ID")}`
      const li = document.createElement("li");
      li.textContent = itemLine;
      checkoutList.appendChild(li);

      orderText += `• ${itemName} (${qty}x)\n`;
      totalItems += qty;
      totalPrice += itemTotal;
    }
  });

  checkoutTotal.textContent = `Rp ${totalPrice.toLocaleString("id-ID")}`;
  orderText += `\nTotal: Rp ${totalPrice.toLocaleString("id-ID")}`;
  const whatsappURL = `https://wa.me/6289676737200?text=${encodeURIComponent(orderText)}`;
  waLink.href = whatsappURL;

  checkoutResult.style.display = "block";
});
