// this function is called when user clicks
// on the (+) button beside the food quantity
function addCount(id) {
    // here, we read the value of the food quantity and then add 1 to it
    document.getElementById(id).textContent = parseInt(document.getElementById(id).textContent) + 1
}

// this function is called when user clicks
// on the (-) button beside the food quantity
function minusCount(id) {
    // here, we read the value of the food quantity and then minus 1 to it only if the value is > 0
    if (parseInt(document.getElementById(id).textContent) > 0)
        document.getElementById(id).textContent = parseInt(document.getElementById(id).textContent) - 1
}


// this function is used to display all the food in the shop
function updateFood() {

    // first, we get the url and the parameters of the url
    let url = new URL(window.location.href)
    let params = new URLSearchParams(url.search);

    // then, we get the shopid from the parameters
    shopid = params.get("shopid");
    console.log(shopid)

    // after that, we call the &.get function to get contents of the shops.json file
    $.get("./json/shops.json", function (data) {
        console.log(data)

        // we parse the data from shops.json file here by navigating to shops
        shops = data['shops'];

        // and then we loop through each shop in shops object
        for (i = 0; i < shops.length; i++) {

            // declare the shop variable
            shop = shops[i];

            // and then we check if the shopid matches the shopid that user has in the parameters
            if (shop['shop-id'] == shopid) {

                // we display the shop name and page title
                $(".shop-name").text(shop['name'])
                $(".title-shop-name").text('FoodDash | ' + shop['name'])

                // declare the foods object
                foods = shop['foods'];

                // loop through each food object
                for (j = 0; j < foods.length; j++) {
                    food = foods[j]
                    
                    // display the food object in the shop
                    $("#table-food-header").append(
                    `<tr>
                        <td>${food['name']}</td>
                        <td><img class="img-food" src="${food['img']}" alt="${food['name']}"></td>
                        <td style="text-align: left;">${food['desc']}</td>	
                        <td>RM ${food['price']}</td>
                        <td>
                            <div class="counter">
                                <div class="btn" onclick="minusCount('${food['foodid']}')">&#8722;</div>
                                <div class="count" id="${food['foodid']}">0</div>
                                <div class="btn" onclick="addCount('${food['foodid']}')">&plus;</div>
                            </div>
                        </td>
                    </tr>`)
                }
            }
        }
    });
}

