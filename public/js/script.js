if (window.innerWidth > 750) {
    document.querySelectorAll(".card-").forEach((card) => {
      const heart = card.querySelector(".fa-btn");
      heart.style.display = "none";
      // Add click event listener only once
      heart.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.replace("https://www.google.com");
      });
      card.addEventListener("mouseenter", () => {
        heart.style.display = "block";
      });
      card.addEventListener("mouseleave", () => {
        heart.style.display = "none";
      });
    });
  }