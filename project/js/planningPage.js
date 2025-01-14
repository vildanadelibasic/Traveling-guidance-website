function rate() {
  const stars = document.querySelectorAll(".rating-container .star");
  const ratingMessage = document.getElementById("ratingMessage");

  stars.forEach((star) => {
    star.addEventListener("click", function () {
      const rating = this.getAttribute("data-value");
      stars.forEach((s) => s.classList.remove("selected"));
      for (let i = 0; i < rating; i++) {
        stars[i].classList.add("selected");
      }
      ratingMessage.textContent = `Thanks for the ${rating} star rating!`;
    });
  });
}

function searchHotels() {
  const locationSearchButton = document.getElementById("locationSearchButton");
  const locationSearchInput = document.getElementById("locationSearch");
  const tableBody = document.querySelector("#table tbody");

  async function fetchHotels(location) {
    const apiKey = "6766cf586cd95b3edf36d5f3";
    const apiUrl = `https://api.makcorps.com/mapping?api_key=${apiKey}&name=${encodeURIComponent(location)}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      if (data) {
        displayHotels(data);
      } else {
        throw new Error("No hotels found for this location");
      }
    } catch (error) {
      console.error("Error fetching hotels:", error.message);
      tableBody.innerHTML = `<tr><td colspan="3">No hotels found for this location.</td></tr>`;
    }
  }

  function displayHotels(hotels) {
    tableBody.innerHTML = "";
    hotels.forEach((hotel) => {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${hotel.details.parent_name}</td>
            <td>${hotel.details.highlighted_name}</td>
            <td>/</td>
          `;
      tableBody.appendChild(row);
    });
  }

  locationSearchButton.addEventListener("click", function () {
    const location = locationSearchInput.value.trim();
    if (location) {
      fetchHotels(location);
    } else {
      alert("Please enter a location to filter hotels.");
    }
  })
}