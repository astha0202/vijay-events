import {
  db,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  increment
} from "./firebase.js";

/*==============================
GLOBAL
==============================*/

const form = document.getElementById("reviewForm");
const reviewsContainer = document.getElementById("reviewsContainer");

const toast = document.getElementById("toast");

const reviewInput = document.getElementById("review");
const counter = document.getElementById("counter");

const stars = document.querySelectorAll(".star-rating i");

const ratingInput = document.getElementById("rating");

const averageRating = document.getElementById("averageRating");
const totalReviews = document.getElementById("totalReviews");

const searchInput = document.getElementById("reviewSearch");
const sortSelect = document.getElementById("sortReviews");

let selectedRating = 0;
let allReviews = [];

/*==============================
TOAST
==============================*/

function showToast(message){

    toast.querySelector("span").textContent = message;

    toast.classList.add("show");

    if(typeof confetti==="function"){

        confetti({
            particleCount:120,
            spread:90,
            origin:{y:.65}
        });

    }

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}

/*==============================
STAR RATING
==============================*/

stars.forEach((star,index)=>{

    star.addEventListener("click",()=>{

        selectedRating=index+1;

        ratingInput.value=selectedRating;

        stars.forEach((s,i)=>{

            if(i<selectedRating){

                s.classList.remove("fa-regular");
                s.classList.add("fa-solid");
                s.style.color="#FFD700";

            }else{

                s.classList.remove("fa-solid");
                s.classList.add("fa-regular");
                s.style.color="#777";

            }

        });

    });

});

/*==============================
COUNTER
==============================*/

reviewInput.addEventListener("input",()=>{

counter.innerHTML=`${reviewInput.value.length} / 500 Characters`;

});
/*==============================
SUBMIT REVIEW
==============================*/

form.addEventListener("submit", async (e)=>{

    e.preventDefault();

    if(selectedRating===0){

        showToast("Please select rating ⭐");

        return;

    }

    const btn=form.querySelector("button");

    btn.disabled=true;

    btn.innerHTML=`
    <i class="fa-solid fa-spinner fa-spin"></i>
    Submitting...
    `;

    try{

        await addDoc(

            collection(db,"reviews"),

            {

                name:document.getElementById("name").value.trim(),

                email:document.getElementById("email").value.trim(),

                event:document.getElementById("eventType").value,

                eventDate:document.getElementById("eventDate").value,

                review:reviewInput.value.trim(),

                rating:selectedRating,

                verified:false,

                ownerReply:"",

                helpful:0,

                created:serverTimestamp()

            }

        );

        form.reset();

        selectedRating=0;

        ratingInput.value="";

        counter.innerHTML="0 / 500 Characters";

        stars.forEach(star=>{

            star.classList.remove("fa-solid");

            star.classList.add("fa-regular");

            star.style.color="#777";

        });

        btn.disabled=false;

        btn.innerHTML=`
        <i class="fa-solid fa-paper-plane"></i>
        Submit Review
        `;

        showToast("🎉 Review Submitted Successfully");

    }

    catch(error){

        console.error(error);

        btn.disabled=false;

        btn.innerHTML=`
        <i class="fa-solid fa-paper-plane"></i>
        Submit Review
        `;

        showToast("❌ Something went wrong");

    }

});
/*==============================
REALTIME REVIEWS
==============================*/

const reviewsQuery=query(

collection(db,"reviews"),

orderBy("created","desc")

);

onSnapshot(reviewsQuery,(snapshot)=>{

allReviews=[];

let totalRating=0;

snapshot.forEach(docSnap=>{

const review={

id:docSnap.id,

...docSnap.data()

};

allReviews.push(review);

totalRating+=review.rating||0;

});

renderReviews(allReviews);

const avg=

allReviews.length

?

(totalRating/allReviews.length).toFixed(1)

:

"0.0";

averageRating.textContent=avg;

totalReviews.textContent=allReviews.length;

});


/*==============================
RENDER REVIEWS
==============================*/

function renderReviews(reviews){

reviewsContainer.innerHTML="";

reviews.forEach(review=>{

const card=document.createElement("div");

card.className="review-card";

card.innerHTML=`

<div class="review-header">

<img src="images/users/default.png">

<div>

<h3>

${review.name}

${
review.verified

?

`<span class="verified">

<i class="fa-solid fa-circle-check"></i>

Verified Customer

</span>`

:

""

}

</h3>

<p>

${review.event}

</p>

</div>

</div>



<div class="review-stars">

${'<i class="fa-solid fa-star"></i>'.repeat(review.rating)}

</div>



<p class="review-text">

${review.review}

</p>



${
review.ownerReply

?

`

<div class="owner-reply">

<h4>

Reply from Vijay Events

</h4>

<p>

${review.ownerReply}

</p>

</div>

`

:

""

}



<div class="review-footer">

<span>

${review.eventDate||""}

</span>

<button

class="helpful-btn"

data-id="${review.id}"

>

👍 Helpful (${review.helpful||0})

</button>

</div>

`;

reviewsContainer.appendChild(card);

});

enableHelpfulButtons();

}
/*==============================
HELPFUL BUTTON
==============================*/

function enableHelpfulButtons(){

document.querySelectorAll(".helpful-btn")

.forEach(btn=>{

btn.onclick=async()=>{

await updateDoc(

doc(db,"reviews",btn.dataset.id),

{

helpful:increment(1)

}

);

};

});

}


/*==============================
SEARCH
==============================*/

searchInput.addEventListener("keyup",()=>{

const value=searchInput.value.toLowerCase();

document.querySelectorAll(".review-card")

.forEach(card=>{

const text=card.innerText.toLowerCase();

card.style.display=

text.includes(value)

?

"block"

:

"none";

});

});


/*==============================
SORT
==============================*/

sortSelect.addEventListener("change",()=>{

let sorted=[...allReviews];

switch(sortSelect.value){

case "highest":

sorted.sort((a,b)=>b.rating-a.rating);

break;

case "lowest":

sorted.sort((a,b)=>a.rating-b.rating);

break;

case "oldest":

sorted.sort((a,b)=>{

if(!a.created||!b.created) return 0;

return a.created.seconds-b.created.seconds;

});

break;

default:

sorted.sort((a,b)=>{

if(!a.created||!b.created) return 0;

return b.created.seconds-a.created.seconds;

});

}

renderReviews(sorted);

});


/*==============================
FILTER
==============================*/

document

.querySelectorAll(".review-filter button")

.forEach(button=>{

button.onclick=()=>{

document

.querySelectorAll(".review-filter button")

.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

const filter=button.dataset.filter;

document

.querySelectorAll(".review-card")

.forEach(card=>{

if(filter==="all"){

card.style.display="block";

return;

}

card.style.display=

card.innerText

.toLowerCase()

.includes(filter)

?

"block"

:

"none";

});

};

});


/*==============================
IMAGE LIGHTBOX
==============================*/

document.addEventListener("click",(e)=>{

if(e.target.matches(".review-gallery img")){

const overlay=document.createElement("div");

overlay.className="lightbox";

overlay.innerHTML=`

<img src="${e.target.src}">

`;

document.body.appendChild(overlay);

overlay.onclick=()=>overlay.remove();

}

});
