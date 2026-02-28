import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import YouTube from "@/components/YouTube";
import HSTShow from "@/components/HSTShow";
import ClayDate from "@/components/ClayDate";
import ComplimentGenerator from "@/components/ComplimentGenerator";
import Instagram from "@/components/Instagram";
import FanComments from "@/components/FanComments";
import Brands from "@/components/Brands";
import Favourites from "@/components/Favourites";
import MusicPlayer from "@/components/MusicPlayer";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <MusicPlayer />
      <main className="relative" id="work">
        <Hero />
        <About />
        <YouTube />
        <HSTShow />
        <ClayDate />
        <ComplimentGenerator />
        <Instagram />
        <FanComments />
        <Brands />
        <Favourites />
      </main>
      <Footer />
    </>
  );
}
