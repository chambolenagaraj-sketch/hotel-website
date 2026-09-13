"use client";

import { useState } from "react";
import { BookingModal } from "../../components/BookingModal";
import type { Room } from "../../../types/room";

export const BookingModalWrapper = ({ room }: { room: Room }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-amber-500 text-slate-900 py-4 rounded-xl hover:bg-amber-400 transition-colors duration-300 font-medium tracking-wide shadow-lg shadow-amber-500/20"
      >
        Book Now
      </button>
      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={room}
      />
    </>
  );
};
