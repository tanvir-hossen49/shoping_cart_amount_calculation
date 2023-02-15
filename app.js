window.onload = () => {
  main();
  getSubTotal();
};

let cloneProductItem = [];

// main function
function main() {
  // event listener
  const eventListener = () => {
    document.querySelectorAll(".plus-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        updateInputField(button, true);
      });
    });
    document.querySelectorAll(".minus-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        updateInputField(button, false);
      });
    });

    document.querySelectorAll(".input-field").forEach((input) => {
      input.addEventListener("click", (e) => {
        const productAmount = input.parentElement.nextElementSibling.lastChild;
        const value = parseInt(e.target.value);
        updateAmount(value, productAmount);
      });
    });

    document.querySelectorAll(".input-field").forEach((input) => {
      input.addEventListener("keyup", (e) => {
        const productAmount = input.parentElement.nextElementSibling.lastChild;
        const value = parseInt(e.target.value);
        updateAmount(value, productAmount);
      });
    });

    document.querySelectorAll(".remove-item").forEach((element) => {
      element.addEventListener("click", (e) => {
        let productItem = element.parentElement.parentElement.parentElement;
        cloneProductItem.push(productItem.cloneNode(true));
        productItem.remove();
        getSubTotal();
      });
    });
  };
  eventListener();
  document.querySelector(".btn-undo").addEventListener("click", (e) => {
    if (cloneProductItem.length !== 0) {
      const cartContainer = document.querySelector(".cart-container");
      cartContainer.prepend(cloneProductItem[cloneProductItem.length - 1]);
      cloneProductItem.pop();
      getSubTotal();
      eventListener();
    } else {
      alert("No items here");
    }
  });
}

//update input filed by clicking button
const updateInputField = (button, isTrue) => {
  let productPriceEle = button.parentElement.nextElementSibling.lastChild;

  if (isTrue) {
    const input = button.previousElementSibling;
    let inputValue = parseInt(input.value);
    input.value = inputValue + 1;
    updateAmount(inputValue + 1, productPriceEle);
  } else {
    let input = button.nextElementSibling;
    if (input.value > 0) {
      let inputValue = parseInt(input.value);
      input.value = inputValue - 1;
      updateAmount(inputValue - 1, productPriceEle);
    }
  }
};

//update amount of product
const updateAmount = (inputFieldValue, productPriceEle) => {
  let amount = parseInt(productPriceEle.getAttribute("data-value"));
  productPriceEle.innerText = inputFieldValue * amount;
  getSubTotal();
};

// get sub total amount
const getSubTotal = () => {
  const priceElements = document.querySelectorAll("[data-value]");
  const subtotal = document.getElementById("subtotal-value");
  let sum = 0;
  for (let element of priceElements) {
    if (element.innerText == "NaN") {
      element.innerText = 0;
      element = 0;
    } else {
      element = parseInt(element.innerText);
    }
    sum += element;
  }
  subtotal.innerText = sum;
  finalResult(sum);
};

//calculation total value
const finalResult = (subTotal) => {
  const taxEl = document.getElementById("tax");
  const total = document.getElementById("total-value");

  taxEl.innerText = Math.round(subTotal * 0.1);
  total.innerText = subTotal + parseInt(taxEl.innerText);
};
