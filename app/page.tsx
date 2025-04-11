import React, { Suspense } from "react";

import ListingCard from "@/components/ListingCard";
import LoadMore from "@/components/LoadMore";
import EmptyState from "@/components/EmptyState";
import ChatWidget from "@/components/ChatWidget"; // ✅ Add ChatWidget

import { getListings } from "@/services/listing";
import { getFavorites } from "@/services/favorite";

export const dynamic = "force-dynamic";

interface HomeProps {
  searchParams?: { [key: string]: string | undefined };
}

const Home = async ({ searchParams }: HomeProps) => {
  const { listings, nextCursor } = await getListings(searchParams);
  const favorites = await getFavorites();

  if (!listings || listings.length === 0) {
    return (
      <>
        <EmptyState
          title="No Listings found"
          subtitle="Looks like you have no properties."
        />
        <ChatWidget /> {/* ✅ Keep chatbot available even on empty state */}
      </>
    );
  }

  return (
    <>
      <section className="main-container pt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
        {listings.map((listing) => {
          const hasFavorited = favorites.includes(listing.id);
          return (
            <ListingCard
              key={listing.id}
              data={listing}
              hasFavorited={hasFavorited}
            />
          );
        })}
        {nextCursor && (
          <Suspense fallback={<></>}>
            <LoadMore
              nextCursor={nextCursor}
              fnArgs={searchParams}
              queryFn={getListings}
              queryKey={["listings", searchParams]}
              favorites={favorites}
            />
          </Suspense>
        )}
      </section>
      <ChatWidget /> {/* ✅ This renders your chatbot floating button */}
    </>
  );
};

export default Home;