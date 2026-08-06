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

const bookingContainer = document.getElementById("bookingContainer");

const bookingQuery = query(
    collection(db, "bookings"),
    orderBy("created", "desc")
);

onSnapshot(bookingQuery, (snapshot) => {

    bookingContainer.innerHTML = "";

    snapshot.forEach((docSnap) => {

        const booking = {
            id: docSnap.id,
            ...docSnap.data()
        };

        bookingContainer.innerHTML += `

<div class="booking-card">

<h3>${booking.customerName}</h3>

<p><strong>Booking ID:</strong> ${booking.bookingId}</p>

<p><strong>Email:</strong> ${booking.customerEmail}</p>

<p><strong>Phone:</strong> ${booking.customerPhone}</p>

<p><strong>Event:</strong> ${booking.eventType}</p>

<p><strong>Date:</strong> ${booking.eventDate}</p>

<p><strong>Venue:</strong> ${booking.venue}</p>

<p><strong>Budget:</strong> ₹${booking.budget}</p>

<p><strong>Message:</strong> ${booking.message || "-"}</p>

<span class="booking-status ${booking.status.toLowerCase()}">
${booking.status}
</span>

<div class="booking-actions">

<button
class="confirm-btn"
data-id="${booking.id}">
Confirm
</button>

<button
class="cancel-btn"
data-id="${booking.id}">
Cancel
</button>

<button
class="delete-btn"
data-id="${booking.id}">
Delete
</button>

</div>

</div>

`;

    });

});


/*==============================
BUTTONS
==============================*/

document.addEventListener("click", async (e) => {

    const id = e.target.dataset.id;

    if (!id) return;

    // Confirm Booking
    if (e.target.classList.contains("confirm-btn")) {

        await updateDoc(
            doc(db, "bookings", id),
            {
                status: "Confirmed"
            }
        );

        alert("✅ Booking Confirmed");

    }

    // Cancel Booking
    if (e.target.classList.contains("cancel-btn")) {

        await updateDoc(
            doc(db, "bookings", id),
            {
                status: "Cancelled"
            }
        );

        alert("❌ Booking Cancelled");

    }

    // Delete Booking
    if (e.target.classList.contains("delete-btn")) {

        if (!confirm("Delete this booking?")) return;

        await deleteDoc(
            doc(db, "bookings", id)
        );

        alert("🗑 Booking Deleted");

    }

});