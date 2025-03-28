let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
const images = document.querySelectorAll("img");
const totalImages = document.querySelectorAll("img").length
let curImageDisplay;


document.addEventListener("keydown", (e) => {
    //load text
    console.log(e.code)
    if (e.code == "Escape") {
        closeModal();
    }
    if (e.code == "ArrowRight") {
        nextImage();
    }
    if (e.code == "ArrowLeft") {
        prevImage();
    }
});

function showMobileMenu() {
    document.getElementById("mobilemenu").classList.contains("hide") ?
    document.getElementById("mobilemenu").classList.remove("hide") :
    document.getElementById("mobilemenu").classList.add("hide")
    
    
}

function imgtoDiv() {
    vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    console.log("width",vw,"height",vh)
    if (vw <= 480) {
        document.getElementsByClassName("menu")[0].classList.add("hide");
        document.getElementById("mobiletop").style.display = "block";
    } else if (document.getElementsByClassName("menu")[0].classList.contains("hide")){
        document.getElementsByClassName("menu")[0].classList.remove("hide");
        document.getElementById("mobiletop").style.display = "none";
    } else {
        document.getElementById("mobiletop").style.display = "none";
    }

    if (vh <= 96) {
        console.log("if triggered")
        document.getElementsByClassName("menu")[0].style.height = "50% !important;";
        document.getElementsByClassName("name")[0].style.fontSize = "1.5rem !important;";
        document.getElementsByClassName("name")[0].style.fontWeight = "normal !important;";
        document.querySelector("li a").style.padding = "4px 8px !important";
            
    }
    
    if (vw < 1200) {
        columns = 2;
    } else {
        columns = 3;
    }
    document.getElementsByClassName('gallery')[0].innerHTML = '';

    let imgPerColumn = Math.floor(totalImages/columns);
    for (let column = 1; column <= columns; column++) {
        let newDiv = document.createElement("div");
        newDiv.id = column;
        document.getElementsByClassName('gallery')[0].appendChild(newDiv);

    }

    console.log(totalImages)
    for (let i = 0; i < totalImages; i += columns) {
        for (let column = 1; column <= columns; column++) {
            let image = i+column-1;
            if (images.item(image).id != "displayImage")     {
                images.item(image).remove();
                images.item(image).onclick = function() {displayImg(image)};
                document.getElementById(column).appendChild(images.item(image));
            }
            console.log(column,image)
        }

    }


    /* for (let j = 1; j <= columns; j++) {
        for (let i = start; i < imgPerColumn; i++) {
            if (images.item(i).id != "displayImage")     {
                images.item(i).remove();
                images.item(i).onclick = function() {displayImg(i)};
                document.getElementById(j).appendChild(images.item(i));
            }
        }
        start = imgPerColumn
        imgPerColumn = start+imgPerColumn;
    } */

}

window.addEventListener("resize", () => { 
    imgtoDiv();
 });

 imgtoDiv();

 function closeModal(e, clickedOutside) {
    const modal = document.querySelector(".overlay")
    console.log("close",clickedOutside)
    if (clickedOutside) {
        if (e.target.classList.contains("overlay"))
            modal.classList.add("hide");
    } else modal.classList.add("hide");
}


 function displayImg(i) {
    curImageDisplay = i;
    const modal = document.querySelector(".overlay")
    modal.innerHTML += "<img id='displayimage' src='' />";
    let displayImage = document.querySelector("#displayimage");
    displayImage.src = images.item(i).getAttribute("src");
    modal.classList.remove("hide");
    //document.querySelector("#displayimage").onclick = closeModal();
 }

function nextImage() {
    displayImg((curImageDisplay + totalImages + 1) % totalImages);
}
function prevImage() {
    displayImg((curImageDisplay + totalImages - 1) % totalImages);
}




