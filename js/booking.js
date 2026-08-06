import {

db,

collection,

addDoc,

serverTimestamp

} from "./firebase.js";

const form=document.getElementById("bookingForm");

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const btn=form.querySelector("button");

btn.disabled=true;

btn.innerHTML=`

<i class="fa-solid fa-spinner fa-spin"></i>

Booking...

`;

try{

const bookingId=

"VE-"+

Math.floor(100000+Math.random()*900000);

await addDoc(

collection(db,"bookings"),

{

bookingId,

customerName:

document.getElementById("customerName").value,

customerEmail:

document.getElementById("customerEmail").value,

customerPhone:

document.getElementById("customerPhone").value,

eventType:

document.getElementById("eventType").value,

eventDate:

document.getElementById("eventDate").value,

venue:

document.getElementById("venue").value,

budget:

document.getElementById("budget").value,

message:

document.getElementById("message").value,

status:"Pending",

created:serverTimestamp()

}

);

form.reset();

btn.disabled=false;

btn.innerHTML=`

<i class="fa-solid fa-calendar-check"></i>

Book Event

`;

alert(

"🎉 Booking Submitted Successfully\n\nBooking ID: "+bookingId

);

}

catch(err){

console.error(err);

btn.disabled=false;

btn.innerHTML=`

<i class="fa-solid fa-calendar-check"></i>

Book Event

`;

alert("❌ Booking Failed");

}

});
