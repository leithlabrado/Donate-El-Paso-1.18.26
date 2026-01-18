
export interface BinLocation {
  id: string;
  name: string;
  type: 'High School' | 'Middle School' | 'Elementary' | 'Daycare' | 'Private' | 'Other';
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  type: 'Clothing Drive' | 'Fundraiser' | 'Community Outreach';
}

export interface Partner {
  id: string;
  name: string;
}

export interface SiteContent {
  design: {
    primaryColor: string;
    fontFamily: 'font-sans' | 'font-serif' | 'font-mono';
    borderRadius: 'rounded-none' | 'rounded-lg' | 'rounded-3xl' | 'rounded-[3rem]';
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    missionTitle: string;
    missionBody: string;
    missionImage: string;
  };
  about: {
    title: string;
    intro: string;
    historyTitle: string;
    historyBody: string;
    images: string[];
  };
  donate: {
    title: string;
    subtitle: string;
    monetaryTitle: string;
    monetaryBody: string;
    pickupTitle: string;
    pickupBody: string;
    pickupImage: string;
  };
  events: {
    title: string;
    subtitle: string;
    sponsorTitle: string;
    sponsorBody: string;
    sponsorImage1: string;
    sponsorImage2: string;
  };
  contact: {
    title: string;
    subtitle: string;
  };
  eventList: Event[];
  binList: BinLocation[];
}
