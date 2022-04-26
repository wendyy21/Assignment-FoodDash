
// this function is called when proceed to cart button is clicked
function addFoodToCart() {

    // empty the cart object
    cart = [];

    // loop through each foods object
    for (i = 0; i < foods.length; i++) {

        // get current food quantity
        curfood = parseInt($(`#${foods[i]['foodid']}`).html());

        // if food quantity is > 0, we skip the food or else we add it into the cart
        if (curfood > 0) {

            // create food object for cart
            food = {
                food: foods[i],
                quantity: curfood
            }

            // add food to cart
            cart.push(food);
        }
    }

    // after adding food to cart, we set a sessionstorage variable for the cart object by converting it to JSON
    sessionStorage.setItem("cart", JSON.stringify(cart));
    console.log(sessionStorage.getItem("cart"))
    
    // we check if user has logged in
    login = sessionStorage.getItem("email")

    // if user logged in, we bring them to cart.html or else we bring them to login page
    window.location.href = (login) ? "./html/cart.html":"./html/login.html"
}

// this function is called when user clicks on the (+) button
function addCount(id){

    // here, we read the value of the food quantity and then add 1 to it
    document.getElementById(id).textContent = parseInt( document.getElementById(id).textContent) + 1

    // after that, we call the updateSubtotal() function to update the subtotal at the cart
    updateSubtotal()
}

// this function is called when user clicks on the (-) button
function minusCount(id){

    // here, we read the value of the food quantity and then minus 1 to it, but if the value of the
    // food quantity is not > 1, we remove the food from the cart by calling the function removeFood
    if (parseInt( document.getElementById(id).textContent) > 1)
        document.getElementById(id).textContent = parseInt( document.getElementById(id).textContent) - 1
    else{
        removeFood(id)
    }

    // after that, we call the updateSubtotal() function to update the subtotal at the cart
    updateSubtotal()
}

// this function is called when the food is being removed from the cart
function removeFood(foodid){

    // first, we get the cart object from sessionStorage
    let cart = sessionStorage.getItem("cart");

    // then, we check if the cart object exists
    if (cart !== undefined){

        // we parse the original string cart object to a JSON Object
        cart = JSON.parse(cart)

        // loop each food in the cart
        for (i = 0; i < cart.length; i++) {
            food = cart[i];

            // if the current food matches the foodid, we remove it from the cart
            if (food['food']['foodid'] === foodid){
                cart.splice(i, 1);
            }
        }
    }

    // finally, we set the cart object in sessionStorage to the new cart object
    sessionStorage.setItem("cart", JSON.stringify(cart));

    // we call the populateCart function to refresh the display of the cart
    populateCart();

    // and then we call updateSubtotal function to update the subtotal
    updateSubtotal()
}

// this function is called when user wants to remove all the food in the cart
function removeAllFood(){

    // we set the cart object in sessionStorage to be nothing
    sessionStorage.setItem("cart", "");

    // we populate the cart, and update subtotal
    populateCart()
    updateSubtotal()
}

// this function is called to calculate and update the subtotal of the cart
function updateSubtotal(){

    // subtotal and totalquantity is reset to 0 
    subtotal = 0;
    totalquantity = 0;

    // we get the cart object from sessionStorage, and check if cart is valid
    let cart = sessionStorage.getItem("cart");
    if (cart != ""){

        // if cart is valid, we parse the cart object to a JSON object
        cart = JSON.parse(cart)

        // loop each food object in the cart object
        for (i = 0; i < cart.length; i++) {
            food = cart[i];
            
            // get the price and quantity for each food
            price = parseFloat(food['food']['price']);
            quantity = parseInt($(`#${food['food']['foodid']}`).html())

            // add it into the subtotal, and totalquantity
            subtotal += price * quantity
            totalquantity += quantity;
        }

        // we round total price to 2 decimal points
        subtotal = parseFloat(Math.round(subtotal * 100) / 100).toFixed(2)
    }
    
    // finally, display subtotal and quantity on page
    $(".items").html(totalquantity + " item(s)");
    $(".total-amount").html("RM " + subtotal)
}

// this function is called to display all foods in the cart
function populateCart() {
    // get the cart object from sessionStorage
    let cart = sessionStorage.getItem("cart");
    console.log(cart);

    // clear the contents of the cart container
    $(".cart-items-container").empty();

    // if cart is not empty
    if (cart != "") {
        // parse cart object as JSON object
        cart = JSON.parse(cart);
        console.log(cart);

        // loop through each food in cart
        for (i = 0; i < cart.length; i++) {
            food = cart[i];
            // display food in cart page
            $(".cart-items-container").append(
                `<div class="cart-item">
                    <div class="image-box">
                        <img src="${food['food']['img']}" height="120px">
                    </div>
                    <div class="about">
                        <h1 class="title">${food['food']['name']}</h1>
                        <h3 class="subtitle">${food['food']['desc']}</h3>
                    </div>
                    <div class="counter">
                        <div class="btn" onclick="minusCount('${food['food']['foodid']}')">&#8722;</div>
                            <div class="count" id="${food['food']['foodid']}">${food['quantity']}</div>
                        <div class="btn" onclick="addCount('${food['food']['foodid']}')">&plus;</div>
                    </div>
                    <div class="prices">
                        <div class="gap"></div>
                        <span class="amount">RM ${food['food']['price']}</span>
                        <div onclick="removeFood('${food['food']['foodid']}')"class="remove"><u>Remove</u></div>
                    </div>
                </div>`)
        }
    }
}
