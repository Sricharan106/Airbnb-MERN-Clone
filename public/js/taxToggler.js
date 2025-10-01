  const taxToggler = document.querySelector("#switchCheckReverse");
  let taxInfos = document.querySelectorAll(".tax-info");
  taxToggler.addEventListener("click", () => {
    for (taxInfo of taxInfos) {
      if (taxInfo.style.display === "inline") {
        taxInfo.style.display = "none";
      } else {
        taxInfo.style.display = "inline";
      }
    }
  });