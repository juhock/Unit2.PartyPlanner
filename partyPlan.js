//set up variables

const EVENTS_API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FSA-ET-WEB-FT-SF/events`

const state = {
    parties: []
}

const partiesForm = document.querySelector('#newPartyForm')
partiesForm.addEventListener('submit', addParty)
const partiesList = document.querySelector('#partyList')

//function to get all parties from the API

async function getPartyInfo() {
    try{
        const response = await fetch (EVENTS_API_URL);
        const json = await response.json();
        state.parties = json.data;
        console.log(json.data)
    } catch(err){
        console.log(err)
    }
}

getPartyInfo()

//function to add a single party using the information that has been entered into the form
// make sure this function re-fetches the data and re-renders the new list

async function createParty(name, description, date, location) {
    const response = await fetch(EVENTS_API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name, description, date, location
        })
    })
    const json = await response.json()
    console.log(json)
}

async function addParty(event){
    event.preventDefault();
    const date = new Date(partiesForm.date.value)
    await createParty(
        partiesForm.name.value, 
        partiesForm.description.value, 
        date.toISOString(), 
        partiesForm.location.value)

        partiesForm.name.value = ""
        partiesForm.description.value = ""
        partiesForm.date.value = ""
        partiesForm.location.value = ""

}

//function to delete a single party
// make sure this function re-fetches the data and re-renders the new list



// function to render the list of all parties

function renderAllParties() {
    if (!state.parties.length) {
        //update the list to say there aren't any
        partiesList.innerHTML = `<li>No parties! Why don't you throw one?</li>`;
        return;
    }
    const elements = state.parties.map(renderSingleParty)
    partiesList.replaceChildren(...elements)
}

async function render() {
    await getPartyInfo();
    renderAllParties();
}

render();

//function to render a single party 
//single party render should also include a delete button which removes a party from the list when clicked by making a delete request to the server

function renderSingleParty(party) {
    const partyCard = document.createElement('section')
    partyCard.classList.add("party-card")
    partyCard.innerHTML = `<h2>${party.name}</h2>
    <p>${party.date}</p>
    <p>${party.location}</p>
    <p>${party.description}</p>
    `
    return partyCard
}