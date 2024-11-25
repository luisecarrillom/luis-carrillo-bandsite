const apiEndpoint = "https://project-1-api.herokuapp.com/showdates";

async function fetchShows() {
  try {
    const response = await fetch(`${apiEndpoint}?api_key=b83a46b8-2ac6-458f-8e07-0a9a6b982ab4`);
    if (!response.ok) {
      throw new Error("Failed to fetch shows data");
    }
    const showsData = await response.json();
    renderShows(showsData);
  } catch (error) {
    console.error("Error fetching shows:", error);
  }
}

function renderShows(shows) {
  const showsList = document.getElementById("shows-list");
  shows.forEach((show) => {
    const showItem = document.createElement("div");
    showItem.className = "shows__item";

    const date = document.createElement("p");
    date.className = "shows__date";
    date.textContent = `Date: ${new Date(show.date).toDateString()}`;

    const venue = document.createElement("p");
    venue.className = "shows__venue";
    venue.textContent = `Venue: ${show.place}`;

    const location = document.createElement("p");
    location.className = "shows__location";
    location.textContent = `Location: ${show.location}`;

    const button = document.createElement("button");
    button.className = "shows__button";
    button.textContent = "Buy Tickets";

    showItem.append(date, venue, location, button);

    showItem.addEventListener("click", () => {
      document.querySelectorAll(".shows__item").forEach((item) => item.classList.remove("shows__item--selected"));
      showItem.classList.add("shows__item--selected");
    });

    showsList.appendChild(showItem);
  });
}

fetchShows();

  