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
        { title: "Breach-O-Beach, FilteRaid, Torque Dash", description: "Material Distribution, 4-7pm" },
        { title: "Game-on!", description: "Building Phase, 4-7pm" },
        { title: "Ohm Alone", description: "Round 1, 4-7pm" },
        { title: "Chemystrey 2.O", description: "Round 1, 4-7pm" },
      ],
    },
    {
      day: "Day 2",
      events: [
        { title: "Breach-O-Beach", description: "Building Phase, 9am-1pm"},
        { title: "cyberSiege", description: "Round 1, 9am-1pm"},
        { title: "Aeroquest Glider", description: "Material Distribution, 9am-1pm"},
        { title: "Triumph Cards", description: "Round 1, 9am-1pm"},
        { title: "Chemystrey 2.O", description: "Round 2, 9am-1pm"},
        { title: "Game-on!", description: "Building Phase, 9am-7pm"},
        { title: "CyberSeige", description: "Round 2, 2pm-7pm"},
        { title: "Ohm Alone", description: "Round 2, 2pm-7pm"},

    ],
    },
  
  {
      day: "Day 3",
      events: [
        { title: "Triumph Cards", description: "Round 2, 9am-2pm"},
        { title: "Game-On!", description: "Final Scoring, 9am-2pm"},
      ],
    },
  ];