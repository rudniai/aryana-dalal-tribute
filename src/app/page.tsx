import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PhotoGallery from "@/components/PhotoGallery";
import YouTube from "@/components/YouTube";
import Instagram from "@/components/Instagram";
import Brands from "@/components/Brands";
import HSTShow from "@/components/HSTShow";
import ClayDate from "@/components/ClayDate";
import HotTakes from "@/components/HotTakes";
import FanComments from "@/components/FanComments";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative" id="work">
        <Hero />
        <About />
        <PhotoGallery />
        <YouTube />
        <Instagram />
        <Brands />
        <HSTShow />
        <ClayDate />
        <HotTakes />
        <FanComments />
      </main>
      <Footer />
    </>
  );
}
