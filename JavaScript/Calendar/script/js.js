days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",];
months =["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
var mon = d.getMonth();
function creatTable() {
	document.write("<div id='main' style='display:none'>");
	document.write("<TABLE BORDER ='1'>");
	document.write("<TR>");
	document.write("<TD><button type = 'button'>Prev</button></TD>"); 
	document.write("<TD colspan='2'></TD>");
	document.write("<TD colspan='3'></TD>");
	document.write("<TD><button type = 'button'>Next</button></TD>"); 
	document.write("</TR>");
	filldays();
	document.write("</TABLE>");
	document.write("</div>");
}
function showTable() {
	document.getElementById("main").style.display= "block";
}
function filldays() {
	document.write("<TR>");
	for (i=0;i<days.length;i++) {
		document.write("<TD class='day'>");
		document.write(days[i]);
		document.write("</TD>");
	}
	document.write("</TR>");
}
function builMonthlist() {
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