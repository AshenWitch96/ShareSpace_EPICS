import React from "react";

import EmptyState from "@/components/EmptyState";
import ListingHead from "./_components/ListingHead";
import ListingInfo from "./_components/ListingInfo";
import ListingClient from "./_components/ListingClient";
import ListingReview from "./_components/ListingReview";
import ChatWidget from "@/components/ChatWidget"; // ✅ Import ChatWidget

import { getCurrentUser } from "@/services/user";
import { getListingById } from "@/services/listing";
import { categories } from "@/utils/constants";

interface IParams {
  listingId: string;
}

const ListingPage = async ({ params: { listingId } }: { params: IParams }) => {
  const listing = await getListingById(listingId);
  const currentUser = await getCurrentUser();

  if (!listing) return (
    <>
      <EmptyState />
      <ChatWidget /> {/* ✅ Render ChatWidget even on EmptyState */}
    </>
  );

  const {
    title,
    imageSrc,
    country,
    region,
    id,
    user: owner,
    price,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    latlng,
    reservations,
  } = listing;

  const category = categories.find((cate) => cate.label === listing.category);

  return (
    <>
      <section className="main-container">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={title}
            image={imageSrc}
            country={country}
            region={region}
            id={id}
          />
        </div>

        <ListingClient
          id={id}
          price={price}
          reservations={reservations}
          user={currentUser}
          title={title}
        >
          <ListingInfo
            user={owner}
            category={category}
            description={description}
            roomCount={roomCount}
            guestCount={guestCount}
            bathroomCount={bathroomCount}
            latlng={latlng}
          />
        </ListingClient>

        {/* Reviews Section */}
        <section id="reviews" className="bg-white py-10 mt-10 border-t">
          <div className="max-w-4xl mx-auto px-4">
            <ListingReview listingId={id} currentUser={currentUser} />
          </div>
        </section>
      </section>

      <ChatWidget /> {/* ✅ Chatbot floating on all Listing pages */}
    </>
  );
};

export default ListingPage;
