const form= document.querySelector('.form')
const table=document.querySelector('.table')
const addRows= document.querySelector('.add-rows')
const reasonInput= document.querySelector('#reason')
const dateInput= document.querySelector('#date')
const amountInput= document.querySelector('#amount')

const submitBtn= document.querySelector('.submit-btn')

const displayText= document.querySelector('.display-text')
const clearBtn= document.querySelector('.clear-btn')

const alert= document.querySelector('.alert')

const totalContainer= document.querySelector('.total-container')
////////// EVENT LISTNERS///////

form.addEventListener('submit', recordExpense)
window.addEventListener('DOMContentLoaded', setupPrevInputs)

// ///FUNCTIONS
let count =1

// FUNCTION THAT CHECKS IF INPUT IS MADE AND THEN TAKES THE RECORD
function recordExpense(e){
 e.preventDefault()
 let reasonValue=reasonInput.value
 let dateValue=dateInput.value
 let amountValue=amountInput.value
 const  ID= new Date().getTime().toString()
 if(reasonValue && dateValue && amountValue){
  createTable(ID,reasonValue,dateValue,amountValue)
  displayText.classList.add('hide-display-text')
  clearBtn.classList.add('show-clear-btn')
  totalContainer.classList.add('show-total-container')
  displayAlert('new expense entered', 'success')
  setBackToDefault();
  addToLocalStorage(ID, reasonValue, dateValue, amountValue);
  addTotal()
 }
 
}
// FUNCTION TO CREATE NEW TABLE ROW AS INPUT IS ADDED
function createTable(id,reason,date,amount){
   const tableROW=document.createElement('tr')
 let attr = document.createAttribute("data-id");
 let tableClass= document.createAttribute('class')
 tableClass.value='table-class'
 tableROW.setAttributeNode(tableClass)
 attr.value = id;
 tableROW.setAttributeNode(attr);
 tableROW.innerHTML = `   <td>${count++}</td>
   <td class="data-2">${reason}</td>
   <td>${date}</td>
   <td>${amount}</td>`;
   
   table.appendChild(tableROW)
   // CLEAR BUTTON FUNCTIONALITY///


   clearBtn.addEventListener("click", function () {
     let details = getLocalStorageValues();
     let allNewRows = table.querySelectorAll(".table-class");
     allNewRows = allNewRows.forEach(function (newrows) {
       table.removeChild(newrows);
     });
      displayText.classList.remove("hide-display-text");
      clearBtn.classList.remove("show-clear-btn");
      totalContainer.classList.remove("show-total-container");
     localStorage.removeItem('details')
   });
}

// ALERT FUNCTION
function displayAlert(value,operation){
 alert.textContent=value
 alert.classList.add(`alert-${operation}`)
 setTimeout(function(){
  alert.textContent = '';
  alert.classList.remove(`alert-${operation}`);
 },1000)
}

// SET FORM BACK TO DEFAULT
 function setBackToDefault(){
  reasonInput.value= ''
  amountInput.value= ''
  dateInput.value=''
 }

//  ADD INPUTS TO LOCAL STORAGE

function addToLocalStorage(id,reason,date,amount){
   let values = { id, reason, date, amount };
   let details=getLocalStorageValues()

   details.push(values)
   localStorage.setItem('details',JSON.stringify(details))
}

// SET UP INPUTS FROM LOCALSTORAGE TO APPEAR ON LOAD
function setupPrevInputs(){
   let details= getLocalStorageValues()
   if(details.length>0){
      details = details.forEach(function (detail) {
        createTable(detail.id, detail.reason, detail.date, detail.amount);
      });
      displayText.classList.add("hide-display-text");
      clearBtn.classList.add("show-clear-btn");
      totalContainer.classList.add("show-total-container");
      addTotal();
   }
   
}
// GET INPUTS FROM LOCALSTORAGE
function getLocalStorageValues(){
 return localStorage.getItem("details")?JSON.parse(localStorage.getItem("details")):[];
}

// FUNCTION TO OUTPUT TOTAL EXPENSES
function addTotal(){
 let details= getLocalStorageValues()
 details= details.reduce(function(total, detail){
  total+=parseFloat(detail.amount)
  let textValue=`you have spent ${total} so far`
  let text= totalContainer.firstElementChild
  text.innerHTML=textValue


  return total
 },0)
}



