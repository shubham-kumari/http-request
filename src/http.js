import Places from "./components/Places";

export async function fetchAvailablePlaces() {
    const response = await fetch("http://localhost:3000/places"); // Make sure the port matches your backend
    const resData = await response.json();

    if (!response.ok) {
        throw new Error("Failed to fetch places");
    }

    return resData.places;
};

export async function fetchUserPlaces() {
    const response = await fetch("http://localhost:3000/user-places"); // Make sure the port matches your backend
    const resData = await response.json();

    if (!response.ok) {
        throw new Error("Failed to fetch user places");
    }

    return resData.places;
};

export async function updateUserPlaces(places){
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({places: places}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const resData = await response.json();
    if(!response.ok){
        throw new Error('Failed to update User Data')
    }

    return resData.message;
};