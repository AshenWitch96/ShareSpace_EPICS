import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { createReservation } from '@/services/reservation';

// This handler is triggered when the reservation process is completed (instead of Stripe session)
export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the incoming JSON request body
    
    // Optionally, you can still check for specific headers or conditions based on your own validation rules.
    // For example, you might want to check if the request is coming from a trusted source.
    
    // Extract metadata from the request body (this data should come from the frontend form or request)
    const { listingId, startDate, endDate, totalPrice, userId } = body;

    // Validate incoming data
    if (!listingId || !startDate || !endDate || !totalPrice || !userId) {
      return new Response('Invalid request data', { status: 400 });
    }

    // Create a reservation (without Stripe)
    await createReservation({ listingId, startDate: new Date(startDate), endDate: new Date(endDate), totalPrice: Number(totalPrice), userId });

    // Respond with success
    return NextResponse.json({ result: 'Reservation created successfully', ok: true });
  } catch (err) {
    console.error(err);
    
    // Handle errors and send an appropriate response
    return NextResponse.json(
      { message: 'Something went wrong', ok: false },
      { status: 500 }
    );
  }
}
