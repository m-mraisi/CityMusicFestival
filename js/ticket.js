//Project-G05  Mahmoud Mraisi - 101432902  & Jacob Belizario 101411589

const getTicket = ()=>{
    document.querySelector("#div-details-container").style.display = "none"; // to hide the ticket details, when tehre's no input yet from the user
    const ticket = JSON.parse(localStorage.getItem("ticket")); // to get the ticket object from the localStorage
    console.log(ticket);
    const ticketType = ticket.ticketType;
    const ticketPrice  = ticket.ticketPrice;
    // document.querySelector("#ticketType").selectedIndex  = ticketType;
    document.querySelector("#span-ticketPrice").innerText = `$0` // to set the default price to zero 
}

const purchaseDetails = ()=>{
    for (elem of document.querySelectorAll("p.error")){ elem.innerText = ""}; // to clear all error outputs
    document.querySelector("#input-email").setAttribute('readonly', true) // make the email by default readonly
    const checkData = validateOrder(); // to validate the data
    if(checkData){
        const getDiscount = applyDiscount() // this function checks the discount if it's correct and return the amount
        const ticket = JSON.parse(localStorage.getItem("ticket")); // to get the ticket object from the localStorage
        document.querySelector("#span-numberOfTickets").innerText = `${document.querySelector("#input-ticketQty").value}`; //to change the number of tickets on teh details container
        document.querySelector("#span-discount").innerText = `-$${getDiscount.amount}` //to change the discount value on teh ticket details container
        const subtotal = parseInt(document.querySelector("#input-ticketQty").value) * parseInt(ticket.ticketPrice) - Number(getDiscount.amount); // to get teh subtotal
        document.querySelector("#span-subtotal").innerText = `$${subtotal}` // to apply the subtotal to the ticket details container
        const tax = subtotal * 0.13
        document.querySelector("#span-tax").innerText = `$${tax}` // display the tax amount on teh ticket details container 
        document.querySelector("#span-total").innerText = `$${subtotal + tax}`
        document.querySelector("main").style.marginTop = "1%" // stretch the tickets block to the top to make space for the ticket details block
        document.querySelector("#div-details-container").style.display = "block"; // is to show the ticket details container
        return true;
    }
    return false;

}

const applyDiscount = ()=>{// this function checks the discount if it's correct and return the amount
    const discountCode =  document.querySelector("#input-discount").value; // get's the value from the promo Code textbox
    const ticket = JSON.parse(localStorage.getItem("ticket")); // get the ticket object from teh localstorage
    document.querySelector("#span-coupon-applied").innerText = "" // to clear the coupon applied span
    document.querySelector("#span-error-coupon").innerText = ""// to clear the coupon error span
    console.log(discountCode);
    if(String(discountCode) === 'MUSIC20'){ // cehcks if the coupon is valid
        const discount = {
            "status":true,
            "amount":parseInt(document.querySelector("#input-ticketQty").value) * parseInt(ticket.ticketPrice) * 0.2 // apply the discount amount 20%
        }
        document.querySelector("#span-coupon-applied").innerText = "Coupon applied!" // display the span "coupon applied"
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
    document.querySelector("main").style.marginTop = "8%" // to shift down the main container to be in teh center of the page
    document.querySelector("#div-details-container").style.display = "none"; // to hide the details contrainer
    for (elem of document.querySelectorAll("p.error")){ elem.innerText = ""} // to clear all the error messages
    const ticket = JSON.parse(localStorage.getItem("ticket")); // to get the ticket object
    const selectedTicket = document.querySelector("#ticketType").selectedIndex; // check the ticket type index
    if(selectedTicket == 0){ // display the ticket price based on teh ticket type
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
    localStorage.setItem("ticket",JSON.stringify(ticket)) // apply price changes to the tikcet object on the localStorage
    return true;
}

const validateOrder = ()=>{ // this is to validate the user inputs for any errors
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

const checkDiscountCode = ()=>{ // check the discount appolied 
    const getDiscount = applyDiscount();
    const updatePurchase  = purchaseDetails();
    if(!getDiscount.status){
        document.querySelector("#span-error-coupon").innerText = "ERROR: Invalid coupon!"
    }
}

const checkOrderSummary = ()=>{ // validate the order summary "email, and the make sure that the user have accpeted the terms"
    const email = document.querySelector("#input-email").value;
    const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; // email pattern
    if(document.querySelector("#input-radio-email").checked && !email.match(regEmail)){
        alert("Please enter a valid email address for the delivery method!")
        return false;
    }
    else if(!document.querySelector("#input-terms").checked){
        alert("Please accept terms and conditions")
        return false;
    }
    alert("You're purchase successfully has been booked!")
    return true; // booked!
}

const disableEmail = ()=>{ // to disable/enable email textbox based on teh radio button input 
    if(document.querySelector("#input-radio-email").checked){
        document.querySelector("#input-email").removeAttribute('readonly')
    }
    else{
        document.querySelector("#input-email").value = ""
        document.querySelector("#input-email").setAttribute('readonly', true)
    }
}

document.querySelector("#btn-reviewPurchase").addEventListener("click",purchaseDetails) // will run the purchase detials on clikcing the review purchase button

document.querySelector("#ticketType").onchange = ticketPrice; // chnages the price tag when the selected ticket changes


document.addEventListener('DOMContentLoaded',getTicket); // runs when the browser finishes loading the HTML on the page


document.querySelector("#btn-ConfirmPurchase").addEventListener("click",checkOrderSummary) // check the order summary

document.querySelector("#btn-applyDiscount").addEventListener("click", checkDiscountCode) // check the code applied for discount

