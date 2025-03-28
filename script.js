let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
const images = document.querySelectorAll("img");
const imgTotal = document.querySelectorAll("img").length
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

function imgtoDiv() {
    vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    
    if (vw < 850) {
        columns = 1;
    } else if (vw < 1200) {
        columns = 2;
    } else {
        columns = 3;
    }
    document.getElementsByClassName('gallery')[0].innerHTML = '';

    let imgPerColumn = Math.floor(imgTotal/columns);
    for (let column = 1; column <= columns; column++) {
        let newDiv = document.createElement("div");
        newDiv.id = column;
        document.getElementsByClassName('gallery')[0].appendChild(newDiv);

    }


    let start=0;
    for (let j = 1; j <= columns; j++) {
        for (let i = start; i < imgPerColumn; i++) {
            if (images.item(i).id != "displayImage")     {
                images.item(i).remove();
                //let link = document.createElement("a");
                //link.href = images.item(i).getAttribute("src") + "temp";
                //console.log(link)
                images.item(i).onclick = function() {displayImg(i)};
                console.log(i,images.item(i).onclick)
                document.getElementById(j).appendChild(images.item(i));
            }
        }
        start = imgPerColumn
        imgPerColumn = start+imgPerColumn;
    }

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
    modal.innerHTML = "<img id='displayimage' src='' />";
    let displayImage = document.querySelector("#displayimage");
    displayImage.src = images.item(i).getAttribute("src");
    modal.classList.remove("hide");
    //document.querySelector("#displayimage").onclick = closeModal();
 }

function nextImage() {
    displayImg((curImageDisplay + imgTotal + 1) % imgTotal);
}
function prevImage() {
    displayImg((curImageDisplay + imgTotal - 1) % imgTotal);
}




