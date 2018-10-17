let searchButton = document.getElementById('searchButton')
let inputBox = document.getElementById('inputBox')
let displayOrder = document.getElementById('displayOrder')
let deleteButton = document.getElementById('deleteButton')
let ordersDiv = document.getElementById('ordersDiv')

const COFFEE_ORDER = "http://dc-coffeerun.herokuapp.com/api/coffeeorders/"

fetch(COFFEE_ORDER)
  .then(function(data) {
    return data.json()})
  .then(function(dataObjects) {
    console.log(dataObjects)

let count = 1
    for(var value in dataObjects) {
      let orders = `
      <tr>
      <th id="thRow" scope="row"><button id="${count}"><Strong>Delete</strong></button>${count}</th>
      <td>${dataObjects[value].emailAddress}</td>
      <td>${dataObjects[value].coffee}</td>
      <td>${dataObjects[value].size}</td>
      <td>${dataObjects[value].flavor}</td>
      <td>${dataObjects[value].strength}</td>
      </tr>
      `
      displayOrder.insertAdjacentHTML('beforeend',orders)



      let delButton = document.getElementById(count)

      const DELETE_ORDER_LINK = "http://dc-coffeerun.herokuapp.com/api/coffeeorders/" + dataObjects[value].emailAddress
      delButton.addEventListener('click',function(){
           fetch(DELETE_ORDER_LINK, {method:'DELETE'})
           displayOrder.removeChild(this.parentElement.parentElement)

      })
count++

    }

searchButton.addEventListener('click',function(){
  displayOrder.innerHTML = ""
  let emailAddress = inputBox.value
  const FILTERED_EMAIL = "http://dc-coffeerun.herokuapp.com/api/coffeeorders/" + emailAddress

  fetch(FILTERED_EMAIL)
    .then(function(data) {
      return data.json()})
    .then(function(dataObjects) {
      console.log(dataObjects)


        let orders = `
        <tr id="ordersDiv">
        <th id="delButtonDiv" scope="row"><button id="delFilteredButton"><Strong>Delete</strong></button>1</th>
        <td>${dataObjects.emailAddress}</td>
        <td>${dataObjects.coffee}</td>
        <td>${dataObjects.size}</td>
        <td>${dataObjects.flavor}</td>
        <td>${dataObjects.strength}</td>
        </tr>
        `
        displayOrder.insertAdjacentHTML('beforeend',orders)



              let delFilteredButton = document.getElementById('delFilteredButton')


              delFilteredButton.addEventListener('click',function(){
                const DELETE_ORDER_LINK = "http://dc-coffeerun.herokuapp.com/api/coffeeorders/" + this.parentElement.parentElement.children[1].innerHTML//dataObjects.emailAddress
                   fetch(DELETE_ORDER_LINK, {method:'DELETE'})
                   displayOrder.removeChild(this.parentElement.parentElement)

              })



      })

})

})
fetch(COFFEE_ORDER, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ // converting object to string
    emailAddress: 'Good_Morning@y\'all.com',
    coffee: 'Milky Coffee',
    size: 'jumbo',
    flavor: 'caremel',
    strength: '68'
  })
})


  // fetch closing
