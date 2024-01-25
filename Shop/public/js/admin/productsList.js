function listCheckAll(event) {
  const check = event.target.checked;
  const items = document.querySelectorAll(".list-check");
  items.forEach(function (item) {
    if (!item.closest(".item").classList.contains("hidden")) {
      item.checked = check;
    }
  });
}

async function addList() {
  const listItems = document.querySelectorAll("tr.item");
  var countList = 0;
  var countHome = 0;
  var items = [];
  var home = [];
  listItems.forEach((item) => {
    if (item.querySelector(".list-check").checked) {
      countList++;
      items.push(item.id);
    }
    if (item.querySelector(".home-check").checked) {
      countHome++;
      home.push(item.id);
    }
  });
  if (countList < 10) {
    alert("Danh mục cần tối thiểu 10 sản phẩm");
    return;
  }
  if (countHome != 5) {
    alert("Danh mục gồm 5 sản phẩm tiêu biểu");
    return;
  }
  const listName = document.getElementById("listName").value;
  if (!listName) {
    alert("Tên danh mục không được để trống");
    return;
  }
  let data = {
    name: listName,
    items: items,
    home: home,
    color1: document.getElementById("c1").value,
    color2: document.getElementById("c2").value,
  };

  try {
    const response = await fetch("/admin/products-list/add", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    const rs = await response.json();
    alert(rs);
    if (response.status === 200) {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}

const searchItem = document.getElementById("search-name");
searchItem.addEventListener("input", Searching);
async function Searching(e) {
  const searchTerm = searchItem.value.toLowerCase();
  const items = document.querySelectorAll("tr.item");
  items.forEach((item) => {
    const itemName = item
      .querySelector("td:nth-child(2)")
      .textContent.toLowerCase();
    if (itemName.includes(searchTerm)) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });
  var count1 = 0;
  var count2 = 0;
  const listChecks = document.querySelectorAll(".list-check");
  for (const item of listChecks) {
    if(!item.closest(".item").classList.contains("hidden")) {
      count1++;
    }
    if(item.checked) {
      count2++;
    }
  }
  if (count1 == count2) {
    document.getElementById("list-check-all").checked = true;
  } else {
    document.getElementById("list-check-all").checked = false;
  }
}
$(function () {
  $("#sortableList").sortable({
    stop: async function (event, ui) {
      await sortLists();
    },
  });
});

async function sortLists() {
  const lists = document.querySelectorAll(".khungSanPham");
  const data = [];
  lists.forEach((list, index) => {
    data.push({ listId: list.id, sort: index + 1 });
  });

  try {
    const response = await fetch("/admin/products-list/sort", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
}

function showListItems(event) {
  var listSpTrongKhung = event.target
    .closest(".khungSanPham")
    .querySelector(".listSpTrongKhung");
  listSpTrongKhung.classList.toggle("hidden");
  const btn = event.target.closest(".btn");
  if (listSpTrongKhung.classList.contains("hidden")) {
    btn.innerHTML = `<i class="ace-icon fa fa-eye bigger-120"></i>`;
  } else {
    btn.innerHTML = `<i class="ace-icon fa fa-eye-slash bigger-120"></i>`;
  }
}

async function sortItemsList(event) {
  try {
    const response = await fetch(
      `/admin/products-list/sort-items-list?type=${event.target.value}`
    );
    const rs = await response.json();
    if (response.status === 200) {
      await renderItemsList(rs);
      Searching();
    }
  } catch (error) {
    console.log(error);
  }
}

async function getTypeNames() {
  const response = await fetch("/type/all");
  const data = await response.json();
  return data;
}

async function renderItemsList(data) {
  const productsList = document.querySelector("#products-list");
  productsList.innerHTML = "";
  const typeNames = await getTypeNames();
  data.forEach((item) => {
    let typeName = "";
    typeNames.forEach((type) => {
      if (type.typeId == item.typeId) {
        typeName = type.name;
      }
    });
    productsList.innerHTML += `
    <tr class="item"
    id="${item.productId}">
    <th
        scope="row"><input
            class="form-check-input list-check"
            type="checkbox"></th>
    <td>${item.name}</td>
    <td>${typeName}</td>
    <td>${item.releaseDate}</td>
    <td
        class="text-center">${item.price}</td>
    <td
        class="text-center">${item.discount}%</td>
    <td
        class="text-center">${item.giagiam}</td>
    <th scope="col"
        width="5%"
        class="text-center"><input
            class="form-check-input home-check"
            type="checkbox"></th>
</tr>
    `;
  });
  document.getElementById("list-check-all").checked = false;
}

document.addEventListener("DOMContentLoaded", function () {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const itemId = this.closest(".khungSanPham").id;
      const confirmDeleteButton = document.getElementById(
        "confirmDeleteButton"
      );
      confirmDeleteButton.dataset.itemId = itemId;
    });
  });

  const confirmDeleteButton = document.getElementById("confirmDeleteButton");
  confirmDeleteButton.addEventListener("click", function () {
    const itemId = this.dataset.itemId;
    deleteList(itemId);
    const confirmDeleteModal = new bootstrap.Modal(
      document.getElementById("confirmDeleteModal")
    );
    confirmDeleteModal.hide();
  });

  async function deleteList(itemId) {
    try {
      const response = await fetch("/admin/products-list/delete", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ listId: itemId }),
      });
      const rs = await response.json();
      alert(rs);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }
});

let updatingList;
let updatingHome;
async function ActiveUpdateMode(event) {
  const id = event.currentTarget.getAttribute("btnid");
  document.querySelector(".update-list-btn").setAttribute("btnid", id);
  try {
    const response = await fetch(
      `/admin/products-list/get-list-update?id=${id}`
    );
    const rs = await response.json();
    if (rs) {
      const name = document.getElementById("update-list-name");
      const c1 = document.getElementById("uc1");
      const c2 = document.getElementById("uc2");
      name.value = rs.name;
      c1.value = rs.color1;
      c2.value = rs.color2;
      name.style.backgroundImage = `linear-gradient(120deg, ${rs.color1} 0%, ${rs.color2} 50%, ${rs.color1} 100%)`;
      updatingList = rs.items;
      updatingHome = rs.home;
      renderCheckUpdateList(rs.items, rs.home);
    }
  } catch (error) {
    console.log(error);
  }
}

function renderCheckUpdateList(list, home) {
  const listItems = document.querySelectorAll("tr.update-item");
  if (listItems.length == list.length) {
    document.getElementById("update-list-check-all").checked = true;
  }
  listItems.forEach((item) => {
    if (list.includes(Number(item.id))) {
      item.querySelector(".update-list-check").checked = true;
    }
    if (home.includes(Number(item.id))) {
      item.querySelector(".update-home-check").checked = true;
    }
  });
}

function UpdateListCheckAll(event) {
  const check = event.target.checked;
  const items = document.querySelectorAll(".update-list-check");
  items.forEach(function (item) {
    if (!item.closest(".update-item").classList.contains("hidden")) {
      item.checked = check;
    }
  });
}

async function updateList() {
  const listItems = document.querySelectorAll("tr.update-item");
  var countList = 0;
  var countHome = 0;
  var items = [];
  var home = [];
  listItems.forEach((item) => {
    if (item.querySelector(".update-list-check").checked) {
      countList++;
      items.push(item.id);
    }
    if (item.querySelector(".update-home-check").checked) {
      countHome++;
      home.push(item.id);
    }
  });
  if (countList < 10) {
    alert("Danh mục cần tối thiểu 10 sản phẩm");
    return;
  }
  if (countHome != 5) {
    alert("Danh mục gồm 5 sản phẩm tiêu biểu");
    return;
  }
  const listName = document.getElementById("update-list-name").value;
  if (!listName) {
    alert("Tên danh mục không được để trống");
    return;
  }
  let data = {
    name: listName,
    items: items,
    home: home,
    color1: document.getElementById("uc1").value,
    color2: document.getElementById("uc2").value,
  };
  data.listId = event.currentTarget.getAttribute("btnid");
  try {
    const response = await fetch("/admin/products-list/update", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    const rs = await response.json();
    alert(rs);
    if (response.status === 200) {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}

const updateSearchItem = document.getElementById("update-search-name");
updateSearchItem.addEventListener("input", UpdateSearching);
async function UpdateSearching(e) {
  const searchTerm = updateSearchItem.value.toLowerCase();
  const items = document.querySelectorAll("tr.update-item");
  items.forEach((item) => {
    const itemName = item
      .querySelector("td:nth-child(2)")
      .textContent.toLowerCase();
    if (itemName.includes(searchTerm)) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });

  var count1 = 0;
  var count2 = 0;
  const listChecks = document.querySelectorAll(".update-list-check");
  for (const item of listChecks) {
    if(!item.closest(".update-item").classList.contains("hidden")) {
      count1++;
    }
    if(item.checked) {
      count2++;
    }
  }
  if (count1 == count2) {
    document.getElementById("update-list-check-all").checked = true;
  } else {
    document.getElementById("update-list-check-all").checked = false;
  }
}
async function UpdateSortItemsList(event) {
  try {
    const response = await fetch(
      `/admin/products-list/sort-items-list?type=${event.target.value}`
    );
    const rs = await response.json();
    if (response.status === 200) {
      await renderUpdateItemsList(rs);
      renderCheckUpdateList(updatingList, updatingHome);
      UpdateSearching();
    }
  } catch (error) {
    console.log(error);
  }
}

async function renderUpdateItemsList(data) {
  const productsList = document.querySelector("#update-products-list");
  productsList.innerHTML = "";
  const typeNames = await getTypeNames();
  data.forEach((item) => {
    let typeName = "";
    typeNames.forEach((type) => {
      if (type.typeId == item.typeId) {
        typeName = type.name;
      }
    });
    productsList.innerHTML += `
    <tr class="update-item"
    id="${item.productId}">
    <th
        scope="row"><input
            class="form-check-input update-list-check"
            type="checkbox"></th>
    <td>${item.name}</td>
    <td>${typeName}</td>
    <td>${item.releaseDate}</td>
    <td
        class="text-center">${item.price}</td>
    <td
        class="text-center">${item.discount}%</td>
    <td
        class="text-center">${item.giagiam}</td>
    <th scope="col"
        width="5%"
        class="text-center"><input
            class="form-check-input update-home-check"
            type="checkbox"></th>
</tr>
    `;
  });
}

document.getElementById("c1").addEventListener("input", updateGradient);
document.getElementById("c2").addEventListener("input", updateGradient);

function updateGradient() {
  var c1 = document.getElementById("c1").value;
  var c2 = document.getElementById("c2").value;
  var listName = document.getElementById("listName");
  listName.style.backgroundImage = `linear-gradient(120deg, ${c1} 0%, ${c2} 50%, ${c1} 100%)`;
}

document.getElementById("uc1").addEventListener("input", updateGradient2);
document.getElementById("uc2").addEventListener("input", updateGradient2);

function updateGradient2() {
  var c1 = document.getElementById("uc1").value;
  var c2 = document.getElementById("uc2").value;
  var listName = document.getElementById("update-list-name");
  listName.style.backgroundImage = `linear-gradient(120deg, ${c1} 0%, ${c2} 50%, ${c1} 100%)`;
}
