"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookingModal } from "./BookingModal";
import { RoomDetailsModal } from "./RoomDetailsModal";
import type { Room } from "../../types/room";

export const RoomList = ({ rooms }: { rooms: Room[] }) => {
  const [bookingRoom, setBookingRoom] = useState<Room | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const [detailsRoom, setDetailsRoom] = useState<Room | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const openBookingModal = (room: Room) => {
    setBookingRoom(room);
    setIsBookingOpen(true);
  };

  const openDetailsModal = (room: Room) => {
    setDetailsRoom(room);
    setIsDetailsOpen(true);
  };

  return (
    <section id="rooms" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-light text-slate-50 mb-4">Our Accommodations</h2>
        <div className="h-1 w-24 bg-amber-500 mx-auto rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {rooms.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ y: -10 }}
            className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl transition-all duration-300 hover:shadow-amber-500/10 hover:border-slate-700 flex flex-col"
          >
            {/* Image Container */}
            <div className="relative h-64 w-full overflow-hidden cursor-pointer" onClick={() => openDetailsModal(room)}>
              <img 
                src={room.imageUrl} 
                alt={room.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-amber-300 px-4 py-2 rounded-full font-medium border border-amber-500/20 text-sm">
                ${room.pricePerNight} <span className="text-xs font-light text-slate-300">/ night</span>
              </div>
            </div>
            
            {/* Content Container */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-medium text-slate-100 mb-3 cursor-pointer hover:text-amber-400 transition-colors" onClick={() => openDetailsModal(room)}>
                {room.name}
              </h3>
              <p className="text-slate-400 font-light text-sm mb-6 flex-grow">{room.description}</p>
              
              <div className="mb-6 flex flex-wrap gap-2">
                {room.amenities.slice(0, 4).map(amenity => (
                  <span key={amenity} className="text-xs px-3 py-1 bg-slate-800 text-amber-200/80 rounded-full border border-amber-500/20">
                    {amenity}
                  </span>
                ))}
                {room.amenities.length > 4 && (
                  <span className="text-xs px-2.5 py-1 bg-slate-800/60 text-slate-400 rounded-full">
                    +{room.amenities.length - 4} more
                  </span>
                )}
              </div>
              
              <div className="flex gap-4 mt-auto">
                <button
                  onClick={() => openDetailsModal(room)}
                  className="flex-1 text-center py-3 bg-transparent border border-slate-700 text-slate-200 rounded-xl hover:border-amber-500 hover:text-amber-400 transition-colors duration-300 font-medium tracking-wide cursor-pointer"
                >
                  View Details
                </button>
                <button 
                  onClick={() => openBookingModal(room)}
                  className="flex-1 py-3 bg-amber-500 text-slate-900 rounded-xl hover:bg-amber-400 transition-colors duration-300 font-medium tracking-wide shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        room={bookingRoom}
      />

      {/* Room Details Modal/Drawer */}
      <RoomDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        room={detailsRoom}
        onOpenBooking={openBookingModal}
      />
    </section>
  );
};
