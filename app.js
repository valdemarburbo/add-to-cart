import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-c8093-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "items")

onValue(itemsInDB, (snapshot) => {
        let itemsArray = Object.values(snapshot.val())

        let itemList = ""

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            itemList += `<li>${currentItem}</li>`
        }

        shoppingListEl.innerHTML = itemList
    })

const buttonEl = document.getElementById("add-button")
const inputEl = document.getElementById("input-field")
const shoppingListEl = document.getElementById("shopping-list")

buttonEl.addEventListener("click", function () {
    let inputValue = inputEl.value

    push(itemsInDB, inputValue)

    clearInputEl()

    // appendItemToShoppingListEl(inputValue) 
})

function clearInputEl() {
    inputEl.value = ""
}

// function appendItemToShoppingListEl(itemValue) {
//     shoppingListEl.innerHTML += `<li>${itemValue}</li>`
// }