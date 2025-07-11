import { differenceInMinutes, isSameHour } from "date-fns";
import { dayEventVariants } from "../types.calendar";
import { cn } from "@/lib/utils";
import { EventType } from "@/types";
import { CheckCircle, Circle, Eye, Loader, XCircle } from "lucide-react";

export const TaskStatusIcons = {
  todo: Circle,
  in_progress: Loader,
  review: Eye,
  done: CheckCircle,
  cancelled: XCircle,
};

export const EventGroup = ({
  events,
  hour,
  onClick,
}: {
  events: EventType[];
  hour: Date;
  onClick: (event: EventType) => void;
}) => {
  return (
    <div className="h-20 border-t last:border-b relative">
      {events
        .filter((event) => isSameHour(event.start, hour))
        .map((event) => {
          const hoursDifference =
            differenceInMinutes(new Date(event.end), new Date(event.start)) /
            60;
          const startPosition = new Date(event.start).getMinutes() / 60;

          const StatusIcon = TaskStatusIcons[event.status];

          return (
            <div
              key={event.id}
              className={cn(
                "absolute left-0 right-0 mx-1 p-2 rounded-lg shadow-sm text-white cursor-pointer",
                dayEventVariants({ variant: event.color || "green" })
              )}
              style={{
                top: `${startPosition * 100}%`,
                height: `${hoursDifference * 100}%`,
              }}
              onClick={() => onClick(event)}
            >
              <div className="flex items-center gap-2 mb-1">
                <StatusIcon className="w-4 h-4 text-white/80" />
                <h3 className="font-medium text-sm">{event.title}</h3>
              </div>
              <p className="text-xs text-white/80">{event.assignee[0].name}</p>
              <p className="text-xs text-white/60 truncate">
                {event.description}
              </p>
              <span className="text-[10px] uppercase tracking-wide text-white/50">
                {event.status.replace("_", " ")}
              </span>
            </div>
          );
        })}
    </div>
  );
};
