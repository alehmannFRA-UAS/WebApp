import { Message } from "./message";

export interface Room {
    id: number;
    name: string;
    users: any[];
    messages: Message[];
}
