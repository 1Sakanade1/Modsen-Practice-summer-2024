type RawAttraction = [string, number, number];

type Attraction = {
    key: string;
    name: string;
    lat: number;
    lng: number;
  };

const attractions: RawAttraction[] = [

    ["Hueco Mundo", 47.46820867029721, 15.336705321368953],
]

const formatted: Attraction[] = attractions.map(([name, lat, lng]) => ({
    name,
    lat,
    lng,
    key: JSON.stringify({ name, lat, lng }),
  }));
  
  export default formatted;