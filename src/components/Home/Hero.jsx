import LeftHero from "./LeftHero";
import img from '@/assets/img/hero.png'

export default function Hero() {
  return (
    <section className="flex items-center justify-around min-h-[70vh]">
      <LeftHero />
      <img src={img} alt="heroRigh-img" />
    </section>
  );
}
