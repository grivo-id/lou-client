import Image from "next/image";
import ExploreBtn from "./explore-btn";

export default function HeroBanner() {
  return (
    <header className="relative" id="hero-section">
      {/* <div className={classes.heroBanner}> */}
      <div className="h-[200vh] md:h-[100vh]  relative w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent z-10"></div>
        <div className="flex flex-col-reverse md:flex-row w-full h-full">
          <Image src={`/assets/img/lou-hero1.png`} width={1800} height={1800} alt="banner-lou" className="object-cover bg-center w-full md:w-1/2 h-full" />
          <Image src={`/assets/img/lou-hero2.png`} width={1800} height={1800} alt="banner-lou2" className="object-cover bg-center w-full md:w-1/2 h-full" />
        </div>
      </div>
      <div className="absolute inset-x-0 top-[32%] md:top-[70%]">
        <ExploreBtn />
      </div>
      {/* </div> */}
    </header>
  );
}
