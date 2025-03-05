document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".needs-validation");
    const ratingInputs = document.querySelectorAll('input[name="review[rating]"]');
    const commentInput = document.getElementById("comment");
    const stars = document.querySelectorAll(".star-label");

    // ⭐ Add Click Event to Each Star Label
    stars.forEach((star, index) => {
        star.addEventListener("click", function () {
            ratingInputs[index].checked = true; // Set the corresponding radio button
            highlightStars(index + 1);
        });
    });

    // 🔥 Function to Highlight Stars on Selection
    function highlightStars(rating) {
        stars.forEach((star, index) => {
            star.style.color = index < rating ? "gold" : "gray";
        });
    }

    // 🛑 Form Validation Before Submission
    form.addEventListener("submit", function (event) {
        let valid = true;
        let ratingSelected = [...ratingInputs].some(input => input.checked);

        if (!ratingSelected) {
            valid = false;
            alert("Please select a rating before submitting.");
        }

        if (commentInput.value.trim().length < 3) {
            valid = false;
            alert("Comment must be at least 3 characters long.");
        }

        if (!valid) {
            event.preventDefault();
        }
    });
});
