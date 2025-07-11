import { createContext } from "react";
import { View } from "../types.calendar";
import { Locale } from "date-fns";
import { EventType } from "@/types";

type ContextType = {
  view: View;
  setView: (view: View) => void;
  date: Date;
  setDate: (date: Date) => void;
  events: EventType[];
  locale: Locale;
  setEvents: (date: EventType[]) => void;
  onChangeView?: (view: View) => void;
  onEventClick?: (event: EventType) => void;
  enableHotkeys?: boolean;
  today: Date;
  updateView: (view: View) => void;
  updateEvent: (event: EventType[]) => void;
};

export const CalendarContext = createContext<ContextType>({} as ContextType);
