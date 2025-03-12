export interface Event {
    title: string;
    description: string;
  }
  
  export interface Day {
    day: string;
    events: Event[];
  }
  
  export const timelineData: Day[] = [
    {
      day: "Day 1",
      events: [
        { title: "Event 1", description: "Description of Event 1." },
        { title: "Event 2", description: "Description of Event 2." },
      ],
    },
    {
      day: "Day 2",
      events: [
        { title: "Event 1", description: "Description of Event 1." },
        { title: "Event 2", description: "Description of Event 2." },
      ],
    },
    {
      day: "Day 3",
      events: [
        { title: "Event 1", description: "Description of Event 1." },
        { title: "Event 2", description: "Description of Event 2." },
      ],
    },
  ];