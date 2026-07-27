import Navbar from "@/components/Navbar";
import WolfHero from "@/components/WolfHero";
import WolfSobre from "@/components/WolfSobre";
import WolfAreas from "@/components/WolfAreas";
import WolfEventos from "@/components/WolfEventos";
import WolfSeletivo from "@/components/WolfSeletivo";
import WolfGaleria from "@/components/WolfGaleria";
import WolfParcerias from "@/components/WolfParcerias";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <WolfHero />
        <WolfSobre />
        <WolfAreas />
        <WolfEventos />
        <WolfSeletivo />
        <WolfGaleria />
        <WolfParcerias />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
