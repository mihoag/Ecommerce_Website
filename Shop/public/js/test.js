$(document).ready(function () {
  $("#fileUser").change(async function (event) {
    let [file] = this.files;
    if (file) {
      // upload preview avatar
      $("#avatar").attr("src", URL.createObjectURL(file));
    }
  });
  $("#userForm").submit(async function (e) {
    e.preventDefault();
    let [file] = $("#fileUser")[0].files;
    const formData = new FormData();
    formData.set("image", file);
    formData.set("name", $("#name").val());
    formData.set("phoneNumber", $("#phoneNumber").val());
    await fetch("/auth/edit", { method: "POST", body: formData });
    return false;
  });

  // product
  $("#fileProduct").change(async function (event) {
    let [file] = this.files;
    if (file) {
      // upload preview avatar
      $("#image").attr("src", URL.createObjectURL(file));
    }
  });
  $("#productForm").submit(async function (e) {
    e.preventDefault();
    let [file] = $("#fileProduct")[0].files;
    const formData = new FormData();
    formData.set("image", file);
    formData.set("name", $("#name").val());
    formData.set("quantity", $("#quantity").val());
    formData.set("typeId", $("#typeId").val());
    formData.set("cost", $("#cost").val());
    formData.set("price", $("#price").val());

    await fetch("/product/create", { method: "POST", body: formData });
    return false;
  });

  // product update
  $("#fileProductUpdate").change(async function (event) {
    let [file] = this.files;
    if (file) {
      // upload preview avatar
      $("#image").attr("src", URL.createObjectURL(file));
    }
  });
  $("#productUpdateForm").submit(async function (e) {
    e.preventDefault();
    let [file] = $("#fileProductUpdate")[0].files;
    const formData = new FormData();
    formData.set("image", file);
    formData.set("name", $("#name").val());
    formData.set("quantity", $("#quantity").val());
    formData.set("typeId", $("#typeId").val());
    formData.set("cost", $("#cost").val());
    formData.set("price", $("#price").val());
    const id = $("#productId").val();

    await fetch(`/product/update/${id}`, { method: "POST", body: formData });
    location.reload();
  });
});
