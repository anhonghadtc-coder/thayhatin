const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzSitpoJ3oNLhyj6zUY0Ga3QHjXj6MjpBEDWJ_D_GHPIs668eTnbCp6Xg-PfV3LT5dC1g/exec";


async function guiBai() {

  const hoten =
    document.getElementById("hoten").value;

  const lop =
    document.getElementById("lop").value;

  const namhoc =
    document.getElementById("namhoc").value;

  const giaovien =
    document.getElementById("giaovien").value;

  const fileInput =
    document.getElementById("file");

  const status =
    document.getElementById("status");


  // ===== KIỂM TRA =====

  if(!hoten || !lop || !giaovien){

    status.innerHTML =
      "❌ Vui lòng nhập đầy đủ thông tin";

    status.className = "error";

    return;
  }

  if(fileInput.files.length === 0){

    status.innerHTML =
      "❌ Vui lòng chọn file PowerPoint";

    status.className = "error";

    return;
  }


  // ===== FILE =====

  const file = fileInput.files[0];

  status.innerHTML =
    "⏳ Đang tải bài lên...";

  status.className = "";


  // ===== ĐỌC FILE =====

  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = async () => {

    try {

      const base64 =
        reader.result.split(",")[1];

      const data = {

        hoten: hoten,
        lop: lop,
        namhoc: namhoc,
        giaovien: giaovien,

        fileName: file.name,

        fileData: base64
      };


      // ===== GỬI =====

      const response = await fetch(
        SCRIPT_URL,
        {
          method: "POST",
          body: JSON.stringify(data)
        }
      );


      const result =
        await response.json();


      // ===== THÀNH CÔNG =====

      if(result.status === "success"){

        status.innerHTML =
          "✅ Đã nộp bài thành công";

        status.className = "success";

      } else {

        status.innerHTML =
          "❌ " + result.message;

        status.className = "error";
      }

    } catch(err){

      status.innerHTML =
        "❌ Không thể kết nối Apps Script";

      status.className = "error";
    }

  };

}
