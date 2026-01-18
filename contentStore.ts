
import { SiteContent, Event, BinLocation } from './types';
import { INITIAL_LOCATIONS, INITIAL_EVENTS } from './constants';

const DEFAULT_CONTENT: SiteContent = {
  design: {
    primaryColor: '#1d4ed8', // blue-700
    fontFamily: 'font-sans',
    borderRadius: 'rounded-[3rem]'
  },
  home: {
    heroTitle: 'SUPPORTING OUR STUDENTS, ONE CLOSET AT A TIME.',
    heroSubtitle: 'We partner with YISD, EPISD, SISD, and CISD to provide essential clothing and financial assistance.',
    heroImage: 'https://images.unsplash.com/photo-1523050335312-0d05bc2be225?auto=format&fit=crop&q=80',
    missionTitle: 'Redirecting items from closets to the people who need them most.',
    missionBody: 'Donate El Paso provides donated clothing directly to students throughout El Paso and local shelters.',
    missionImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80'
  },
  about: {
    title: 'OUR MISSION & STORY',
    intro: 'What began with a single donation bin built by hand has grown into a community program.',
    historyTitle: '12 Years of Dedication',
    historyBody: 'We have been part of the used clothing industry for more than 12 years, supporting local schools and charities.',
    images: [
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80'
    ]
  },
  donate: {
    title: 'HOW TO DONATE',
    subtitle: 'Choose the method that works best for you. Every contribution directly supports students and families in El Paso.',
    monetaryTitle: 'Support Our Mission Financially',
    monetaryBody: '100% of all monetary contributions goes to provide food and clothing to students at our local schools.',
    pickupTitle: 'Home Pick-Up Request',
    pickupBody: 'We want to make sure we support our community in every way possible by providing home pick-ups.',
    pickupImage: 'https://images.unsplash.com/photo-1586769852044-692d6e3703a0?auto=format&fit=crop&q=80'
  },
  events: {
    title: 'COMMUNITY EVENTS',
    subtitle: 'Join us in our missions across El Paso. From clothing drives to student sponsorship galas, stay involved.',
    sponsorTitle: 'Sponsor a Child or Family',
    sponsorBody: 'Every person who donates, along with every company we form a partnership with, gives these students an opportunity to achieve their goals.',
    sponsorImage1: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80',
    sponsorImage2: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80'
  },
  contact: {
    title: 'GET IN TOUCH',
    subtitle: 'Have questions about how to partner with us or need to schedule a bin drop-off at your school? We\'re here to help.'
  },
  eventList: INITIAL_EVENTS,
  binList: INITIAL_LOCATIONS
};

export const getContent = (): SiteContent => {
  const saved = localStorage.getItem('donate_el_paso_content');
  return saved ? JSON.parse(saved) : DEFAULT_CONTENT;
};

export const saveContent = (content: SiteContent) => {
  localStorage.setItem('donate_el_paso_content', JSON.stringify(content));
  window.dispatchEvent(new Event('contentUpdate'));
};
