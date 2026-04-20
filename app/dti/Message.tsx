export type MessageStatus = "SENT" | "DELIVERED" | "READ" | (string & {});

export type MessagePayloadBase = {
  type: string;
};

export type TextMessagePayload = MessagePayloadBase & {
  text?: string;
};

export type ServiceMessagePayload = MessagePayloadBase & {
  event?: string;
  from?: string;
  to?: string;
};

export type MessagePayload = TextMessagePayload | ServiceMessagePayload;

// GET `/booking/messages/{bookingId}` -> `BookingMessageDto[]`
export interface Message {
  id: string;
  payload: MessagePayload;
  messageStatus: MessageStatus;
  modifiedDatetime: string;
  myMessage: boolean;
}

// PUT `/booking/messages` -> `MessageDto`
export interface MessageDto {
  id: string;
  bookingId: string;
  senderId: number;
  payload: MessagePayload;
  messageStatus: MessageStatus;
}

export interface MessageCreateDto {
  bookingId: string;
  payload?: MessagePayload;
}
