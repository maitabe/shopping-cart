// global function

var bindRemoveItem = function() {
	//remove item
	$('.cart-list .remove').on('click', function() {
		var itemData = $(this).parent('p').data();
		shopCart.removeItem(itemData);
	});
};

//module
var ShoppingCart = function() {

	//variables

	//local storage app key
	var STORAGE_ID = 'shopping-cart';
	var TOTAL_ID = 'total-cart';

	//sum of total cart
	var cart = [],
			total = 0;

//functions
	var getFromLocalStorage = function() {
		cart = JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		total = JSON.parse(localStorage.getItem(TOTAL_ID) || 0);
	};

		//update total $ everytime a new product is added
	var displayTotal = function() {
		$('.total').empty();
		$('.total').append(total);
	};

	var saveToLocalStorage = function() {
		localStorage.setItem(STORAGE_ID, JSON.stringify(cart));
		localStorage.setItem(TOTAL_ID, JSON.stringify(total));
	};

	//toggle functionality
	var shoppingCartToggle = function() {
		$('.shopping-cart').toggle('fast');
	};

	//keep up to date shopping card with changes in the DOM
	var updateCart = function () {
	  // TODO: finish
	  $('.cart-list').empty();

		var source = $('#cart-template').html();
		var template = Handlebars.compile(source);
		  //fill shopping cart from main cart
		for (var i = 0; i < cart.length; i++) {
			  var newHtml = template(cart[i]);
			  $('.cart-list').append(newHtml);
		  }

		bindRemoveItem();
		saveToLocalStorage();
		 //show total of buy
		displayTotal();
	};

	//add item to the shopping cart
	var addItem = function (item) {

		var isItemExist = false;

		//check if product exist
		for (var i = 0; i < cart.length; i++) {
			// product doesn't exist in cart
		  if (item.name === cart[i].name) {
		  		isItemExist = true;
          cart[i].quantity++;
          break;
      }
		}

		//if product not found
		if(!isItemExist){
			item.quantity = 1;
			cart.push(item);
		}

    //add price of product to total
		total += item.price;
		saveToLocalStorage();
		// update the total as soon as the cart get save in the local storage
		displayTotal();
	};

	//remove item from cart
	var removeItem = function(itemData) {

		for (var i = 0; i < cart.length; i++) {
			//check if product exist
			if(itemData.name === cart[i].name) {
				//recalculate the total when remove
				total -= cart[i].price;
				//reduce quantity from product
				if(cart[i].quantity > 1) {
						cart[i].quantity--;
				}else{
					//remove it from my cart
					cart.splice(i, 1);
				}

				break;
			}
		}
		updateCart();
		saveToLocalStorage();
	};

	//empty cart if want to cancel purchase
	var clearCart = function () {
	  // TODO: finish
	  if(cart.length) {
	  	cart = [];
	  	total = 0;
	  }
	  saveToLocalStorage();
	  updateCart();
	};

	//init code
	// an array with all of our cart items
	getFromLocalStorage();

	return {
		addItem:addItem,
		updateCart:updateCart,
		clearCart:clearCart,
		shoppingCartToggle:shoppingCartToggle,
		removeItem:removeItem
	};
};

//module for new product
var AddNewProduct = function() {

	var newProduct = [];

	var updateProduct = function() {

		$('.new-row').empty();

		var source = $('#product-template').html();
		var template = Handlebars.compile(source);

		//fill DOM with new product array
		for (var i = 0; i < newProduct.length; i++) {
			  var newHtml = template(newProduct[i]);
			  $('.new-row').append(newHtml);
		}

	};

	var addProduct = function(itemProd) {

		newProduct.push(itemProd);

	};

	return {
		addProduct:addProduct,
		updateProduct:updateProduct
	};
};

//call my shopping cart module
var shopCart = ShoppingCart();
//call new product module
var admin =  AddNewProduct();

// update the cart as soon as the page loads!
shopCart.updateCart();


//HANDLERS
$('.view-cart').on('click', function () {
  // TODO: hide/show the shopping cart!

  shopCart.shoppingCartToggle();

});

$('.add-to-cart').on('click', function () {
  // TODO: get the "item" object from the page

  var item = $(this).parent().prev().parent().data();

  shopCart.addItem(item);//push into array
  shopCart.updateCart();
  if($('.shopping-cart').is(':hidden')) {
  	shopCart.shoppingCartToggle();
  }

});

$('.clear-cart').on('click', function () {
  shopCart.clearCart();
});

//modal box
$('#add-product').on('click', function() {
		var name = $('.name-input').val();
		var price = $('.price-input').val();
		var image = $('.image-input').val();

		var product = {name:name, price:price, image:image};

		$('.name-input').val('');
		$('.price-input').val('');
		$('.image-input').val('');

		$('#myModal').modal('hide');

		admin.addProduct(product);
		admin.updateProduct();

		console.log('product added successfully - ' + name +', ' + '$' + price);


});



// img
// http://cdn1.bigcommerce.com/server3600/e392b/products/3710/images/9047/kimmidoll_maxi_doll_namie_good_fortune_11cm_TGKFSL095__95010.1446279185.1280.1280.jpg?c=2

// https://cdn.shopify.com/s/files/1/0790/7429/products/YELLOW_001_e4cb28cc-b763-42a9-9a40-a6206dcf3c3d_large.png?v=1473210896