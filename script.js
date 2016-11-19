//module

var ShoppingCart = function() {
	// an array with all of our cart items
	var cart = [];

	//sum of total cart
	var total = 0;

	//toggle functionality
	var shoppingCartToggle = function() {
		$('.shopping-cart').toggle('fast');
	};

	//keep up to date shopping card with changes
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
		 //show total of buy
		displayTotal();
	};
	//update total $ everytime a new product is added
	var displayTotal = function() {
		$('.total').empty();
		$('.total').append(total);
	};

	//add item to the shopping cart
	var addItem = function (item) {

		var index = cart.indexOf(item);
					//product doesnt exist in cart
		  if (index === -1) {
            item.quantity = 1;
            cart.push(item);
        } else { //product already exist on cart
            cart[index].quantity++;
        }
    //add price of product to total
		total += item.price;
	};
	//empty cart if want to cancel purchase
	var clearCart = function () {
	  // TODO: finish
	  if(cart.length) {
	  	cart = [];
	  	total = 0;
	  }
	  updateCart();
	};

	return {
		addItem:addItem,
		updateCart:updateCart,
		clearCart:clearCart,
		shoppingCartToggle:shoppingCartToggle
	};
};

//call my shopping cart module
var app = ShoppingCart();

// update the cart as soon as the page loads!
app.updateCart();

//HANDLERS
$('.view-cart').on('click', function () {
  // TODO: hide/show the shopping cart!
  app.shoppingCartToggle();

});

$('.add-to-cart').on('click', function () {
  // TODO: get the "item" object from the page

  var item = $(this).parent().prev().parent().data();

  app.addItem(item);//push into array
  app.updateCart();
  if($('.shopping-cart').is(':hidden')) {
  	app.shoppingCartToggle();
  }

});

$('.clear-cart').on('click', function () {
  app.clearCart();
});

