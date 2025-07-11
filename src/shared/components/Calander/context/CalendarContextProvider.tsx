import { ReactNode } from "react";
import { View } from "../types.calendar";
import { Locale } from "date-fns";
import { useState } from "react";
import { enUS } from "date-fns/locale/en-US";
import { useHotkeys } from "react-hotkeys-hook";
import { CalendarContext } from "./CalendarContext";
import { EventType } from "@/types";

type CalendarProps = {
  children: ReactNode;
  defaultDate?: Date;
  events?: EventType[];
  view?: View;
  locale?: Locale;
  enableHotkeys?: boolean;
  onChangeView?: (view: View) => void;
  onEventClick?: (event: EventType) => void;
};

export const Calendar = ({
  children,
  defaultDate = new Date(),
  locale = enUS,
  enableHotkeys = true,
  view: _defaultMode = "month",
  onEventClick,
  events: defaultEvents = [],
  onChangeView,
}: CalendarProps) => {
  const [view, setView] = useState<View>(_defaultMode);
  const [date, setDate] = useState(defaultDate);
  const [events, setEvents] = useState<EventType[]>(defaultEvents);

  const changeView = (view: View) => {
    setView(view);
    onChangeView?.(view);
  };

  const updateView = (view: View) => {
    setView(view);
  };

  const updateEvent = (event: EventType[]) => {
    setEvents(event);
  };

  useHotkeys("m", () => changeView("month"), {
    enabled: enableHotkeys,
  });

  useHotkeys("w", () => changeView("week"), {
    enabled: enableHotkeys,
  });

  useHotkeys("y", () => changeView("year"), {
    enabled: enableHotkeys,
  });

  useHotkeys("d", () => changeView("day"), {
    enabled: enableHotkeys,
  });

  return (
    <CalendarContext.Provider
      value={{
        view,
        setView,
        date,
        setDate,
        events,
        setEvents,
        locale,
        enableHotkeys,
        onEventClick,
        onChangeView,
        today: new Date(),
        updateView,
        updateEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
