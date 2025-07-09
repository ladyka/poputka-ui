    import {useMutation, useQuery} from "@tanstack/react-query";
    import {apiInstance} from "@/app/services/ApiInstance";
    import {Message} from "@/app/dti/Message";
    import { Booking, CreateBookingResponse } from "../dti/Booking";

    export function useGetBookings() {
        return useQuery<Booking[], Error>({
            queryKey: ['bookings'],
            queryFn: async () => {
                const response = await apiInstance.get(`/booking/`);
                return response.data;
            },
        });
    }

    export function useCreateBooking() {
        return useMutation<CreateBookingResponse, Error, { tripId: number; message: string; }>({
            mutationFn: async (newBooking) => {
                const response = await apiInstance.put('/booking', newBooking);
                return response.data;
            },
        });
    }

    export function useGetMessages(chatId: string) {
        return useQuery<Message[], Error>({
            queryKey: ['messages', chatId],
            queryFn: async () => {
                const response = await apiInstance.get(`/booking/messages/${chatId}`);
                return response.data;
            },
            enabled: !!chatId,
        });
    }

    export function useSendMessage() {
        return useMutation<Message, Error, { bookingId: string; content: string; }>({
            mutationFn: async (newMessage) => {
                const response = await apiInstance.put('/booking/messages', newMessage);
                return response.data;
            },
        });
    } 