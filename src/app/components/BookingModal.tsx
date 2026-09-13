"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Room } from "../../types/room";

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  room: Room | null;
};

export const BookingModal = ({ isOpen, onClose, room }: BookingModalProps) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Reset state when modal opens for a new room
  useEffect(() => {
    if (isOpen) {
      setCheckIn("");
      setCheckOut("");
      setGuests(1);
      setIsConfirmed(false);
      setTotalPrice(0);
    }
  }, [isOpen, room]);

  useEffect(() => {
    if (checkIn && checkOut && room) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        setTotalPrice(diffDays * room.pricePerNight);
      } else {
        setTotalPrice(0);
      }
    } else {
      setTotalPrice(0);
    }
  }, [checkIn, checkOut, room]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalPrice > 0) {
      setIsConfirmed(true);
    }
  };

  if (!room) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-full"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-800">
              <h2 className="text-2xl font-light text-slate-50">Book {room.name}</h2>
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-grow">
              {isConfirmed ? (
                <div className="text-center py-10">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-3xl font-light text-white mb-2">Booking Confirmed!</h3>
                  <p className="text-slate-400">Your stay at {room.name} is reserved.</p>
                  <p className="text-amber-400 mt-2 font-medium">Total: ${totalPrice}</p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Check-in</label>
                      <input 
                        type="date" 
                        required
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 [color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Check-out</label>
                      <input 
                        type="date" 
                        required
                        value={checkOut}
                        min={checkIn}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Guests</label>
                    <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
                      <button 
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        readOnly
                        value={guests}
                        className="w-full bg-transparent text-center text-white focus:outline-none"
                      />
                      <button 
                        type="button"
                        onClick={() => setGuests(Math.min(room.maxGuests, guests + 1))}
                        className="px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Maximum {room.maxGuests} guests</p>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <div className="flex justify-between items-center mb-4 text-lg">
                      <span className="text-slate-300">Total Price:</span>
                      <span className="text-2xl text-amber-400 font-medium">${totalPrice}</span>
                    </div>
                    <button 
                      type="submit"
                      disabled={totalPrice === 0}
                      className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 py-4 rounded-xl text-lg font-medium transition-colors"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
