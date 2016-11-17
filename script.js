//module

var ShoppingCart = function() {
	// an array with all of our cart items
	var cart = [];

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
	};


	var addItem = function (item) {

		var index = cart.indexOf(item);

		  if (index === -1) {
            item.quantity = 1;
            cart.push(item);
        } else {
            cart[index].quantity++;
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
  //fix this with remove and add  a new class
  // and using the toggle function
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

  var item = $(this).parent().prev().parent().data();
  //var price = $(this).parent().prev().parent().data();
  //var item = {name: name, price: price};

  app.addItem(item);//push into array

  app.updateCart();
});

$('.clear-cart').on('click', function () {
  app.clearCart();
});

