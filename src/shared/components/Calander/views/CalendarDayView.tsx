import { setHours } from "date-fns";
import { TimeTable } from "../utils/TimeTable";
import { EventGroup } from "../utils/EventGroup";
import { useCalendar } from "../context/useCalendar";

export const CalendarDayView = () => {
  const { view, events, date, onEventClick } = useCalendar();

  if (view !== "day") return null;

  const hours = [...Array(24)].map((_, i) => setHours(date, i));

  return (
    <div className="flex relative pt-2 overflow-auto h-full">
      <TimeTable />
      <div className="flex-1">
        {hours.map((hour) => (
          <EventGroup
            key={hour.toString()}
            hour={hour}
            events={events}
            onClick={onEventClick}
          />
        ))}
      </div>
    </div>
  );
};
