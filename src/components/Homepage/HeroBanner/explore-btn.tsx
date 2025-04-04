"use client";
import { Button } from "@/components/UI/button";
import { useRouter } from "next/navigation";

export default function ExploreBtn() {
  const router = useRouter();

  function exploreBtn() {
    router.push("/collection/all-product");
  }

  return (
    <div className="max-w-full w-full flex flex-col gap-2 text-center justify-center mb-16">
      <div className="flex justify-center items-center cursor-default">
        <h1 className="scroll-m-20 drop-shadow-md text-white border-b-2 border-luoDarkBiege pb-2 text-3xl font-semibold tracking-tight first:mt-0 ">
          Delivery & Pickup
        </h1>
      </div>
      <span className="text-white text-lg font-semibold cursor-default drop-shadow-md">Jakarta</span>
      <div className="flex justify-center">
        <Button onClick={exploreBtn} className="flex drop-shadow-md justify-center items-center bg-luoDarkBiege rounded-none border-none hover:bg-[#a58b73]">
          Explore Our Products
        </Button>
      </div>
    </div>
  );
}
