import { CardDemo } from "@/components/ui/CardDemo";
import EventList from "@/components/ui/eventCard";
import { Event, Session } from "@/types/types";
const events: Event[] = [
  {
    id: "1",
    title: "Hackathon",
    description: "Coding event",
    startDate: "2026-01-01",
    endDate: "2026-01-02",
    location: "Antananarivo",
    sessions: [],
  },
  {
    id: "2",
    title: "React Workshop",
    description: "Learn React step by step",
    startDate: "2026-02-01",
    endDate: "2026-02-02",
    location: "Online",
    sessions: [],
  },
];


export default function Page() {
  return (
    <div className="bg-muted-foreground ">
        <EventList events = {events} />
        {/* <CardDemo /> */}
    </div>
  
  );
}