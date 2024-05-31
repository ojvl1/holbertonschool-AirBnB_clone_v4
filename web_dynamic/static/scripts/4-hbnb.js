document.addEventListener('DOMContentLoaded', (event) => {
  const apiUrl = 'http://0.0.0.0:5001/api/v1/places_search';

  // Check API status
  fetch('http://0.0.0.0:5001/api/v1/status/')
    .then(response => response.json())
    .then(data => {
      if (data.status === 'OK') {
        document.getElementById('api_status').classList.add('available');
      } else {
        document.getElementById('api_status').classList.remove('available');
      }
    });

  // Function to fetch and display places
  function fetchPlaces(data = {}) {
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      const placesSection = document.querySelector('section.places');
      placesSection.innerHTML = ''; // Clear previous places

      data.forEach(place => {
        const article = document.createElement('article');

        const title = document.createElement('div');
        title.className = 'title_box';
        title.innerHTML = `<h2>${place.name}</h2><div class="price_by_night">$${place.price_by_night}</div>`;

        const information = document.createElement('div');
        information.className = 'information';
        information.innerHTML = `<div class="max_guest">${place.max_guest} Guests</div>
                                 <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                                 <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>`;

        const description = document.createElement('div');
        description.className = 'description';
        description.innerText = place.description;

        article.appendChild(title);
        article.appendChild(information);
        article.appendChild(description);

        placesSection.appendChild(article);
      });
    });
  }

  // Initial fetch for all places
  fetchPlaces();

 const amenityCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  const filterButton = document.createElement('button');
  filterButton.innerText = 'Filter';
  document.querySelector('section.filters').appendChild(filterButton);

  filterButton.addEventListener('click', () => {
      const amenities = [];
      amenityCheckboxes.forEach((checkbox) => {
          if (checkbox.checked) {
              amenities.push(checkbox.getAttribute('data-id'));
          }
      });
      fetchPlaces({ amenities: amenities });
  });
});
