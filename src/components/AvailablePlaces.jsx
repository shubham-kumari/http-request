import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.js";

// const palces = localStorage.getItem('places') // fetching data from local storage

async function fetchSortPlaces() {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );
      resolve(sortedPlaces)
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  // const [isFetching, setIsFetching] = useState(false);
  // const [availablePlaces, setAvailablePlaces] = useState([]);
  // const [error, setError] = useState();

  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
  } = useFetch(fetchSortPlaces, []);

  // useEffect(() => {
  //   async function fetchPlaces() {
  //     setIsFetching(true);
  //     try {
  //       const places = await fetchAvailablePlaces()
  //       // const response = await fetch("http://localhost:3000/places"); // Make sure the port matches your backend
  //       // const resData = await response.json();

  //       // if (!response.ok) {
  //       //   throw new Error("Failed to fetch places");
  //       // }

  //     //   navigator.geolocation.getCurrentPosition((position) => {
  //     //     const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude)
  //     //     setAvailablePlaces(sortedPlaces);
  //     // setIsFetching(false);

  //     //   })
  //     }
  //     catch (error) {
  //       console.log("error occured");
  //       setError({message: error.message || 'Could not face places, Please try again later!'});
  //     setIsFetching(false);

  //     }
  //   }
  //   fetchPlaces();
  //   // fetch('http://localhost:3000/places') // Make sure the port matches your backend
  //   //   .then((response) => {
  //   //     console.log("Received response:", response);
  //   //     return response.json();
  //   //   })
  //   //   .then((resData) => {
  //   //     setAvailablePlaces(resData.places);
  //   //   })
  // }, []);

  if (error) {
    return <Error title="An error occured!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      isLoading={isFetching}
      onSelectPlace={onSelectPlace}
    />
  );
}
