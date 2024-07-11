type Attraction = {
  id: number;
  name: string;
  category: string;
  lat: number;
  lng: number;
  address: string;
  description: string;
  photos: string[] | null;
  key: string;
};

export type Props = {
  points: Attraction[];
};
