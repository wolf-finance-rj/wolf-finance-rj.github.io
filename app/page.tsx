import { seo } from "@/data/portfolioData";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Matheus Carvalho",
            url: seo.url,
            description: seo.description,
            knowsAbout: [
              "Inteligência Artificial",
              "Machine Learning",
              "Ciência de Dados",
              "Desenvolvimento de Software",
              "Pesquisa Quantitativa",
              "Sistemas Multiagentes",
            ],
            alumniOf: {
              "@type": "CollegeOrUniversity",
              name: "CEFET/RJ",
            },
          }),
        }}
      />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
