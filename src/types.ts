
type ContactProps = {
    getDataFromContactForm: (data: ContactFormProps) => void;
    dataToContactForm: Contact;
  };
  
  interface Contact {
    firstName: string;
    lastName: string;
    active: boolean;
  }
  interface ContactFormProps {
    formData: Contact;
    showContactForm: boolean;
  }
  interface AllRecord {
    cases: {
      [key: string]: string
    }
    deaths: {
      [key: string]: string
    }
    recovered: {
      [key: string]: string
    }
  }
  
  interface WorldData {
    updated: number;
    country: string;
    countryInfo: {
      _id: number;
      iso2: string;
      iso3: string;
      lat: 33;
      long: 65;
      flag: string;
    },
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    todayRecovered: number;
    active: number;
    critical: number;
    casesPerOneMillion: number;
    deathsPerOneMillion: number;
    tests: number;
    testsPerOneMillion: number;
    population: number;
    continent: string
    oneCasePerPeople: number;
    oneDeathPerPeople: number;
    oneTestPerPeople: number;
    activePerOneMillion: number;
    recoveredPerOneMillion: number;
    criticalPerOneMillion: number;
  }
  
  interface WorldWide {
    active: number;
    activePerOneMillion: number;
    affectedCountries: number;
    cases: number;
    casesPerOneMillion: number;
    critical: number;
    criticalPerOneMillion: number;
    deaths: number;
    deathsPerOneMillion: number;
    oneCasePerPeople: number;
    oneDeathPerPeople: number;
    oneTestPerPeople: number;
    population: number;
    recovered: number;
    recoveredPerOneMillion: number;
    tests: number;
    testsPerOneMillion: number;
    todayCases: number;
    todayDeaths: number;
    todayRecovered: number;
    updated: number;
  }
  
  interface NavBar {
    tabName: string;
    path: string;
    active: boolean
  }
  
  export type { Contact, ContactProps, ContactFormProps, AllRecord, WorldData, WorldWide, NavBar };