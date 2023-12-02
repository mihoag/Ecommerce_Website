$(document).ready(function () {
  $("#fileUser").change(async function (event) {
    let [file] = this.files;
    if (file) {
      // upload preview avatar
      $("#avatar").attr("src", URL.createObjectURL(file));
    }
  });
  $("form").submit(async function (e) {
    e.preventDefault();
    let [file] = $("#fileUser")[0].files;
    const formData = new FormData();
    formData.set("image", file);
    formData.set("name", $("#name").val());
    formData.set("phoneNumber", $("#phoneNumber").val());
    await fetch("/auth/edit", { method: "POST", body: formData });
    return false;
  });
});
