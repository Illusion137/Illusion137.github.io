function toggleShowSettings(){
	var x = document.getElementById("settings");
	if (x.style.display === "none") {
	  x.style.display = "block";
	} else {
	  x.style.display = "none";
	}
}

function newFontSize(){
	val = document.getElementById("fontSize").value;

	var nodes = document.getElementsByClassName('chapter-content')[0].childNodes;
	for(var i=0; i<nodes.length; i++) {
		if (nodes[i].nodeName.toLowerCase() == 'p') {
			nodes[i].style.fontSize = val;
		}
	}
}
function newLineHeight(){
	val = document.getElementById("lineHeight").value;

	var nodes = document.getElementsByClassName('chapter-content')[0].childNodes;
	for(var i=0; i<nodes.length; i++) {
		if (nodes[i].nodeName.toLowerCase() == 'p') {
			nodes[i].style.lineHeight = val;
		}
	}
}

function progressBarScroll() {
	let winScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
		height = document.documentElement.scrollHeight - window.innerHeight,
		scrolled = (winScroll / height) * 100;
	document.getElementById("progressBar").style.width = scrolled + "%";
  }
  
  window.onscroll = function () {
	progressBarScroll();
  };

