jQuery(document).ready(function($) {
	//goi header.html, footer.html
	$('#header').load('header.html');
	$('#footer').load('footer.html');

	//get data
	var index = 0;
	function loadjson(){
		$.get('data.json',function(products){
			for(var i = 0; i < 8; i++){
				index ++;
				if(index >= products.length) break;
				$('#content').append(`
					<div class=" col-12 col-md-6 col-lg-3 mb-5">
					<div class="card" style="height:100%">
					<img src="${products[index-1].img}" class="card-img-top" alt="...">
					<div class="card-body">
					<p class="card-text">${products[index-1].name}</p>
					<p>${products[index-1].price}</p> <br> <br>
					<a href="details.html#${products[index-1].id}" class="btn btn-primary muangay" style="position:absolute;bottom :25px">Mua ngay</a>
					</div>
					</div>
					</div>`);
			}
		});
	}

	function asc1(a, b) {
		const al1 = a.$('#content').text().toUpperCase();
		const al2 = b.$('#content').text().toUpperCase();

		let comparison = 0;
		if (al1 > al2) {
			comparison = 1;
		} else if (al1 < al2) {
			comparison = -1;
		}
		return comparison;
	}

	$.get('data.json', function(data) {
		$('.ascAlphabet').on('click',function(){
			$('#content').remove();
			data.sort(asc1);
			loadjson();
		});
	});
	

	loadjson();
	$('#xemthem').click(function(event) {
		loadjson();
	});


	// $('.search').focus(function(event) {
	// 	$('body').css({
	// 		"background": 'rgba(0, 0, 0, 0.4)'
	// 	});
	// });
	// $('.search').blur(function(event) {
	// 	$('body').css({
	// 		"background": 'white'
	// 	});
	// });

	$.getJSON('data.json', function(data) {
		$('.search').keyup(function(){
			let searchField = $(this).val();
			console.log($('#results').html());
			if(searchField ===''  || !$('#content').text().includes(searchField))  {
				$('#results').html('');
				return;
			}

			let regex = new RegExp(searchField, "i");
			let output = `<div class="row pt-4">`;
			var find = false;
			$.each(data, function(key, val){
				if ((val.price.search(regex) != -1) || (val.name.search(regex) != -1)) {
					find = true;
					output += `
					<div class="col-2 mb-4 pl-5">
					<a href="details.html#${val.id}"><img src="${val.img}" style="width:100%;"></a>
					</div>
					<div class="col-2">
					<p class="card-text">${val.name}</p>
					<p>${val.price}</p>
					</div>
					`
				}
			});

			output+=`</div>`;
			if(find) $('#results').html(output);
		});
	})

	let id = document.URL.slice(-2);
	$.getJSON('data.json',function(products){
		$('#detail').html(`
			<div class="col-7">
			<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
			<div class="carousel-inner">
			<div class="carousel-item active">
			<img src="${products[id-1].img}" style="height:70%" class="d-block w-100" alt="...">
			</div>
			<div class="carousel-item">
			<img src="${products[id-1].img}" style="height:70%" class="d-block w-100" alt="...">
			</div>
			<div class="carousel-item">
			<img src="${products[id-1].img}" style="height:70%" class="d-block w-100" alt="...">
			</div>
			</div>
			<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
			<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			<span class="sr-only">Previous</span>
			</a>
			<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
			<span class="carousel-control-next-icon" aria-hidden="true"></span>
			<span class="sr-only">Next</span>
			</a>
			</div>
			</div>

			<div class="col-5">
			<p class="detail__p mb-lg-4 pb-lg-4">${products[id-1].name}</p> 
			<p class="detail__p pb-lg-4">${products[id-1].price}</p>
			<div class="buy mt-lg-5 mt-4">
			<span class="substract" onclick="function substract(){var i = parseInt($('.quantity').text(),10);if (i > 0) {i --;$('.quantity').text(i);}}substract()">-</span>
			<span class="quantity" >1</span>
			<span class="plus" onclick="function plus(){var i = parseInt($('.quantity').text(),10);if (i < 1000) {i ++;$('.quantity').text(i);}}plus()">+</span>
			</div>
			<div class="addtocart text-center py-md-3 py-2 mt-lg-5 mt-4" onclick="function add(){
				var i = parseInt($('.quantity').text(),10);
				var a = parseInt($('#show').text(),10);
				$('#show').text(i+a);
			}add()">thêm vào giỏ</div>
			<p class="detail__text mt-lg-5 mt-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
			<span class="ttmh mt-md-5 mt-4"><a href="products.html" style="color: white">tiếp tục mua hàng</a></span>
			<span class="tt mt-md-5 mt-4"><a href="purchase.html" style="color: black">thanh toán</a></span>
			</div>
			<div class="col-12">
			<p class="detail__text2 mt-lg-5 mt-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
			</div>

			`);
	});

	$('.addtocart').click(function(){
		var i = parseInt($('.quantity').text(),10);
		var a = parseInt($('#show').text(),10);
		$('#show').text(i+a);
	});

	$.get('data.json', function(data) {
		let giohang = `<div class="table-responsive mb-5 pb-md-5 pb-0 text-center">
		<table class="table table-striped">
		<thead class="thead-light">
		<tr>
		<th scope="col">Xoá</th>
		<th scope="col">Sản Phẩm</th>
		<th scope="col">Số Lượng</th>
		<th scope="col">Giá</th>
		<th scope="col">Thanh Toán</th>
		</tr>
		</thead>
		<tbody>`;

		$('.addtocart').click(function(event) {
			
			giohang +=`
			<tr>
			<th scope="row"><i class="fas fa-minus-circle"></i></th>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			`
		});
		

		giohang += `
		</tbody>
		</table>
		</div>
		`

		$('#giohang').html(giohang);

	});

	$(window).scroll(function(){ 
		if ($(this).scrollTop() > 100) { 
			$('.back-to-top').fadeIn(); 
			$('.login').css({
				opacity: 0,
				transition: '.5s',
			});
		} else { 
			$('.back-to-top').fadeOut(); 
			$('.login').css({
				opacity: 1,
				transition: '.5s',
			});
		} 
	}); 
	$('.back-to-top').click(function(){ 
		$("html, body").animate({ scrollTop: 0 }, 600); 
		return false; 
	});

});












