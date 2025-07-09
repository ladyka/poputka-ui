"use client";

import React, {useEffect, useRef, useState,} from "react";
import {Box, Typography} from "@mui/material";
import {useGetMessages, useSendMessage} from "@/app/services/DialogService";
import {Message} from "@/app/dti/Message";
import {formatDateLabel, formatTimeLabel} from "@/app/utils/dateFormatters";
import {Booking} from "@/app/dti/Booking";
import Link from "@mui/material/Link";

type Props = {
    booking: Booking;
};

export default function MessagesList({booking}: Props) {
    const {data: messages = [], refetch} = useGetMessages(booking.bookingId);
    const sendMessageMutation = useSendMessage();
    const [newMessageContent, setNewMessageContent] = useState("");

    type Item =
        | { type: "date"; date: string }
        | { type: "message"; msg: Message };
    const items: Item[] = [];
    let lastDate = "";

    messages.forEach((msg) => {
        const date = formatDateLabel(msg.modifiedDatetime);
        if (date !== lastDate) {
            items.push({type: "date", date});
            lastDate = date;
        }
        items.push({type: "message", msg});
    });

    const dateRefs = useRef<Record<string, HTMLDivElement>>({});
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const c = containerRef.current;
        if (c) {
            c.scrollTo({
                top: c.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages.length])

    const handleSendMessage = () => {
        if (!newMessageContent.trim() || !booking.bookingId) return;
        sendMessageMutation.mutate(
            {bookingId: booking.bookingId, content: newMessageContent},
            {
                onSuccess() {
                    setNewMessageContent("");
                    refetch();
                },
                onError(err) {
                    console.error("Failed to send message:", err);
                    alert("Failed to send message.");
                },
            }
        );
    };

    return (
        <>
            <Box
                ref={containerRef}
                sx={{
                    overflowY: "auto",
                    border: "1px solid #eee",
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    p: "0 16px 16px",
                    gap: 1,
                    position: "relative",
                    backgroundColor: "#c0d5e8",
                    height: "100%"
                }}
            >
                <Box
                    component="div"
                    sx={{
                        position: "sticky",
                        top: 0,
                        bgcolor: "background.paper",
                        zIndex: 10,
                        pt: 1,
                        pb: 0.5,
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                        position: "relative"
                    }}>
                        <Typography variant="h6" noWrap>
                            {booking.oppositeUserName} <Link
                            href={'/trip/' + booking.tripId}>{booking.placeFrom} - {booking.placeTo}</Link>
                        </Typography>
                    </Box>
                </Box>
                {items.map((it) => {
                    if (it.type === "date") {
                        return (
                            <Box
                                key={`date-${it.date}`}
                                component="div"
                                ref={(el: HTMLDivElement | null) => {
                                    if (el) {
                                        dateRefs.current[it.date] = el;
                                    }
                                }}
                                sx={{
                                    textAlign: "center",
                                    my: 1,
                                }}
                            >
                                <Typography variant="caption" color="text.secondary" fontSize={10}>
                                    {it.date}
                                </Typography>
                            </Box>
                        );
                    } else {
                        const {msg} = it;
                        return (
                            <Box
                                key={msg.id}
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    gap: 0.5,
                                    maxWidth: "70%",
                                    p: "6px",
                                    borderRadius: "8px 8px 8px 2px",
                                    alignSelf: msg.myMessage ? "flex-end" : "flex-start",
                                    bgcolor: msg.myMessage ? "hsl(114deg 100% 93%)" : "#FFF",
                                }}
                            >
                                <Typography sx={{wordBreak: "break-word"}}>
                                    {msg.content}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {formatTimeLabel(msg.modifiedDatetime)}
                                </Typography>
                            </Box>
                        );
                    }
                })}
            </Box>
            <Box sx={{display: "flex", mt: 2}}>
                <input
                    type="text"
                    placeholder="Введите сообщение..."
                    value={newMessageContent}
                    onChange={(e) => setNewMessageContent(e.target.value)}
                    style={{
                        flexGrow: 1,
                        padding: 10,
                        borderRadius: 4,
                        border: "1px solid #ccc",
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") handleSendMessage();
                    }}
                />
                <button
                    onClick={handleSendMessage}
                    style={{
                        marginLeft: 10,
                        padding: "10px 15px",
                        borderRadius: 4,
                        border: "none",
                        background: "#1976d2",
                        color: "white",
                        cursor: "pointer",
                    }}
                >
                    Отправить
                </button>
            </Box>
        </>
    );
}
