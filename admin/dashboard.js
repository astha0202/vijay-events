import {
    auth,
    onAuthStateChanged,
    signOut,

    db,
    collection,
    query,
    orderBy,
    onSnapshot,

    doc,
    updateDoc,
    deleteDoc

} from "../js/firebase.js";

/*==========================================
LOGIN PROTECTION
==========================================*/

onAuthStateChanged(auth,(user)=>{

    if(!user){

        window.location.href="../login.html";

        return;

    }

    loadDashboard();

});

/*==========================================
LOGOUT
==========================================*/

const logoutBtn=document.getElementById("logoutBtn");

logoutBtn.onclick=async()=>{

    await signOut(auth);

    window.location.href="../login.html";

};

/*==========================================
SIDEBAR
==========================================*/

const menuItems=document.querySelectorAll(".sidebar li[data-page]");

const pages=document.querySelectorAll(".page");

const pageTitle=document.getElementById("pageTitle");

menuItems.forEach(item=>{

    item.onclick=()=>{

        menuItems.forEach(i=>i.classList.remove("active"));

        item.classList.add("active");

        pages.forEach(page=>page.classList.remove("active"));

        document

        .getElementById(item.dataset.page)

        .classList.add("active");

        pageTitle.textContent=item.innerText.trim();

    };

});

/*==========================================
LOAD
==========================================*/

function loadDashboard(){

    loadBookings();

    loadReviews();

    loadMessages();

}

/*==========================================
BOOKING COUNTERS
==========================================*/

const totalBookings=document.getElementById("totalBookings");

const pendingBookings=document.getElementById("pendingBookings");

const bookingTable=document.getElementById("bookingTable");

const recentBookings=document.getElementById("recentBookings");

/*==========================================
REVIEW COUNTERS
==========================================*/

const totalReviews=document.getElementById("totalReviews");

const avgRating=document.getElementById("avgRating");

const reviewTable=document.getElementById("reviewTable");

const recentReviews=document.getElementById("recentReviews");

/*==========================================
MESSAGE AREA
==========================================*/

const messagesContainer=document.getElementById("messagesContainer");
/*==========================================
BOOKINGS
==========================================*/

function loadBookings(){

    const bookingQuery = query(

        collection(db,"bookings"),

        orderBy("created","desc")

    );

    onSnapshot(bookingQuery,(snapshot)=>{

        bookingTable.innerHTML="";

        recentBookings.innerHTML="";

        totalBookings.textContent=snapshot.size;

        let pending=0;

        if(snapshot.empty){

            bookingTable.innerHTML=`
                <div class="data-box">
                    <h3>No Bookings Found</h3>
                </div>
            `;

            return;

        }

        snapshot.forEach(documentSnapshot=>{

            const b=documentSnapshot.data();

            if(b.status==="Pending") pending++;

            /*============ RECENT BOOKINGS ============*/

            recentBookings.innerHTML+=`

<div class="recent-item">

<h4>${b.customerName || "Customer"}</h4>

<p>

${b.eventType || "-"}

•

${b.eventDate || "-"}

</p>

</div>

`;

            /*============ BOOKING CARD ============*/

            bookingTable.innerHTML+=`

<div class="data-box">

<h3>👤 ${b.customerName || "-"}</h3>

<p><strong>📞 Phone:</strong> ${b.customerPhone || "-"}</p>

<p><strong>📧 Email:</strong> ${b.customerEmail || "-"}</p>

<p><strong>🆔 Booking ID:</strong> ${b.bookingId || "-"}</p>

<p><strong>🎉 Event:</strong> ${b.eventType || "-"}</p>

<p><strong>📅 Date:</strong> ${b.eventDate || "-"}</p>

<p><strong>📍 Venue:</strong> ${b.venue || "-"}</p>

<p><strong>💰 Budget:</strong> ₹${b.budget || "-"}</p>

<p><strong>📝 Message:</strong> ${b.message || "-"}</p>

<p>

<strong>Status:</strong>

<span style="
padding:6px 12px;
border-radius:20px;
color:#fff;
background:

${

b.status==="Confirmed"

?

"#22C55E"

:

b.status==="Cancelled"

?

"#EF4444"

:

"#F59E0B"

};

">

${b.status || "Pending"}

</span>

</p>

<div class="action-buttons">

<a href="tel:${b.customerPhone || ""}">

<button class="confirm">

📞 Call

</button>

</a>

<a

href="https://wa.me/91${b.customerPhone || ""}"

target="_blank">

<button class="reply">

💬 WhatsApp

</button>

</a>

<a href="mailto:${b.customerEmail || ""}">

<button class="verify">

📧 Email

</button>

</a>

<button

class="confirm confirm-booking"

data-id="${documentSnapshot.id}">

✅ Confirm

</button>

<button

class="cancel cancel-booking"

data-id="${documentSnapshot.id}">

❌ Cancel

</button>

<button

class="delete delete-booking"

data-id="${documentSnapshot.id}">

🗑 Delete

</button>

</div>

</div>

`;

        });

        pendingBookings.textContent=pending;

    });

}

/*==========================================
BOOKING ACTIONS
==========================================*/

document.addEventListener("click",async(e)=>{

    const id=e.target.dataset.id;

    if(!id) return;

    if(e.target.classList.contains("confirm-booking")){

        await updateDoc(

            doc(db,"bookings",id),

            {

                status:"Confirmed"

            }

        );

    }

    if(e.target.classList.contains("cancel-booking")){

        await updateDoc(

            doc(db,"bookings",id),

            {

                status:"Cancelled"

            }

        );

    }

    if(e.target.classList.contains("delete-booking")){

        if(!confirm("Delete this booking?")) return;

        await deleteDoc(

            doc(db,"bookings",id)

        );

    }

});
/*==========================================
REVIEWS
==========================================*/

function loadReviews(){

    const reviewQuery=query(

        collection(db,"reviews"),

        orderBy("created","desc")

    );

    onSnapshot(reviewQuery,(snapshot)=>{

        reviewTable.innerHTML="";

        recentReviews.innerHTML="";

        totalReviews.textContent=snapshot.size;

        let total=0;

        if(snapshot.empty){

            reviewTable.innerHTML=`
            <div class="data-box">
                <h3>No Reviews Yet</h3>
            </div>`;

            avgRating.textContent="0.0";

            return;

        }

        snapshot.forEach(documentSnapshot=>{

            const r=documentSnapshot.data();

            total+=Number(r.rating)||0;

            /*======== RECENT ========*/

            recentReviews.innerHTML+=`

<div class="recent-item">

<h4>${r.name}</h4>

<p>

⭐ ${r.rating}

•

${r.event}

</p>

</div>

`;

            /*======== REVIEW CARD ========*/

            reviewTable.innerHTML+=`

<div class="data-box">

<h3>👤 ${r.name}</h3>

<p><strong>🎉 Event:</strong> ${r.event}</p>

<p><strong>⭐ Rating:</strong> ${r.rating}/5</p>

<p><strong>💬 Review:</strong> ${r.review}</p>

<p>

<strong>Verified:</strong>

${r.verified ? "✅ Yes" : "❌ No"}

</p>

${
r.ownerReply
?

`<p><strong>Owner Reply:</strong> ${r.ownerReply}</p>`

:

""
}

<div class="action-buttons">

<button

class="delete delete-review"

data-id="${documentSnapshot.id}">

🗑 Delete

</button>

</div>

</div>

`;

        });

        avgRating.textContent=(total/snapshot.size).toFixed(1);

    });

}

/*==========================================
MESSAGES
==========================================*/

function loadMessages(){

    const messageQuery=query(

        collection(db,"contactMessages"),

        orderBy("created","desc")

    );

    onSnapshot(messageQuery,(snapshot)=>{

        messagesContainer.innerHTML="";

        if(snapshot.empty){

            messagesContainer.innerHTML=`

<div class="data-box">

<h3>No Messages Yet</h3>

</div>

`;

            return;

        }

        snapshot.forEach(documentSnapshot=>{

            const m=documentSnapshot.data();

            messagesContainer.innerHTML+=`

<div class="data-box">

<h3>👤 ${m.name}</h3>

<p><strong>📞 Phone:</strong> ${m.phone}</p>

<p><strong>📧 Email:</strong> ${m.email}</p>

<p><strong>🎉 Event:</strong> ${m.event}</p>

<p><strong>📅 Date:</strong> ${m.date}</p>

<p><strong>📝 Message:</strong></p>

<p>${m.message}</p>

<div class="action-buttons">

<a href="tel:${m.phone}">

<button class="confirm">

📞 Call

</button>

</a>

<a

href="https://wa.me/91${m.phone}"

target="_blank">

<button class="reply">

💬 WhatsApp

</button>

</a>

<a href="mailto:${m.email}">

<button class="verify">

📧 Email

</button>

</a>

<button

class="delete delete-message"

data-id="${documentSnapshot.id}">

🗑 Delete

</button>

</div>

</div>

`;

        });

    });

}

/*==========================================
DELETE REVIEW / MESSAGE
==========================================*/

document.addEventListener("click",async(e)=>{

    const id=e.target.dataset.id;

    if(!id) return;

    if(e.target.classList.contains("delete-review")){

        if(!confirm("Delete this review?")) return;

        await deleteDoc(

            doc(db,"reviews",id)

        );

    }

    if(e.target.classList.contains("delete-message")){

        if(!confirm("Delete this inquiry?")) return;

        await deleteDoc(

            doc(db,"contactMessages",id)

        );

    }

});