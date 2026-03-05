// Food photos for different recipe types
const FOOD_PHOTOS: Record<string, string> = {
  // Indian
  butterChicken: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
  chickenTikkaMasala: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800',
  palakPaneer: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
  chanaMasala: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
  dal: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800',
  biryani: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
  samosa: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
  naan: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800',
  tandoori: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800',
  vindaloo: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
  chai: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800',
  masala: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800',
  curry: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
  paneer: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
  tikka: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800',
  
  // Italian
  pizza: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
  pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
  spaghetti: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
  carbonara: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
  lasagna: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800',
  tiramisu: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800',
  risotto: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800',
  ravioli: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=800',
  penne: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
  fettuccine: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
  linguine: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
  pesto: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800',
  marinara: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800',
  alfredo: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800',
  
  // Mexican
  taco: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
  tacos: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
  burrito: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800',
  enchilada: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=800',
  guacamole: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800',
  churros: 'https://images.unsplash.com/photo-1624371414361-e670edf4898d?w=800',
  quesadilla: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800',
  nachos: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800',
  salsa: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800',
  tamale: 'https://images.unsplash.com/photo-1558350285-97dc59847a6e?w=800',
  
  // Asian
  sushi: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
  ramen: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
  padThai: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800',
  kungPao: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800',
  generalTso: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800',
  pekingDuck: 'https://images.unsplash.com/photo-1563245372-f21724e3856f?w=800',
  friedRice: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
  dimSum: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800',
  gyoza: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800',
  springRoll: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
  dumpling: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800',
  pho: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800',
  stirFry: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
  teriyaki: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800',
  tempura: 'https://images.unsplash.com/photo-1559117512-19e4c4c02b35?w=800',
  miso: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
  sashimi: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
  
  // Korean
  bibimbap: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800',
  bulgogi: 'https://images.unsplash.com/photo-1529006557810-274b9f2d5f61?w=800',
  kimchi: 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?w=800',
  kimchiJjigae: 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?w=800',
  
  // Thai
  greenCurry: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800',
  tomYum: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=800',
  massaman: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800',
  thaiBasil: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800',
  drunkenNoodles: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
  somTam: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800',
  mangoStickyRice: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?w=800',
  panang: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800',
  
  // French
  croissant: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
  frenchOnionSoup: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=800',
  tomatoSoup: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
  mushroomSoup: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
  chickenNoodleSoup: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
  shrimpCocktail: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800',
  coqAuVin: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800',
  beefBourguignon: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=800',
  cremeBrulee: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800',
  shakshuka: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?w=800',
  ratatouille: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=800',
  quiche: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800',
  frenchSoup: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
  soup: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
  
  // Middle Eastern
  falafel: 'https://images.unsplash.com/photo-1593001872093-7f14011211ca?w=800',
  hummus: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=800',
  shawarma: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800',
  kebab: 'https://images.unsplash.com/photo-1529006557810-274b9f2d5f61?w=800',
  gyro: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800',
  
  // Greek
  greekSalad: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
  moussaka: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
  baklava: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800',
  spanakopita: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
  tzatziki: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
  greek: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
  
  // Desserts
  cheesecake: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
  strawberryCheesecake: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800',
  chocolateLavaCake: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800',
  brownie: 'https://images.unsplash.com/photo-1564356600055-47b9d0ea1903?w=800',
  applePie: 'https://images.unsplash.com/photo-1535920527002-b51c2513a641?w=800',
  cookie: 'https://images.unsplash.com/photo-1499636138143-bd630f5cf386?w=800',
  chocolateChip: 'https://images.unsplash.com/photo-1499636138143-bd630f5cf386?w=800',
  iceCream: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800',
  mousse: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
  pannaCotta: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800',
  flan: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800',
  
  // Breakfast
  pork: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800',
  lamb_: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=800',
  dessert: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800',
  appetizer: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=800',
  donut: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800',
  donut_: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800',
  pancake: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800',
  frenchToast: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800',
  eggsBenedict: 'https://images.unsplash.com/photo-1608039829572-1a2e1b0c9e23?w=800',
  waffle: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800',
  omelette: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800',
  scramble: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800',
  breakfast: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800',
  
  // American
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
  hamburger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
  cheeseburger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
  bbqRibs: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
  macAndCheese: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=800',
  friedChicken: 'https://images.unsplash.com/photo-1626645738196-c2a72c5eb2c2?w=800',
  steak: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800',
  hotDog: 'https://images.unsplash.com/photo-1527472551980-18155ce7a71d?w=800',
  sandwich: 'https://images.unsplash.com/photo-1527472551980-18155ce7a71d?w=800',
  meatball: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800',
  potRoast: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
  
  // Seafood
  salmon: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
  grilledSalmon: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
  shrimp: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800',
  shrimpScampi: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800',
  lobster: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800',
  crab: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800',
  fish: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
  tuna: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
  cod: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
  scallop: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800',
  oyster: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800',
  
  // Spanish/Portuguese
  paella: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800',
  gazpacho: 'https://images.unsplash.com/photo-1529566652340-2afa3cba27f2?w=800',
  pastelDeNata: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
  tapas: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800',
  
  // Salads
  salad: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
  caesar: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800',
  chickenSalad: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
  potatoSalad: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',
  coleslaw: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',
  
  // Sides
  mashedPotato: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',
  roastedVeggie: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
  stuffing: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=800',
  gravy: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=800',
  bread: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
  roll: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
};

// Default fallback - a colorful healthy salad bowl
const DEFAULT_PHOTO = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800';

// Keyword matching rules - most specific first
const KEYWORD_RULES: Array<{ keywords: string[]; photo: string }> = [
  // VERY SPECIFIC - French Onion Soup MUST come before generic soup
  { keywords: ['french-onion-soup', 'frenchonionsoup', 'onion-soup', 'soupe-a-l-oignon', 'caramelized-onion-soup'], photo: FOOD_PHOTOS.frenchOnionSoup },
  { keywords: ['tomato-soup', 'tomatosoup', 'cream-of-tomato'], photo: FOOD_PHOTOS.tomatoSoup },
  { keywords: ['mushroom-soup', 'mushroomsoup', 'cream-of-mushroom'], photo: FOOD_PHOTOS.mushroomSoup },
  { keywords: ['chicken-noodle-soup', 'chickennoodlesoup', 'chicken-soup'], photo: FOOD_PHOTOS.chickenNoodleSoup },
  { keywords: ['shrimp-cocktail', 'shrimpcoctail', 'prawn-cocktail'], photo: FOOD_PHOTOS.shrimpCocktail },
  
  // Indian - exact dish names (most specific)
  { keywords: ['butter-chicken', 'butterchicken', 'murgh-makhani'], photo: FOOD_PHOTOS.butterChicken },
  { keywords: ['chicken-tikka-masala', 'chickentikkamasala', 'tikka-masala'], photo: FOOD_PHOTOS.chickenTikkaMasala },
  { keywords: ['palak-paneer', 'spinach-paneer'], photo: FOOD_PHOTOS.palakPaneer },
  { keywords: ['chana-masala', 'chickpea-curry', 'channamasala', 'chole'], photo: FOOD_PHOTOS.chanaMasala },
  { keywords: ['dal-makhani', 'dal-makhani', 'black-lentil', 'urad-dal'], photo: FOOD_PHOTOS.dal },
  { keywords: ['dal', 'lentil', 'lentils', 'dhal'], photo: FOOD_PHOTOS.dal },
  { keywords: ['biryani', 'pilaf', 'pulao', 'pullao'], photo: FOOD_PHOTOS.biryani },
  { keywords: ['samosa'], photo: FOOD_PHOTOS.samosa },
  { keywords: ['naan', 'bread', 'roti', 'chapati'], photo: FOOD_PHOTOS.naan },
  { keywords: ['tandoori', 'tandoor', 'tandoor-chicken'], photo: FOOD_PHOTOS.tandoori },
  { keywords: ['vindaloo'], photo: FOOD_PHOTOS.vindaloo },
  { keywords: ['chai', 'tea', 'masala-chai'], photo: FOOD_PHOTOS.chai },
  { keywords: ['chicken-curry', 'indian-curry', 'chicken-korma', 'korma', 'katsu-curry', 'katsu'], photo: FOOD_PHOTOS.curry },
  { keywords: ['paneer', 'paneer-tikka'], photo: FOOD_PHOTOS.paneer },
  { keywords: ['tikka'], photo: FOOD_PHOTOS.tikka },
  { keywords: ['masala'], photo: FOOD_PHOTOS.masala },
  { keywords: ['sambar', 'rasam', 'dosa', 'idli', 'vada'], photo: FOOD_PHOTOS.dal },
  { keywords: ['gulab-jamun', 'jalebi', 'mithai', 'indian-sweet'], photo: FOOD_PHOTOS.cheesecake },
  { keywords: ['pav-bhaji', 'bhaji', 'vada-pav'], photo: FOOD_PHOTOS.curry },
  { keywords: ['chicken-65', 'tandoori-chicken'], photo: FOOD_PHOTOS.tandoori },
  { keywords: ['rogan-josh', 'rajasthani', 'laal-maas'], photo: FOOD_PHOTOS.curry },
  { keywords: ['pulao', 'jeera-rice', 'jeera'], photo: FOOD_PHOTOS.biryani },
  
  // Italian
  { keywords: ['pizza'], photo: FOOD_PHOTOS.pizza },
  { keywords: ['spaghetti', 'spagheit', 'spaghet'], photo: FOOD_PHOTOS.spaghetti },
  { keywords: ['carbonara'], photo: FOOD_PHOTOS.carbonara },
  { keywords: ['lasagna', 'lasagne'], photo: FOOD_PHOTOS.lasagna },
  { keywords: ['tiramisu'], photo: FOOD_PHOTOS.tiramisu },
  { keywords: ['risotto'], photo: FOOD_PHOTOS.risotto },
  { keywords: ['ravioli'], photo: FOOD_PHOTOS.ravioli },
  { keywords: ['penne', 'penne'], photo: FOOD_PHOTOS.penne },
  { keywords: ['fettuccine', 'fettuccini'], photo: FOOD_PHOTOS.fettuccine },
  { keywords: ['linguine'], photo: FOOD_PHOTOS.linguine },
  { keywords: ['pesto'], photo: FOOD_PHOTOS.pesto },
  { keywords: ['marinara', 'sugo'], photo: FOOD_PHOTOS.marinara },
  { keywords: ['alfredo'], photo: FOOD_PHOTOS.alfredo },
  { keywords: ['pasta'], photo: FOOD_PHOTOS.pasta },
  { keywords: ['cannoli', 'cannoli'], photo: FOOD_PHOTOS.cheesecake },
  { keywords: ['osso-buco', 'ossobuco'], photo: FOOD_PHOTOS.steak },
  { keywords: ['bruschetta', 'bruschetta'], photo: FOOD_PHOTOS.pizza },
  
  // Mexican
  { keywords: ['taco', 'tacos'], photo: FOOD_PHOTOS.taco },
  { keywords: ['burrito'], photo: FOOD_PHOTOS.burrito },
  { keywords: ['enchilada', 'enchiladas'], photo: FOOD_PHOTOS.enchilada },
  { keywords: ['guacamole', 'guac'], photo: FOOD_PHOTOS.guacamole },
  { keywords: ['churro', 'churros'], photo: FOOD_PHOTOS.churros },
  { keywords: ['quesadilla'], photo: FOOD_PHOTOS.quesadilla },
  { keywords: ['nacho', 'nachos'], photo: FOOD_PHOTOS.nachos },
  { keywords: ['salsa'], photo: FOOD_PHOTOS.salsa },
  { keywords: ['tamale', 'tamales'], photo: FOOD_PHOTOS.tamale },
  { keywords: ['fajita', 'fajitas'], photo: FOOD_PHOTOS.burrito },
  { keywords: ['mole'], photo: FOOD_PHOTOS.curry },
  { keywords: ['pozole'], photo: FOOD_PHOTOS.soup },
  
  // Asian
  { keywords: ['sushi', 'sushi-roll'], photo: FOOD_PHOTOS.sushi },
  { keywords: ['ramen', 'ramen-soup'], photo: FOOD_PHOTOS.ramen },
  { keywords: ['pad-thai', 'padthai', 'phad-thai'], photo: FOOD_PHOTOS.padThai },
  { keywords: ['kung-pao', 'kungpao', 'gong-bao'], photo: FOOD_PHOTOS.kungPao },
  { keywords: ['general-tso', 'generaltso', 'tsos'], photo: FOOD_PHOTOS.generalTso },
  { keywords: ['peking-duck', 'pekingduck'], photo: FOOD_PHOTOS.pekingDuck },
  { keywords: ['fried-rice', 'friedrice'], photo: FOOD_PHOTOS.friedRice },
  { keywords: ['dim-sum', 'dimsam', 'dimsum'], photo: FOOD_PHOTOS.dimSum },
  { keywords: ['gyoza', 'jiaozi', 'potsticker'], photo: FOOD_PHOTOS.gyoza },
  { keywords: ['spring-roll', 'springroll', 'egg-roll'], photo: FOOD_PHOTOS.springRoll },
  { keywords: ['dumpling'], photo: FOOD_PHOTOS.dumpling },
  { keywords: ['pho', 'pho-soup'], photo: FOOD_PHOTOS.pho },
  { keywords: ['stir-fry', 'stirfry'], photo: FOOD_PHOTOS.stirFry },
  { keywords: ['teriyaki'], photo: FOOD_PHOTOS.teriyaki },
  { keywords: ['tempura'], photo: FOOD_PHOTOS.tempura },
  { keywords: ['miso-soup', 'miso'], photo: FOOD_PHOTOS.miso },
  { keywords: ['sashimi'], photo: FOOD_PHOTOS.sashimi },
  { keywords: ['yakitori', 'yakitora'], photo: FOOD_PHOTOS.ramen },
  { keywords: ['tonkotsu', 'tonkotsu-ramen'], photo: FOOD_PHOTOS.ramen },
  { keywords: ['soup'], photo: FOOD_PHOTOS.soup },
  
  // Korean
  { keywords: ['bibimbap', 'dolsot-bibimbap'], photo: FOOD_PHOTOS.bibimbap },
  { keywords: ['bulgogi'], photo: FOOD_PHOTOS.bulgogi },
  { keywords: ['kimchi'], photo: FOOD_PHOTOS.kimchi },
  { keywords: ['kimchi-jjigae', 'kimchijjigae'], photo: FOOD_PHOTOS.kimchiJjigae },
  { keywords: ['korean'], photo: FOOD_PHOTOS.bibimbap },
  { keywords: ['japchae', 'japchae'], photo: FOOD_PHOTOS.stirFry },
  
  // Thai
  { keywords: ['green-curry', 'greencurry', 'thai-curry'], photo: FOOD_PHOTOS.greenCurry },
  { keywords: ['tom-yum', 'tomyum', 'tom-yum-soup', 'tom-yum-goong'], photo: FOOD_PHOTOS.tomYum },
  { keywords: ['massaman', 'massamam', 'massam-curry'], photo: FOOD_PHOTOS.massaman },
  { keywords: ['thai-basil', 'thaibasil', 'basil-chicken', 'pad-krapow'], photo: FOOD_PHOTOS.thaiBasil },
  { keywords: ['drunken-noodle', 'drunkenoodle', 'pad-kee-mow', 'drunken-noodles'], photo: FOOD_PHOTOS.drunkenNoodles },
  { keywords: ['som-tam', 'somtam', 'green-papaya-salad'], photo: FOOD_PHOTOS.somTam },
  { keywords: ['mango-sticky-rice', 'mangostickyrice', 'khao-niao-mamuang'], photo: FOOD_PHOTOS.mangoStickyRice },
  { keywords: ['panang', 'penang', 'penang-curry'], photo: FOOD_PHOTOS.panang },
  { keywords: ['thai'], photo: FOOD_PHOTOS.greenCurry },
  
  // Donuts
  { keywords: ['donut', 'donuts', 'doughnut', 'doughnuts', 'glazed', 'sprinkles'], photo: FOOD_PHOTOS.donut },
  
  // Fries - must come before french
  { keywords: ['fries', 'french-fries', 'french-fries', 'chips', 'sweet-potato-fries'], photo: FOOD_PHOTOS.potatoSalad },
  
  // French
  { keywords: ['croissant', 'croissants'], photo: FOOD_PHOTOS.croissant },
  { keywords: ['coq-au-vin', 'coqauvin'], photo: FOOD_PHOTOS.coqAuVin },
  { keywords: ['beef-bourguignon', 'beefbourguignon', 'boeuf-bourguignon', 'beef-stew'], photo: FOOD_PHOTOS.beefBourguignon },
  { keywords: ['creme-brulee', 'cremebrulee', 'crème-brûlée'], photo: FOOD_PHOTOS.cremeBrulee },
  { keywords: ['shakshuka', 'shakshouka', 'eggs-poached'], photo: FOOD_PHOTOS.shakshuka },
  { keywords: ['ratatouille'], photo: FOOD_PHOTOS.ratatouille },
  { keywords: ['quiche', 'quiche-lorraine'], photo: FOOD_PHOTOS.quiche },
  { keywords: ['french'], photo: FOOD_PHOTOS.croissant },
  { keywords: ['soup', 'bisque'], photo: FOOD_PHOTOS.soup },
  
  // Middle Eastern
  { keywords: ['falafel', 'falafael'], photo: FOOD_PHOTOS.falafel },
  { keywords: ['hummus', 'houmous'], photo: FOOD_PHOTOS.hummus },
  { keywords: ['shawarma', 'shwarma'], photo: FOOD_PHOTOS.shawarma },
  { keywords: ['kebab', 'kebap', 'kabob', 'shish-kebab'], photo: FOOD_PHOTOS.kebab },
  { keywords: ['gyro', 'gyros'], photo: FOOD_PHOTOS.gyro },
  { keywords: ['middle-eastern', 'mediterranean'], photo: FOOD_PHOTOS.falafel },
  { keywords: ['babaganoush', 'baba-ghanoush', 'eggplant-dip'], photo: FOOD_PHOTOS.hummus },
  
  // Greek
  { keywords: ['greek-salad', 'greeksalad', 'horiatiki'], photo: FOOD_PHOTOS.greekSalad },
  { keywords: ['moussaka'], photo: FOOD_PHOTOS.moussaka },
  { keywords: ['baklava'], photo: FOOD_PHOTOS.baklava },
  { keywords: ['spanakopita'], photo: FOOD_PHOTOS.spanakopita },
  { keywords: ['tzatziki', 'tarator'], photo: FOOD_PHOTOS.tzatziki },
  { keywords: ['greek'], photo: FOOD_PHOTOS.greek },
  { keywords: ['dolmades', 'dolma'], photo: FOOD_PHOTOS.greekSalad },
  
  // Desserts
  { keywords: ['cheesecake', 'cheese-cake'], photo: FOOD_PHOTOS.cheesecake },
  { keywords: ['strawberry-cheesecake', 'strawberrycheesecake'], photo: FOOD_PHOTOS.strawberryCheesecake },
  { keywords: ['chocolate-lava-cake', 'chocolatelavacake', 'molten-cake', 'fondant'], photo: FOOD_PHOTOS.chocolateLavaCake },
  { keywords: ['brownie', 'brownies', 'fudge-brownie'], photo: FOOD_PHOTOS.brownie },
  { keywords: ['apple-pie', 'applepie', 'pie'], photo: FOOD_PHOTOS.applePie },
  { keywords: ['cookie', 'cookies', 'biscuit'], photo: FOOD_PHOTOS.cookie },
  { keywords: ['chocolate-chip', 'chocolatechip'], photo: FOOD_PHOTOS.chocolateChip },
  { keywords: ['ice-cream', 'icecream', 'gelato'], photo: FOOD_PHOTOS.iceCream },
  { keywords: ['mousse', 'chocolate-mousse'], photo: FOOD_PHOTOS.mousse },
  { keywords: ['panna-cotta', 'pannacotta'], photo: FOOD_PHOTOS.pannaCotta },
  { keywords: ['flan', 'caramel-flan'], photo: FOOD_PHOTOS.flan },
  { keywords: ['cupcake', 'cupcakes'], photo: FOOD_PHOTOS.cheesecake },
  { keywords: ['cake'], photo: FOOD_PHOTOS.cheesecake },
  { keywords: ['pudding', 'bread-pudding'], photo: FOOD_PHOTOS.cheesecake },
  { keywords: ['candy', 'sweets'], photo: FOOD_PHOTOS.cheesecake },
  { keywords: ['tart', 'fruit-tart'], photo: FOOD_PHOTOS.cheesecake },
  { keywords: ['macaron', 'macarons'], photo: FOOD_PHOTOS.cheesecake },
  { keywords: ['meringue'], photo: FOOD_PHOTOS.iceCream },
  
  // Dinner/Lunch/Meal types
  { keywords: ['dinner'], photo: FOOD_PHOTOS.pasta },
  { keywords: ['lunch'], photo: FOOD_PHOTOS.sandwich },
  { keywords: ['breakfast'], photo: FOOD_PHOTOS.pancake },
  { keywords: ['dessert', 'desserts', 'sweet', 'sweets'], photo: FOOD_PHOTOS.dessert },
  { keywords: ['appetizer', 'appetizers', 'starter', 'starters', 'snack', 'snacks'], photo: FOOD_PHOTOS.appetizer },
  { keywords: ['soup', 'soups', 'stew'], photo: FOOD_PHOTOS.soup },
  { keywords: ['salad', 'salads'], photo: FOOD_PHOTOS.salad },
  { keywords: ['side', 'sides', 'side-dish'], photo: FOOD_PHOTOS.mashedPotato },
  
  // Proteins
  { keywords: ['pork', 'pork-chop', 'pork-belly', 'bacon', 'ham', 'sausage', 'pulled-pork'], photo: FOOD_PHOTOS.pork },
  { keywords: ['lamb', 'lamb-chop', 'rack-of-lamb', 'lamb-stew'], photo: FOOD_PHOTOS.lamb_ },
  { keywords: ['beef', 'steak', 'ground-beef'], photo: FOOD_PHOTOS.steak },
  { keywords: ['chicken', 'chicken-breast', 'chicken-thigh', 'poultry'], photo: FOOD_PHOTOS.friedChicken },
  
  // Breakfast
  { keywords: ['pancake', 'pancakes'], photo: FOOD_PHOTOS.pancake },
  { keywords: ['french-toast', 'frenchtoast', 'pain-perdu'], photo: FOOD_PHOTOS.frenchToast },
  { keywords: ['eggs-benedict', 'eggsbenedict'], photo: FOOD_PHOTOS.eggsBenedict },
  { keywords: ['waffle', 'waffles'], photo: FOOD_PHOTOS.waffle },
  { keywords: ['omelette', 'omelet', 'omelette'], photo: FOOD_PHOTOS.omelette },
  { keywords: ['scrambled', 'scramble-egg', 'scrambled-egg'], photo: FOOD_PHOTOS.scramble },
  { keywords: ['breakfast'], photo: FOOD_PHOTOS.breakfast },
  { keywords: ['cereal', 'oatmeal', 'oats', 'granola', 'porridge'], photo: FOOD_PHOTOS.breakfast },
  { keywords: ['avocado-toast', 'avo-toast'], photo: FOOD_PHOTOS.pancake },
  { keywords: ['bacon', 'sausage', 'chorizo'], photo: FOOD_PHOTOS.breakfast },
  
  // American
  { keywords: ['burger', 'hamburger', 'cheeseburger', 'burgers'], photo: FOOD_PHOTOS.burger },
  { keywords: ['bbq-ribs', 'bbqribs', 'ribs', 'barbecue', 'bbq'], photo: FOOD_PHOTOS.bbqRibs },
  { keywords: ['mac-and-cheese', 'macandcheese', 'mac-cheese', 'macaroni-cheese'], photo: FOOD_PHOTOS.macAndCheese },
  { keywords: ['fried-chicken', 'friedchicken', 'chicken-fried', 'chicken-fried-steak'], photo: FOOD_PHOTOS.friedChicken },
  { keywords: ['steak', 'steakhouse', 'beef', 'ribeye', 'sirloin', 'filet'], photo: FOOD_PHOTOS.steak },
  { keywords: ['hot-dog', 'hotdog', 'hot-dogs'], photo: FOOD_PHOTOS.hotDog },
  { keywords: ['sandwich', 'sandwiches', 'sub'], photo: FOOD_PHOTOS.sandwich },
  { keywords: ['meatball', 'meatballs', 'meatball-sub'], photo: FOOD_PHOTOS.meatball },
  { keywords: ['pot-roast', 'potroast', 'pot-roast'], photo: FOOD_PHOTOS.potRoast },
  { keywords: ['chili', 'chili-con-carne'], photo: FOOD_PHOTOS.curry },
  { keywords: ['corndog', 'corn-dog'], photo: FOOD_PHOTOS.hotDog },
  { keywords: ['sloppy-joe'], photo: FOOD_PHOTOS.sandwich },
  
  // Seafood
  { keywords: ['salmon', 'grilled-salmon', 'salmon-fillet'], photo: FOOD_PHOTOS.salmon },
  { keywords: ['shrimp', 'prawn', 'shrimp-scampi', 'prawns'], photo: FOOD_PHOTOS.shrimp },
  { keywords: ['lobster', 'lobster-tail', 'lobster-roll'], photo: FOOD_PHOTOS.lobster },
  { keywords: ['crab', 'crab-cake', 'crab-legs'], photo: FOOD_PHOTOS.crab },
  { keywords: ['fish', 'fish-fillet', 'grilled-fish', 'fried-fish'], photo: FOOD_PHOTOS.fish },
  { keywords: ['tuna', 'tuna-steak', 'ahi'], photo: FOOD_PHOTOS.tuna },
  { keywords: ['cod', 'cod-fish'], photo: FOOD_PHOTOS.fish },
  { keywords: ['scallop', 'scallops', 'sea-scallop'], photo: FOOD_PHOTOS.scallop },
  { keywords: ['oyster', 'oysters', 'raw-oyster'], photo: FOOD_PHOTOS.oyster },
  { keywords: ['mussels', 'clams', 'mussels-steam'], photo: FOOD_PHOTOS.fish },
  { keywords: ['seafood', 'surf-and-turf'], photo: FOOD_PHOTOS.fish },
  
  // Spanish/Portuguese
  { keywords: ['paella', 'seafood-paella'], photo: FOOD_PHOTOS.paella },
  { keywords: ['gazpacho', 'cold-soup'], photo: FOOD_PHOTOS.gazpacho },
  { keywords: ['pastel-de-nata', 'pastéis-de-nata', 'portuguese-tart'], photo: FOOD_PHOTOS.pastelDeNata },
  { keywords: ['tapas', 'tapa'], photo: FOOD_PHOTOS.tapas },
  { keywords: ['patatas-bravas', 'patatas'], photo: FOOD_PHOTOS.tapas },
  
  // Salads
  { keywords: ['salad', 'salads', 'green-salad'], photo: FOOD_PHOTOS.salad },
  { keywords: ['caesar', 'caesar-salad'], photo: FOOD_PHOTOS.caesar },
  { keywords: ['chicken-salad', 'chicken-salad'], photo: FOOD_PHOTOS.chickenSalad },
  { keywords: ['potato-salad', 'potato-salad'], photo: FOOD_PHOTOS.potatoSalad },
  { keywords: ['coleslaw', 'slaw'], photo: FOOD_PHOTOS.coleslaw },
  { keywords: ['pasta-salad'], photo: FOOD_PHOTOS.pasta },
  { keywords: ['tuna-salad', 'egg-salad'], photo: FOOD_PHOTOS.salad },
  
  // Sides
  { keywords: ['mashed-potato', 'mashed-potatoes', 'mash'], photo: FOOD_PHOTOS.mashedPotato },
  { keywords: ['roasted-vegetable', 'roasted-veggies', 'roasted-vegetables', 'roast-vegetables'], photo: FOOD_PHOTOS.roastedVeggie },
  { keywords: ['stuffing', 'dressing', 'bread-stuffing'], photo: FOOD_PHOTOS.stuffing },
  { keywords: ['gravy', 'sauce'], photo: FOOD_PHOTOS.gravy },
  { keywords: ['bread', 'rolls', 'dinner-rolls', 'buns'], photo: FOOD_PHOTOS.bread },
  { keywords: ['fries', 'french-fries', 'chips'], photo: FOOD_PHOTOS.potatoSalad },
  { keywords: ['coleslaw'], photo: FOOD_PHOTOS.coleslaw },
  { keywords: ['corn', 'corn-on-cob', 'elote'], photo: FOOD_PHOTOS.roastedVeggie },
];

// Main function to get recipe photo
export function getRecipePhoto(slug: string): string {
  // Handle null/undefined/empty slug
  if (!slug || typeof slug !== 'string') {
    return DEFAULT_PHOTO;
  }
  
  const slugLower = slug.toLowerCase();
  
  // Check each keyword rule in order (most specific first)
  for (const rule of KEYWORD_RULES) {
    for (const keyword of rule.keywords) {
      if (slugLower.includes(keyword)) {
        return rule.photo;
      }
    }
  }
  
  // Default fallback - use hash to pick a random but consistent food photo
  const hash = slugLower.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const fallbackPhotos = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800', // healthy salad
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800', // pizza
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800', // pancakes
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800', // curry
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800', // burger
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800', // salmon
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800', // curry
    'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800', // pasta
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800', // taco
  ];
  
  return fallbackPhotos[hash % fallbackPhotos.length];
}