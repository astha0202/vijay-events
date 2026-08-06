/*=====================================
GALLERY FILTER
=====================================*/

const filterButtons=document.querySelectorAll(".gallery-filter button");

const galleryItems=document.querySelectorAll(".gallery-item");

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

filterButtons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

const category=button.innerText.toLowerCase();

galleryItems.forEach(item=>{

if(category==="all"){

item.style.display="block";

return;

}

const itemCategory=item.dataset.category;

if(itemCategory===category){

item.style.display="block";

}else{

item.style.display="none";

}

});

});

});


/*=====================================
LIGHTBOX
=====================================*/

const images=document.querySelectorAll(".gallery-item img");

const lightbox=document.createElement("div");

lightbox.className="lightbox";

lightbox.innerHTML=`

<span class="close-lightbox">&times;</span>

<img class="lightbox-image">

<div class="lightbox-prev">

❮

</div>

<div class="lightbox-next">

❯

</div>

`;

document.body.appendChild(lightbox);

const lightboxImg=document.querySelector(".lightbox-image");

const closeBtn=document.querySelector(".close-lightbox");

const prevBtn=document.querySelector(".lightbox-prev");

const nextBtn=document.querySelector(".lightbox-next");

let currentIndex=0;

images.forEach((img,index)=>{

img.addEventListener("click",()=>{

lightbox.classList.add("show");

lightboxImg.src=img.src;

currentIndex=index;

});

});

closeBtn.onclick=()=>{

lightbox.classList.remove("show");

};

prevBtn.onclick=()=>{

currentIndex--;

if(currentIndex<0){

currentIndex=images.length-1;

}

lightboxImg.src=images[currentIndex].src;

};

nextBtn.onclick=()=>{

currentIndex++;

if(currentIndex>=images.length){

currentIndex=0;

}

lightboxImg.src=images[currentIndex].src;

};

document.addEventListener("keydown",e=>{

if(!lightbox.classList.contains("show")) return;

if(e.key==="Escape"){

lightbox.classList.remove("show");

}

if(e.key==="ArrowRight"){

nextBtn.click();

}

if(e.key==="ArrowLeft"){

prevBtn.click();

}

});
/*=====================================
LAZY LOADING
=====================================*/

const lazyImages=document.querySelectorAll("img[data-src]");

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const img=entry.target;

img.src=img.dataset.src;

img.removeAttribute("data-src");

observer.unobserve(img);

}

});

});

lazyImages.forEach(img=>observer.observe(img));



/*=====================================
SCROLL REVEAL
=====================================*/

const reveals=document.querySelectorAll(

".gallery-item,.album-card,.behind-scenes,.gallery-counter,.gallery-cta"

);

const revealObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{

threshold:.15

});

reveals.forEach(item=>{

item.classList.add("hidden");

revealObserver.observe(item);

});



/*=====================================
IMAGE COUNTER
=====================================*/

const counter=document.createElement("div");

counter.className="image-counter";

document.querySelector(".lightbox").appendChild(counter);

function updateCounter(){

counter.innerHTML=`${currentIndex+1} / ${images.length}`;

}

images.forEach((img,index)=>{

img.addEventListener("click",()=>{

currentIndex=index;

lightboxImg.src=img.src;

updateCounter();

});

});

prevBtn.onclick=()=>{

currentIndex--;

if(currentIndex<0){

currentIndex=images.length-1;

}

lightboxImg.src=images[currentIndex].src;

updateCounter();

};

nextBtn.onclick=()=>{

currentIndex++;

if(currentIndex>=images.length){

currentIndex=0;

}

lightboxImg.src=images[currentIndex].src;

updateCounter();

};
