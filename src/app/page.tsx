import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import YouTube from "@/components/YouTube";
import HSTShow from "@/components/HSTShow";
import ClayDate from "@/components/ClayDate";
import Instagram from "@/components/Instagram";
import FanComments from "@/components/FanComments";
import Brands from "@/components/Brands";
import Favourites from "@/components/Favourites";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative" id="work">
        <Hero />
        <About />
        <YouTube />
        <HSTShow />
        <ClayDate />
        <Instagram />
        <FanComments />
        <Brands />
        <Favourites />
      </main>
      <Footer />
    </>
  );
}
