$(document).ready(function(){
	$('#submit').click(function(){
		
			var username = $.trim($('#Username').val());
			var password = $.trim($('#Password').val());
			var email = $.trim($('#Email').val());
			var datepicker = $.trim($('#datepicker').val());
			
			//Check Username
			if ( username == '' || username.length <4){
				$('#User_error').text('Invalid! Please input Username length > 4!');
				return false;
			}
			else {
				$('#User_error').text('');				
			}

			//Check Password
			if( password.length <= 0){
				$('#Pass_error').text('Invalid! Please input Password!');
				return false;
			}
			else {
				$('#Pass_error').text('');	
			} 

		//Check Email
			if ( !isEmail(email)){
				$('#Email_error').text('Invalid! Please input exactly Email format!');
				return false;
			}
			else {
				$('#Email_error').text('');	
			}

			//Check Date of birth
			if ( datepicker ==''){
				$('#Date_error').text('Invalid! Please choose date your birth!');
				return false;
			}
			else {
				$('#Date_error').text('');	
			}
			var data = username;
       	 	//su dung ham $.ajax()
      		$.ajax({
        	type : 'POST', //kiểu post
        	url  : 'php/result.php', //gửi dữ liệu sang trang submit.php
        	data : {
        		username: $.trim($('#Username').val()),
        	},
       		success :  function(data)
       			{                       
                    if(data == 'false')
                    {
                        $('#result').text('This Username have been already exist! Please input another Username!');
                    }else {
                       $('#result').text('OK!');
                    }
               }
			});
		
	});
	$('#reset').click(function(){
		var rs="";
		$('#Username').val(rs);
		$('#Password').val(rs);
		$('#Email').val(rs);
		$('#datepicker').val(rs);

		$('#User_error').text('');
		$('#Pass_error').text('');
		$('#Email_error').text('');
		$('#Date_error').text('');

		$('#result').text('');
	});
});

function isEmail(emailStr)
{
        var emailPat=/^(.+)@(.+)$/
        var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]"
        var validChars="\[^\\s" + specialChars + "\]"
        var quotedUser="(\"[^\"]*\")"
        var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/
        var atom=validChars + '+'
        var word="(" + atom + "|" + quotedUser + ")"
        var userPat=new RegExp("^" + word + "(\\." + word + ")*$")
        var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$")
        var matchArray=emailStr.match(emailPat)
        if (matchArray==null) {
                return false
        }
        var user=matchArray[1]
        var domain=matchArray[2]
 
        // See if "user" is valid
        if (user.match(userPat)==null) {
            return false
        }
        var IPArray=domain.match(ipDomainPat)
        if (IPArray!=null) {
            // this is an IP address
                  for (var i=1;i<=4;i++) {
                    if (IPArray[i]>255) {
                        return false
                    }
            }
            return true
        }
        var domainArray=domain.match(domainPat)
        if (domainArray==null) {
            return false
        }
 
        var atomPat=new RegExp(atom,"g")
        var domArr=domain.match(atomPat)
        var len=domArr.length
 
        if (domArr[domArr.length-1].length<2 ||
            domArr[domArr.length-1].length>3) {
           return false
        }
 
        if (len<2)
        {
           return false
        }
 
        return true;
}