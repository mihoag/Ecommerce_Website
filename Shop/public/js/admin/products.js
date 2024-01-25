function toggleDetail() {
  var parentRow = event.target.closest("tr");
  var nextRow = parentRow.nextElementSibling;

  document.querySelectorAll(".detail-row").forEach(function (row) {
    if (row !== nextRow) {
      row.classList.remove("open");
    }
  });

  if (nextRow && nextRow.classList.contains("detail-row")) {
    nextRow.classList.toggle("open");
  }
}

function preview() {
  const frame = document.querySelector("#frame");
  frame.src = URL.createObjectURL(event.target.files[0]);
}

function preview2() {
  const frame = document.querySelector("#frame2");
  frame.src = URL.createObjectURL(event.target.files[0]);
}

async function brandType() {
  const response = await fetch("/type/all");
  const data = await response.json();
  const option = document.getElementById("brandType");
  data.forEach((type) => {
    if (type.active) {
      option.innerHTML += `<option value="${type.typeId}">${type.name}</option>\n`;
    }
  });
}
brandType();

async function addProduct() {
  try {
    var form = document.getElementById("addProductForm");
    var formData = new FormData(form);
    const imageFile = document.getElementById("formFile");
    const file = imageFile.files[0];
    const values = new FormData();

    if (
      formData.get("cost") < 0 ||
      formData.get("price") < 0 ||
      formData.get("cost") > formData.get("price") ||
      formData.get("discount") < 0 ||
      formData.get("total") < 0
    ) {
      alert("Dữ liệu chưa hợp lệ");
      return;
    }
    const saleprice =
      formData.get("price") -
      (formData.get("price") * formData.get("discount")) / 100;
    if (saleprice <= 0) {
      alert("Dữ liệu chưa hợp lệ");
      return;
    }
    // Append the image file to the FormData
    values.append("image", file);

    // Iterate over the form data entries and set them in the new FormData object
    for (const [field, value] of formData.entries()) {
      if (value == "" || value == null) {
        alert("Dữ liệu cần được nhập đầy đủ");
        return;
      }
      values.set(field, value);
    }
    const response = await fetch("/admin/products/add", {
      method: "POST",
      body: values,
    });
    const data = await response.json();
    alert(data);
    if (response.ok) {
      window.location.reload();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getProductData(id_item) {
  try {
    const response = await fetch(
      `/admin/products/get-product?id_item=${id_item}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

async function turnOnEditMode(event) {
  var detailTable = event.target.closest(".detail-table");
  const item = await getProductData(detailTable.id);
  if (!item) {
    alert("Error network");
    return;
  }
  const response = await fetch("/type/all");
  const data = await response.json();
  let options = "";
  data.forEach((type) => {
    if (type.active) {
      options += `<option value="${type.typeId}" ${item.typeId == type.typeId ? "selected" : ""
        }>${type.name}</option>\n`;
    }
  });
  detailTable.innerHTML = `
  <form id="updateProductForm" action="/admin/products/add"
  method="POST" style="height: 100%;">
  <div class="row" style="height: 100%;">
    <div class="col-md-5">
      <div class="row" style="min-height: 70%;">
        <img id="frame2" src=${item.image} class="img-fluid"
          style="max-width: 400px;" />
      </div>
      <div class="row mt-5">
        <input name="image" class="form-control-file border"
          accept="image/*" required type="file"
          id="formFile2"
          onchange="preview()2">
      </div>
    </div>
    <div class="col-md-7">
      <div class="form-group mt-2">
        <label for="name">Name</label>
        <input type="text" class="form-control" name="name" value="${item.name}"
          placeholder="Product's name" required>
      </div>
      <div class="form-group mt-2">
        <label for="cost">Cost</label>
        <input type="number" class="form-control"
          name="cost" placeholder="Product's cost" value ="${item.cost}"
          required>
      </div>
      <div class="form-group mt-2">
        <label for="price">Sale Price</label>
        <input type="number" class="form-control"
          name="price" placeholder="Product's sale price" value = "${item.price
    }"
          required>
      </div>
      <div class="form-group mt-2">
        <label for="discount">Discount</label>
        <input type="number" class="form-control"
          name="discount" placeholder="Product's discount" value = "${item.discount
    }"
          required>
      </div>
      <div class="form-group mt-2">
        <label for="total">Quantity</label>
        <input type="number" class="form-control"
          name="total" placeholder="Quantity" value = "${item.total}"
          required>
      </div>
      <div class="form-group mt-2">
        <label for="typeId">Brand</label>
        <select name="typeId" id="brandType" required>
          ${options}
        </select>
      </div>
      <div class="form-group mt-2">
  <label for="releaseDate">Release Date</label>
  <input type="date" class="form-control" value="${handleReleaseDate(
      item.releaseDate
    )}"
    name="releaseDate" required>
</div>

    </div>
  </div>
  <hr>
  <h5>Technical Information</h5>
  <div class="row">
    <div class="col-md-5">
      <div class="form-group mt-2">
        <label for="screen">Screen</label>
        <input type="text" class="form-control"
          name="screen"
          placeholder="Display Screen Information" value = '${item.screen}'
          required>
      </div>
      <div class="form-group mt-2">
        <label for="os">OS</label>
        <input type="text" class="form-control"
          name="os" placeholder="Product's OS" value = "${item.os}"
          required>
      </div>
      <div class="form-group mt-2">
        <label for="fcam">Front Camera</label>
        <input type="text" class="form-control"
          name="fcam" placeholder="Front Camera Information" value = "${item.cameraFront
    }"
          required>
      </div>
      <div class="form-group mt-2">
        <label for="bcam">Back Camera</label>
        <input type="text" class="form-control"
          name="bcam" placeholder="Back Camera Information" value = "${item.cameraBehind
    }"
          required>
      </div>
    </div>
    <div class="col-md-5">
      <div class="form-group mt-2">
        <label for="cpu">CPU</label>
        <input type="text" class="form-control"
          name="cpu" placeholder="Chipset" value = "${item.cpu}"
          required>
      </div>
      <div class="form-group mt-2">
        <label for="ram">RAM (GB)</label>
        <input type="text" min="4" max="16"
          class="form-control"
          name="ram" placeholder="RAM" value = "${item.ram}"
          required>
      </div>
      <div class="form-group mt-2">
        <label for="rom">ROM (GB)</label>
        <input type="text" min="32" class="form-control"
          name="rom" placeholder="RAM" value = "${item.rom}"
          required>
      </div>
      <div class="form-group mt-2">
        <label for="battery">Battery (mAh)</label>
        <input type="text" min="2000" class="form-control"
          name="battery" placeholder="Battery" value = "${item.battery}"
          required>
      </div>
    </div> 

  </div>
  <div class="row mt-3">
      <div class="col-md text-end p-2">
        <div class="hidden-sm hidden-xs btn-group">
          <button type="button" class="btn btn-xs btn-success save-btn" onclick="updateProduct()">
            <i class="ace-icon fa fa-check bigger-120"></i>
          </button>
          <button type="button" class="btn btn-xs btn-info cancel-btn" onclick="turnOffEditMode()">
            <i class="fa-solid fa-xmark bigger-120"></i>
          </button>
        </div>
      </div>
    </div>
</form>
  `;
}

async function updateProduct() {
  try {
    var form = document.getElementById("updateProductForm");
    var formData = new FormData(form);
    const imageFile = document.getElementById("formFile2");
    const file = imageFile.files[0];
    const values = new FormData();
    var detailTable = event.target.closest(".detail-table");
    const id = detailTable.id;
    if (
      formData.get("cost") < 0 ||
      formData.get("price") < 0 ||
      formData.get("cost") > formData.get("price") ||
      formData.get("discount") < 0 ||
      formData.get("total") < 0
    ) {
      alert("Dữ liệu chưa hợp lệ");
      return;
    }
    const saleprice =
      formData.get("price") -
      (formData.get("price") * formData.get("discount")) / 100;
    if (saleprice <= 0) {
      alert("Dữ liệu chưa hợp lệ");
      return;
    }
    // Append the image file to the FormData
    values.append("image", file);
    values.append("oldimage", document.getElementById("frame2").src);
    values.append("productId", id);
    // Iterate over the form data entries and set them in the new FormData object
    for (const [field, value] of formData.entries()) {
      if (value == "" || value == null) {
        alert("Dữ liệu cần được nhập đầy đủ");
        return;
      }
      values.set(field, value);
    }
    const response = await fetch("/admin/products/update", {
      method: "POST",
      body: values,
    });
    const data = await response.json();
    alert(data);
    if (response.status === 200) {
      document.querySelector(".cancel-btn").dispatchEvent(new Event("click"));
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function turnOffEditMode(e) {
  var detailTable = event.target.closest(".detail-table");
  const item = await getProductData(detailTable.id);

  if (!item) {
    alert("Error network");
    return;
  }
  const response = await fetch("/type/all");
  const data = await response.json();
  let typeName = "";
  data.forEach((type) => {
    if (type.typeId == item.typeId) {
      typeName = type.name;
    }
  });
  detailTable.innerHTML = `
  <div class="row">
  <div class="col-md-3 d-flex justify-content-center align-items-center">
    <div class="product-container">
      <img class="product-img" src="${item.image}" alt="${item.name}">
    </div>
  </div>
  <div class="col-md-9">
    <table class="table">
      <tbody>
        <tr>
          <th width="20%">Name</th>
          <td>${item.name}</td>
        </tr>
        <tr>
          <th width="20%">Brand</th>
          <td>${typeName}</td>
        </tr>
        <tr>
          <th width="20%">Annouced</th>
          <td>${handleReleaseDate(item.releaseDate)}</td>
        </tr>
        <tr>
          <th width="20%">Cost price</th>
          <td>${convertToVND(item.cost)}</td>
        </tr>
        <tr>
          <th width="20%">Sales price</th>
          <td>${convertToVND(item.price)}</td>
        </tr>
        <tr>
          <th width="20%">Discount</th>
          <td>${item.discount}%</td>
        </tr>
        <tr>
          <th width="20%">In stock</th>
          <td>${item.total}</td>
        </tr>
        <tr>
          <td colspan="2" class="justify-content-end text-end border-0">
            <div class="hidden-sm hidden-xs btn-group">
              

              <button class="btn btn-xs btn-info" onclick="turnOnEditMode(event)">
                <i class="ace-icon fa fa-pencil bigger-120"></i>
              </button>

              <button class="btn btn-xs btn-danger" onclick="DeactivateItem(event)" btnid="${item.productId}">
                <i class="ace-icon fa fa-ban bigger-120"></i>
              </button>
              
            </div>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</div>
  `;
}

function handleReleaseDate(releaseDate) {
  const inputDate = new Date(releaseDate);
  const day = String(inputDate.getUTCDate()).padStart(2, "0");
  const month = String(inputDate.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = inputDate.getUTCFullYear();

  return `${year}-${month}-${day}`;
}

async function DeactivateItem(event) {
  const productId = event.currentTarget.getAttribute('btnid');
  const active = document.getElementById(productId).querySelector('tr:nth-child(8) td');
  if (active.textContent === 'false') {
    alert('Sản phẩm đã bị vô hiệu hóa');
    return;
  }
  try {
    const response = await fetch("/admin/products/deactivate", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ productId: productId })
    });
    const data = await response.json();
    alert(data);
    if (response.ok) {
      active.textContent = 'false';
    }
  } catch (error) {
    console.log(error);
  }

}
