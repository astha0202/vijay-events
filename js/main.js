/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if(loader){

        loader.style.transition = ".8s";

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

        setTimeout(()=>{

            loader.remove();

        },800);

    }

});


/* ==========================================
   STICKY NAVBAR
========================================== */

const header = document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 80){

        header.classList.add("scrolled");

    }

    else{

        header.classList.remove("scrolled");

    }

});


/* ==========================================
   FAQ
========================================== */

const questions=document.querySelectorAll(".faq-question");

questions.forEach(question=>{

    question.addEventListener("click",()=>{

        const answer=question.nextElementSibling;

        const icon=question.querySelector("i");

        if(answer.style.display==="block"){

            answer.style.display="none";

            icon.classList.remove("fa-minus");

            icon.classList.add("fa-plus");

        }

        else{

            document.querySelectorAll(".faq-answer").forEach(item=>{

                item.style.display="none";

            });

            document.querySelectorAll(".faq-question i").forEach(i=>{

                i.classList.remove("fa-minus");

                i.classList.add("fa-plus");

            });

            answer.style.display="block";

            icon.classList.remove("fa-plus");

            icon.classList.add("fa-minus");

        }

    });

});


/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});
/* ==========================================
   COUNTER ANIMATION
========================================== */

const counters = document.querySelectorAll(".stat-card h2, .counter-box h2");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const counter = entry.target;

            const text = counter.innerText;

            const target = parseInt(text.replace(/\D/g,""));

            const suffix = text.replace(/[0-9]/g,"");

            let count = 0;

            const speed = target / 120;

            const update = () => {

                count += speed;

                if(count < target){

                    counter.innerText = Math.floor(count) + suffix;

                    requestAnimationFrame(update);

                }else{

                    counter.innerText = target + suffix;

                }

            };

            update();

            counterObserver.unobserve(counter);

        }

    });

});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});


/* ==========================================
   SCROLL REVEAL
========================================== */

const reveals = document.querySelectorAll(

".fade-up,.fade-left,.fade-right,.zoom"

);

const revealObserver = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";

            entry.target.style.transform="translate(0,0) scale(1)";

            entry.target.style.transition=".8s ease";

        }

    });

},{threshold:.15});

reveals.forEach(item=>{

    revealObserver.observe(item);

});


/* ==========================================
   BACK TO TOP
========================================== */

const topBtn=document.createElement("div");

topBtn.innerHTML="↑";

topBtn.className="top-btn";

document.body.appendChild(topBtn);

topBtn.style.cssText=`

position:fixed;
bottom:35px;
left:35px;
width:55px;
height:55px;
background:#D4AF37;
color:#111;
display:flex;
justify-content:center;
align-items:center;
font-size:24px;
border-radius:50%;
cursor:pointer;
opacity:0;
transition:.4s;
z-index:9999;

`;

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        topBtn.style.opacity="1";

    }else{

        topBtn.style.opacity="0";

    }

});

topBtn.onclick=()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};


/* ==========================================
   ACTIVE NAVBAR
========================================== */

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-150;

        const height=section.offsetHeight;

        if(scrollY>=top){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});
/* ==========================================
   SCROLL PROGRESS BAR
========================================== */

const progress=document.createElement("div");

progress.className="progress-bar";

document.body.appendChild(progress);

window.addEventListener("scroll",()=>{

    const totalHeight=

    document.documentElement.scrollHeight-

    window.innerHeight;

    const progressHeight=

    (window.pageYOffset/totalHeight)*100;

    progress.style.width=progressHeight+"%";

});


/* ==========================================
   CUSTOM CURSOR
========================================== */

const cursor=document.createElement("div");

cursor.className="cursor";

document.body.appendChild(cursor);

document.addEventListener("mousemove",(e)=>{

    cursor.style.left=e.clientX+"px";

    cursor.style.top=e.clientY+"px";

});


document.querySelectorAll("a,button,img").forEach(el=>{

    el.addEventListener("mouseenter",()=>{

        cursor.classList.add("active");

    });

    el.addEventListener("mouseleave",()=>{

        cursor.classList.remove("active");

    });

});


/* ==========================================
   HERO PARALLAX
========================================== */

const hero=document.querySelector(".hero");

window.addEventListener("mousemove",(e)=>{

    if(hero){

        let x=(window.innerWidth/2-e.clientX)/40;

        let y=(window.innerHeight/2-e.clientY)/40;

        hero.style.backgroundPosition=

        `${x}px ${y}px`;

    }

});


/* ==========================================
   IMAGE HOVER TILT
========================================== */

document.querySelectorAll(

".service-card,.wedding-card,.rental-card"

).forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateX=-(y-rect.height/2)/18;

const rotateY=(x-rect.width/2)/18;

card.style.transform=

`perspective(1000px)

rotateX(${rotateX}deg)

rotateY(${rotateY}deg)

scale(1.03)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform=

"perspective(1000px) rotateX(0) rotateY(0)";

});

});


/* ==========================================
   AUTO TESTIMONIAL SLIDER
========================================== */

const slider=document.querySelector(".testimonial-slider");

if(slider){

setInterval(()=>{

slider.scrollBy({

left:350,

behavior:"smooth"

});

if(

slider.scrollLeft+

slider.clientWidth>=

slider.scrollWidth-5

){

slider.scrollTo({

left:0,

behavior:"smooth"

});

}

},4000);

}


/* ==========================================
   BUTTON RIPPLE
========================================== */

document.querySelectorAll("button,.primary-btn").forEach(btn=>{

btn.addEventListener("click",(e)=>{

const ripple=document.createElement("span");

const size=Math.max(btn.clientWidth,btn.clientHeight);

const rect=btn.getBoundingClientRect();

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.left=e.clientX-rect.left-size/2+"px";

ripple.style.top=e.clientY-rect.top-size/2+"px";

ripple.className="ripple";

btn.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});


/* ==========================================
   LAZY IMAGE FADE
========================================== */

const images=document.querySelectorAll("img");

const imgObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="scale(1)";

}

});

});

images.forEach(img=>{

img.style.opacity="0";

img.style.transform="scale(.95)";

img.style.transition=".8s";

imgObserver.observe(img);

});
const menuBtn=document.querySelector(".menu-btn");

const nav=document.querySelector(".nav-links");

menuBtn.onclick=()=>{

nav.classList.toggle("active");

}