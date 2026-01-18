
import { BinLocation, Event, Partner } from './types';

export const INITIAL_LOCATIONS: BinLocation[] = [
  { id: '1', name: 'Montwood High School', type: 'High School' },
  { id: '2', name: 'Montwood Middle School', type: 'Middle School' },
  { id: '3', name: 'Christian Schools of El Paso', type: 'Private' },
  { id: '4', name: 'El Paso High School', type: 'High School' },
  { id: '5', name: 'Moye Elementary', type: 'Elementary' },
  { id: '6', name: 'Colin L Powell Elementary', type: 'Elementary' },
  { id: '7', name: 'Bliss Elementary', type: 'Elementary' },
  { id: '8', name: 'Andres High School', type: 'High School' },
  { id: '9', name: 'Hanks High School', type: 'High School' },
  { id: '10', name: 'Pebble Hills HS', type: 'High School' },
  { id: '11', name: 'El Dorado HS', type: 'High School' },
  { id: '12', name: 'Eastwood HS', type: 'High School' },
  { id: '13', name: 'Franklin HS', type: 'High School' },
  { id: '14', name: 'Bel Air HS', type: 'High School' },
  { id: '15', name: 'Burgess HS', type: 'High School' },
  { id: '16', name: 'Rafael Hernando', type: 'Middle School' },
  { id: '17', name: 'Sun Ridge Middle', type: 'Middle School' },
  { id: '18', name: 'Jane Hambric Elementary', type: 'Elementary' },
  { id: '19', name: 'Hershal Antwine', type: 'Elementary' },
  { id: '20', name: 'Walter E Clarke Middle', type: 'Middle School' },
  { id: '21', name: 'Wonder World Daycare', type: 'Daycare' },
  { id: '22', name: 'Western Hills Elementary', type: 'Elementary' },
  { id: '23', name: 'First to Read Day Care', type: 'Daycare' },
  { id: '24', name: 'Myrtle Cooper', type: 'Elementary' },
  { id: '25', name: 'Eastlake Middle School', type: 'Middle School' },
  { id: '26', name: 'Genie\'s Daycare', type: 'Daycare' },
  { id: '27', name: 'Eastlake HS', type: 'High School' },
  { id: '28', name: 'Ensor Elementary', type: 'Elementary' },
  { id: '29', name: 'Triumph High School East', type: 'High School' },
  { id: '30', name: 'Triumph High School West', type: 'High School' },
  { id: '31', name: 'Bel Air High School', type: 'High School' },
  { id: '32', name: 'Loma Verde Elementary', type: 'Elementary' },
];

export const INITIAL_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Winter Clothing Drive 2024',
    date: '2024-12-15',
    description: 'Collecting heavy coats, blankets, and winter gear for local families.',
    type: 'Clothing Drive'
  },
  {
    id: 'e2',
    title: 'Parkland High Sponsor Gala',
    date: '2024-11-20',
    description: 'Sponsoring two outstanding students at Parkland High School.',
    type: 'Fundraiser'
  }
];

export const PARTNERS: Partner[] = [
  { id: 'p1', name: 'YISD' },
  { id: 'p2', name: 'EPISD' },
  { id: 'p3', name: 'SISD' },
  { id: 'p4', name: 'CISD' },
  { id: 'p5', name: 'Supreme Cleaners' },
];

export const CONTACT_INFO = {
  address: '813 First Ave, El Paso, TX 79901',
  phone: '915.588.4252',
  email: 'leith@donateelpaso.com'
};
