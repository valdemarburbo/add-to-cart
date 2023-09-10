import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-c8093-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "items")

onValue(itemsInDB, (snapshot) => {
        if (snapshot.exists()) {
            let itemsArray = Object.entries(snapshot.val())

            clearShoppingListEl()
            
            for (let i = 0; i < itemsArray.length; i++) {
                let currentItem = itemsArray[i]
    
                appendItemToShoppingListEl(currentItem);
            }
        } else {
            clearShoppingListEl()

            let newP = document.createElement("p")
            newP.textContent = "No items here... yet."
            newP.classList.add("no-items")

            shoppingListEl.append(newP)
        }
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

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputEl() {
    inputEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    newEl.addEventListener("click", () => {
        let exactLocationOfItemInDB = ref(database, `items/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)
}