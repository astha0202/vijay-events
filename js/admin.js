import {

db,

collection,

onSnapshot,

query,

orderBy,

doc,

updateDoc,

deleteDoc

} from "./firebase.js";

const container=document.getElementById("adminReviews");

const q=query(

collection(db,"reviews"),

orderBy("created","desc")

);

onSnapshot(q,(snapshot)=>{

container.innerHTML="";

snapshot.forEach(docSnap=>{

const review={

id:docSnap.id,

...docSnap.data()

};

createCard(review);

});

});


function createCard(review){

const card=document.createElement("div");

card.className="admin-card";

card.innerHTML=`

<h3>

${review.name}

</h3>

<p>

<strong>Email:</strong>

${review.email}

</p>

<p>

<strong>Event:</strong>

${review.event}

</p>

<div class="admin-stars">

${"⭐".repeat(review.rating)}

</div>

<p>

${review.review}

</p>

${
review.verified

?

`

<p style="color:#22C55E">

✅ Verified Customer

</p>

`

:

""

}

<div class="admin-actions">

<button

class="verify-btn"

data-id="${review.id}"

>

Verify

</button>

<button

class="reply-btn"

data-id="${review.id}"

>

Reply

</button>

<button

class="delete-btn"

data-id="${review.id}"

>

Delete

</button>

</div>

<div class="reply-box">

<input

placeholder="Write Reply..."

id="reply-${review.id}"

>

<button

class="sendReply"

data-id="${review.id}"

>

Send

</button>

</div>

`;

container.appendChild(card);

}
/*=========================================
VERIFY REVIEW
=========================================*/

document.addEventListener("click", async (e) => {

    /* VERIFY */

    if (e.target.classList.contains("verify-btn")) {

        const id = e.target.dataset.id;

        await updateDoc(

            doc(db, "reviews", id),

            {

                verified: true

            }

        );

        alert("✅ Review Verified");

    }



    /* DELETE */

    if (e.target.classList.contains("delete-btn")) {

        const id = e.target.dataset.id;

        const confirmDelete = confirm(

            "Delete this review?"

        );

        if (!confirmDelete) return;

        await deleteDoc(

            doc(db, "reviews", id)

        );

        alert("🗑 Review Deleted");

    }



    /* OWNER REPLY */

    if (e.target.classList.contains("sendReply")) {

        const id = e.target.dataset.id;

        const input = document.getElementById(

            `reply-${id}`

        );

        const reply = input.value.trim();

        if (!reply) {

            alert("Write a reply first.");

            return;

        }

        await updateDoc(

            doc(db, "reviews", id),

            {

                ownerReply: reply

            }

        );

        input.value = "";

        alert("💬 Reply Added");

    }

});