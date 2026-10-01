export interface PropertyStat {
  label: string;
  value: string;
  unit?: string;
  detail: string;
}

export interface CameraPosition {
  id: string;
  label: string;
  subtitle: string;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

export interface SpaceDetail {
  id: string;
  title: string;
  category: string;
  description: string;
  materiality: string;
  image: string;
  aspectRatio?: string;
  specs: string[];
}

export interface LocationHighlight {
  category: string;
  name: string;
  note: string;
  type: string;
}

export interface FloorPlanLevel {
  id: string;
  label: string;
  level: string;
  area: string;
  description: string;
  keySpaces: string[];
  zones: {
    name: string;
    dimensions: string;
    coordinates: string; // SVG path or highlight area
  }[];
}

export const PROPERTY_INFO = {
  name: 'Aurelia',
  subtitle: 'The Crest Residence',
  tagline: 'An architectural sanctuary carved from monolithic stone and light.',
  location: {
    estate: 'Point Dume Promontory',
    city: 'Malibu',
    region: 'California, USA',
    coordinates: '34°00\'08" N — 118°48\'20" W',
  },
  architect: 'Studio VANDENBERG & Partners',
  completionYear: '2026',
  price: {
    display: '$48,500,000',
    terms: 'Private Acquisition Portfolio · Verified Inquiries Only',
  },
  heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
  overviewImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
  nightImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=85',
  ctaImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85',
  
  description: {
    lead: 'Suspended above the Pacific on a protected oceanic bluff, Aurelia represents a rare synthesis of brutalist purity and Mediterranean serenity.',
    architectural: 'Constructed from board-formed travertine, thermal titanium zinc, and floor-to-ceiling structural glass, the residence dissolves the boundary between interior volume and the endless ocean horizon. Every axis has been calculated according to solar paths, framing golden-hour light across expansive cantilevered terraces.',
  },
  
  stats: [
    { label: 'Bedrooms', value: '6', detail: 'Private suites with en-suite stone baths & private ocean decks' },
    { label: 'Bathrooms', value: '9', detail: 'Full monolithic marble sanctuaries & two guest powder rooms' },
    { label: 'Interior Space', value: '14,200', unit: 'sq ft', detail: 'Climate-controlled living volumes with 14ft ceiling heights' },
    { label: 'Exterior Terraces', value: '6,400', unit: 'sq ft', detail: 'Cantilevered limestone decks with fire hearths & water gardens' },
    { label: 'Gallery Parking', value: '6', unit: 'Vehicles', detail: 'Subterranean climate-controlled automotive showroom' },
    { label: 'Infinity Pool', value: '82', unit: 'ft', detail: 'Dual-tier heated seawater infinity pool cantilevered over cliff' },
  ] as PropertyStat[],

  cameraPositions: [
    {
      id: 'exterior',
      label: 'Exterior Architecture',
      subtitle: 'Monolithic cantilever & ocean vantage',
      position: [14, 8, 16],
      target: [0, 1.5, 0],
      fov: 42,
    },
    {
      id: 'living',
      label: 'Grand Great Room',
      subtitle: '14ft ceiling structural glass volume',
      position: [4, 3, 5],
      target: [0, 2, 0],
      fov: 52,
    },
    {
      id: 'kitchen',
      label: 'Culinary Pavilion',
      subtitle: 'Book-matched Calacatta marble island',
      position: [-5, 3.2, 3],
      target: [-1, 2, 0],
      fov: 48,
    },
    {
      id: 'bedroom',
      label: 'Master Suite',
      subtitle: 'Cantilevered upper sanctuary deck',
      position: [5, 6, 7],
      target: [1, 4.5, 0],
      fov: 45,
    },
    {
      id: 'pool',
      label: 'Infinity Horizon Pool',
      subtitle: 'Cantilevered 82ft seawater basin',
      position: [8, 2.5, -7],
      target: [2, 0.8, -1],
      fov: 50,
    },
  ] as CameraPosition[],

  spaces: [
    {
      id: 'exterior',
      title: 'Exterior Architecture',
      category: 'Structure & Facade',
      description: 'Monolithic board-formed travertine volumes with sweeping overhangs engineered to frame prevailing sea breezes while sheltering private garden courts.',
      materiality: 'Thermal Travertine · Titanium Zinc · Blackened Steel',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      specs: ['14ft Structural Glass Spans', 'Seismic Damper Substructure', 'Oceanfront Cliffside Foundation'],
    },
    {
      id: 'living',
      title: 'Grand Living Room',
      category: 'Living & Entertaining',
      description: 'An open-concept gallery space with a sculptural floating hearth carved from French limestone and automated pocket glass walls opening 40 feet to the terrace.',
      materiality: 'Brushed French Limestone · European White Oak · Smoked Bronze',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
      specs: ['Automated Pocket Glazing', 'Suspended Hearth', 'Acoustic Slat Ceilings'],
    },
    {
      id: 'kitchen',
      title: 'Culinary Pavilion',
      category: 'Gourmet & Dining',
      description: 'A bespoke chef-standard space centered around a 16-foot monolithic Calacatta marble island with seamless integrated Gaggenau 400 series appliances.',
      materiality: 'Calacatta Borghini Marble · Fluted Smoked Oak · Matte Titanium',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
      specs: ['16ft Monolithic Stone Island', 'Hidden Preparation Scullery', 'Temperature Wine Vault'],
    },
    {
      id: 'bedroom',
      title: 'Primary Sanctuary',
      category: 'Private Suites',
      description: 'Occupying the entire upper western wing, the primary bedroom enjoys uninterrupted sunset panoramas, a morning terrace, and dual bespoke dressing salons.',
      materiality: 'Linen Wall Upholstery · White Oiled Oak · Bronzed Brass',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85',
      specs: ['Dual Private Sun Terraces', 'Bespoke Poliform Wardrobes', 'Sunrise & Sunset Dual Exposure'],
    },
    {
      id: 'bathroom',
      title: 'Monolithic Wellness Bath',
      category: 'Bespoke Wellness',
      description: 'Carved from solid slabs of Silver Travertine, featuring a custom sculptural soaking tub positioned directly toward the breaking ocean surf.',
      materiality: 'Silver Vein Travertine · Waterworks Fixtures · Fluted Glass',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85',
      specs: ['Monolithic Sculptural Tub', 'Rain Steam Sanctuary', 'Private Outdoor Shower Garden'],
    },
  ] as SpaceDetail[],

  lifestyle: {
    lead: 'Life at Aurelia unfolds to the rhythm of coastal tides, morning sea mists, and fireside twilight reflections.',
    aspects: [
      {
        title: 'Morning Solitude',
        subtitle: 'Sunrise Over Mountain Ridges',
        description: 'Wake to filtered coastal sunlight pouring across cantilevered stone terraces, with private yoga and wellness pavilions nestled into indigenous dune flora.',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
      },
      {
        title: 'Heated Seawater Pool',
        subtitle: '82-Foot Cliffside Infinity Basin',
        description: 'An engineered aquatic centerpiece that creates a seamless visual merge with the Pacific, equipped with underwater acoustics and sunset heating.',
        image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=85',
      },
      {
        title: 'Al Fresco Dining Pavilion',
        subtitle: 'Twilight Entertaining',
        description: 'An open-air dining terrace with an integrated wood-fired masonry oven, sheltered under an automated louvered pergola with radiant radiant heat.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
      },
      {
        title: 'Evening Atmosphere',
        subtitle: 'Fire Pit & Night Horizon',
        description: 'As twilight falls, discreet museum-grade lighting illuminates architectural stone textures, accompanied by ocean breezes and roaring hearth fires.',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
      },
    ],
    locations: [
      {
        category: 'Aviation',
        name: 'Private Jet Terminal',
        note: 'Van Nuys / Santa Monica Jet Centers',
        type: 'Private Runway Access',
      },
      {
        category: 'Dining',
        name: 'Nobu & Little Beach House',
        note: 'Point Dume & Carbon Beach Dining',
        type: 'Michelin & Private Member Clubs',
      },
      {
        category: 'Yachting & Coastal',
        name: 'Marina Del Rey Harbor',
        note: 'Deep Water Mooring & Yacht Slip',
        type: 'Private Marine Facilities',
      },
      {
        category: 'Education & Culture',
        name: 'Distinguished Academies',
        note: 'Malibu & Pacific Palisades Enclave',
        type: 'Premier Independent Schools',
      },
      {
        category: 'Shopping & Leisure',
        name: 'Malibu Country Mart & Lumber Yard',
        note: 'Curated Boutiques & Galleries',
        type: 'Artisan & Designer Retail',
      },
      {
        category: 'Downtown Access',
        name: 'Beverly Hills & Century City',
        note: 'Executive Commercial Corridors',
        type: 'City Metropolises',
      },
    ] as LocationHighlight[],
  },

  floorPlans: [
    {
      id: 'ground',
      label: 'Ground Level',
      level: 'Level 01 — Main Living & Gardens',
      area: '8,400 sq ft Interior · 3,800 sq ft Terrace',
      description: 'The social core of the estate: seamless indoor-outdoor great room, gourmet kitchen, butler’s pantry, two guest suites, library lounge, and the 82ft cantilevered infinity pool.',
      keySpaces: [
        'Grand Great Room (40ft glass pocket doors)',
        'Gourmet Chef & Display Kitchen with Scullery',
        'Formal Dining Salon with Temperature Wine Wall',
        'Suites 01 & 02 with En-Suite Stone Baths',
        '82-Foot Seawater Infinity Pool & Sun Deck',
        'Sunken Conversation Hearth with Fire Table',
      ],
      zones: [
        { name: 'Living Room', dimensions: '38\' × 24\'', coordinates: 'M 10 30 L 45 30 L 45 70 L 10 70 Z' },
        { name: 'Dining Salon', dimensions: '22\' × 18\'', coordinates: 'M 48 30 L 72 30 L 72 52 L 48 52 Z' },
        { name: 'Kitchen & Scullery', dimensions: '26\' × 20\'', coordinates: 'M 48 54 L 72 54 L 72 80 L 48 80 Z' },
        { name: 'Infinity Pool', dimensions: '82\' × 18\'', coordinates: 'M 10 82 L 80 82 L 80 94 L 10 94 Z' },
        { name: 'Guest Wing', dimensions: '32\' × 20\'', coordinates: 'M 74 30 L 95 30 L 95 80 L 74 80 Z' },
      ],
    },
    {
      id: 'first',
      label: 'First Level',
      level: 'Level 02 — Private Suites & Master Sanctuary',
      area: '5,800 sq ft Interior · 2,600 sq ft Terrace',
      description: 'Dedicated entirely to tranquility and rest: the primary master sanctuary with dual boutique dressing rooms, spa bathroom, morning deck, and three additional private en-suite suites.',
      keySpaces: [
        'Primary Master Sanctuary with Sunset Balcony',
        'Monolithic Travertine Primary Spa Bath',
        'Dual Walk-In Dressing Rooms with Glass Closets',
        'Suites 03, 04, and 05 (Each with en-suite terrace)',
        'Upper Ocean Lookout Lounge & Library',
        'Private Service Stair & Linen Butler Station',
      ],
      zones: [
        { name: 'Master Sanctuary', dimensions: '34\' × 22\'', coordinates: 'M 15 25 L 55 25 L 55 60 L 15 60 Z' },
        { name: 'Primary Bath & Spa', dimensions: '22\' × 18\'', coordinates: 'M 57 25 L 85 25 L 85 50 L 57 50 Z' },
        { name: 'Dressing Salons', dimensions: '20\' × 16\'', coordinates: 'M 57 52 L 85 52 L 85 75 L 57 75 Z' },
        { name: 'Suites 03 & 04', dimensions: '30\' × 20\'', coordinates: 'M 15 62 L 55 62 L 55 90 L 15 90 Z' },
      ],
    },
    {
      id: 'exterior',
      label: 'Exterior & Subterranean',
      level: 'Level -01 & Grounds — Gallery & Wellness',
      area: '4,200 sq ft Subterranean · 1.8 Acres Grounds',
      description: 'Features a 6-car automotive collector gallery, climate-controlled 1,200 bottle wine cellar, private screening room, fitness and infrared sauna facility, and terraced drought-tolerant gardens.',
      keySpaces: [
        'Automotive Collector Showroom (6-Vehicle capacity)',
        '1,200-Bottle Sommelier Wine Vault & Tasting Bar',
        'Private Dolby Atmos 12-Seat Cinema Room',
        'Wellness Center with Infrared Sauna & Cold Plunge',
        'Gated Guard Residence & Security Control Suite',
        'Private Bluff Cliffside Footpath Access',
      ],
      zones: [
        { name: 'Automotive Gallery', dimensions: '48\' × 30\'', coordinates: 'M 10 20 L 60 20 L 60 55 L 10 55 Z' },
        { name: 'Wine Vault & Tasting', dimensions: '20\' × 18\'', coordinates: 'M 62 20 L 90 20 L 90 45 L 62 45 Z' },
        { name: 'Spa & Wellness', dimensions: '26\' × 24\'', coordinates: 'M 62 48 L 90 48 L 90 85 L 62 85 Z' },
        { name: 'Screening Salon', dimensions: '28\' × 22\'', coordinates: 'M 10 58 L 58 58 L 58 85 L 10 85 Z' },
      ],
    },
  ] as FloorPlanLevel[],

  specifications: [
    { title: 'Site Area', detail: '1.82 Private Acres (79,280 sq ft)' },
    { title: 'Gross Built Area', detail: '20,600 sq ft (14,200 conditioned)' },
    { title: 'Structure', detail: 'Post-tensioned concrete, board-formed travertine, steel exoskeleton' },
    { title: 'Fenestration', detail: 'Swiss-engineered Sky-Frame motorized low-iron triple glazing' },
    { title: 'Energy & Climate', detail: 'Geothermal heating/cooling, 32kW solar array, dual Tesla Megapacks' },
    { title: 'Smart Estate System', detail: 'Crestron Home Horizon automation, Lutron Ketra human-centric lighting' },
    { title: 'Water Systems', detail: 'Whole-estate mineral purification & reverse osmosis desalination backup' },
    { title: 'Security', detail: 'Biometric access, perimeter laser tripwire, secure subterranean safe suite' },
  ],
};
