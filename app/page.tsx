import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Documents from "@/components/Documents";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <section id="inicio"><HeroSection /></section>
      <section id="como-funciona"><HowItWorks /></section>
      <section id="requerimentos"><Documents /></section>
       <CTA />
      <section id="contacto"><Contact /></section>
      <Footer />
    </main>
  );
}