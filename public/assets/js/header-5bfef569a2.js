window.onscroll=function(){myFunction()};let header=document.getElementById("myHeader"),sticky=header.offsetTop;function myFunction(){window.pageYOffset>sticky?header.classList.add("sticky"):header.classList.remove("sticky")}