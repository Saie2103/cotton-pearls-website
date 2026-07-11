import { getHomepageData } from "@/lib/shopify";
import Hero from "@/components/home/Hero";
import CollectionGrid from "@/components/home/CollectionGrid";
import ShopTheLook from "@/components/home/ShopTheLook";

export const revalidate = 60; // ISR: re-fetch Shopify data at most once a minute

export default async function HomePage() {
  const { heroCollection, featuredCollections } = await getHomepageData();

  return (
    <>
      <Hero collection={heroCollection} />
      <CollectionGrid collections={featuredCollections.nodes} />
      <ShopTheLook />
    </>
  );
}
