// Project-G05 Mahmoud Mraisi - 101432902  & Jacob Belizario 101411589

localStorage.clear()

document.querySelector("#btn-allAccess-buy").addEventListener("click",()=>{
    localStorage.clear()
    const ticket = {
        "ticketType":1,
        "ticketPrice":375
    }
    localStorage.setItem('ticket',JSON.stringify(ticket));
    window.location.href = "./ticket.html";
})

document.querySelector("#btn-goldPass-buy").addEventListener("click",()=>{
    localStorage.clear()
    const ticket = {
        "ticketType":2,
        "ticketPrice":690
    }
    localStorage.setItem('ticket',JSON.stringify(ticket));
    window.location.href = "./ticket.html";
})

document.querySelector("#btn-VIP-buy").addEventListener("click",()=>{
    localStorage.clear()
    const ticket = {
        "ticketType":3,
        "ticketPrice":1250
    }
    localStorage.setItem('ticket',JSON.stringify(ticket));
    window.location.href = "./ticket.html";
})