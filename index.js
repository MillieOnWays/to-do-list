const itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

document.querySelector("#item").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const item = document.querySelector("#item");
    createItem(item);
  }
});

window.onload = function () {
  displayDate();
  displayItems();
};

function displayDate() {
  let date = new Date();
  //   console.log(date);
  date = date.toString().split(" ");
  document.getElementById(
    "date"
  ).textContent = ` ${date[1]} ${date[2]}, ${date[3]} (${date[0]})`;
}

document.querySelector("#add-task-btn").addEventListener("click", () => {
  const item = document.getElementById("item");
  createItem(item);
});

function createItem(item) {
  itemsArray.push(item.value);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function displayItems() {
  for (let i = 0; i < itemsArray.length; i++) {
    document.querySelector(".to-do-list").innerHTML += `
      <div class="item">
         <div class="input-controller">
              <textarea disabled>${itemsArray[i]}</textarea> 
            
              <div class="edit-controller">
                <i class="fas fa-check-square checkIcon"></i>
                <i class="fa-solid fa-pen-to-square editBtn"></i>
                <i class="fas fa-trash deleteBtn"></i>
              </div>
         </div>
         <div class="update-controller">
               <button class="saveBtn">Save</button>
               <button class="cancelBtn">Cancel</button>
         </div>
      </div>`;
  }
  checkItem();
  deleteBtn();
  editBtn();
  saveUpdatedBtn();
  cancelBtn();
}

function checkItem() {
  const checkIcon = document.querySelectorAll(".checkIcon");
  const inputs = document.querySelectorAll(".input-controller textarea");
  checkIcon.forEach((cI, i) => {
    cI.addEventListener("click", () => {
      checkIcon[i].style.color = "limegreen";
      inputs[i].style.textDecoration = "line-through";
    });
  });
}

function deleteBtn() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((dB, i) => {
    dB.addEventListener("click", () => {
      deleteItem(i);
    });
  });
}

function deleteItem(i) {
  itemsArray.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function editBtn() {
  const editBtn = document.querySelectorAll(".editBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  editBtn.forEach((eB, i) => {
    eB.addEventListener("click", () => {
      updateController[i].style.display = "block";
      inputs[i].disabled = false;
    });
  });
}

function saveUpdatedBtn() {
  const saveBtn = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  saveBtn.forEach((sB, i) => {
    sB.addEventListener("click", () => {
      updateItem(inputs[i].value, i);
    });
  });
}

function updateItem(text, i) {
  itemsArray[i] = text;
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function cancelBtn() {
  const cancelBtn = document.querySelectorAll(".cancelBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  cancelBtn.forEach((cB, i) => {
    cB.addEventListener("click", () => {
      updateController[i].style.display = "none";
      inputs[i].disabled = true;
      inputs[i].style.border = "none";
    });
  });
}
