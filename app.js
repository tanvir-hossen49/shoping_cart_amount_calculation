window.onload = () => {
  main();
  getTotal();
};

// main function
function main() {
  document.querySelectorAll(".plus-btn").forEach((ele) => {
    ele.addEventListener("click", (e) => {
      updateInputField(ele, true);
    });
  });
  document.querySelectorAll(".minus-btn").forEach((ele) => {
    ele.addEventListener("click", (e) => {
      updateInputField(ele, false);
    });
  });
}

/* 
==================
EVENT HANDLER
==================
*/
//update input filed by clicking button
const updateInputField = (e, isTrue) => {
  let ele = e.parentElement.nextElementSibling.lastChild;
  if (isTrue) {
    const input = e.previousElementSibling;
    let inputValue = parseInt(input.value);
    input.value = inputValue + 1;
    updateAmount(inputValue + 1, ele);
  } else {
    let input = e.nextElementSibling;
    if (input.value > 0) {
      let inputValue = parseInt(input.value);
      input.value = inputValue - 1;
      updateAmount(inputValue - 1, ele);
    }
  }
};

//update amount of product
const updateAmount = (quatity, ele) => {
  let amount = parseInt(ele.getAttribute("data-value"));
  ele.innerText = quatity * amount;
  getTotal();
};

// get total amount
const getTotal = () => {
  let totalValue = document.querySelectorAll("[data-value]");
  let totalPrice = document.getElementById("total-value");
  let sum = 0;
  for (let ele of totalValue) {
    ele = parseFloat(ele.innerText);
    sum += ele;
  }
  totalPrice.innerText = sum;
};
