const generateBtn = document.getElementById("generate-btn")
const passwordBox1 = document.getElementById("password-one")
const passwordBox2 = document.getElementById("password-two")
const includeUppercase = document.getElementById("include-uppercase")
const includeLowercase = document.getElementById("include-lowercase")
const includeNumbers = document.getElementById("include-numbers")
const includeSymbols = document.getElementById("include-symbols")

const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowercase = "abcdefghijklmnopqrstuvwxyz"
const numbers = "1234567890"
const symbols = "!@#$%^&*()_+~"


function getRandomCharacter(pool) {
    const randomIndex = Math.floor(Math.random() * pool.length)
    return pool[randomIndex]
}

// Event listener for the Generate button
generateBtn.addEventListener("click", function() {
    let password1 = ""
    let password2 = ""

    const minPassLength = 4
    const maxPassLength = 25
    let passwordLength = Number(document.getElementById("password-length").value)

    // Clamps password length between the minimum and maximum values
    passwordLength = Math.min(Math.max(passwordLength, minPassLength), maxPassLength)
    document.getElementById("password-length").value = passwordLength


    // Builds character array based on the users selected checkboxes
    let characterArray = []

    if (includeUppercase.checked) characterArray = characterArray.concat(...uppercase)
    if (includeLowercase.checked) characterArray = characterArray.concat(...lowercase)
    if (includeNumbers.checked) characterArray = characterArray.concat(...numbers)
    if (includeSymbols.checked) characterArray = characterArray.concat(...symbols)

    // Prevents password generation if no checkboxes are selected
    if (characterArray.length === 0) {
        alert("Please select at least one character type!")
        return
    }

    for (let i = 0; i < passwordLength; i++) {
        password1 += getRandomCharacter(characterArray)
        password2 += getRandomCharacter(characterArray)
    }

    passwordBox1.textContent = password1
    passwordBox2.textContent = password2


    const strengthStatus = document.getElementById("strength-status")
    const strength = passwordStrength(password1)
    strengthStatus.textContent = strength

    // Changes the colour of the text based on the strength value
    const strengthColors = {
        "Weak": "red",
        "Medium": "orange",
        "Strong": "limegreen"
    }

    strengthStatus.style.color = strengthColors[strength]

})

// Allows the user to copy password to clipboard when clicked
function copyPassword(el, msg) {
    navigator.clipboard.writeText(el.textContent)
    alert(msg)
}

passwordBox1.addEventListener("click", () => copyPassword(passwordBox1, "Password 1 Copied!"))
passwordBox2.addEventListener("click", () => copyPassword(passwordBox2, "Password 2 Copied!"))




function passwordStrength(password) {
    let score = 0

    if(password.length >= 8) score += 1
    if(password.length >= 12) score += 1
    if(/[A-Z]/.test(password)) score += 1
    if(/[a-z]/.test(password)) score += 1
    if(/[0-9]/.test(password)) score += 1
    if(/[\!\@\#\$\%\^\&\*\(\)\_\+\~]/.test(password)) score += 1

    if (score <= 2) return "Weak"
    if (score <= 4) return "Medium"
    return "Strong"
}