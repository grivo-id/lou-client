import { getCachedAllAddOns, getCachedCakeByName } from "@/frameworks/server-api/cached-api";
import { getServerAllCakes } from "@/frameworks/server-api/cakes-server-api";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { deSlugify, normalizeText, normalizeTextV2, slugify } from "@/lib/formatters";
import { AddOns, Cake } from "@/types/data-types";
import FaqProductDetail from "@/components/Product-Detail/faq-product";
import ProductDetailImgs from "@/components/Product-Detail/product-img-layout";
import ProductOrder from "@/components/Product-Detail/product-order";
import ProductTabs from "@/components/Product-Detail/product-tabs";
import SubHeroBanner from "@/components/UI/SubHero-Banner/subhero-banner";

type Props = {
  params: {
    productName: string;
  };
};

export const revalidate = 3600;
export const dynamicParams = true;

export const generateStaticParams = async () => {
  const response = await getServerAllCakes();
  const allCakes: Cake[] = response.data;
  return allCakes.map((cake) => ({
    productName: slugify(cake.name),
  }));
};

export default async function ProductDetailPage({ params }: Props) {
  const { productName } = params;

  const normalizeCakeName = deSlugify(productName);
  // console.log("currentparam", productName, "normal", normalizeCakeName);
  const [result, addOnResult] = await Promise.all([getCachedCakeByName(normalizeCakeName), getCachedAllAddOns()]);

  // console.log("API result:", addOnResult);

  if (!result.success) {
    console.error("Failed to load product detail:", result.error);
    notFound();
  }

  const cakeData = result.data;
  const addOnData: AddOns[] = addOnResult.success ? addOnResult.data : [];
  const { cake, aboutCake, variants } = cakeData;

  return (
    <>
      <SubHeroBanner title="Product Details" image="/assets/img/Product-Detail.png" />
      <div className="flex flex-wrap my-10 md:my-16 mx-auto justify-center gap-4 lg:gap-10 h-fit">
        <div className="flex flex-col gap-6 w-full max-w-lg">
          <ProductDetailImgs mainImg={cake.main_image} subImg1={cake.sub_image1} subImg2={cake.sub_image2} />
          <div className="">
            <ProductTabs aboutCakeData={aboutCake} />
          </div>
        </div>
        <div className="flex flex-col w-full max-w-lg border lg:border-none lg:shadow-none lg:py-0 lg:mx-0 border-luoBiege shadow-md rounded-lg py-4 mx-4">
          <Suspense fallback={<div></div>}>
            <ProductOrder cakeId={cake.ID} cakeName={cake.name} mainImgSrc={cake.main_image} variants={variants} addOns={addOnData} loading={false} />
          </Suspense>
        </div>
      </div>
      <div className="flex flex-wrap mt-10 md:mt-16 mx-auto justify-center gap-4 lg:gap-10 h-fit bg-luoBiege py-10">
        <FaqProductDetail />
      </div>
    </>
  );
}
