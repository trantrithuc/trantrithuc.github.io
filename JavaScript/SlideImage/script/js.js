var count = 5;
var currentItem = 1;
/*
Tao cac event cho cac nut
*/
function prevAction() {
	if (currentItem>1)
		currentItem--;
	else 
		currentItem = 5; 
	showSlide(currentItem);
	console.log("Prev:" + currentItem)	
}

function nextAction() {
	if (currentItem<count)
		currentItem++;
	else
		currentItem = 1;
	showSlide(currentItem);
	console.log("Next:" + currentItem)
}

function onClickIndex(a){
	var str = a.id;
	currentItem = str.substr(5,1);
	showSlide(currentItem);
} 

/*
Tao event cho cac nut Index
*/
function showSlide(index) {
	for(i = 1;i <= 5;i++) {
		if (i == index) {
			document.getElementById("item"+i).style.display = "block";
			document.getElementById("index"+i).style.background = "#FFFFFF";
		} else {
			document.getElementById("item"+i).style.display = "none";
			document.getElementById("index"+i).style.background = "#374C83";
		}
		
	}
}