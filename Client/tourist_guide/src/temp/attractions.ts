export type RawAttraction = [string, number, number, string, string, string, string];

export type Attraction = {
  id: number;
  name: string;
  category: string;
  lat: number;
  lng: number;
  address: string;
  description: string;
  photos: string | null;
  key: string;
};

const attractions: RawAttraction[] = [
  ["Hueco Mundo", 47.46820867029721, 15.336705321368953, "culture", "123 Main St", "The dimension in which Hollows and Arrancar usually reside. It lies in between the Human World and Soul Society.",''],
  ["Schönbrunn Palace", 48.180556, 16.311667, "architecture", "Schönbrunner Schloßstraße 47, 1130 Vienna", "A former imperial summer residence located in Vienna, Austria.", 'https://example.com/schoenbrunn-palace.jpg'],
  ["Hofburg Imperial Palace", 48.204722, 16.366667, "architecture", "Minoritenplatz 1, 1010 Vienna", "The former imperial palace in the center of Vienna, Austria.", 'https://example.com/hofburg-palace.jpg'],
  ["Belvedere Palace", 48.195, 16.378333, "architecture", "Prinz Eugen-Straße 27, 1030 Vienna", "A historic building complex and major art museum in Vienna, Austria.", 'https://example.com/belvedere-palace.jpg'],
  ["Hallstatt", 47.560278, 13.650833, "nature", "Hallstatt, Austria", "A small town in the Salzkammergut region of Austria, noted for its alpine setting and historic salt mines.", 'https://example.com/hallstatt.jpg'],
  ["Kunsthistorisches Museum", 48.205556, 16.358333, "history", "Maria-Theresien-Platz, 1010 Vienna", "One of the most prominent art museums in the world, located in Vienna, Austria.", 'https://example.com/kunsthistorisches-museum.jpg'],
  ["Tirolberg", 47.253333, 11.392222, "nature", "Tirolberg, Austria", "A mountain located in the Tyrolean Alps in Austria, known for its scenic views.", 'https://example.com/tirolberg.jpg']
];

const formatted: Attraction[] = attractions.map(([name, lat, lng, category, address, description]) => {
  const id = Math.floor(Math.random() * 1000000);
  const key = `${id}-${name}`;
  return {
    id,
    name,
    category,
    lat: lat,
    lng: lng,
    address,
    description,
    photos: null,
    key,
  };
});

export default formatted;