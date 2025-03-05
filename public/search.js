function showSuggestions() {
    let suggestions = ["New York", "Los Angeles", "Paris", "London", "Tokyo"];
    let input = document.getElementById("location").value.toLowerCase();
    let suggestionsBox = document.getElementById("suggestions");
    
    suggestionsBox.innerHTML = "";
    if (input.length > 0) {
        let matches = suggestions.filter(city => city.toLowerCase().includes(input));
        matches.forEach(city => {
            let div = document.createElement("div");
            div.classList.add("p-2", "hover:bg-gray-200", "cursor-pointer");
            div.innerText = city;
            div.onclick = () => {
                document.getElementById("location").value = city;
                suggestionsBox.classList.add("hidden");
            };
            suggestionsBox.appendChild(div);
        });
        suggestionsBox.classList.remove("hidden");
    } else {
        suggestionsBox.classList.add("hidden");
    }
}

function search() {
    let location = document.getElementById("location").value;
    let checkin = document.getElementById("checkin").value;
    let checkout = document.getElementById("checkout").value;
    let guests = document.getElementById("guests").value;
    
    console.log(`Searching for: ${location}, Check-in: ${checkin}, Check-out: ${checkout}, Guests: ${guests}`);
}