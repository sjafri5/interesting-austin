export const neighborhoods = [
  { name: "East Austin", slug: "east-austin", description: "Creative, diverse, fast-growing food & nightlife scene." },
  { name: "South Congress", slug: "south-congress", description: "Trendy Austin strip with boutiques, cafes, and nightlife." },
  { name: "Rainey Street", slug: "rainey-street", description: "Iconic bungalow bar district, high-energy nightlife." },
  { name: "Downtown", slug: "downtown", description: "Business district with dining, nightlife, venues, and landmarks." },
  { name: "South Lamar", slug: "south-lamar", description: "Mix of local restaurants, bars, and Austin culture staples." },
  { name: "North Loop", slug: "north-loop", description: "Vintage shops, indie cafes, and funky Austin energy." },
  { name: "Mueller", slug: "mueller", description: "Family-friendly, modern, with parks and restaurants." },
  { name: "Cherrywood", slug: "cherrywood", description: "Quiet residential area with hidden gems." },
  { name: "Hyde Park", slug: "hyde-park", description: "Historic Austin neighborhood with quaint cafes." },
  { name: "Clarksville", slug: "clarksville", description: "Upscale, charming, walkable West Austin pocket." },
  { name: "Zilker", slug: "zilker", description: "Green spaces, Barton Springs, and top-tier food spots." },
  { name: "Domain / North Austin", slug: "domain", description: "Modern district with tech, entertainment, and shops." },
  { name: "East Cesar Chavez", slug: "east-cesar-chavez", description: "Bars, tacos, food trucks, artsy local vibes." },
  { name: "South First", slug: "south-first", description: "Eclectic restaurants, coffee shops, and indie vibes." },
  { name: "West Campus", slug: "west-campus", description: "UT Austin student area: cheap eats and lively energy." }
];

export const places = [

  // ============================
  //      COMEDY CLUBS
  // ============================

  {
    name: "East Austin Comedy Club",
    slug: "east-austin-comedy-club",
    type: "comedy_club",
    shortDescription: "Austin’s intimate, NYC-style, 80-seat underground comedy room.",
    address: "2505 E 6th St Suite D, Austin, TX 78702",
    website: "https://eastaustincomedy.com",
    instagram: "@eastaustincomedy",
    googleMapsUrl: "",
    neighborhoodSlug: "east-austin"
  },
  {
    name: "Cap City Comedy Club",
    slug: "cap-city-comedy-club",
    type: "comedy_club",
    shortDescription: "Legendary Austin comedy venue home to major touring acts.",
    address: "11506 Century Oaks Terrace #100, Austin, TX 78758",
    website: "https://capcitycomedy.com",
    instagram: "@capcitycomedy",
    googleMapsUrl: "",
    neighborhoodSlug: "domain"
  },
  {
    name: "The Creek & The Cave",
    slug: "the-creek-and-the-cave",
    type: "comedy_club",
    shortDescription: "NYC-transplant comedy hub with nightly shows and alt scene energy.",
    address: "611 E 7th St, Austin, TX 78701",
    website: "https://creekandcave.com",
    instagram: "@creekandcave",
    googleMapsUrl: "",
    neighborhoodSlug: "downtown"
  },
  {
    name: "Vulcan Gas Company Comedy",
    slug: "vulcan-comedy",
    type: "comedy_club",
    shortDescription: "High-ceiling downtown club hosting popular touring comics.",
    address: "418 E 6th St, Austin, TX 78701",
    website: "https://vulcanatx.com",
    instagram: "@vulcanatx",
    googleMapsUrl: "",
    neighborhoodSlug: "downtown"
  },
  {
    name: "The Sunset Room Comedy",
    slug: "sunset-room-comedy",
    type: "comedy_club",
    shortDescription: "Warehouse-style comedy and event venue.",
    address: "310 E 3rd St, Austin, TX 78701",
    website: "",
    instagram: "",
    googleMapsUrl: "",
    neighborhoodSlug: "downtown"
  },

  // ============================
  //      FOOD TRUCKS
  // ============================

  {
    name: "Via 313 Pizza Truck",
    slug: "via-313-truck",
    type: "food_truck",
    shortDescription: "Detroit-style pizza from one of Austin’s most famous food exports.",
    address: "61 Rainey St, Austin, TX",
    website: "https://via313.com",
    instagram: "@via313",
    googleMapsUrl: "",
    neighborhoodSlug: "rainey-street"
  },
  {
    name: "Veracruz All Natural",
    slug: "veracruz-all-natural",
    type: "food_truck",
    shortDescription: "One of Austin’s most beloved taco trucks — fresh, bold flavors.",
    address: "1704 E Cesar Chavez St, Austin, TX 78702",
    website: "https://veracruzallnatural.com",
    instagram: "@veracruz_allnatural",
    googleMapsUrl: "",
    neighborhoodSlug: "east-cesar-chavez"
  },
  {
    name: "Dee Dee Thai",
    slug: "dee-dee-thai",
    type: "food_truck",
    shortDescription: "Northern Thai street food known for heat and authenticity.",
    address: "4204 Menchaca Rd, Austin, TX 78704",
    website: "https://deedeeatx.com",
    instagram: "@deedeeatx",
    googleMapsUrl: "",
    neighborhoodSlug: "south-lamar"
  },
  {
    name: "Arlo’s",
    slug: "arlos",
    type: "food_truck",
    shortDescription: "Vegan comfort food famous for the Bac’n Cheeze Burger.",
    address: "900 Red River St, Austin, TX 78701",
    website: "https://arloscurbside.com",
    instagram: "@arloscurbside",
    googleMapsUrl: "",
    neighborhoodSlug: "downtown"
  },
  {
    name: "Pueblo Viejo",
    slug: "pueblo-viejo",
    type: "food_truck",
    shortDescription: "Classic Austin breakfast tacos and Mexican staples.",
    address: "502 Brushy St, Austin, TX 78702",
    website: "https://puebloviejoatx.com",
    instagram: "@puebloviejoatx",
    googleMapsUrl: "",
    neighborhoodSlug: "east-cesar-chavez"
  },

  // ============================
  //      MUSIC VENUES
  // ============================

  {
    name: "Mohawk Austin",
    slug: "mohawk-austin",
    type: "venue",
    shortDescription: "Iconic Red River venue with indoor/outdoor stages.",
    address: "912 Red River St, Austin, TX 78701",
    website: "https://mohawkaustin.com",
    instagram: "@mohawkaustin",
    googleMapsUrl: "",
    neighborhoodSlug: "downtown"
  },
  {
    name: "Stubb’s BBQ & Waller Creek Amphitheater",
    slug: "stubbs",
    type: "venue",
    shortDescription: "Legendary live music amphitheater and BBQ joint.",
    address: "801 Red River St, Austin, TX 78701",
    website: "https://stubbsaustin.com",
    instagram: "@stubbsaustin",
    googleMapsUrl: "",
    neighborhoodSlug: "downtown"
  },
  {
    name: "The Continental Club",
    slug: "continental-club",
    type: "venue",
    shortDescription: "Austin’s OG live music institution on South Congress.",
    address: "1315 S Congress Ave, Austin, TX 78704",
    website: "https://continentalclub.com",
    instagram: "",
    googleMapsUrl: "",
    neighborhoodSlug: "south-congress"
  },
  {
    name: "ACL Live at The Moody Theater",
    slug: "acl-live",
    type: "venue",
    shortDescription: "Home to Austin City Limits tapings and top-tier concerts.",
    address: "310 Willie Nelson Blvd, Austin, TX 78701",
    website: "https://acl-live.com",
    instagram: "",
    googleMapsUrl: "",
    neighborhoodSlug: "downtown"
  },
  {
    name: "The Parish",
    slug: "the-parish",
    type: "venue",
    shortDescription: "Renowned Sixth Street venue with a reputation for great sound.",
    address: "501 Brushy St, Austin, TX 78702",
    website: "https://theparishaustin.com",
    instagram: "@theparishaustin",
    googleMapsUrl: "",
    neighborhoodSlug: "east-cesar-chavez"
  },

  // ============================
  //      YOGA STUDIOS
  // ============================

  {
    name: "Black Swan Yoga",
    slug: "black-swan-yoga",
    type: "studio",
    shortDescription: "Donation-based yoga with a cult following.",
    address: "403 Orchard St, Austin, TX 78703",
    website: "https://blackswanyoga.com",
    instagram: "@blackswanyoga",
    googleMapsUrl: "",
    neighborhoodSlug: "clarksville"
  },
  {
    name: "Practice Yoga Austin",
    slug: "practice-yoga-austin",
    type: "studio",
    shortDescription: "Beloved East Austin studio with skilled teachers.",
    address: "1103 E 6th St, Austin, TX 78702",
    website: "https://practiceyogaaustin.com",
    instagram: "",
    googleMapsUrl: "",
    neighborhoodSlug: "east-austin"
  },
  {
    name: "TruFusion South Austin",
    slug: "trufusion-south",
    type: "studio",
    shortDescription: "High-intensity yoga, pilates, and fusion classes.",
    address: "4141 S Capital of Texas Hwy, Austin, TX 78704",
    website: "https://trufusion.com",
    instagram: "",
    googleMapsUrl: "",
    neighborhoodSlug: "south-lamar"
  },
  {
    name: "Soul Strong Yoga",
    slug: "soul-strong-yoga",
    type: "studio",
    shortDescription: "Welcoming yoga space offering restorative & flow classes.",
    address: "309 S Austin Ave, Austin, TX 78664",
    website: "https://soulstrongyoga.com",
    instagram: "",
    googleMapsUrl: "",
    neighborhoodSlug: "north-loop"
  },

  // ============================
  //      BARBER SHOPS
  // ============================

  {
    name: "Birds Barbershop (South Lamar)",
    slug: "birds-barbershop-lamar",
    type: "barber",
    shortDescription: "Austin’s colorful, iconic barbershop chain.",
    address: "2110 S Lamar Blvd, Austin, TX 78704",
    website: "https://birdsbarbershop.com",
    instagram: "",
    googleMapsUrl: "",
    neighborhoodSlug: "south-lamar"
  },
  {
    name: "SHED Barbershop",
    slug: "shed-barbershop",
    type: "barber",
    shortDescription: "Hip East Austin barbershop with modern cuts.",
    address: "2400 Webberville Rd, Austin, TX 78702",
    website: "https://shedbarbershop.com",
    instagram: "",
    googleMapsUrl: "",
    neighborhoodSlug: "east-austin"
  },
  {
    name: "Barbier des Amériques",
    slug: "barbier-des-ameriques",
    type: "barber",
    shortDescription: "Upscale Parisian-style grooming in Clarksville.",
    address: "1206 W 6th St, Austin, TX 78703",
    website: "https://barbierdesameriques.com",
    instagram: "",
    googleMapsUrl: "",
    neighborhoodSlug: "clarksville"
  },

  // ============================
  //      COFFEE SHOPS
  // ============================

  {
    name: "Radio Coffee & Beer",
    slug: "radio-coffee",
    type: "cafe",
    shortDescription: "Beloved South Austin hangout with food trucks.",
    address: "4204 Manchaca Rd, Austin, TX 78704",
    website: "https://radiocoffeeandbeer.com",
    instagram: "@radiocoffeeandbeer",
    googleMapsUrl: "",
    neighborhoodSlug: "south-lamar"
  },
  {
    name: "Houndstooth Coffee",
    slug: "houndstooth-coffee",
    type: "cafe",
    shortDescription: "Austin specialty coffee staple.",
    address: "401 Congress Ave, Austin, TX 78701",
    website: "https://houndstoothcoffee.com",
    instagram: "",
    googleMapsUrl: "",
    neighborhoodSlug: "downtown"
  },
  {
    name: "Figure 8 Coffee Purveyors",
    slug: "figure-8-coffee",
    type: "cafe",
    shortDescription: "Minimalist East Austin coffee spot.",
    address: "1111 Chicon St, Austin, TX 78702",
    website: "",
    instagram: "",
    googleMapsUrl: "",
    neighborhoodSlug: "east-austin"
  },

  // ============================
  //      BREWERIES
  // ============================

  {
    name: "Zilker Brewing Company",
    slug: "zilker-brewing",
    type: "brewery",
    shortDescription: "Taproom with local craft beer favorite spots.",
    address: "1701 E 6th St, Austin, TX 78702",
    website: "https://zilkerbeer.com",
    instagram: "@zilkerbeer",
    googleMapsUrl: "",
    neighborhoodSlug: "east-austin"
  },
  {
    name: "Austin Beerworks",
    slug: "austin-beerworks",
    type: "brewery",
    shortDescription: "Popular brewery with bright branding and local favorite beers.",
    address: "3001 Industrial Terrace, Austin, TX 78758",
    website: "https://austinbeerworks.com",
    instagram: "",
    googleMapsUrl: "",
    neighborhoodSlug: "domain"
  },

  // ============================
  //      BARS + RESTAURANTS
  // ============================

  {
    name: "Lazarus Brewing",
    slug: "lazarus-brewing",
    type: "bar",
    shortDescription: "East Austin craft brewery with tacos and coffee.",
    address: "1902 E 6th St, Austin, TX 78702",
    website: "",
    instagram: "",
    googleMapsUrl: "",
    neighborhoodSlug: "east-austin"
  },
  {
    name: "Justine's Brasserie",
    slug: "justines-brasserie",
    type: "restaurant",
    shortDescription: "Late-night French bistro with Austin's most atmospheric patio.",
    address: "4710 E 5th St, Austin, TX 78702",
    website: "https://justines1937.com",
    instagram: "",
    googleMapsUrl: "",
    neighborhoodSlug: "east-austin"
  },
  {
    name: "Elizabeth Street Café",
    slug: "elizabeth-street-cafe",
    type: "restaurant",
    shortDescription: "Charming French-Vietnamese café and bakery.",
    address: "1501 S 1st St, Austin, TX 78704",
    website: "https://elizabethstreetcafe.com",
    instagram: "",
    googleMapsUrl: "",
    neighborhoodSlug: "south-first"
  },
  {
    name: "Home Slice Pizza",
    slug: "home-slice-pizza",
    type: "restaurant",
    shortDescription: "Austin’s iconic New York-style pizza shop.",
    address: "1415 S Congress Ave, Austin, TX 78704",
    website: "https://homeslicepizza.com",
    instagram: "",
    googleMapsUrl: "",
    neighborhoodSlug: "south-congress"
  },
  {
    name: "Matt's El Rancho",
    slug: "matts-el-rancho",
    type: "restaurant",
    shortDescription: "Classic Tex-Mex palace loved by generations.",
    address: "2613 S Lamar Blvd, Austin, TX 78704",
    website: "",
    instagram: "",
    googleMapsUrl: "",
    neighborhoodSlug: "south-lamar"
  },

  // ============================
  //      MISC / AUSTIN ESSENTIALS
  // ============================

  {
    name: "Zilker Park",
    slug: "zilker-park",
    type: "venue",
    shortDescription: "Austin’s largest and most iconic park.",
    address: "2100 Barton Springs Rd, Austin, TX 78704",
    website: "",
    instagram: "",
    googleMapsUrl: "",
    neighborhoodSlug: "zilker"
  }]

