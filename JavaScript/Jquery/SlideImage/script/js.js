/*
	Ý tưởng cho code Jquery
	B1:Xây dựng một hàm gọi phương thức chạy ảnh
	B2:Trong phương thức đó ta lần lượt xây dựng các hàm
	B3:Tìm phần tử không phải là phầ n tử đầu tiên của thẻ img với thuộc tính not(:first) của jquery
	B4:Ẩn phần tử đó đi với lệnh hide của jquery
	B5:Tìm phần tử đầu tiên và thêm class current cho nó.Đây là phần tử sẽ xuất hiện.
	B6:Tạo một biến giữ giá trị là hàm SetInteval,hàm này có chức năng lập
	B7:Xây dựng một hàm chuyển đổi ảnh đặt tên là switcher
	B8:Trong hàm switcher ta khai báo 2 tham số $cur với giá trị là những thẻ img có class là current,và $next là thẻ img kế tiếp của thẻ $cur
	B9:Để tạo điểm dừng khi mà đứng ở ảnh cuối ta muốn quay lại ảnh đầu thì ta dùng hàm length.
	Ý nghĩa hàm length :Đối với chuỗi nó sẽ trả về độ dài,còn đối với một object nó sẽ trả về 1 nếu object đó tồn tại và ngược lại là 0
	Khi $next.length trả về cho ta giá trị là 0 nghĩa là nó đang ở phần tử cuối cùng của thẻ img
	Khi đó ta gán $next = thành phần img đầu tiên
	B10: Tiến hành cho ẩn đi thành phần current và hiện lên thành phần tiếp theo của current hiện hành với lệnh
	$cur.removeClass('current').fadeOut(giá trị bằng số) ở đây có thể thay fadeOut bằng lệnh exit với 3 tham số là slow,medium,và fast hoặc một số cụ thể
	$next.addClass('current').fadeIn(giá trị bằng số)
	B11:Ở đây ta muốn khi người dùng đưa chuột vào thì hiệu ứng chuyển động sẽ được dừng lại.Khi đưa ra thì tiếp tục slide.Từ ý tưởng đó ta tiến hành xây
	dựng câu lệnh sau
	$(Thành phần chịu tác động).PHương thức tác động(funciton(){ làm một điều gì đó});
	$('.slide').hover(function(){ nội dung hàm});
	B12:Trong phần nội dung hàm ta làm như sau:đưa chuột vào thì dừng.Nghĩa là phương thức setInterval bị hủy.
	Lúc này ta gọi lệnh clearInterval(giá trị giữ setInterval ở bước 6),(lưu ý dấu phẩy ở đây)
	Cũng trong hàm này,ta tiếp tục thêm hàm function(){ viết lại code ở bước 6}
	Lưu ý rằng cần ngăn cách dấu phẩy vì nó giống như điều kiện ngược lại của hover,là đưa chuột ra thì gọi hàm nào.
*/






$(document).ready(function () {
	$('.slide img:not(:first)').hide();
	$('.slide img:first').addClass('current');
	$('.index-menu li:first').addClass('current').css('background-color','#fff');	
	var t = setInterval(switcher,1500);
	function switcher() {
		var $cur = $('img.current');
		var $next = $cur.next('img');
		var $index = $('.index-menu li.current');
		var $nindex =$index.next('li');
		if ($next.length == 0) {
			$next = $('.slide img:first');
			$nindex = $('.index-menu li:first');	
		}
			
		$cur.removeClass('current').fadeOut(1600);
		$index.removeClass('current').css('background-color','#374C83');
		$nindex.addClass('current').css('background-color','#fff');
		$next.addClass('current').fadeIn(1600);		
	}
	$('.next-btn').click(function(){
		var $next = $('img.current').next('img');
		var $nindex =$('.index-menu li.current').next('li');		
		$('img.current').removeClass('current').hide();
		$('.index-menu li.current').removeClass('current').css('background-color','#374C83');
		$nindex.addClass('current').css('background-color','#fff');
		$next.addClass('current').show(50);
		
	});
	$('.prev-btn').click(function(){
		var $prev = $('img.current').prev('img');
		var $nindex =$('.index-menu li.current').prev('li');
		$('.index-menu li.current').removeClass('current').css('background-color','#374C83');		
		$('img.current').removeClass('current').hide();
		$nindex.addClass('current').css('background-color','#fff');
		$prev.addClass('current').show(50);
		
	});
	$('.slide').hover(function(){
		clearInterval(t);
	},function() {
		t = setInterval(switcher,1500);
	});	
});
