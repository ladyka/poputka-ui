"use client";

import React, {useEffect, useRef, useState,} from "react";
import {Box, Button, Typography} from "@mui/material";
import {useChangeBookingStatus, useGetAvailableBookingStatuses, useGetMessages, useSendMessage} from "@/app/services/DialogService";
import {Message} from "@/app/dti/Message";
import {formatDateLabel, formatTimeLabel} from "@/app/utils/dateFormatters";
import {Booking} from "@/app/dti/Booking";
import Link from "@mui/material/Link";
import {useQueryClient} from "@tanstack/react-query";
import {bookingStatusLabel, getBookingStatusLabel} from "@/app/utils/bookingStatus";

type Props = {
    booking: Booking;
};

export default function MessagesList({booking}: Props) {
    const queryClient = useQueryClient();
    const {data: messages = [], refetch} = useGetMessages(booking.bookingId);
    const sendMessageMutation = useSendMessage();
    const { data: availableStatusesResponse, refetch: refetchAvailableStatuses } =
        useGetAvailableBookingStatuses(booking.bookingId);
    const changeStatusMutation = useChangeBookingStatus();
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

    const buildServiceText = (payload: Message["payload"]) => {
        if (!("event" in payload) || payload.event !== "BOOKING_STATUS_CHANGED") return null;

        const from = typeof payload.from === "string" ? payload.from : undefined;
        const to = typeof payload.to === "string" ? payload.to : undefined;

        if (!to) return "Статус бронирования изменён";

        switch (to) {
            case "ACCEPTED":
                return "Водитель подтвердил поездку";
            case "REJECTED":
                return "Водитель отклонил заявку";
            case "CANCELLED":
                return "Бронирование отменено";
            case "EXPIRED":
                return "Заявка истекла";
            case "NO_SHOW":
                return "Пассажир не явился";
            case "CHECKED_IN":
                return "Пассажир отметил прибытие";
            case "IN_PROGRESS":
                return "Поездка началась";
            case "COMPLETED":
                return "Поездка завершена";
            default:
                return from
                    ? `Статус изменён: ${getBookingStatusLabel(from)} → ${getBookingStatusLabel(to)}`
                    : `Статус изменён: ${getBookingStatusLabel(to)}`;
        }
    };

    const parseGeoMessage = (text: string) => {
        const m = text.trim().match(/^GEO:\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\s*$/i);
        if (!m) return null;
        const lat = Number(m[1]);
        const lon = Number(m[2]);
        if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
        if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return null;
        return { lat, lon };
    };

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
            {
                bookingId: booking.bookingId,
                payload: {type: "MESSAGE", text: newMessageContent},
            },
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

    const handleSendLocation = () => {
        if (!booking.bookingId) return;
        if (!("geolocation" in navigator)) {
            alert("Геолокация недоступна в этом браузере.");
            return;
        }
        if (typeof window !== "undefined" && !window.isSecureContext) {
            alert("Геолокация доступна только на HTTPS (или на localhost). Откройте приложение в безопасном контексте.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                const text = `GEO:${lat},${lon}`;
                sendMessageMutation.mutate(
                    { bookingId: booking.bookingId, payload: { type: "MESSAGE", text } },
                    {
                        onSuccess() {
                            refetch();
                        },
                        onError(err) {
                            console.error("Failed to send location:", err);
                            alert("Не удалось отправить геолокацию.");
                        },
                    }
                );
            },
            (err) => {
                console.error("Geolocation error:", err);
                const code = (err as GeolocationPositionError)?.code;
                const msg =
                    code === 1
                        ? "Доступ к геолокации запрещён. Разрешите геолокацию для этого сайта в настройках браузера."
                        : code === 2
                            ? "Не удалось определить местоположение (POSITION_UNAVAILABLE). Проверьте, включена ли геолокация/службы местоположения."
                            : code === 3
                                ? "Таймаут определения местоположения (TIMEOUT). Попробуйте ещё раз."
                                : "Не удалось получить геолокацию. Проверьте разрешения браузера и что сайт открыт по HTTPS (или localhost).";
                alert(msg);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
        );
    };

    const availableStatuses = availableStatusesResponse?.available ?? [];
    const handleChangeStatus = (to: string) => {
        if (!booking.bookingId) return;
        changeStatusMutation.mutate(
            { bookingId: booking.bookingId, to },
            {
                onSuccess() {
                    refetchAvailableStatuses();
                    refetch();
                    queryClient.invalidateQueries({ queryKey: ['bookings'] });
                },
                onError(err) {
                    console.error("Failed to change booking status:", err);
                    alert("Failed to change booking status.");
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
                        const isService = msg.payload?.type === "SERVICE";
                        const serviceText = isService ? buildServiceText(msg.payload) : null;
                        const text =
                            !isService && "text" in msg.payload && typeof msg.payload.text === "string"
                                ? msg.payload.text
                                : "";
                        const geo = text ? parseGeoMessage(text) : null;
                        const mapUrl =
                            geo
                                ? `https://www.openstreetmap.org/export/embed.html?bbox=${geo.lon - 0.01}%2C${geo.lat - 0.01}%2C${geo.lon + 0.01}%2C${geo.lat + 0.01}&layer=mapnik&marker=${geo.lat}%2C${geo.lon}`
                                : null;
                        const osmLink =
                            geo ? `https://www.openstreetmap.org/?mlat=${geo.lat}&mlon=${geo.lon}#map=16/${geo.lat}/${geo.lon}` : null;
                        return (
                            isService ? (
                                <Box
                                    key={msg.id}
                                    sx={{
                                        alignSelf: "center",
                                        maxWidth: "80%",
                                        px: 1.5,
                                        py: 0.75,
                                        borderRadius: 999,
                                        bgcolor: "rgba(255,255,255,0.8)",
                                        border: "1px solid rgba(0,0,0,0.06)",
                                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <Typography variant="caption" sx={{textAlign: "center"}}>
                                        {serviceText ?? "Событие"}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{whiteSpace: "nowrap"}}>
                                        {formatTimeLabel(msg.modifiedDatetime)}
                                    </Typography>
                                </Box>
                            ) : (
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
                                    {geo && mapUrl ? (
                                        <Box sx={{display: "flex", flexDirection: "column", gap: 0.5}}>
                                            <Box
                                                component="iframe"
                                                src={mapUrl}
                                                sx={{
                                                    border: 0,
                                                    width: 260,
                                                    height: 160,
                                                    borderRadius: 1,
                                                    overflow: "hidden",
                                                }}
                                                loading="lazy"
                                                referrerPolicy="no-referrer"
                                            />
                                            <Typography variant="caption" sx={{wordBreak: "break-word"}}>
                                                Местоположение: {geo.lat.toFixed(5)}, {geo.lon.toFixed(5)}{" "}
                                                {osmLink ? (
                                                    <Link href={osmLink} target="_blank" rel="noreferrer">
                                                        открыть
                                                    </Link>
                                                ) : null}
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Typography sx={{wordBreak: "break-word"}}>
                                            {text}
                                        </Typography>
                                    )}
                                    <Typography variant="caption" color="text.secondary">
                                        {formatTimeLabel(msg.modifiedDatetime)}
                                    </Typography>
                                </Box>
                            )
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
                <button
                    onClick={handleSendLocation}
                    style={{
                        marginLeft: 10,
                        padding: "10px 15px",
                        borderRadius: 4,
                        border: "1px solid #1976d2",
                        background: "white",
                        color: "#1976d2",
                        cursor: "pointer",
                    }}
                >
                    Моя геолокация
                </button>
            </Box>
            {availableStatuses.length > 0 && (
                <Box sx={{display: "flex", flexWrap: "wrap", gap: 1, mt: 1}}>
                    {availableStatuses.map((status) => (
                        <Button
                            key={status}
                            size="small"
                            variant="outlined"
                            disabled={changeStatusMutation.isPending}
                            onClick={() => handleChangeStatus(status)}
                        >
                            {bookingStatusLabel[status] ?? status}
                        </Button>
                    ))}
                </Box>
            )}
        </>
    );
}
