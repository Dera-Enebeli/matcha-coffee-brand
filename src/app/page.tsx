import Hero from "@/components/Hero";
import About from "@/components/About";
import ProductShowcase from "@/components/ProductShowcase";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <ProductShowcase />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
