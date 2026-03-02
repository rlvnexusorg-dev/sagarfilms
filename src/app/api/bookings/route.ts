
import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

// The path to the bookings JSON file
const bookingsPath = path.join(process.cwd(), 'src', 'lib', 'bookings.json');

// Function to read bookings from the file
async function getBookings() {
  try {
    const file = await fs.readFile(bookingsPath, 'utf8');
    return JSON.parse(file);
  } catch (error) {
    // If the file doesn't exist or is empty, return an empty array
    return [];
  }
}

export async function GET() {
  const bookings = await getBookings();
  const bookingDates = bookings.map((b: any) => b.date);
  return NextResponse.json(bookingDates);
}

export async function POST(request: Request) {
  try {
    const newBooking = await request.json(); // Expected format: { date: "YYYY-MM-DDTHH:mm:ss.sssZ" }
    if (!newBooking.date) {
      return NextResponse.json({ message: 'Date is required' }, { status: 400 });
    }

    const bookings = await getBookings();
    
    // Add the new booking
    bookings.push({ date: newBooking.date });

    // Write the updated list back to the file
    await fs.writeFile(bookingsPath, JSON.stringify(bookings, null, 2));

    return NextResponse.json({ message: 'Booking saved successfully' }, { status: 201 });
  } catch (error) {
    console.error('Failed to save booking:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
