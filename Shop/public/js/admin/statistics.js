
//export excel file

var filterMonth;
var filterYear;
let chart;
let donutChart;
function convertToVND(number) {
  // Using toLocaleString to format the number as currency in VND
  number = parseInt(number);
  let vndFormatted = number.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });

  return vndFormatted.replace("₫", "VNĐ");
}

var dataSetExport;
function exportExcel() {

  month = dataSetExport.month;
  year = dataSetExport.year;
  let data = [];
  for (let i = 0; i < dataSetExport.labels.length; i++)
    if (dataSetExport.revenueSet[i] > 0)
      data.push({
        "Ngày": `${dataSetExport.labels[i]}/${month}/${year}`,
        "Doanh thu": convertToVND(dataSetExport.revenueSet[i]),
        "Lợi nhuận": convertToVND(dataSetExport.profitSet[i]),
      })
  if (data.length <= 0) {
    alert(`Tháng ${month} năm ${year} hiện Không có dữ liệu`);
    return;
  }
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  var wscols = [
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
  ];
  var wsrows = [
    { hpx: 30 },
  ];
  worksheet['!cols'] = wscols;
  worksheet['!rows'] = wsrows;

  for (i in worksheet) {
    if (typeof (worksheet[i]) != "object") continue;
    let cell = XLSX.utils.decode_cell(i);
    worksheet[i].s = {      // set the style for target cell
      font: {
        name: "Calibri",
        sz: 14,
      },
      alignment: {
        horizontal: "center",
        vertical: "center",
      },
      border: {
        right: {
          style: "thin",
          color: "000000"
        },
        left: {
          style: "thin",
          color: "000000"
        },
        top: {
          style: "thin",
          color: "000000"
        },
        bottom: {
          style: "thin",
          color: "000000"
        },
      }
    };
    if (cell.r == 0) {
      worksheet[i].s.font = {
        name: "Calibri",
        sz: 16,
        color: { rgb: "FFFFFF" },
        bold: true
      }
    }
    else if (cell.c > 1) {
      worksheet[i].s.alignment = {
        horizontal: "center",
      }
    }
    if (cell.r % 2 == 0) { // every other row
      if (cell.r > 0) {
        worksheet[i].s.fill = { // background color
          patternType: "solid",
          fgColor: { rgb: "B6C4B6" },
          bgColor: { rgb: "B6C4B6" }
        }
      }
      else {
        worksheet[i].s.fill = { // background color
          patternType: "solid",
          fgColor: { rgb: "508D69" },
          bgColor: { rgb: "508D69" }
        };
      }
    }
  }
  XLSX.utils.book_append_sheet(workbook, worksheet, "Thống kê doanh thu");

  XLSX.writeFile(workbook, `Thống kê doanh thu tháng ${month} năm ${year}.xlsx`, { cellStyles: true });
}

function LineChart(options) {
  let daySet = [];
  let revenueSet = [];
  let profitSet = [];

  for (let i = 0; i <= 6; i++) {
    let lastday = new Date(
      options.today.setDate(options.today.getDate() - options.today.getDay() + i),
    );
    daySet.push(lastday.getDate());
    revenueSet.push(0);
    profitSet.push(0);
  }
  for (let i = 0; i < options.data.length; i++) {
    revenueSet[daySet.indexOf(parseInt(options.data[i].day))] = options.data[i].sum;
    profitSet[daySet.indexOf(parseInt(options.data[i].day))] = options.data[i].profit;
  }


  const ctx = document.getElementById('myLineChart');
  new Chart(ctx, {
    data: {
      datasets: [{
        type: 'line',
        label: 'Lợi nhuận',
        borderColor: '#FFA732',
        data: profitSet,
      }, {
        type: 'line',
        label: 'Doanh thu',
        borderColor: '#369FFF',
        data: revenueSet,
      }],
      labels: [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
      ]
    },
    options: {
      plugins: {
        title: {
          display: true, text: 'Doanh thu trong tuần này', color: '#161A30', font: { size: 30 }
        }
      }, scales: {
        y:
        {
          beginAtZero: true, title: {
            display: true, text: 'VNĐ', color:
              '#EF4040', font: {
                family: 'Times', size: 20, style: 'normal', lineHeight: 1.2
              },
          }
        }
      }
    }
  });
}

function viewChart(options) {
  let labels = [];
  let revenueSet = []
  let profitSet = [];
  for (let i = 0; i < options.lastDayOfMonth; i++) labels.push(i + 1);
  for (let i = 0; i < options.lastDayOfMonth; i++) {
    profitSet.push(0);
    revenueSet.push(0);
  }
  for (let i = 0; i < options.data.length; i++) {
    revenueSet[parseInt(options.data[i].day) - 1] = options.data[i].sum;
    profitSet[parseInt(options.data[i].day) - 1] = options.data[i].profit;
  }

  //for export excel file
  dataSetExport = {
    labels,
    revenueSet,
    profitSet,
    month: options.month,
    year: options.year
  }
  //---- 

  const ctx = document.getElementById('myChart');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    data: {
      labels: labels,
      datasets: [{
        type: 'bar',
        label: 'Doanh thu',
        backgroundColor: '#369FFF', data: revenueSet, borderWidth: 1
      },
      {
        type: 'bar',
        label: 'Lợi nhuận',
        backgroundColor: '#FFA732', data: profitSet, borderWidth: 1
      }
      ]
    }, options: {
      plugins: {
        title: {
          display: true, text: `Doanh thu trong tháng ${options.month} năm ${options.year}`, color: '#161A30', font: { size: 40 }
        }
      }, scales: {
        y:
        {
          beginAtZero: true, title: {
            display: true, text: 'VNĐ', color:
              '#EF4040', font: {
                family: 'Times', size: 20, style: 'normal', lineHeight: 1.2
              },
          }
        }, x: {
          title: {
            display: true, text: 'Ngày', color: '#161A30', font: {
              size: 25
            }
          }
        }
      }
    }
  });
}

function prevMonthClick() {
  if (filterMonth == 1 && filterYear == 2019) {
    var today = new Date();
    filterMonth = today.getMonth() + 1;
    filterYear = today.getFullYear();
  } else {
    filterMonth -= 1;
    if (filterMonth === 0) {
      filterMonth = 12;
      filterYear -= 1;
    }
  }
  var lastDayOfMonth = new Date(filterYear, filterMonth, 0);
  lastDayOfMonth = lastDayOfMonth.getDate();
  showViewChart(filterMonth, filterYear, lastDayOfMonth);
}
function nextMonthClick() {
  var today = new Date();
  if (today.getFullYear() === filterYear && today.getMonth() + 1 === filterMonth) {
    filterMonth = 1;
    filterYear = 2019;
  } else {
    filterMonth += 1;
    if (filterMonth > 12) {
      filterYear += 1;
      filterMonth = 1;
    }
  }
  var lastDayOfMonth = new Date(filterYear, filterMonth, 0);
  lastDayOfMonth = lastDayOfMonth.getDate();
  showViewChart(filterMonth, filterYear, lastDayOfMonth);
}
async function prevYearClick() {
  let year = $('#Year').text();
  if (year == 'All') {
    year = 2024
  } else year = parseInt(year, 10) - 1;
  if (year == 2018) year = 'All';
  $('#Year').text(year);

  const res = await fetch(`/admin/statistics/top5/${year}`, {
    method: "GET",
  });
  response = await res.json();

  DoughnutChart(response);
}
async function nextYearClick() {
  let year = $('#Year').text();
  if (year == 'All') {
    year = 2019
  } else year = parseInt(year, 10) + 1;
  if (year == 2025) year = 'All';
  $('#Year').text(year);
  const res = await fetch(`/admin/statistics/top5/${year}`, {
    method: "GET",
  });
  response = await res.json();
  DoughnutChart(response);
}


async function showViewChart(month, year, lastDayOfMonth) {
  filterMonth = month;
  filterYear = year;
  const res = await fetch(`/admin/statistics/revenue/${month}/${year}`, {
    method: "GET",
  });

  document.getElementById('MonthYear').innerText = `${month}/${year}`;
  const response = await res.json();
  //get last day in this month
  viewChart({
    lastDayOfMonth,
    data: response,
    month,
    year
  });
}

async function DoughnutChart(options) {
  let labels = [];
  let dataSet = [];

  for (let i = 0; i < Math.min(options.length, 5); i++) {
    labels.push(options[i].name.replace('Điện thoại', ''));
    dataSet.push(options[i].quantity);
  }

  if (options.length == 0) {
    labels.push('Không có dữ liệu');
    dataSet.push(1);
  }

  const data = {
    labels,
    datasets: [{
      label: 'Số lượng bán ra',
      data: dataSet,
      backgroundColor: [
        "#b91d47",
        "#00aba9",
        "#2b5797",
        "#e8c3b9",
        "#1e7145"
      ],
      hoverOffset: 4
    }]
  };

  const ctx = document.getElementById('myPieChart');
  if (donutChart) donutChart.destroy();
  donutChart = new Chart(ctx, {
    type: 'pie',
    data,
    options: {
      plugins: {
        title: {
          display: false, text: 'Top 5 sản phẩm bán chạy', font: { size: 30 }, color: '#161A30'
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", async function () {

  const res = await fetch(`/admin/statistics/top5/all`, {
    method: "GET",
  });
  response = await res.json();

  DoughnutChart(response);

  var today = new Date();
  var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  lastDayOfMonth = today.getDate();

  showViewChart(today.getMonth() + 1, today.getFullYear(), lastDayOfMonth)

  // get week
  const firstday = new Date(
    today.setDate(today.getDate() - today.getDay()),
  );

  // ✅ Get the last day of the current week (Saturday)
  const lastday = new Date(
    today.setDate(today.getDate() - today.getDay() + 6),
  );
  const from = `${firstday.getFullYear()}-${firstday.getMonth() + 1}-${firstday.getDate()} `
  const to = `${lastday.getFullYear()}-${lastday.getMonth() + 1}-${lastday.getDate()} `
  const res1 = await fetch(`/admin/statistics/revenueW/${from}/${to}`, {
    method: "GET",
  });

  const response1 = await res1.json();
  LineChart({
    today,
    data: response1
  });
})