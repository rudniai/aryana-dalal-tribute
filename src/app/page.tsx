import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PhotoGallery from "@/components/PhotoGallery";
import YouTube from "@/components/YouTube";
import Instagram from "@/components/Instagram";
import HSTShow from "@/components/HSTShow";
import HotTakes from "@/components/HotTakes";
import FanComments from "@/components/FanComments";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <PhotoGallery />
        <YouTube />
        <Instagram />
        <HSTShow />
        <HotTakes />
        <FanComments />
      </main>
      <Footer />
    </>
  );
}
