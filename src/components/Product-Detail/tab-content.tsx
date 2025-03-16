"use client";
import { CircleChevronRight } from "lucide-react";
import { Card } from "../UI/card";
import classes from "./scss/about-content.module.scss";
import { useEffect, useState } from "react";

type DescProps = {
  description: string;
};

export function ProductDesc({ description }: DescProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card className="border-luoBiege">
      <div className="p-4 text-luoDarkBiege space-y-2">
        <div className="flex flex-row gap-1 items-center">
          <CircleChevronRight size={18} strokeWidth={1.5} />
          <h3 className="text-lg font-semibold tracking-wide">Description</h3>
        </div>
        <div className={`px-6 ${classes.renderedJoditHtml}`}>{mounted ? <p dangerouslySetInnerHTML={{ __html: description }} /> : <p>Loading...</p>}</div>
      </div>
    </Card>
  );
}

type AllerIngProps = {
  allergens: string;
  ingredients: string;
};

export function ProductAllergenAndIngredients({ allergens, ingredients }: AllerIngProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card className="border-luoBiege ">
      <div className="p-4 text-luoDarkBiege space-y-2">
        <div className="flex flex-row gap-1 items-center">
          <CircleChevronRight size={18} strokeWidth={1.5} />
          <h3 className="text-lg font-semibold tracking-wide">Allergen</h3>
        </div>
        <div className={`px-6 ${classes.renderedJoditHtml}`}>{mounted ? <p dangerouslySetInnerHTML={{ __html: allergens }} /> : <p>Loading...</p>}</div>
        <div className="flex flex-row gap-1 items-center">
          <CircleChevronRight size={18} strokeWidth={1.5} />
          <h3 className="text-lg font-semibold tracking-wide">Ingredients</h3>
        </div>
        <div className={`px-6 ${classes.renderedJoditHtml}`}>{mounted ? <p dangerouslySetInnerHTML={{ __html: ingredients }} /> : <p>Loading...</p>}</div>
      </div>
    </Card>
  );
}

type ServingProps = {
  storageServing: string;
};

export function StorageServing({ storageServing }: ServingProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card className="border-luoBiege">
      <div className="p-4 text-luoDarkBiege space-y-2">
        <div className="flex flex-row gap-1 items-center">
          <CircleChevronRight size={18} strokeWidth={1.5} />
          <h3 className="text-lg font-semibold tracking-wide">Storage & Serving</h3>
        </div>
        <div className={`px-6 ${classes.renderedJoditHtml}`}>{mounted ? <p dangerouslySetInnerHTML={{ __html: storageServing }} /> : <p>Loading...</p>}</div>
      </div>
    </Card>
  );
}
