//module
// an array with all of our cart items
var cart = [];


var ShoppingCart = function() {


	var total = 0;

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

		displayTotal();
	};

	var displayTotal = function() {
		$('.total').empty();
		$('.total').append(total);
	}


	var addItem = function (item) {
		var isExist = false;
		console.log(total);
		//check array for item
		for(var i = 0; i < cart.length; i ++){
			if(cart[i].name === item.name){
				isExist = true;
				cart[i].quantity ++;
			}
		}

		//complex if statements
		if(cart.length === 0){
			cart.push(item);
		}else if(!isExist){
			cart.push(item);
		}

			total += item.price;
	};

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
		clearCart:clearCart
	};
};


var app = ShoppingCart();

// update the cart as soon as the page loads!
app.updateCart();

//HANDLERS
$('.view-cart').on('click', function () {
  // TODO: hide/show the shopping cart!
  var isVisible = $('.shopping-cart').is(':visible');

	if(!isVisible){
		// show cart
		$('.shopping-cart').show();
	}else{
		// hide cart
		$('.shopping-cart').hide();
	}
});

$('.add-to-cart').on('click', function () {
  // TODO: get the "item" object from the page

  var name = $(this).parent().prev().parent().data().name;
  var price = $(this).parent().prev().parent().data().price;
  var item = {name: name, price: price, quantity: 1};

  app.addItem(item);//push into array

  app.updateCart();
});

$('.clear-cart').on('click', function () {
  app.clearCart();
});

