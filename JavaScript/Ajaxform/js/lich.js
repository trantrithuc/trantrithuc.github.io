/*
Khoi tao cac gia tri can thiet
*/
days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",];
months =["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
months_length = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"); 
var d= new Date();
var mon = d.getMonth();
var year = d.getYear()+1900;

/*
Tao cau truc Table va goi cac ham su li 
*/
function creatTable() {
	document.write("<div id='main' style='display:none'>");
	document.write("<TABLE BORDER ='1'>");
	document.write("<TR>");
	document.write("<TD><button type ='button' onClick='prevyearAction();'>&laquo;</button></TD>");
	document.write("<TD><button type ='button' onClick='prevAction();'>&lt;</button></TD>"); 	
	document.write("<TD id = 'td_mon'></TD>");
	document.write("<TD colspan='2' id = 'td_year'></TD>");
	document.write("<TD><button type = 'button' onClick='nextAction();'>&gt;</button></TD>");
	document.write("<TD><button type ='button' onClick='nextyearAction();'>&raquo;</button></TD>"); 
	document.write("</TR>");
	filldays();
	fillTable();
	document.write("</TABLE>");
	document.write("</div>");
	setDateContent(mon,year);
}

/*
Xuat ra cau truc Table o function creatTable
*/
function showTable() {
	document.getElementById("main").style.display= "block";
}

/*
An cau truc Table o function creatTable
*/
function hideTable() {
	document.getElementById("main").style.display= "none";
}

/*
Dien vao dong thu 2 trong Table mang "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
*/
function filldays() {
	document.write("<TR>");
	for (i=0;i<days.length;i++) {
		document.write("<TD class='day'>");
		document.write(days[i]);
		document.write("</TD>");
	}
	document.write("</TR>");
}

/*
Tao the OPTION va add item  "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" vao 
*/
function buildMonthlist() {
	var res="<SELECT id='ddl_month' onChange='setMonth();'>";
	for (i = 0; i< months.length; i++) {
		if (i == mon)
			res+="<OPTION SELECTED= 'selected' value =" + i + ">" + months[i] +"</OPTION>";
		else 
			res+="<OPTION value =" + i + ">" + months[i] +"</OPTION>";
	}
	res+="</SELECT>";
	return res;
}

/*
Tao the OPTION va add item tu 1950 den 2050 vao
*/
function buildYearlist() {
	var res="<SELECT id='ddl_year' onChange='setYear();'>";	
	for (i = 1950; i <= 2016; i++) {
		if (year==i)
			res+="<OPTION SELECTED= 'selected' value= "+ i + ">" + i + "</OPTION>";
		else
			res+="<OPTION value = " + i + ">"+ i + "</OPTION>";
	}
	res+="</SELECT>";
	return res;
}

/*
Tao ngay bat dau cua thang nam duoc selected.Chon color red cho ngay hien tai va color blue cho ngay khac.Nhung ngay khong co thi de trong
*/
function setDateContent(mon, year) {

	document.getElementById("td_mon").innerHTML= buildMonthlist();
	document.getElementById("td_year").innerHTML = buildYearlist();

	var first_date = new Date(year,mon,1);
	var of_day = first_date.getDay();
	console.log("Star Day:" + days[of_day]);

	if (testMonth_2())
			months_length[1]="29";	
	else
		months_length[1]="28";

	var mon_length = months_length[mon];	
	var check = false;
	console.log("MONTH LENGTH OF" + months[mon] + ":" + months_length[mon]);
	var start = 1;

	var today = new Date();
	var td = today.getDate();
	var ty = today.getYear() + 1900;
	var tm = today.getMonth();
	for (i = 0;i<42; i ++) {
		if(i == of_day)
			check = true;		
		if (check==true && start <= mon_length) {
			if (td == start && tm == mon && ty == year) {
				document.getElementById("cell" + i).innerHTML = start;
				document.getElementById("cell" + i).style.color = "red";
			}
			else {
				document.getElementById("cell" + i).innerHTML= start;
				document.getElementById("cell" + i).style.color = "blue";
			}
			start ++;
		}
		else 
			document.getElementById("cell" +i).innerHTML= "";
	}
}

/*
Xay dung function kiem tra nam nhuan.
*/
function testMonth_2() {
	var m = document.getElementById("ddl_month");
	var y = document.getElementById("ddl_year");
	mon = m.options[m.selectedIndex].value;
	year = y.options[y.selectedIndex].value;
	if (year % 4 == 0 && mon == 1)
		return true;
	return false;
}

/*
Set thang duoc chon va truyen vao setDateContent
*/
function setMonth() {
	var m = document.getElementById("ddl_month");
	mon = m.options[m.selectedIndex].value;
	console.log("SELECTED MONTH:" + months[mon]);
	setDateContent(mon,year);
}

/*
Set nam duoc chon va truyen vao setDateContent
*/
function setYear() {
	var y = document.getElementById("ddl_year");
	year = y.options[y.selectedIndex].value;
	console.log("SELECTED YEAR:" + year);
	setDateContent(mon,year);
}

/*
Xu li event cho the a.
*/
function onClickDate(a) {
	var str = a.innerHTML + "/" + (parseInt(mon) + 1) + "/" + year;	
	document.getElementById("birth").value= str;
	document.getElementById("main").style.display= "none";
}

/*
Dien cac ngay vao tung o cua Table
*/
function fillTable() {
	var count = 0;
	for (i = 0;i<6;i++) {
		document.write("<TR>");
		for(j=0;j<7;j++) {
			document.write("<TD><a href = '#' id ='cell" + count +"' onClick ='onClickDate(this)'></a></TD>");
			count++;
		}
		document.write("</TR>");
	}
}

/*
Cac nut dieu khien
*/
function prevAction() {
	if (mon <=11 && mon >0) {
		mon--;
	}
	else 
		mon =11;
	setDateContent(mon,year);
}

function nextAction() {
	if (mon >=0  && mon<11) {
		mon++;
	}
	else 
		mon =0;
	setDateContent(mon,year);
}

function prevyearAction() {	
	var y = document.getElementById("ddl_year");
	var m = document.getElementById("ddl_month");
	if(year>1950 && year <= 2016) {
		year = y.options[y.selectedIndex -1].value;		
	}
	else
		year = 2050;
	mon = 0;
	setDateContent(mon,year);
}

function nextyearAction() {	
	var y = document.getElementById("ddl_year");
	var m = document.getElementById("ddl_month");
	if(year>=1950 && year <2016) 
		year = y.options[y.selectedIndex +1].value;
	else
		year = 1950;
	mon = 0;
	setDateContent(mon,year);
}