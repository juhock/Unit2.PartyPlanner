// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting default 

    // Get the form input values
    const partyName = document.getElementById('party-name').value;
    const partyDate = document.getElementById('party-date').value;
    const partyTime = document.getElementById('party-time').value;
    const partyLocation = document.getElementById('party-location').value;
    const partyDescription = document.getElementById('party-description').value;

    // Create a new party object with input values
    const newParty = {
        name: partyName,
        date: partyDate,
        time: partyTime,
        location: partyLocation,
        description: partyDescription,
    };

    // POST request to add the new party to the API
    fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309FSA/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newParty),
    })
        .then(response => response.json())
        .then(data => {
        })
        .catch(error => {
            console.error('Error adding new party:', error);
        });
}

// Event listener for the form submission
const partyForm = document.getElementById('party-form');
partyForm.addEventListener('submit', handleFormSubmit);
