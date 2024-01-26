let chart;
function viewChart(options) {
  let labels = [];
  let revenueSet = [];
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
    year: options.year,
  };
  //----

  const ctx = document.getElementById("chart-line");
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    data: {
      labels: labels,
      datasets: [
        {
          type: "bar",
          label: "Doanh thu",
          backgroundColor: "#369FFF",
          data: revenueSet,
          borderWidth: 1,
        },
        {
          type: "bar",
          label: "Lợi nhuận",
          backgroundColor: "#FFA732",
          data: profitSet,
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: `Doanh thu trong tháng ${options.month} năm ${options.year}`,
          color: "#161A30",
          font: { size: 40 },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "VNĐ",
            color: "#EF4040",
            font: {
              family: "Times",
              size: 30,
              style: "normal",
              lineHeight: 1.2,
            },
          },
        },
        x: {
          title: {
            display: true,
            text: "Ngày",
            color: "#161A30",
            font: {
              size: 25,
            },
          },
        },
      },
    },
  });
}

async function showViewChart(month, year, lastDayOfMonth) {
  filterMonth = month;
  filterYear = year;
  const res = await fetch(`/admin/statistics/revenue/${month}/${year}`, {
    method: "GET",
  });

  const response = await res.json();
  //get last day in this month
  viewChart({
    lastDayOfMonth,
    data: response,
    month,
    year,
  });
}

var today = new Date();
var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
lastDayOfMonth = today.getDate();

showViewChart(today.getMonth() + 1, today.getFullYear(), lastDayOfMonth);
