const API_URL = "https://script.google.com/macros/s/AKfycbzoFOl6UBvu398978uuFnt0fwEhvWoisOh_TWbiI1us5o1MnTwV0BuqQ8dZkKFzO9tLCg/exec";

async function submitHomework(){

  const fullname = document.getElementById("fullname").value.trim();
  const className = document.getElementById("class").value.trim();
  const schoolyear = document.getElementById("schoolyear").value.trim();
  const teacher = document.getElementById("teacher").value.trim();
  const fileInput = document.getElementById("file");

  const file = fileInput.files[0];

  if(!fullname || !className || !schoolyear || !teacher){
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  if(!file){
    alert("Vui lòng chọn file PowerPoint");
    return;
  }

  const reader = new FileReader();

  reader.onload = async function(){

    const base64 = reader.result.split(',')[1];

    const data = {
      fullname,
      className,
      schoolyear,
      teacher,
      fileName: file.name,
      mimeType: file.type,
      file: base64
    };

    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data)
    });

    alert("✅ Gửi bài thành công");
  }

  reader.readAsDataURL(file);
}
