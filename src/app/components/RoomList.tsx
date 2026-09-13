"use client";

import { motion } from "framer-motion";

type Room = {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  amenities: string[];
  imageUrl: string;
};

export const RoomList = ({ rooms }: { rooms: Room[] }) => {
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
            <div className="relative h-64 w-full overflow-hidden">
              <img 
                src={room.imageUrl} 
                alt={room.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full font-medium border border-white/10">
                ${room.pricePerNight} <span className="text-sm font-light text-slate-300">/ night</span>
              </div>
            </div>
            
            {/* Content Container */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-medium text-slate-100 mb-3">{room.name}</h3>
              <p className="text-slate-400 font-light text-sm mb-6 flex-grow">{room.description}</p>
              
              <div className="mb-6 flex flex-wrap gap-2">
                {room.amenities.map(amenity => (
                  <span key={amenity} className="text-xs px-3 py-1 bg-slate-800 text-amber-200/80 rounded-full border border-amber-500/20">
                    {amenity}
                  </span>
                ))}
              </div>
              
              <button className="w-full py-3 bg-transparent border-2 border-slate-700 text-slate-200 rounded-xl hover:border-amber-500 hover:text-amber-400 transition-colors duration-300 font-medium tracking-wide">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
