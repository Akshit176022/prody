import { LinkState,Timestate ,MembersData,Event,TimelineEvent,timeline} from "./type";

export const links: LinkState[] = [
  { href: "/home", name: "Home" },
  { href: "/events", name: "Events" },
  { href: "/members", name: "Members" },
  { href: "/profile", name: "Profile" },
  { href: "/workshop", name: "Workshop" },
  { href: "/timeline", name: "Timeline" },
  { href: "/signup", name: "SignUp" },
  { href:"/login",name:"Login"}
];

export const testimonials = [
    {src: "/images/1.jpeg"},
    {src: "/images/workshop.png" },
    {src: "/images/events.png"}
  ];

 export const timelineData: Timestate[] = [
      {
        day: "DAY 1",
        content:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velestias distinctio qui commodi fugit? Aut pariatur tempora repellat consectetur fuga iure, nesciunt quibusdam veritatis perspiciatis, molestiae voluptatibus natus, sapiente blanditiis inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      },
      {
        day: "DAY 2",
        content:
          "Sed ut perspiciatis unde omnis  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      },
      {
        day: "DAY 3",
        content:
          "Neque porro quisquam est, qui dolorem ipsum quia dolor  sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
      },
    ];



export const membersData: MembersData = {
    coreTeam: [
      { name: 'Gugli Thakur', role: 'Secretary', image: '/images/1.png', bitmoji: '/images/card.png' },
      { name: 'Gugli Thakur', role: 'Secretary', image: '/images/1.png', bitmoji: '/images/card.png' },
      { name: 'Gugli Thakur', role: 'Secretary', image: '/images/1.png', bitmoji: '/images/card.png' },
      { name: 'Gugli Thakur', role: 'Secretary', image: '/images/1.png', bitmoji: '/images/card.png' },
    ],
    techTeam: [
      { name: 'Gugli Thakur', role: 'Secretary', image: '/images/1.png', bitmoji: '/images/card.png' },
      { name: 'Gugli Thakur', role: 'Secretary', image: '/images/1.png', bitmoji: '/images/card.png' },
      { name: 'Gugli Thakur', role: 'Secretary', image: '/images/1.png', bitmoji: '/images/card.png' },
      { name: 'Gugli Thakur', role: 'Secretary', image: '/images/1.png', bitmoji: '/images/card.png' },
    ],
    designTeam: [
      { name: 'Gugli Thakur', role: 'Secretary', image: '/images/1.png', bitmoji: '/images/card.png' },
      { name: 'Gugli Thakur', role: 'Secretary', image: '/images/1.png', bitmoji: '/images/card.png' },
      { name: 'Gugli Thakur', role: 'Secretary', image: '/images/1.png', bitmoji: '/images/card.png' },
      { name: 'Gugli Thakur', role: 'Secretary', image: '/images/1.png', bitmoji: '/images/card.png' },
    ],
    FinanceTeam: [
      { name: 'Gugli Thakur', role: 'Secretary', image: '/images/1.png', bitmoji: '/images/card.png' },
      { name: 'Gugli Thakur', role: 'Secretary', image: '/images/1.png', bitmoji: '/images/card.png' },
      { name: 'Gugli Thakur', role: 'Secretary', image: '/images/1.png', bitmoji: '/images/card.png' },
      { name: 'Gugli Thakur', role: 'Secretary', image: '/images/1.png', bitmoji: '/images/card.png' },
    ],
    PRTeam: [
      { name: 'Gugli Thakur', role: 'Secretary', image: '/images/1.png', bitmoji: '/images/card.png' },
      { name: 'Gugli Thakur', role: 'Secretary', image: '/images/1.png', bitmoji: '/images/card.png' },
      { name: 'Gugli Thakur', role: 'Secretary', image: '/images/1.png', bitmoji: '/images/card.png' },
      { name: 'Gugli Thakur', role: 'Secretary', image: '/images/1.png', bitmoji: '/images/card.png' },
    ],
  };


export const teamSections = [
    { id: 'core-team', label: 'CORE TEAM', data: membersData.coreTeam },
    { id: 'design-team', label: 'DESIGN TEAM', data: membersData.designTeam },
    { id: 'tech-team', label: 'TECH TEAM', data: membersData.techTeam },
    { id: 'finance-team', label: 'FINANCE TEAM', data: membersData.FinanceTeam },
    { id: 'pr-team', label: 'PR TEAM', data: membersData.PRTeam },
  ];
  
 export  const events: Event[] = [
    {
      name: "ABHEDYA",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores at eligendi incidunt, inventore maxime. Nemo, repudiandae saepe reprehenderit.",
      image: "/images/glider.png",
    },
    {
      name: "CHEMYSTRY",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fermentum nulla eu dolor sollicitudin.",
        image: "/images/glider.png",
    },
    {
      name: "GAME ON",
      description:
        "Explore the advancements in AI and machine learning with experts from around the world.",
        image: "/images/glider.png",
    },
    {
      name: "GLIDER",
      description:
        "Test your robotics skills and compete with the best minds in the field of robotics.",
        image: "/images/glider.png",
    },
    {
      name: "CSE EVENT",
      description:
        "Join our 48-hour hackathon event and create innovative solutions to real-world problems.",
        image: "/images/glider.png",
    },
    {
      name: "MONOPOLY",
      description:
        "The ultimate gaming event featuring popular games and intense competition.",
        image: "/images/glider.png",
    },
    {
      name: "MOUSETRAP",
      description:
        "Pitch your startup ideas to investors and experts, and take your business to the next level.",
        image: "/images/glider.png",
    },
    {
      name: "TRUIMPH",
      description:
        "Enjoy a fun-filled night of music, dance, and food celebrating diverse cultures.",
        image: "/images/glider.png",
    },
  ];


  export const timelineData2: TimelineEvent[] = [
    {
      day: "Day 1",
      title: "Event 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed qui as debitis dicta dolore.",
    },
    {
      day: "Day 1",
      title: "Event  2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing  eos vero sapiente voluptas debitis dicta dolore.",
    },
    {
      day: "Day 2",
      title: "Event 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas debitis dicta dolore.",
    },
    {
      day: "Day 2",
      title: "Event 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit sint eos vero sapiente voluptas debitis dicta dolore.",
    },
    {
      day: "Day 3",
      title: "Event 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit sint eos vero sapiente voluptas debitis dicta dolore.",
    },
    {
      day: "Day 3",
      title: "Event 2",
      description:
        "Lorem ipsum dolor sit amet consectetur laboriosam deleniti repellendus? Dolorem odit aut ea repellat id sed.",
    },
  ];
  export const timelineData3: timeline[] = [
    {
      day: 'DAY-1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      margin: '100px'
    },
    {
      day: 'DAY-2',
      description: 'Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam.',
      margin: '500px'
    },
    {
      day: 'DAY-3',
      description: 'Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Nulla sit amet est tincidunt, malesuada nisi vel, dapibus leo.',
      margin: '900px'
    },
    {
      day: 'DAY-4',
      description: 'Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Nulla sit amet est tincidunt, malesuada nisi vel, dapibus leo. Nulla sit amet lectus sollicitudin tristique.',
      margin: '1300px'
    }
  ];
  