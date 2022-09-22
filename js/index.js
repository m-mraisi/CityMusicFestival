localStorage.clear()

// const buyTicket = () => {
//     // console.log(ticketType,typeIndex,ticketPrice);
//     const ticket = {
//         "ticketType":ticketType,
//         "ticketPrice":parseInt(ticketPrice)
//     }
//     console.log(ticket)
//     localStorage.clear()
//     localStorage.setItem('ticket',JSON.stringify(ticket))
//     window.location.href = "../ticket.html";
//     console.log("button pressed");
//     return false;
// }



document.querySelector("#btn-allAccess-buy").addEventListener("click",()=>{
    localStorage.clear()
    const ticket = {
        "ticketType":1,
        "ticketPrice":375
    }
    localStorage.setItem('ticket',JSON.stringify(ticket));
    window.location.href = "/Project-G05/ticket.html";
    // in windows ../ticket.html does not work.
})

// document.querySelector("#btn-allAccess-buy").addEventListener("click",buyTicket())
// document.querySelector('#btn-goldPass-buy').addEventListener('click',buyTicket("gold",1,690))
// document.querySelector('#btn-VIP-buy').addEventListener('click',buyTicket("VIP",2,1250))
