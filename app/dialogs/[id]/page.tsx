'use client';

import MessagesList from '../components/MessagesList';
import { useParams } from 'next/navigation';
import { useGetBookings } from "@/app/services/DialogService";

export default function DialogsWithIdPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data } = useGetBookings();

  const booking = data?.find(b => b.bookingId === id);

  if (!booking) {
    return <p>Диалог не найден</p>;
  }

  return (
    <MessagesList booking={booking} />
  );
}
