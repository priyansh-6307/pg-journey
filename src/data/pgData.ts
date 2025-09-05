export interface PGData {
  id: string;
  name: string;
  location: string;
  city: string;
  price: number;
  rating: number;
  reviewCount: number;
  images: string[];
  amenities: string[];
  roomTypes: {
    type: string;
    price: number;
    available: boolean;
  }[];
  genderPreference: 'Male' | 'Female' | 'Co-ed';
  availableFrom: string;
  description: string;
  meals: boolean;
  parking: boolean;
  nearbyPlaces: string[];
  rules: string[];
  contactPhone: string;
  contactWhatsApp: string;
  securityDeposit: number;
}

export const amenitiesList = [
  'WiFi', 'AC', 'Power Backup', 'CCTV Security', 'Housekeeping', 
  'Laundry', 'Meals', 'Hot Water', 'Parking', 'Gym', 
  'Common Area', 'Refrigerator', 'Water Purifier', 'Study Room', 
  'Gaming Area', 'Lift', 'Balcony', 'Attached Bathroom'
];

export const samplePGs: PGData[] = [
  {
    id: '1',
    name: 'Urban Nest PG',
    location: 'Koramangala, Bangalore',
    city: 'Bangalore',
    price: 15000,
    rating: 4.5,
    reviewCount: 128,
    images: [
      '/placeholder-pg-1.jpg',
      '/placeholder-pg-2.jpg',
      '/placeholder-pg-3.jpg',
      '/placeholder-pg-4.jpg'
    ],
    amenities: ['WiFi', 'AC', 'Power Backup', 'CCTV Security', 'Housekeeping', 'Laundry', 'Meals', 'Hot Water', 'Parking'],
    roomTypes: [
      { type: 'Single Sharing', price: 18000, available: true },
      { type: 'Double Sharing', price: 15000, available: true },
      { type: 'Triple Sharing', price: 12000, available: false }
    ],
    genderPreference: 'Co-ed',
    availableFrom: '2024-01-15',
    description: 'Modern PG accommodation in the heart of Koramangala with all amenities. Walking distance to major tech parks and metro station.',
    meals: true,
    parking: true,
    nearbyPlaces: ['Forum Mall - 0.5km', 'Koramangala Metro - 0.3km', 'Biocon - 2km', 'Wipro - 3km'],
    rules: ['No smoking', 'No alcohol', 'Visitors allowed till 9 PM', 'Check-in: 24/7'],
    contactPhone: '+91-9876543210',
    contactWhatsApp: '+91-9876543210',
    securityDeposit: 15000
  },
  {
    id: '2',
    name: 'Student Haven',
    location: 'Lajpat Nagar, Delhi',
    city: 'Delhi',
    price: 12000,
    rating: 4.2,
    reviewCount: 89,
    images: [
      '/placeholder-pg-1.jpg',
      '/placeholder-pg-2.jpg',
      '/placeholder-pg-3.jpg'
    ],
    amenities: ['WiFi', 'Power Backup', 'CCTV Security', 'Housekeeping', 'Laundry', 'Study Room', 'Common Area'],
    roomTypes: [
      { type: 'Double Sharing', price: 12000, available: true },
      { type: 'Triple Sharing', price: 9000, available: true }
    ],
    genderPreference: 'Male',
    availableFrom: '2024-01-10',
    description: 'Perfect for students with study rooms and excellent connectivity to universities.',
    meals: false,
    parking: false,
    nearbyPlaces: ['Lajpat Nagar Metro - 0.2km', 'DU South Campus - 1.5km', 'Central Market - 0.5km'],
    rules: ['No smoking', 'Quiet hours: 10 PM - 7 AM', 'Study room available 24/7'],
    contactPhone: '+91-9876543211',
    contactWhatsApp: '+91-9876543211',
    securityDeposit: 10000
  },
  {
    id: '3',
    name: 'Green Valley Residency',
    location: 'Hinjewadi, Pune',
    city: 'Pune',
    price: 18000,
    rating: 4.7,
    reviewCount: 156,
    images: [
      '/placeholder-pg-1.jpg',
      '/placeholder-pg-2.jpg',
      '/placeholder-pg-3.jpg',
      '/placeholder-pg-4.jpg'
    ],
    amenities: ['WiFi', 'AC', 'Power Backup', 'CCTV Security', 'Housekeeping', 'Laundry', 'Meals', 'Hot Water', 'Parking', 'Gym'],
    roomTypes: [
      { type: 'Single Sharing', price: 22000, available: true },
      { type: 'Double Sharing', price: 18000, available: true }
    ],
    genderPreference: 'Female',
    availableFrom: '2024-02-01',
    description: 'Premium PG for working women with gym facilities and excellent security.',
    meals: true,
    parking: true,
    nearbyPlaces: ['Hinjewadi IT Park - 1km', 'Phoenix MarketCity - 2km', 'Wipro - 0.8km'],
    rules: ['No male visitors', 'Curfew: 10 PM', 'ID proof required for entry'],
    contactPhone: '+91-9876543212',
    contactWhatsApp: '+91-9876543212',
    securityDeposit: 20000
  },
  {
    id: '4',
    name: 'Metro View PG',
    location: 'Andheri, Mumbai',
    city: 'Mumbai',
    price: 22000,
    rating: 4.3,
    reviewCount: 203,
    images: [
      '/placeholder-pg-1.jpg',
      '/placeholder-pg-2.jpg',
      '/placeholder-pg-3.jpg'
    ],
    amenities: ['WiFi', 'AC', 'Power Backup', 'CCTV Security', 'Housekeeping', 'Laundry', 'Hot Water', 'Lift'],
    roomTypes: [
      { type: 'Single Sharing', price: 25000, available: false },
      { type: 'Double Sharing', price: 22000, available: true },
      { type: 'Triple Sharing', price: 18000, available: true }
    ],
    genderPreference: 'Co-ed',
    availableFrom: '2024-01-20',
    description: 'Modern PG near Andheri station with excellent connectivity to all parts of Mumbai.',
    meals: false,
    parking: false,
    nearbyPlaces: ['Andheri Metro - 0.1km', 'Mindspace IT Park - 2km', 'Infiniti Mall - 1.5km'],
    rules: ['No smoking', 'Visitors allowed till 8 PM', 'Separate floors for men and women'],
    contactPhone: '+91-9876543213',
    contactWhatsApp: '+91-9876543213',
    securityDeposit: 25000
  },
  {
    id: '5',
    name: 'Tech Hub Residency',
    location: 'Electronic City, Bangalore',
    city: 'Bangalore',
    price: 14000,
    rating: 4.4,
    reviewCount: 167,
    images: [
      '/placeholder-pg-1.jpg',
      '/placeholder-pg-2.jpg',
      '/placeholder-pg-3.jpg',
      '/placeholder-pg-4.jpg'
    ],
    amenities: ['WiFi', 'AC', 'Power Backup', 'CCTV Security', 'Housekeeping', 'Laundry', 'Meals', 'Hot Water', 'Parking', 'Common Area'],
    roomTypes: [
      { type: 'Single Sharing', price: 17000, available: true },
      { type: 'Double Sharing', price: 14000, available: true },
      { type: 'Triple Sharing', price: 11000, available: true }
    ],
    genderPreference: 'Male',
    availableFrom: '2024-01-25',
    description: 'Perfect for IT professionals working in Electronic City with shuttle service to major companies.',
    meals: true,
    parking: true,
    nearbyPlaces: ['Infosys - 1km', 'TCS - 1.5km', 'Electronic City Metro - 2km', 'Forum Neighbourhood Mall - 3km'],
    rules: ['No smoking', 'No alcohol', 'Shuttle service available', 'ID card required for entry'],
    contactPhone: '+91-9876543214',
    contactWhatsApp: '+91-9876543214',
    securityDeposit: 15000
  },
  {
    id: '6',
    name: 'Royal Comfort PG',
    location: 'Karol Bagh, Delhi',
    city: 'Delhi',
    price: 16000,
    rating: 4.1,
    reviewCount: 94,
    images: [
      '/placeholder-pg-1.jpg',
      '/placeholder-pg-2.jpg',
      '/placeholder-pg-3.jpg'
    ],
    amenities: ['WiFi', 'AC', 'Power Backup', 'CCTV Security', 'Housekeeping', 'Laundry', 'Meals', 'Hot Water', 'Common Area'],
    roomTypes: [
      { type: 'Single Sharing', price: 20000, available: true },
      { type: 'Double Sharing', price: 16000, available: true }
    ],
    genderPreference: 'Female',
    availableFrom: '2024-02-05',
    description: 'Comfortable accommodation for working women in central Delhi with easy access to metro.',
    meals: true,
    parking: false,
    nearbyPlaces: ['Karol Bagh Metro - 0.5km', 'Ajmal Khan Road - 0.3km', 'Connaught Place - 3km'],
    rules: ['Ladies only', 'Curfew: 9 PM', 'No smoking', 'Visitors not allowed'],
    contactPhone: '+91-9876543215',
    contactWhatsApp: '+91-9876543215',
    securityDeposit: 18000
  },
  {
    id: '7',
    name: 'Skyline Heights PG',
    location: 'Baner, Pune',
    city: 'Pune',
    price: 16500,
    rating: 4.6,
    reviewCount: 142,
    images: [
      '/placeholder-pg-1.jpg',
      '/placeholder-pg-2.jpg',
      '/placeholder-pg-3.jpg',
      '/placeholder-pg-4.jpg'
    ],
    amenities: ['WiFi', 'AC', 'Power Backup', 'CCTV Security', 'Housekeeping', 'Laundry', 'Meals', 'Hot Water', 'Parking', 'Gym', 'Gaming Area'],
    roomTypes: [
      { type: 'Single Sharing', price: 19000, available: true },
      { type: 'Double Sharing', price: 16500, available: true },
      { type: 'Triple Sharing', price: 13500, available: false }
    ],
    genderPreference: 'Co-ed',
    availableFrom: '2024-01-30',
    description: 'Modern PG with recreational facilities and excellent connectivity to IT hubs.',
    meals: true,
    parking: true,
    nearbyPlaces: ['Baner IT Park - 1.5km', 'Amanora Mall - 2km', 'Persistent Systems - 2.5km'],
    rules: ['No smoking', 'Gaming room available till 11 PM', 'Separate wings for men and women'],
    contactPhone: '+91-9876543216',
    contactWhatsApp: '+91-9876543216',
    securityDeposit: 17000
  },
  {
    id: '8',
    name: 'Comfort Zone PG',
    location: 'Powai, Mumbai',
    city: 'Mumbai',
    price: 20000,
    rating: 4.0,
    reviewCount: 78,
    images: [
      '/placeholder-pg-1.jpg',
      '/placeholder-pg-2.jpg',
      '/placeholder-pg-3.jpg'
    ],
    amenities: ['WiFi', 'AC', 'Power Backup', 'CCTV Security', 'Housekeeping', 'Laundry', 'Hot Water', 'Common Area', 'Water Purifier'],
    roomTypes: [
      { type: 'Double Sharing', price: 20000, available: true },
      { type: 'Triple Sharing', price: 16000, available: true }
    ],
    genderPreference: 'Male',
    availableFrom: '2024-02-10',
    description: 'Budget-friendly PG near IIT Bombay and tech companies in Powai.',
    meals: false,
    parking: false,
    nearbyPlaces: ['IIT Bombay - 2km', 'Hiranandani Gardens - 1km', 'R City Mall - 1.5km'],
    rules: ['No smoking', 'No alcohol', 'Students and professionals welcome'],
    contactPhone: '+91-9876543217',
    contactWhatsApp: '+91-9876543217',
    securityDeposit: 20000
  }
];