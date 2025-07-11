import { CalendarNextTrigger } from "./Triggers/CalendarNextTrigger";
import { CalendarPrevTrigger } from "./Triggers/CalendarPrevTrigger";
import { CalendarCurrentDate } from "./utils/CalendarCurrentDate";
import { CalendarDayView } from "./views/CalendarDayView";
import { CalendarMonthView } from "./views/CalendarMonthView";
import { CalendarWeekView } from "./views/CalendarWeekView";
import { CalendarYearView } from "./views/CalendarYearView";
import { useCalendar } from "./context/useCalendar";
import { UseQueryResult } from "@tanstack/react-query";
import { EventType } from "@/types";
import { useEffect } from "react";

type Props = {
  user: {
    id: string;
    profile: { name?: string; image?: string };
    role: string;
  };
  useEventsQuery: (userId: string) => UseQueryResult<EventType[], Error>;
};

export const CalendarEvents = ({ useEventsQuery, user }: Props) => {
  const { view, updateView, updateEvent, events: Events } = useCalendar();

  const { data: events, isFetched } = useEventsQuery(user.id);

  useEffect(() => {
    if (events?.length) {
      updateEvent(events);
    }
  }, [isFetched]);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 border border-border rounded-2xl shadow-md bg-background">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-4 mb-4">
        <div>
          <div className="text-xl font-semibold text-foreground">
            <CalendarCurrentDate />
          </div>
          <div className="text-amber-400">you got {Events.length} events</div>
        </div>
        <div className="flex space-x-2">
          <CalendarPrevTrigger className="inline-flex items-center px-6 py-2 border border-input rounded-md text-sm font-medium bg-background hover:bg-accent hover:text-accent-foreground shadow-sm">
            Prev
          </CalendarPrevTrigger>
          <CalendarNextTrigger className="inline-flex items-center px-6 py-2 border border-input rounded-md text-sm font-medium bg-background hover:bg-accent hover:text-accent-foreground shadow-sm">
            Next
          </CalendarNextTrigger>
        </div>
        <div className="flex justify-center">
          <div className="inline-flex rounded-md border border-border bg-muted p-1 shadow-sm">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium shadow-sm ${
                view === "day"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => updateView("day")}
            >
              Day
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium shadow-sm ${
                view === "week"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => updateView("week")}
            >
              Week
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium shadow-sm ${
                view === "month"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => updateView("month")}
            >
              Month
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium shadow-sm ${
                view === "year"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => updateView("year")}
            >
              Year
            </button>
          </div>
        </div>
      </header>

      <div className="max-h-[500px] overflow-y-auto">
        <CalendarDayView />
        <CalendarWeekView />
        <CalendarMonthView />
        <CalendarYearView />
      </div>
    </div>
  );
};
