import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryRail from "@/components/CategoryRail";
import TopBrands from "@/components/TopBrands";
import FeatureShowcase from "@/components/FeatureShowcase";
import DealsOfTheDay from "@/components/DealsOfTheDay";
import WhyShop from "@/components/WhyShop";
import Testimonials from "@/components/Testimonials";
import AppPromo from "@/components/AppPromo";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <Hero />
        <CategoryRail />
        <TopBrands />
        <FeatureShowcase />
        <DealsOfTheDay />
        <WhyShop />
        <Testimonials />
        <AppPromo />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
