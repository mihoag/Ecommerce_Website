var currentUser;
var tongTienTatCaDonHang = 0; // lưu tổng tiền từ tất cả các đơn hàng đã mua
var tongSanPhamTatCaDonHang = 0;


// Phần Thông tin người dùng
// function addInfoUser(user) {
//   if (!user) return;
//   document.getElementsByClassName("infoUser")[0].innerHTML =
//     `
//     <hr>
//     <table>
//         <tr>
//             <th colspan="3">THÔNG TIN KHÁCH HÀNG</th>
//         </tr>
//         <tr>
//             <td>Tài khoản: </td>
//             <td> <input type="text" value="` +
//     user.username +
//     `" readonly> </td>
//             <td> <i class="fa fa-pencil" onclick="changeInfo(this, 'username')"></i> </td>
//         </tr>
//         <tr>
//             <td>Mật khẩu: </td>
//             <td style="text-align: center;">
//                 <i class="fa fa-pencil" id="butDoiMatKhau" onclick="openChangePass()"> Đổi mật khẩu</i>
//             </td>
//             <td></td>
//         </tr>
//         <tr>
//             <td colspan="3" id="khungDoiMatKhau">
//                 <table>
//                     <tr>
//                         <td> <div>Mật khẩu cũ:</div> </td>
//                         <td> <div><input type="password"></div> </td>
//                     </tr>
//                     <tr>
//                         <td> <div>Mật khẩu mới:</div> </td>
//                         <td> <div><input type="password"></div> </td>
//                     </tr>
//                     <tr>
//                         <td> <div>Xác nhận mật khẩu:</div> </td>
//                         <td> <div><input type="password"></div> </td>
//                     </tr>
//                     <tr>
//                         <td></td>
//                         <td>
//                             <div><button onclick="changePass()">Đồng ý</button></div>
//                         </td>
//                     </tr>
//                 </table>
//             </td>
//         </tr>
//         <tr>
//             <td>Họ: </td>
//             <td> <input type="text" value="` +
//     user.ho +
//     `" readonly> </td>
//             <td> <i class="fa fa-pencil" onclick="changeInfo(this, 'ho')"></i> </td>
//         </tr>
//         <tr>
//             <td>Tên: </td>
//             <td> <input type="text" value="` +
//     user.ten +
//     `" readonly> </td>
//             <td> <i class="fa fa-pencil" onclick="changeInfo(this, 'ten')"></i> </td>
//         </tr>
//         <tr>
//             <td>Email: </td>
//             <td> <input type="text" value="` +
//     user.email +
//     `" readonly> </td>
//             <td> <i class="fa fa-pencil" onclick="changeInfo(this, 'email')"></i> </td>
//         </tr>
//         <tr>
//             <td colspan="3" style="padding:5px; border-top: 2px solid #ccc;"></td>
//         </tr>
//         <tr>
//             <td>Tổng tiền đã mua: </td>
//             <td> <input type="text" value="` +
//     numToString(tongTienTatCaDonHang) +
//     `₫" readonly> </td>
//             <td></td>
//         </tr>
//         <tr>
//             <td>Số lượng sản phẩm đã mua: </td>
//             <td> <input type="text" value="` +
//     tongSanPhamTatCaDonHang +
//     `" readonly> </td>
//             <td></td>
//         </tr>
//     </table>`;
// }

function openChangePass() {
  var khungChangePass = document.getElementById("khungDoiMatKhau");
  var actived = khungChangePass.classList.contains("active");
  if (actived) khungChangePass.classList.remove("active");
  else khungChangePass.classList.add("active");
}

async function changePass() {
  var inps = $("#khungDoiMatKhau input");
  if ($(inps[0]).val() == "") {
    inps[0].focus();
    showToastError("Chưa nhập mật khẩu hiện tại !");
    return;
  }
  if ($(inps[1]).val() == "") {
    inps[1].focus();
    showToastError("Chưa nhập mật khẩu mới !");
    return;
  }
  if ($(inps[1]).val() != $(inps[2]).val()) {
    inps[2].focus();
    showToastError("Xác nhận mật khẩu không khớp");
    return;
  }
  if ($(inps[1]).val().length < 6) {
    inps[1].focus();
    showToastError("Mật khẩu phải có độ dài ít nhất là 6");
    return;
  }
  const formData = new FormData();
  formData.set("password", $(inps[0]).val());
  formData.set("newPassword", $(inps[1]).val());
  const response = await fetch("/auth/change", {
    method: "POST",
    body: formData,
  });
  const res = await response.json();
  $(inps[1]).val("");
  $(inps[2]).val("");
  if (res.success) {
    $(inps[0]).val("");
    openChangePass();
    showToastError(res.message, "success");
  } else {
    showToastError(res.message);
  }
}

function changeInfo(iTag, info) {
  console.log(iTag, info);
  var inp =
    iTag.parentElement.previousElementSibling.getElementsByTagName("input")[0];

  // Đang hiện
  if (!inp.readOnly) {
    iTag.innerHTML = "";
  } else {
    iTag.innerHTML = "Đồng ý";
    inp.focus();
    var v = inp.value;
    inp.value = "";
    inp.value = v;
  }

  inp.readOnly = !inp.readOnly;
}

// // Phần thông tin đơn hàng
// function addTatCaDonHang(user) {
//   if (!user) {
//     document.getElementsByClassName("listDonHang")[0].innerHTML = `
//             <h3 style="width=100%; padding: 50px; color: red; font-size: 2em; text-align: center">
//                 Bạn chưa đăng nhập !!
//             </h3>`;
//     return;
//   }
//   if (!user.donhang.length) {
//     document.getElementsByClassName("listDonHang")[0].innerHTML =
//       `
//             <h3 style="width=100%; padding: 50px; color: green; font-size: 2em; text-align: center">
//                 Xin chào ` +
//       currentUser.username +
//       `. Bạn chưa có đơn hàng nào.
//             </h3>`;
//     return;
//   }
//   for (var dh of user.donhang) {
//     addDonHang(dh);
//   }
// }

// function addDonHang(dh) {
//   var div = document.getElementsByClassName("listDonHang")[0];

//   var s =
//     `
//             <table class="listSanPham">
//                 <tr>
//                     <th colspan="6">
//                         <h3 style="text-align:center;"> Đơn hàng ngày: ` +
//     new Date(dh.ngaymua).toLocaleString() +
//     `</h3>
//                     </th>
//                 </tr>
//                 <tr>
//                     <th>STT</th>
//                     <th>Sản phẩm</th>
//                     <th>Giá</th>
//                     <th>Số lượng</th>
//                     <th>Thành tiền</th>
//                     <th>Thời gian thêm vào giỏ</th>
//                 </tr>`;

//   var totalPrice = 0;
//   for (var i = 0; i < dh.sp.length; i++) {
//     var masp = dh.sp[i].ma;
//     var soluongSp = dh.sp[i].soluong;
//     var p = timKiemTheoMa(list_products, masp);
//     var price = p.promo.name == "giareonline" ? p.promo.value : p.price;
//     var thoigian = new Date(dh.sp[i].date).toLocaleString();
//     var thanhtien = stringToNum(price) * soluongSp;

//     s +=
//       `
//                 <tr>
//                     <td>` +
//       (i + 1) +
//       `</td>
//                     <td class="noPadding imgHide">
//                         <a target="_blank" href="chitietsanpham.html?` +
//       p.name.split(" ").join("-") +
//       `" title="Xem chi tiết">
//                             ` +
//       p.name +
//       `
//                             <img src="` +
//       p.img +
//       `">
//                         </a>
//                     </td>
//                     <td class="alignRight">` +
//       price +
//       ` ₫</td>
//                     <td class="soluong" >
//                          ` +
//       soluongSp +
//       `
//                     </td>
//                     <td class="alignRight">` +
//       numToString(thanhtien) +
//       ` ₫</td>
//                     <td style="text-align: center" >` +
//       thoigian +
//       `</td>
//                 </tr>
//             `;
//     totalPrice += thanhtien;
//     tongSanPhamTatCaDonHang += soluongSp;
//   }
//   tongTienTatCaDonHang += totalPrice;

//   s +=
//     `
//                 <tr style="font-weight:bold; text-align:center; height: 4em;">
//                     <td colspan="4">TỔNG TIỀN: </td>
//                     <td class="alignRight">` +
//     numToString(totalPrice) +
//     ` ₫</td>
//                     <td > ` +
//     dh.tinhTrang +
//     ` </td>
//                 </tr>
//             </table>
//             <hr>
//         `;
//   div.innerHTML += s;
// }
$(document).ready(function () {
  $("#fileUser").change(async function (event) {
    let [file] = this.files;
    if (file) {
      // upload preview avatar
      $("#avatar").attr("src", URL.createObjectURL(file));
    }
  });

  $("#changeInfo").on("click", async function () {
    let [file] = $("#fileUser")[0].files;
    const formData = new FormData();
    formData.set("image", file);
    formData.set("name", $("#name").val());
    formData.set("phoneNumber", $("#phoneNumber").val());
    await fetch("/auth/edit", { method: "POST", body: formData });
    var toast = document.getElementById("updateInfoToast");
    var bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  });

  $("#changePass").on("click", async function () {
    changePass();
  });
});

function showToastError(message, type = "danger") {
  var toast = document.getElementById("errorPass");
  toast.classList.remove("bg-danger");
  toast.classList.add(`bg-${type}`);
  $("#errorPass .toast-body").text(message);
  var bsToast = new bootstrap.Toast(toast);
  bsToast.show();
  setTimeout(function () {
    bsToast.hide();
  }, 2000);
}
