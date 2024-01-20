const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePhoneNumber = (phoneNumber) => {
  if (phoneNumber.length != 10) return "Số điện thoại phải có độ dài là 10";
  let isnum = /^\d+$/.test(phoneNumber);
  if (!isnum) return "Số điện thoại phải bao gồm là 10 số";
  if (phoneNumber[0] != '0') return "Số điện thoại phải bắt đầu bằng số 0";
  return "";
}

async function addUser() {
  const data = $("#addUserForm")
    .serializeArray()
    .reduce((obj, field) => ({ ...obj, [field.name]: field.value }), {});

  let err = ""
  if (data.name.length == 0) {
    err += "<li>Phải điền tên khách hàng</li>"
  }
  if (data.email.length == 0) {
    err += "<li>Phải điền địa chỉ email</li>"
  } else if (!validateEmail(data.email)) {
    err += "<li>Địa chỉ email không hợp lệ</li>"
  }
  if (data.address.length == 0) {
    err += "<li>Phải điền địa chỉ nhận hàng mặc định</li>"
  }
  if (data.phoneNumber.length == 0) {
    err += "<li>Phải điền số điện thoại</li>"
  } else {
    let mess = validatePhoneNumber(data.phoneNumber);
    if (mess.length != 0) err += `<li>${mess}</li>`
  }
  if (err.length == 0) {
    document.getElementById("cnt-err").style.display = "none";
    const res = await fetch('/admin/customers/add', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const response = await res.json();
    if (response.success) { } else {
      document.getElementById("cnt-err").style.display = "block";
      document.getElementById("errMess").innerHTML = `<li>${response.message}</li>` || "<li>Có lỗi xảy ra hãy thử lại sau</li>";
    }
  } else {
    document.getElementById("cnt-err").style.display = "block";
    document.getElementById("errMess").innerHTML = err;
  }

}

document.addEventListener("DOMContentLoaded", function () {
  var buttons = document.querySelectorAll(".detail-btn");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var parentRow = this.closest("tr");
      var nextRow = parentRow.nextElementSibling;

      if (nextRow && nextRow.classList.contains("detail-row")) {
        nextRow.classList.toggle("open");
      }
    });
  });
});
