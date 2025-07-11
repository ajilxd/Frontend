import { useContext } from "react";
import { CalendarContext } from "./CalendarContext";

export const useCalendar = () => useContext(CalendarContext);
