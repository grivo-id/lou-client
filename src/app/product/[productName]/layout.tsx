import { Metadata } from "next";
import { getCakeByName } from "@/frameworks/client-api/cakes-api";
import { deSlugify, normalizeText } from "@/lib/formatters";
import JSONLD from "@/components/JSONLD";
import { Cake, CakeDetails, Variants } from "@/types/data-types";
import { getServerCakeByName } from "@/frameworks/server-api/cakes-server-api";

export async function generateMetadata({ params }: { params: { productName: string } }): Promise<Metadata> {
  const cakeNameParam = decodeURIComponent(params.productName);
  const normalizeCakeName = deSlugify(cakeNameParam);

  const response = await getServerCakeByName(normalizeCakeName);
  // console.log(response);

  if (!response.success) {
    return {
      title: "Cake Not Found | Lou Patisserie & Gelato",
      description: "Sorry, the cake you're looking for couldn't be found.",
    };
  }

  const cakeData = response.data.cake;
  const cakeDetails = response.data.aboutCake;

  return {
    title: `${cakeData.name} | Lou Patisserie & Gelato`,
    description: cakeDetails.desc,
    robots: "index, follow",
    openGraph: {
      title: cakeData.name,
      description: cakeDetails.desc,
      images: [cakeData.main_image, cakeData.sub_image1, cakeData.sub_image2].filter(Boolean),
      url: `https://www.loupatisserie.com/product/${normalizeText(params.productName)}`,
    },
    twitter: {
      card: "summary_large_image",
      title: cakeData.name,
      description: cakeDetails.desc,
      images: cakeData.main_image,
    },
  };
}

const generateJsonLd = (cake: Cake, details: CakeDetails, variants: Variants[]) => {
  const normalizeCakeName = normalizeText(cake.name);
  const prices = variants.length > 0 ? variants.map((variant: Variants) => Number(variant.price)) : [0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: cake.name,
    image: [cake.main_image, cake.sub_image1, cake.sub_image2].filter(Boolean),
    description: details.desc,
    sku: cake.ID,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IDR",
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      url: `https://www.loupatisserie.com/product/${normalizeCakeName}`,
      availability: "http://schema.org/InStock",
    },
  };

  return jsonLd;
};

export default async function ProductLayout({ children, params }: { children: React.ReactNode; params: { productName: string } }) {
  const cakeNameParam = decodeURIComponent(params.productName);
  const normalizeCakeName = deSlugify(cakeNameParam);

  const response = await getServerCakeByName(normalizeCakeName);

  if (!response.success) {
    return <div>{children}</div>;
  }

  const cake = response.data.cake;
  const details = response.data.aboutCake;
  const variants = response.data.variants;

  const jsonLdData = generateJsonLd(cake, details, variants);

  return (
    <div>
      <JSONLD data={jsonLdData} />
      {children}
    </div>
  );
}
