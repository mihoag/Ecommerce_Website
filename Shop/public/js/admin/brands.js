var chart;
var currentId = null;
async function chartView(id) {
  id = parseInt(id);
  const res = await fetch(`/admin/brands/${id}`, {
    method: "GET"
  })

  const response = await res.json();
  let data = [];
  for (let i = 0; i < 12; i++) data.push(0);
  response.forEach(element => {
    data[element.month - 1] = parseInt(element.sum) || 0;
  });

  var ctx1 = document.getElementById("chart-line").getContext("2d");

  var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

  gradientStroke1.addColorStop(1, "rgba(94, 114, 228, 0.2)");
  gradientStroke1.addColorStop(0.2, "rgba(94, 114, 228, 0.0)");
  gradientStroke1.addColorStop(0, "rgba(94, 114, 228, 0)");
  if (chart) chart.destroy();

  chart = new Chart(ctx1, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Phones sales",
          tension: 0.4,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: "#5e72e4",
          backgroundColor: gradientStroke1,
          borderWidth: 3,
          fill: true,
          data: data,
          maxBarThickness: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            padding: 10,
            color: "#fbfbfb",
            font: {
              size: 11,
              family: "Open Sans",
              style: "normal",
              lineHeight: 2,
            },
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            color: "#ccc",
            padding: 20,
            font: {
              size: 11,
              family: "Open Sans",
              style: "normal",
              lineHeight: 2,
            },
          },
        },
      },
    },
  });
}

function changeTypeId(btn) {
  currentId = $(btn).data("id")
  chartView(currentId);
}

document.addEventListener("DOMContentLoaded", async function () {
  const btn = document.querySelectorAll('.tabBtn')[0];
  btn.classList.add('active');
  document.querySelectorAll('.tab-pane')[0].classList.add('active');
  currentId = $(btn).data("id")
  chartView(currentId);
})

async function addBrandClick() {
  let name = document.getElementById('brandName').value;
  name = name.replace(/\s+/g, '');
  if (name.length <= 0) {
    alert('Tên không được rỗng!')
    return;
  }
  // add new brand
  const res = await fetch(`/admin/brands/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ brand: name })
  })

  const response = await res.json();
  if (res.status === 200) {
    $('#addBrandModal').modal('hide');
    showToast(response.message + '. Refresh sau 2 giây', 'bg-success');
    setTimeout(() => {
      window.location.reload();
    }, 2000)
  } else {
    showToast(response.message || "Có lỗi xảy ra hãy thử lại sau!");
  }
}

async function deleteBtn() {
  // add new brand
  const res = await fetch(`/admin/brands/${currentId}`, {
    method: "DELETE"
  })
  const response = await res.json();
  if (res.status === 200) {
    showToast(response.message + '. Refresh sau 2 giây', 'bg-success');
    setTimeout(() => {
      window.location.reload();
    }, 2000)
  } else {
    showToast(response.message || "Có lỗi xảy ra hãy thử lại sau!");
  }
}

async function editBrandClick() {
  let name = document.getElementById('brandNameN').value;
  name = name.replace(/\s+/g, '');
  if (name.length <= 0) {
    alert('Tên không được rỗng!')
    return;
  }

  // edit name brand
  const res = await fetch(`/admin/brands/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ typeId: currentId, name: name })
  })

  const response = await res.json();
  if (res.status === 200) {
    $('#editBrandModal').modal('hide');
    showToast(response.message + '. Refresh sau 2 giây', 'bg-success');
    setTimeout(() => {
      window.location.reload();
    }, 2000)
  } else {
    showToast(response.message || "Có lỗi xảy ra hãy thử lại sau!");
  }
}

function showName() {
  const btn = document.querySelectorAll('.tabBtn');
  btn.forEach(e => {
    const id = $(e).data("id")
    if (id === currentId) {
      const name = $(e).data("bsTarget").slice(1)
      document.getElementById('brandNameO').value = name
      document.getElementById('brandNameN').value = name
      return;
    }
  })

}