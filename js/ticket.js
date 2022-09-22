

const getTicket = ()=>{
    document.querySelector("#div-details-container").style.display = "none";
    const ticket = JSON.parse(localStorage.getItem("ticket"));
    console.log(ticket);
    const ticketType = ticket.ticketType;
    const ticketPrice  = ticket.ticketPrice;
    // document.querySelector("#ticketType").selectedIndex  = ticketType;
    document.querySelector("#span-ticketPrice").innerText = `$0`
}

const purchaseDetails = ()=>{
    for (elem of document.querySelectorAll("p.error")){ elem.innerText = ""};
    document.querySelector("#input-email").setAttribute('readonly', true) // make the email by default readonly
    const checkData = validateOrder();
    if(checkData){
        const getDiscount = applyDiscount()
        const ticket = JSON.parse(localStorage.getItem("ticket"));
        document.querySelector("#span-numberOfTickets").innerText = `${document.querySelector("#input-ticketQty").value}`;
        document.querySelector("#span-discount").innerText = `-$${getDiscount.amount}`
        const subtotal = parseInt(document.querySelector("#input-ticketQty").value) * parseInt(ticket.ticketPrice) - Number(getDiscount.amount);
        document.querySelector("#span-subtotal").innerText = `${subtotal}`
        const tax = subtotal * 0.13
        document.querySelector("#span-tax").innerText = `${tax}`
        document.querySelector("#span-total").innerText = `${subtotal + tax}`
        document.querySelector("#div-details-container").style.display = "block";
        return true;
    }
    return false;

}

const applyDiscount = ()=>{
    const discountCode =  document.querySelector("#input-discount").value;
    const ticket = JSON.parse(localStorage.getItem("ticket"));
    document.querySelector("#span-coupon-applied").innerText = ""
    document.querySelector("#span-error-coupon").innerText = ""
    console.log(discountCode);
    if(String(discountCode) === 'MUSIC20'){
        const discount = {
            "status":true,
            "amount":parseInt(document.querySelector("#input-ticketQty").value) * parseInt(ticket.ticketPrice) * 0.2,
        }
        document.querySelector("#span-coupon-applied").innerText = "Coupon applied!"
        return discount
    }
    else{
        const discount = {
            "status":false,
            "amount":0,
        }
        return discount
    }
}


const ticketPrice = ()=>{
    document.querySelector("#div-details-container").style.display = "none";
    for (elem of document.querySelectorAll("p.error")){ elem.innerText = ""}
    const ticket = JSON.parse(localStorage.getItem("ticket"));
    const selectedTicket = document.querySelector("#ticketType").selectedIndex;
    if(selectedTicket == 0){
        document.querySelector("#span-ticketPrice").innerText = `$0`
    }
    else if (selectedTicket == 1){
        document.querySelector("#span-ticketPrice").innerText = `$375`
        ticket.ticketType == 1
        ticket.ticketPrice = 375
    }
    else if (selectedTicket == 2){
        document.querySelector("#span-ticketPrice").innerText = `$690`
        ticket.ticketType == 2
        ticket.ticketPrice = 690
    }
    else if (selectedTicket == 3){
        document.querySelector("#span-ticketPrice").innerText = `$1250`
        ticket.ticketType == 3
        ticket.ticketPrice = 1250
    }
    localStorage.setItem("ticket",JSON.stringify(ticket))
    return true;
}

const validateOrder = ()=>{
    const ticketType = parseInt(document.querySelector("#ticketType").selectedIndex);
    const tikcetQty = parseInt(document.querySelector("#input-ticketQty").value);
    if(ticketType === 0){ // check if a valid ticket type is selected
        document.querySelector("#error-ticketType").innerText = "ERROR: Please select ticket type!"
        return false;
    }
    else if(tikcetQty === 0 || Math.sign(tikcetQty) === -1){
        document.querySelector("#error-ticketQty").innerText =  "ERROR: Please enter a valid quantity!"
        return false;
    }
    return true;
}

const checkDiscountCode = ()=>{
    const getDiscount = applyDiscount();
    const updatePurchase  = purchaseDetails();
    if(!getDiscount.status){
        document.querySelector("#span-error-coupon").innerText = "ERROR: Invalid coupon!"
    }
}

const checkOrderSummary = ()=>{
    const email = document.querySelector("#input-email").value;
    const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; // email pattern
    if(document.querySelector("#input-radio-email").checked && !email.match(regEmail)){
        alert("Please enter a valid email address for the delivery method!")
    }
    else if(!document.querySelector("#input-terms").checked){
        alert("Please accept terms and conditions")
    }
    return true; // booked!
}

document.querySelector("#btn-reviewPurchase").addEventListener("click",purchaseDetails) // will run the purchase detials on clikcing the review purchase button

document.querySelector("#ticketType").onchange = ticketPrice; // chnages the price tag when the selected ticket changes


document.addEventListener('DOMContentLoaded',getTicket); // runs when the browser finishes loading the HTML on the page


document.querySelector("#btn-ConfirmPurchase").addEventListener("click",checkOrderSummary) // check the order summary

document.querySelector("#btn-applyDiscount").addEventListener("click", checkDiscountCode) // check the code applied for discount

const disableEmail = ()=>{
    if(document.querySelector("#input-radio-email").checked){
        document.querySelector("#input-email").removeAttribute('readonly')
    }
    else{
        document.querySelector("#input-email").value = ""
        document.querySelector("#input-email").setAttribute('readonly', true)
    }
}