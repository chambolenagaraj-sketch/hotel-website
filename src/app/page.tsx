import { HeroSection } from "./components/HeroSection";
import { RoomList } from "./components/RoomList";
import { supabase } from "../lib/supabaseClient";
import type { Room } from "../types/room";

export default async function Home() {
  const { data: rooms, error } = await supabase.from('rooms').select('*');
  
  if (error) {
    console.error('Error fetching rooms:', error);
  }

  const roomsData = (rooms || []) as Room[];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      <HeroSection />
      <RoomList rooms={roomsData} />
    </main>
  );
}
