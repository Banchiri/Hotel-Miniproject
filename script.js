document.addEventListener('DOMContentLoaded', () => {
    fetchHotels();
});

async function fetchHotels() {
    try {
        const response = await fetch(''); 
        const data = await response.json();
        displayHotels(data.hotels);
    } catch (error) {
        console.error('Error fetching hotels:', error);
    }
}

function displayHotels(hotels) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = hotels.map(hotel => `
        <div class="hotel" data-id="${hotel.id}">
            <img src="${hotel.image}" alt="${hotel.name}">
            <h2>${hotel.name}</h2>
            <p>Location: ${hotel.location}</p>
            <p>Amenities: ${hotel.amenities.join(', ')}</p>
            <p>Likes: <span class="likes">${hotel.likes}</span></p>
            <button class="like-btn">Like</button>
            <button class="dislike-btn">Dislike</button>
        </div>
    `).join('');

    addEventListeners();
}
function addEventListeners() {
    document.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const hotelDiv = event.target.closest('.hotel');
            updateLikes(hotelDiv, 1);
        });
    });

    document.querySelectorAll('.dislike-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const hotelDiv = event.target.closest('.hotel');
            updateLikes(hotelDiv, -1);
        });
    });

    document.getElementById('search').addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        filterHotels(query);
    });
}

async function updateLikes(hotelDiv, delta) {
    const id = hotelDiv.getAttribute('data-id');
    const likesElement = hotelDiv.querySelector('.likes');
    const newLikes = parseInt(likesElement.textContent) + delta;
    likesElement.textContent = newLikes;

    try {
        await fetch(`https://api.example.com/hotels/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ likes: newLikes })
        });
    } catch (error) {
        console.error('Error updating likes:', error);
    }
}

function filterHotels(query) {
    document.querySelectorAll('.hotel').forEach(hotel => {
        const name = hotel.querySelector('h2').textContent.toLowerCase();
        if (name.includes(query)) {
            hotel.style.display = '';
        } else {
            hotel.style.display = 'none';
        }
    });
}
