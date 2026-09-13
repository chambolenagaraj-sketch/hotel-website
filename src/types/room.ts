export type Room = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  pricePerNight: number;
  amenities: string[];
  imageUrl: string;
  images: string[];
  policies: string[];
  maxGuests: number;
};
