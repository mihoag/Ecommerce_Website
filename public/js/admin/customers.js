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
