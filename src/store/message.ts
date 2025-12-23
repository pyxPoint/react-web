import { create } from "zustand";
import { MessageType } from "@/types";

interface MessageState<T> {
  type: T;
  key: string;
  content: string;
  show: boolean;
  setMessage: (type: T, content: string, key: string) => void;
  removeMessage: () => void;
}
interface AlertState extends Omit<MessageState<MessageType>, "removeMessage"> {
  setStatue: (show: boolean) => void;
}

export const useMessageStore = create<MessageState<string>>((set) => ({
  type: "",
  key: "",
  content: "",
  show: false,
  setMessage: (type, content, key) => set(() => ({ type, content, show: true, key })),
  removeMessage: () => set(() => ({ type: "", content: "", show: false }))
}));

export const useAlertStore = create<AlertState>((set) => ({
  type: "default",
  key: "",
  content: "",
  show: false,
  setMessage: (type, content, key) => set(() => ({ type, content, show: true, key })),
  setStatue: (show) => set(() => ({ show }))
}));
