"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { Room } from "../../types/room";

type RoomDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  room: Room | null;
  onOpenBooking: (room: Room) => void;
};

export const RoomDetailsModal = ({
  isOpen,
  onClose,
  room,
  onOpenBooking,
}: RoomDetailsModalProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!room) return null;

  const handleBookNow = () => {
    onClose();
    onOpenBooking(room);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto"
          >
            {/* Header / Sticky bar */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-20">
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-slate-50">{room.name}</h2>
                <p className="text-amber-400 text-sm font-medium mt-0.5">
                  ${room.pricePerNight} <span className="text-slate-400 font-light">/ night</span> • Max {room.maxGuests} Guests
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-8 custom-scrollbar flex-grow">
              {/* Image Gallery Viewer */}
              <div>
                <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden border border-slate-800 shadow-md">
                  <img
                    src={room.images[activeImageIndex] || room.imageUrl}
                    alt={`${room.name} view ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                </div>
                {room.images && room.images.length > 1 && (
                  <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                    {room.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative h-20 w-28 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                          activeImageIndex === idx
                            ? "border-amber-500 scale-105 shadow-md shadow-amber-500/20"
                            : "border-slate-800 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <section className="space-y-3">
                <h3 className="text-lg font-medium text-amber-400 tracking-wide">Overview & Experience</h3>
                <p className="text-slate-300 font-light leading-relaxed text-sm md:text-base">
                  {room.longDescription || room.description}
                </p>
              </section>

              {/* Amenities */}
              <section className="space-y-3">
                <h3 className="text-lg font-medium text-amber-400 tracking-wide">Suite Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {room.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-200 text-sm"
                    >
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Policies */}
              <section className="space-y-3">
                <h3 className="text-lg font-medium text-amber-400 tracking-wide">House Policies & Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {room.policies.map((policy, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-slate-800/30 border border-slate-800 rounded-xl text-slate-300 text-sm"
                    >
                      <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{policy}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer Action Bar */}
            <div className="p-6 border-t border-slate-800 bg-slate-900/95 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-center sm:text-left">
                <span className="text-slate-400 text-sm">Starting from</span>
                <p className="text-2xl font-medium text-white">
                  ${room.pricePerNight} <span className="text-sm font-light text-slate-400">/ night</span>
                </p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <Link
                  href={`/rooms/${room.id}`}
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-5 py-3 border border-slate-700 hover:border-amber-500 text-slate-300 hover:text-amber-400 rounded-xl transition-colors font-medium text-center text-sm"
                >
                  Full Page View
                </Link>
                <button
                  onClick={handleBookNow}
                  className="flex-1 sm:flex-none px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-xl shadow-lg shadow-amber-500/20 transition-all text-center text-sm cursor-pointer"
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
