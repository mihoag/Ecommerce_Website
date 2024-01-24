$(document).ready(function () {
  // check input name
  $("#name").on("input", function () {
    const name = $(this).val();
    if (!checkUpperCaseFirstLetter(name)) {
      customRefValidity(
        "#name",
        "First letter of each word must be capitalized"
      );
    } else {
      customRefValidity("#name");
    }
  });

  // check input password
  $("#password").on("input", function () {
    if (checkPassword($(this).val())) customRefValidity("#password");
    else
      customRefValidity(
        "#password",
        "Password must be at least 6 characters long"
      );
  });

  // check input confirm password
  $("#password_retype").on("input", function () {
    if ($(this).val() === $("#password").val())
      customRefValidity("#password_retype");
    else customRefValidity("#password_retype", "Passwords do not match");
  });

  // check input phonenumber
  $("#phoneNumber").on("input", function () {
    const numError = checkPhoneNumber($(this).val());
    if (numError === 0) customRefValidity("#phoneNumber");
    else if (numError === 1)
      customRefValidity("#phoneNumber", "PhoneNumber must not contain space");
    else if (numError === 2)
      customRefValidity(
        "#phoneNumber",
        "PhoneNumber must contain only numbers"
      );
    else if (numError === 3)
      customRefValidity("#phoneNumber", "PhoneNumber must not start with 0");
    else if (numError === 4)
      customRefValidity(
        "#phoneNumber",
        "PhoneNumber must be have 10 characters long"
      );
  });
});

function customRefValidity(name, value = "") {
  $(`${name}`).get(0).setCustomValidity(value);
  $(`${name}`).get(0).reportValidity();
}

function checkPassword(password) {
  return password.length > 5;
}

function checkUpperCaseFirstLetter(name) {
  let splitName = name.split(" ");
  for (let i = 0; i < splitName.length; i++) {
    if (splitName[i].charAt(0).toUpperCase() !== splitName[i].charAt(0)) {
      return false;
    }
  }
  return true;
}

function checkPhoneNumber(name) {
  if (name.indexOf(" ") > 0) return 1;
  if (!/^[0-9]*$/.test(name)) return 2;
  if (name.charAt(0) != "0") return 3;
  if (name.length != 10) return 4;
  return 0;
}
