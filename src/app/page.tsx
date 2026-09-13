import { HeroSection } from "./components/HeroSection";
import { RoomList } from "./components/RoomList";
import roomsData from "../data/rooms.json";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      <HeroSection />
      <RoomList rooms={roomsData} />
    </main>
  );
}
