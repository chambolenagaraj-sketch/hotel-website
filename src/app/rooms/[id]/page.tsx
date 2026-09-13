import Link from "next/link";
import roomsData from "../../../data/rooms.json";
import { BookingModalWrapper } from "./BookingModalWrapper";
import type { Room } from "../../../types/room";

export function generateStaticParams() {
  return roomsData.map((room) => ({
    id: room.id,
  }));
}

export default function RoomPage({ params }: { params: { id: string } }) {
  const roomData = roomsData.find((r) => r.id === params.id);
  const room = roomData as Room;

  if (!room) {
    return <div className="min-h-screen flex items-center justify-center text-white">Room not found</div>;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 font-sans pb-24">
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 p-6">
        <Link href="/#rooms" className="inline-flex items-center text-slate-200 hover:text-amber-400 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Rooms
        </Link>
      </nav>

      {/* Hero Image */}
      <div className="relative h-[60vh] w-full">
        <img src={room.imageUrl} alt={room.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-light text-white mb-4 drop-shadow-md">{room.name}</h1>
          <p className="text-xl text-slate-300 drop-shadow-sm">${room.pricePerNight} <span className="text-sm">/ night</span></p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-12">
          
          <section>
            <h2 className="text-2xl font-medium text-amber-500 mb-4">About this room</h2>
            <p className="text-slate-300 leading-relaxed font-light">{room.longDescription}</p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-amber-500 mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {room.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mr-3" />
                  {amenity}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-amber-500 mb-4">Policies & Rules</h2>
            <ul className="space-y-3">
              {room.policies.map((policy) => (
                <li key={policy} className="flex items-start text-slate-300">
                  <span className="text-amber-500 mr-3">•</span>
                  {policy}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-amber-500 mb-4">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {room.images.map((img, idx) => (
                <img key={idx} src={img} alt={`Gallery ${idx}`} className="w-full h-64 object-cover rounded-xl border border-slate-800" />
              ))}
            </div>
          </section>

        </div>

        {/* Right Column - Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-12 bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
            <h3 className="text-3xl font-medium text-white mb-2">${room.pricePerNight} <span className="text-lg font-light text-slate-400">/ night</span></h3>
            <p className="text-slate-400 mb-8 border-b border-slate-800 pb-6">Maximum {room.maxGuests} guests</p>
            
            <BookingModalWrapper room={room} />
          </div>
        </div>

      </div>
    </main>
  );
}
