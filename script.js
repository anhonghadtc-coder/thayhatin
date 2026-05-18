const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbzeRo5Zp2QMabUnXQJlW0zmzGbgHdDLS_74z7pb4B5QYlFbtoQF4xj8JjYGIftMwqgMDA/exec";

async function guiBai() {

  const hoten = document.getElementById("hoten").value;
  const lop = document.getElementById("lop").value;
  const namhoc = document.getElementById("namhoc").value;
  const giaovien = document.getElementById("giaovien").value;

  const fileInput = document.getElementById("file");
  const status = document.getElementById("status");

  if (!hoten || !lop || !giaovien) {
    status.innerHTML = "❌ Vui lòng nhập đầy đủ thông tin";
    status.className = "error";
    return;
  }

  if (fileInput.files.length === 0) {
    status.innerHTML = "❌ Chưa chọn file";
    status.className = "error";
    return;
  }

  const file = fileInput.files[0];

  status.innerHTML = "⏳ Đang tải bài lên...";
  status.className = "";

  const reader = new FileReader();

  reader.onload = async function() {

    const base64 = reader.result.split(",")[1];

    const data = {
      hoten: hoten,
      lop: lop,
      namhoc: namhoc,
      giaovien: giaovien,
      name: file.name,
      file: base64
    };

    try {

      const response = await fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.status === "success") {

        status.innerHTML =
          "✅ Đã nộp bài thành công";

        status.className = "success";

      } else {

        status.innerHTML =
          "❌ Lỗi: " + result.message;

        status.className = "error";
      }

    } catch(err) {

      status.innerHTML =
        "❌ Không thể kết nối Apps Script";

      status.className = "error";
    }

  };

  reader.readAsDataURL(file);
}
