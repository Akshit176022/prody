export interface LinkState {
    href: string;
    name: string;
  }

 export interface Timestate{
    day: string;
    content: string;

 }

 export interface Member {
    name: string;
    role: string;
    image: string;
    bitmoji: string;
  }
  
 export  interface MembersData {
    coreTeam: Member[];
    techTeam: Member[];
    designTeam: Member[];
    FinanceTeam: Member[];
    PRTeam: Member[];
  }
  
 export interface MemberCardProps {
    member: Member;
  }

  export interface Event {
    name: string;
    description: string;
    image: string;
  }

  export interface TimelineEvent {
    day: string;
    title: string;
    description: string;
  }
   export interface timeline{
    day : string,
    description: string,
    margin: string
  }