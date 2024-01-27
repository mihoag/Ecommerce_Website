$("#payment-time-filter").daterangepicker({
  timePicker: true,
  timePicker24Hour: true,
  timePickerIncrement: 30,
  autoApply: true,
  ranges: {
    Today: [moment().startOf("day"), moment().endOf("day")],
    Yesterday: [
      moment().startOf("day").subtract(1, "days"),
      moment().endOf("day").subtract(1, "days"),
    ],
    "Last 7 Days": [moment().startOf("day").subtract(6, "days"), moment()],
    "Last 30 Days": [moment().startOf("day").subtract(29, "days"), moment()],
    "This Month": [moment().startOf("month"), moment().endOf("month")],
    "Last Month": [
      moment().subtract(1, "month").startOf("month"),
      moment().subtract(1, "month").endOf("month"),
    ],
  },
  startDate: "01/01/2023",
  endDate: "28/01/2024",
  minDate: "01/01/2023",
  maxDate: "01/31/2024",
  locale: {
    format: "DD/MM/YYYY hh:mm A",
  },
});

$("#adds-time-filter").daterangepicker({
  timePicker: true,
  timePicker24Hour: true,
  timePickerIncrement: 30,
  autoApply: true,
  ranges: {
    Today: [moment().startOf("day"), moment().endOf("day")],
    Yesterday: [
      moment().startOf("day").subtract(1, "days"),
      moment().endOf("day").subtract(1, "days"),
    ],
    "Last 7 Days": [moment().startOf("day").subtract(6, "days"), moment()],
    "Last 30 Days": [moment().startOf("day").subtract(29, "days"), moment()],
    "This Month": [moment().startOf("month"), moment().endOf("month")],
    "Last Month": [
      moment().subtract(1, "month").startOf("month"),
      moment().subtract(1, "month").endOf("month"),
    ],
  },
  startDate: "01/01/2023",
  endDate: "28/01/2024",
  minDate: "01/01/2023",
  maxDate: "01/31/2024",
  locale: {
    format: "DD/MM/YYYY hh:mm A",
  },
});

$("#payment-time-filter").on("change", function () {
  const date = $("#payment-time-filter").val().split(" - ");
});

function PaymentChangePage(event) {
  GetPaymentsPage(event.currentTarget.innerText);
}

async function GetPaymentsPage(pageNum) {
  const search = document.getElementById("searchPayment").value;
  const timeFilter = document
    .getElementById("payment-time-filter")
    .value.split(" - ");
  let startDate = moment(`${timeFilter[0]}`, "DD/MM/YYYY hh:mm A")
    .toDate()
    .toISOString();
  let endDate = moment(`${timeFilter[1]}`, "DD/MM/YYYY hh:mm A")
    .toDate()
    .toISOString();
  try {
    const response = await fetch(
      `/admin/transactions/getPaymentTransactions?search=${search}&start=${startDate}&end=${endDate}&page=${pageNum}`
    );
    if (response.ok) {
      const payments = await response.json();
      RenderPayments(payments);
    }
  } catch (error) {
    console.log(error);
  }
}

function RenderPayments(payments) {
  const tbody = document.getElementById("payments-list");
  tbody.innerHTML = "";
  for (const tran of payments.trans) {
    tbody.innerHTML += `
        <tr>
                                                    <td>#${tran.idgiaodich}</td>
                                                    <td>${tran.username1}</td>
                                                    <td
                                                        class="text-center fw-bolder">${convertToVND(
                                                          tran.sotien
                                                        )}</td>
                                                    <td
                                                        class="text-center"><span
                                                            class="fw-bolder">${
                                                              tran.ngaygio
                                                            }</span></td>
                                                    <td
                                                        class="text-center"><span
                                                            class="fw-bolder">#${
                                                              tran.idhoadon
                                                            }</span></td>
                                                </tr>
        
        `;
  }
  renderPaging('payments-page-list', payments.pages, payments.page, 'PaymentChangePage');
}

function renderPaging(id, pages, page, functionName) {
  const list = document.getElementById(id);
  list.innerHTML = "";
  for (let i = 1; i <= pages; i++) {
    list.innerHTML += `
        <li class="page-item"><a
                                                        class="page-link paging-btn ${
                                                          i == page
                                                            ? "active"
                                                            : ""
                                                        }" onclick="${functionName}(event)"
                                                        href="#">${i}</a>
        `;
  }
}

function convertToVND(number) {
  // Using toLocaleString to format the number as currency in VND
  let vndFormatted = number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return vndFormatted;
}

function AddsChangePage(event) {
    GetAddsPage(event.currentTarget.innerText);
}

async function GetAddsPage(pageNum) {
    const search = document.getElementById("searchPayment").value;
    const timeFilter = document
      .getElementById("adds-time-filter")
      .value.split(" - ");
    let startDate = moment(`${timeFilter[0]}`, "DD/MM/YYYY hh:mm A")
      .toDate()
      .toISOString();
    let endDate = moment(`${timeFilter[1]}`, "DD/MM/YYYY hh:mm A")
      .toDate()
      .toISOString();
    try {
      const response = await fetch(
        `/admin/transactions/getAddMoneyTransactions?search=${search}&start=${startDate}&end=${endDate}&page=${pageNum}`
      );
      if (response.ok) {
        const payments = await response.json();
        RenderAddMoney(payments);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  function RenderAddMoney(payments) {
    const tbody = document.getElementById("adds-list");
    tbody.innerHTML = "";
    for (const tran of payments.trans) {
      tbody.innerHTML += `
          <tr>
                                                      <td>#${tran.idgiaodich}</td>
                                                      <td>${tran.username}</td>
                                                      <td
                                                          class="text-center fw-bolder">${convertToVND(
                                                            tran.sotiennap
                                                          )}</td>
                                                      <td
                                                          class="text-center"><span
                                                              class="fw-bolder">${
                                                                tran.ngaygio
                                                              }</span></td>
                                                  </tr>
          
          `;
    }
    renderPaging('adds-pages-list', payments.pages, payments.page, 'AddsChangePage');
  }