
export enum Page {
  Home = 'Home',
  Booking = 'Booking',
  Services = 'Services',
  About = 'About',
  Contact = 'Contact',
  Admin = 'Admin',
}

export enum Language {
  FA = 'fa',
  EN = 'en',
}

export interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}
