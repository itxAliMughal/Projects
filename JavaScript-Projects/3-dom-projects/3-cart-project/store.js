const shopItemBtn = document.querySelectorAll(".shop-item-button");
const itemCollectDiv = document.querySelector(".cart-items");
const purchaseButton = document.querySelector(".btn-purchase");

shopItemBtn.forEach(function (singleButton) {
  singleButton.addEventListener("click", addtoCardBtnHandler)
});
    
function addtoCardBtnHandler(event) {
    event.preventDefault();
    const currentElement = event.target;
    const mainShopItemDiv = currentElement.parentElement.parentElement;
    const itemTitle = mainShopItemDiv.querySelector(".shop-item-title").innerText;
    const itemImage = mainShopItemDiv.querySelector(".shop-item-image").src;
    const itemPrice = mainShopItemDiv.querySelector(".shop-item-price").innerText;

    // console.log(mainShopItemDiv);
    // console.log(itemTitle);
    // console.log(itemImage);
    // console.log(itemPrice);

    const cartItemNames = document.querySelectorAll(".cart-item-title");
    let isCartItemAlreadyExist = false;

    if (cartItemNames.length > 0) {
      cartItemNames.forEach(function (singleItem) {
        if (singleItem.innerText == itemTitle) {
          isCartItemAlreadyExist = true;
        };
      });
    }

    if (isCartItemAlreadyExist) {
      alert("This item is already exist in our cart");
      return;
    };

    
    itemCollectDiv.innerHTML += `<div class="cart-row">
    <div class="cart-item cart-column">
        <img class="cart-item-image" src=${itemImage} width="100" height="100">
        <span class="cart-item-title">${itemTitle}</span>
    </div>
    <span class=" cart-column">$ <span class="cart-price-item-item">${itemPrice}</span></span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger btn-remove" type="button">REMOVE</button>
    </div>
</div>`

deleteItems();
updateCartTotal();
bindAllCartQuantityInputField();

};

function deleteItems() {
  const cartItemRemoveBtn = document.querySelectorAll(".btn-remove");
  cartItemRemoveBtn.forEach(function (singleButton) {
    singleButton.addEventListener("click", removeHandler)
  });
};

function removeHandler(event) {
  event.preventDefault();
  const currentElement = event.target;
  if (confirm("Are You Sure ?")) {
    currentElement.parentElement.parentElement.remove();
    updateCartTotal()
  };
};

function updateCartTotal() {
  const allCartItemPrices = document.querySelectorAll(".cart-price-item-item");
  let cartTotal = 0;

  allCartItemPrices.forEach(function (singleItemPrice) {
    const cartRow = singleItemPrice.parentElement.parentElement;
    const cartQuantityField = cartRow.querySelector(".cart-quantity-input");

    cartTotal += parseFloat(singleItemPrice.innerText) * cartQuantityField.value;
  });

  const cartTotalElementSelect = document.querySelector(".cart-total-price");

  cartTotalElementSelect.innerHTML = `$ ${cartTotal.toFixed(2)}`;
  // console.log(cartTotal.toFixed(2), "cartTotal");
};

function bindAllCartQuantityInputField() {
  const allCartQuantityFields = document.querySelectorAll(".cart-quantity-input");

  allCartQuantityFields.forEach(function (singleInputField) {
    singleInputField.removeEventListener("change", cartQuantityChangeHandler)
    singleInputField,addEventListener("change", cartQuantityChangeHandler)
  });
}

function cartQuantityChangeHandler(event) {
  const currentElement = event.target;

  if (currentElement.value <= 0) {
    currentElement.value = 1
  };
  updateCartTotal();
}

purchaseButton.addEventListener("click", purchaseButtonHandler);

function purchaseButtonHandler(event) {
  event.preventDefault();
  
  if (itemCollectDiv.children.length > 0) {
  if (confirm("Are you confirm that you wish to purchase these items")) {
    itemCollectDiv.innerHTML = "";
    updateCartTotal();
    alert("you have purchased successfully!");
  }
} else {
  alert("Your cart is empty. Add items before purchasing.");
}
};

