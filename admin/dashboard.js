import {
    auth,
    onAuthStateChanged,
    signOut,

    db,
    collection,
    onSnapshot,
    query,
    orderBy,
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

document.getElementById("logoutBtn")

.addEventListener("click",async()=>{

    await signOut(auth);

    window.location.href="../login.html";

});

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

        pageTitle.textContent=item.textContent.trim();

    };

});

/*==========================================
LOAD DASHBOARD
==========================================*/

function loadDashboard(){

    loadBookings();

    loadReviews();

}

/*==========================================
BOOKINGS
==========================================*/

function loadBookings(){


    const recentBookings=document.getElementById("recentBookings");
    const bookingTable=document.getElementById("bookingTable");

    const totalBookings=document.getElementById("totalBookings");

    const pendingBookings=document.getElementById("pendingBookings");

    const bookingQuery=query(

        collection(db,"bookings"),

        orderBy("created","desc")

    );

    onSnapshot(bookingQuery,(snapshot)=>{

        bookingTable.innerHTML="";

        recentBookings.innerHTML="";

        totalBookings.textContent=snapshot.size;

        let pending=0;

        snapshot.forEach(doc=>{

            recentBookings.innerHTML += `

<div class="recent-item">

<h4>${b.customerName}</h4>

<p>

${b.eventType}

•

${b.eventDate}

</p>

</div>

`;

            const b=doc.data();

            if(b.status==="Pending") pending++;

            bookingTable.innerHTML += `

<div class="data-box">

<h3>👤 ${b.customerName}</h3>

<p><strong>📞 Phone:</strong> ${b.customerPhone || "-"}</p>

<p><strong>📧 Email:</strong> ${b.customerEmail || "-"}</p>

<p><strong>🆔 Booking ID:</strong> ${b.bookingId}</p>

<p><strong>🎉 Event:</strong> ${b.eventType}</p>

<p><strong>📅 Event Date:</strong> ${b.eventDate}</p>

<p><strong>📍 Venue:</strong> ${b.venue || "-"}</p>

<p><strong>💰 Budget:</strong> ₹${b.budget || 0}</p>

<p><strong>📝 Message:</strong> ${b.message || "No message provided"}</p>

<p><strong>📌 Status:</strong>
<span style="
padding:6px 12px;
border-radius:20px;
font-weight:600;
background:${
    b.status==="Confirmed"
    ?"#22C55E"
    :b.status==="Cancelled"
    ?"#EF4444"
    :"#F59E0B"
};
color:#fff;">
${b.status}
</span>
</p>

<div class="action-buttons">

<a href="tel:${b.customerPhone}">
<button class="confirm">
📞 Call
</button>
</a>

<a href="https://wa.me/91${b.customerPhone}" target="_blank">
<button class="reply">
💬 WhatsApp
</button>
</a>

<a href="mailto:${b.customerEmail}">
<button class="verify">
📧 Email
</button>
</a>

<button class="confirm confirm-booking"
data-id="${doc.id}">
✅ Confirm
</button>

<button class="cancel cancel-booking"
data-id="${doc.id}">
❌ Cancel
</button>

<button class="delete delete-booking"
data-id="${doc.id}">
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
REVIEWS
==========================================*/

function loadReviews(){

    const reviewTable = document.getElementById("reviewTable");

    const recentReviews = document.getElementById("recentReviews");

    const totalReviews = document.getElementById("totalReviews");

    const avgRating = document.getElementById("avgRating");

    const reviewQuery = query(

        collection(db,"reviews"),

        orderBy("created","desc")

    );

    onSnapshot(reviewQuery,(snapshot)=>{

        reviewTable.innerHTML = "";

        recentReviews.innerHTML = "";

        totalReviews.textContent = snapshot.size;

        let total = 0;

        snapshot.forEach(doc=>{

            const r = doc.data();

            total += Number(r.rating) || 0;

            // ===== Dashboard Review Card =====

            reviewTable.innerHTML += `

<div class="data-box">

<h3>👤 ${r.name}</h3>

<p><strong>🎉 Event:</strong> ${r.event}</p>

<p><strong>⭐ Rating:</strong> ${r.rating}/5</p>

<p><strong>💬 Review:</strong> ${r.review}</p>

<p><strong>✅ Verified:</strong> ${r.verified ? "Yes" : "No"}</p>

${
r.ownerReply
?

`<p><strong>🏢 Owner Reply:</strong> ${r.ownerReply}</p>`

:

""

}

</div>

`;

            // ===== Recent Reviews Panel =====

            recentReviews.innerHTML += `

<div class="recent-item">

<h4>${r.name}</h4>

<p>

⭐ ${r.rating} • ${r.event}

</p>

</div>

`;

        });

        avgRating.textContent =

            snapshot.size

            ?

            (total / snapshot.size).toFixed(1)

            :

            "0.0";

    });

}
document.addEventListener("click", async (e) => {

    const id = e.target.dataset.id;

    if (!id) return;

    if (e.target.classList.contains("confirm-booking")) {

        await updateDoc(doc(db, "bookings", id), {
            status: "Confirmed"
        });

    }

    if (e.target.classList.contains("cancel-booking")) {

        await updateDoc(doc(db, "bookings", id), {
            status: "Cancelled"
        });

    }

    if (e.target.classList.contains("delete-booking")) {

        if (!confirm("Delete this booking?")) return;

        await deleteDoc(doc(db, "bookings", id));

    }

});