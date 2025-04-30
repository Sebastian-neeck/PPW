console.log("Selamat datang di Toko Kopi Terogonk");

const qtyInputs = document.querySelectorAll(".qty");
const totalItemsEl = document.getElementById("totalItems");
const totalPriceEl = document.getElementById("totalPrice");
const orderBtn = document.getElementById("orderBtn");
const resetBtn = document.getElementById("resetBtn");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutResult = document.getElementById("checkoutResult");
const checkoutList = document.getElementById("checkoutList");
const checkoutTotal = document.getElementById("checkoutTotal");

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

// Reset pesanan
resetBtn.addEventListener("click", () => {
  qtyInputs.forEach(input => {
    input.value = 0;
  });

  totalItemsEl.textContent = "0";
  totalPriceEl.textContent = "0";

  checkoutResult.style.display = "none";
  checkoutList.innerHTML = "";
  checkoutTotal.textContent = "";

  alert("Pesanan telah di-reset!");
});

// Checkout dan simpan ke Ringkasan, lalu arahkan ke form
checkoutBtn.addEventListener("click", () => {
  orderBtn.addEventListener("click", () => {
    checkoutBtn.click(); // paksa tombol checkout dijalankan
  });
  
  let totalItems = 0;
  let totalPrice = 0;
  let summaryItems = [];

  checkoutList.innerHTML = "";

  qtyInputs.forEach(input => {
    const qty = parseInt(input.value) || 0;
    const price = parseInt(input.dataset.price);
    const itemName = input.closest(".menu-item").querySelector("h3").textContent;

    if (qty > 0) {
      const itemTotal = qty * price;
      summaryItems.push(`${itemName} (${qty}x) - Rp ${itemTotal.toLocaleString("id-ID")}`);
      totalItems += qty;
      totalPrice += itemTotal;
    }
  });

  if (summaryItems.length === 0) {
    alert("LO PILIH DULU LAH!");
    return;
  }
  const fullSummary = `
    <ul>
      ${summaryItems.map(item => `<li>${item}</li>`).join("")}
    </ul>
    <p><strong>Total Item:</strong> ${totalItems}</p>
    <p><strong>Total Harga:</strong> Rp ${totalPrice.toLocaleString("id-ID")}</p>
  `;

  localStorage.setItem("orderSummary", fullSummary);
  window.location.href = "../Pertemuan6/Form1.html";
});
