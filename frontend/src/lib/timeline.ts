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
        { title: "Aeroquest Glider, Torque Dash", description: "Material Distribution, 4-7pm" },
        { title: "Game-on!", description: "Building Phase, 4-7pm" },
        { title: "Chemystrey 2.O", description: "Round 1, 4-7pm" },
      ],
    },
    {
      day: "Day 2",
      events: [
        { title: "Breach-O-Beach", description: "Building Phase and testing, 9am-1pm"},
        { title: "Bidwiser", description: "Round 1, 9am-1pm"},
        { title: "Chemystrey 2.O", description: "Round 2, 11am-1:30pm"},
        { title: "FilteRaid", description: "Round 1, 2pm-4pm"},
        { title: "CyberSeige", description: "Problem Solving and evaluation, 2pm-7pm"},
        { title: "Game-on!", description: "Mid Evaluation, 4pm-7pm"},
        { title: "Ohm Alone", description: "Round 1, 5:30pm-7pm"},
       ],
    },
  {
      day: "Day 3",
      events: [
        { title: "Torque Dash", description: "Final Evaluation, 10am-12:30pm"},
        { title: "Ohm Alone", description: "Round 2, 9am-1pm"},
        { title: "Game-On!", description: "Final Evaluation, 9am-2pm"},
        { title: "Bidwiser", description: "Round 2, 2pm-7pm"},
        { title: "FilteRaid", description: "Round 2, 2pm-7pm"},
        { title: "Aeroquest Glider", description: "Final Evaluation, 4pm-6pm"},
      ],
    },
  ];