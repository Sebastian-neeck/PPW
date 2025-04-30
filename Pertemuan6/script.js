document.addEventListener('DOMContentLoaded', () => {
  const qrisRadio = document.getElementById("qrisRadio");
  const qrisCodeContainer = document.getElementById("qrisCode");
  const qrcodeEl = document.getElementById("qrcode");

  // Tampilkan ringkasan pesanan dari localStorage
  const summary = localStorage.getItem("orderSummary");
  if (summary) {
    document.getElementById("orderSummary").innerHTML = summary; // Gunakan innerHTML agar tag HTML dirender
  }

  // Tampilkan QR Code jika metode pembayaran QRIS dipilih
  const radios = document.querySelectorAll('input[name="pembayaran"]');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (qrisRadio.checked) {
        qrisCodeContainer.style.display = "block";
        qrcodeEl.innerHTML = ""; // Hapus QR code lama jika ada

        // Generate QR Code
        new QRCode(qrcodeEl, {
          text: "QRIS TUPI TEROGONK",
          width: 128,
          height: 128,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
        });
      } else {
        qrisCodeContainer.style.display = "none";
        qrcodeEl.innerHTML = ""; // Bersihkan jika bukan QRIS
      }
    });
  });

  // Tangani pengiriman form
  document.getElementById('purchaseForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert("Pesanan Anda segera di proses dan dikirim, Terima kasih sudah Order Di TUPI!");
  });
});

  