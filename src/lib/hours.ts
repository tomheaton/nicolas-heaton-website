import { OPENING_HOURS, type OpeningDay } from "@/constants/content.ts";

/** The salon's timezone, so a visitor abroad still sees Malmesbury's clock. */
const TIME_ZONE = "Europe/London";

const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** A day the salon trades, narrowed so `opens` and `closes` are known to be present. */
export type TradingDay = OpeningDay & { opens: string; closes: string };

export function isTrading(day: OpeningDay): day is TradingDay {
  return day.opens !== undefined && day.closes !== undefined;
}

/** `"10:00"` → `"10am"`, `"09:30"` → `"9:30am"`. */
function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours < 12 ? "am" : "pm";
  const hour = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour}${minutes ? `:${String(minutes).padStart(2, "0")}` : ""}${suffix}`;
}

/** `"10am – 5pm"`, or `"Closed"`. */
export function formatDay(day: OpeningDay): string {
  return isTrading(day) ? `${formatTime(day.opens)} – ${formatTime(day.closes)}` : "Closed";
}

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/** The weekday and time of day in Malmesbury, whatever timezone the browser is in. */
function salonNow(now: Date): { index: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const field = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return {
    index: SHORT_DAYS.indexOf(field("weekday")),
    minutes: Number(field("hour")) * 60 + Number(field("minute")),
  };
}

export interface OpenStatus {
  open: boolean;
  /** Ready to display, e.g. `"Open now · until 5pm"` or `"Closed · opens Tuesday 10am"`. */
  label: string;
  /** JS day index of today in the salon's timezone, for highlighting the current row. */
  today: number;
}

/** Whether the salon is open right now, and when it next opens if not. */
export function currentStatus(now: Date = new Date()): OpenStatus {
  const { index, minutes } = salonNow(now);
  const today = OPENING_HOURS.find((day) => day.index === index);

  if (today && isTrading(today)) {
    if (minutes >= toMinutes(today.opens) && minutes < toMinutes(today.closes)) {
      return { open: true, label: `Open now · until ${formatTime(today.closes)}`, today: index };
    }
    if (minutes < toMinutes(today.opens)) {
      return {
        open: false,
        label: `Closed · opens today ${formatTime(today.opens)}`,
        today: index,
      };
    }
  }

  for (let ahead = 1; ahead <= 7; ahead++) {
    const next = OPENING_HOURS.find((day) => day.index === (index + ahead) % 7);
    if (next && isTrading(next)) {
      const when = ahead === 1 ? "tomorrow" : next.name;
      return {
        open: false,
        label: `Closed · opens ${when} ${formatTime(next.opens)}`,
        today: index,
      };
    }
  }

  return { open: false, label: "Closed", today: index };
}
