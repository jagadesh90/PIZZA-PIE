document.addEventListener("DOMContentLoaded", function() {
    let events = JSON.parse(localStorage.getItem("events")) || [];

    function displayEvents() {
        const eventList = document.getElementById("event-list");
        if (eventList) {
            eventList.innerHTML = "";
            events.forEach((event, index) => {
                const eventDiv = document.createElement("div");
                eventDiv.classList.add("event");
                eventDiv.innerHTML = `
                    <h3>${event.name}</h3>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Time:</strong> ${event.time}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                    <p><strong>Description:</strong> ${event.description}</p>
                    <button onclick="registerForEvent(${index})">Register</button>
                `;
                eventList.appendChild(eventDiv);
            });
        }
    }

    function saveEvents() {
        localStorage.setItem("events", JSON.stringify(events));
    }

    function populateEventDropdown() {
        const eventSelect = document.getElementById("event-select");
        if (eventSelect) {
            eventSelect.innerHTML = "<option value=''>Select an event</option>";
            events.forEach(event => {
                const option = document.createElement("option");
                option.value = event.name;
                option.textContent = event.name;
                eventSelect.appendChild(option);
            });
        }
    }

    const createEventForm = document.getElementById("create-event-form");
    if (createEventForm) {
        createEventForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const newEvent = {
                name: document.getElementById("event-name").value,
                date: document.getElementById("event-date").value,
                time: document.getElementById("event-time").value,
                location: document.getElementById("event-location").value,
                description: document.getElementById("event-description").value
            };
            events.push(newEvent);
            saveEvents();
            displayEvents();
            populateEventDropdown();
            alert("Event created successfully!");
            createEventForm.reset();
        });
    }

    const registerEventForm = document.getElementById("register-event-form");
    if (registerEventForm) {
        registerEventForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const registration = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                event: document.getElementById("event-select").value
            };
            alert(Successfully registered for ${registration.event}!);
            registerEventForm.reset();
        });
    }

    displayEvents();
    populateEventDropdown();
});