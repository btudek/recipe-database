// Food photos - UNIQUE for each dish type (NO DUPLICATES)
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
  curry: 'https://images.unsplash.com/photo-1585938389612-a55228e2eb59?w=800',
  
  // Italian - ALL UNIQUE
  pizza: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
  pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
  spaghetti: 'https://images.unsplash.com/photo-1551446593-142bedf19012?w=800',
  carbonara: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
  lasagna: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800',
  tiramisu: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800',
  risotto: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800',
  ravioli: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=800',
  penne: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800',
  fettuccine: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800',
  pesto: 'https://images.unsplash.com/photo-1514626585111-09820b0e0424?w=800',
  alfredo: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800',
  
  // Mexican
  taco: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
  burrito: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800',
  enchilada: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=800',
  guacamole: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800',
  churros: 'https://images.unsplash.com/photo-1624371414361-e670edf4898d?w=800',
  quesadilla: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800',
  nachos: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800',
  salsa: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800',
  tamale: 'https://images.unsplash.com/photo-1558350285-97dc59847a6e?w=800',
  fajita: 'https://images.unsplash.com/photo-1593001872093-7f14011211ca?w=800',
  
  // Asian
  sushi: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
  ramen: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
  padThai: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800',
  kungPao: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800',
  pekingDuck: 'https://images.unsplash.com/photo-1563245372-f21724e3856f?w=800',
  friedRice: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
  dimSum: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800',
  gyoza: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
  pho: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800',
  stirFry: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800',
  teriyaki: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800',
  tempura: 'https://images.unsplash.com/photo-1559117512-19e4c4c02b35?w=800',
  miso: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
  sashimi: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
  dumpling: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800',
  springRoll: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
  
  // Korean
  bibimbap: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800',
  bulgogi: 'https://images.unsplash.com/photo-1529006557810-274b9f2d5f61?w=800',
  kimchi: 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?w=800',
  
  // Thai
  greenCurry: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800',
  tomYum: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=800',
  mangoStickyRice: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?w=800',
  
  // Soups
  frenchOnionSoup: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=800',
  tomatoSoup: 'https://images.unsplash.com/photo-1589567549498-a9a88909d79c?w=800',
  mushroomSoup: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
  chickenNoodleSoup: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=800',
  soup: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
  
  // Seafood
  shrimpCocktail: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800',
  salmon: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
  shrimp: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800',
  lobster: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800',
  crab: 'https://images.unsplash.com/photo-1572986010725-0f41653c0d9c?w=800',
  fish: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800',
  tuna: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
  scallop: 'https://images.unsplash.com/photo-1553247407-23251b9c19e8?w=800',
  oyster: 'https://images.unsplash.com/photo-1606850780554-b55ea4dd0b70?w=800',
  
  // French
  croissant: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
  coqAuVin: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800',
  beefBourguignon: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=800',
  cremeBrulee: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800',
  shakshuka: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?w=800',
  ratatouille: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=800',
  quiche: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800',
  
  // Middle Eastern
  falafel: 'https://images.unsplash.com/photo-1593001872093-7f14011211ca?w=800',
  hummus: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=800',
  shawarma: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800',
  kebab: 'https://images.unsplash.com/photo-1529006557810-274b9f2d5f61?w=800',
  
  // Greek
  greekSalad: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
  moussaka: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
  baklava: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800',
  spanakopita: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
  
  // Desserts
  cheesecake: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
  chocolateLavaCake: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800',
  brownie: 'https://images.unsplash.com/photo-1564356600055-47b9d0ea1903?w=800',
  applePie: 'https://images.unsplash.com/photo-1535920527002-b51c2513a641?w=800',
  cookie: 'https://images.unsplash.com/photo-1499636138143-bd630f5cf386?w=800',
  iceCream: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800',
  mousse: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
  pannaCotta: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800',
  flan: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800',
  donut: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800',
  pancake: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800',
  frenchToast: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800',
  waffle: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800',
  omelette: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800',
  
  // American
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
  bbqRibs: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
  macAndCheese: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=800',
  friedChicken: 'https://images.unsplash.com/photo-1626645738196-c2a72c5eb2c2?w=800',
  steak: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800',
  hotDog: 'https://images.unsplash.com/photo-1527472551980-18155ce7a71d?w=800',
  sandwich: 'https://images.unsplash.com/photo-1527472551980-18155ce7a71d?w=800',
  meatball: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800',
  pork: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800',
  lamb: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=800',
  
  // Salads
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
  caesar: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800',
  chickenSalad: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
  potatoSalad: 'https://images.unsplash.com/photo-1624074345218-c7a45c1d18ed?w=800',
  coleslaw: 'https://images.unsplash.com/photo-1624074345218-c7a45c1d18ed?w=800',
  
  // Sides
  mashedPotato: 'https://images.unsplash.com/photo-1624074345218-c7a45c1d18ed?w=800',
  roastedVeggie: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
  stuffing: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=800',
  bread: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
};

const DEFAULT_PHOTO = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800';

const KEYWORD_RULES: Array<{ keywords: string[]; photo: string }> = [
  { keywords: ['french-onion-soup', 'frenchonionsoup', 'onion-soup', 'caramelized-onion-soup'], photo: FOOD_PHOTOS.frenchOnionSoup },
  { keywords: ['tomato-soup', 'tomatosoup', 'cream-of-tomato'], photo: FOOD_PHOTOS.tomatoSoup },
  { keywords: ['mushroom-soup', 'mushroomsoup', 'cream-of-mushroom'], photo: FOOD_PHOTOS.mushroomSoup },
  { keywords: ['chicken-noodle-soup', 'chickennoodlesoup', 'chicken-soup'], photo: FOOD_PHOTOS.chickenNoodleSoup },
  { keywords: ['shrimp-cocktail', 'shrimpcoctail', 'prawn-cocktail'], photo: FOOD_PHOTOS.shrimpCocktail },
  
  { keywords: ['butter-chicken', 'butterchicken'], photo: FOOD_PHOTOS.butterChicken },
  { keywords: ['chicken-tikka-masala', 'tikka-masala'], photo: FOOD_PHOTOS.chickenTikkaMasala },
  { keywords: ['palak-paneer', 'spinach-paneer'], photo: FOOD_PHOTOS.palakPaneer },
  { keywords: ['chana-masala', 'chickpea-curry', 'chole'], photo: FOOD_PHOTOS.chanaMasala },
  { keywords: ['dal', 'dhal', 'lentil'], photo: FOOD_PHOTOS.dal },
  { keywords: ['biryani', 'pulao'], photo: FOOD_PHOTOS.biryani },
  { keywords: ['samosa'], photo: FOOD_PHOTOS.samosa },
  { keywords: ['naan', 'roti'], photo: FOOD_PHOTOS.naan },
  { keywords: ['tandoori', 'tandoor-chicken'], photo: FOOD_PHOTOS.tandoori },
  { keywords: ['vindaloo'], photo: FOOD_PHOTOS.vindaloo },
  { keywords: ['chai'], photo: FOOD_PHOTOS.chai },
  { keywords: ['curry', 'korma', 'katsu'], photo: FOOD_PHOTOS.curry },
  
  { keywords: ['pizza'], photo: FOOD_PHOTOS.pizza },
  { keywords: ['spaghetti', 'spaghet'], photo: FOOD_PHOTOS.spaghetti },
  { keywords: ['carbonara'], photo: FOOD_PHOTOS.carbonara },
  { keywords: ['lasagna', 'lasagne'], photo: FOOD_PHOTOS.lasagna },
  { keywords: ['tiramisu'], photo: FOOD_PHOTOS.tiramisu },
  { keywords: ['risotto'], photo: FOOD_PHOTOS.risotto },
  { keywords: ['ravioli'], photo: FOOD_PHOTOS.ravioli },
  { keywords: ['penne'], photo: FOOD_PHOTOS.penne },
  { keywords: ['fettuccine'], photo: FOOD_PHOTOS.fettuccine },
  { keywords: ['pesto'], photo: FOOD_PHOTOS.pesto },
  { keywords: ['alfredo'], photo: FOOD_PHOTOS.alfredo },
  { keywords: ['pasta'], photo: FOOD_PHOTOS.pasta },
  
  { keywords: ['taco', 'tacos'], photo: FOOD_PHOTOS.taco },
  { keywords: ['burrito'], photo: FOOD_PHOTOS.burrito },
  { keywords: ['enchilada'], photo: FOOD_PHOTOS.enchilada },
  { keywords: ['guacamole', 'guac'], photo: FOOD_PHOTOS.guacamole },
  { keywords: ['churro', 'churros'], photo: FOOD_PHOTOS.churros },
  { keywords: ['quesadilla'], photo: FOOD_PHOTOS.quesadilla },
  { keywords: ['nacho', 'nachos'], photo: FOOD_PHOTOS.nachos },
  { keywords: ['salsa'], photo: FOOD_PHOTOS.salsa },
  { keywords: ['tamale'], photo: FOOD_PHOTOS.tamale },
  { keywords: ['fajita'], photo: FOOD_PHOTOS.fajita },
  
  { keywords: ['sushi'], photo: FOOD_PHOTOS.sushi },
  { keywords: ['ramen'], photo: FOOD_PHOTOS.ramen },
  { keywords: ['pad-thai', 'padthai'], photo: FOOD_PHOTOS.padThai },
  { keywords: ['kung-pao', 'kungpao'], photo: FOOD_PHOTOS.kungPao },
  { keywords: ['peking-duck', 'pekingduck'], photo: FOOD_PHOTOS.pekingDuck },
  { keywords: ['fried-rice'], photo: FOOD_PHOTOS.friedRice },
  { keywords: ['dim-sum', 'dimsum', 'gyoza', 'dumpling', 'spring-roll'], photo: FOOD_PHOTOS.dimSum },
  { keywords: ['pho'], photo: FOOD_PHOTOS.pho },
  { keywords: ['stir-fry', 'stirfry'], photo: FOOD_PHOTOS.stirFry },
  { keywords: ['teriyaki'], photo: FOOD_PHOTOS.teriyaki },
  { keywords: ['tempura'], photo: FOOD_PHOTOS.tempura },
  { keywords: ['miso'], photo: FOOD_PHOTOS.miso },
  { keywords: ['sashimi'], photo: FOOD_PHOTOS.sashimi },
  
  { keywords: ['bibimbap'], photo: FOOD_PHOTOS.bibimbap },
  { keywords: ['bulgogi'], photo: FOOD_PHOTOS.bulgogi },
  { keywords: ['kimchi'], photo: FOOD_PHOTOS.kimchi },
  
  { keywords: ['green-curry', 'thai-curry'], photo: FOOD_PHOTOS.greenCurry },
  { keywords: ['tom-yum', 'tomyum'], photo: FOOD_PHOTOS.tomYum },
  { keywords: ['mango-sticky-rice'], photo: FOOD_PHOTOS.mangoStickyRice },
  
  { keywords: ['croissant'], photo: FOOD_PHOTOS.croissant },
  { keywords: ['coq-au-vin'], photo: FOOD_PHOTOS.coqAuVin },
  { keywords: ['beef-bourguignon', 'beef-stew'], photo: FOOD_PHOTOS.beefBourguignon },
  { keywords: ['creme-brulee'], photo: FOOD_PHOTOS.cremeBrulee },
  { keywords: ['shakshuka'], photo: FOOD_PHOTOS.shakshuka },
  { keywords: ['ratatouille'], photo: FOOD_PHOTOS.ratatouille },
  { keywords: ['quiche'], photo: FOOD_PHOTOS.quiche },
  
  { keywords: ['falafel'], photo: FOOD_PHOTOS.falafel },
  { keywords: ['hummus'], photo: FOOD_PHOTOS.hummus },
  { keywords: ['shawarma'], photo: FOOD_PHOTOS.shawarma },
  { keywords: ['kebab', 'kabob'], photo: FOOD_PHOTOS.kebab },
  
  { keywords: ['greek-salad'], photo: FOOD_PHOTOS.greekSalad },
  { keywords: ['moussaka'], photo: FOOD_PHOTOS.moussaka },
  { keywords: ['baklava'], photo: FOOD_PHOTOS.baklava },
  { keywords: ['spanakopita'], photo: FOOD_PHOTOS.spanakopita },
  
  { keywords: ['cheesecake'], photo: FOOD_PHOTOS.cheesecake },
  { keywords: ['chocolate-lava-cake', 'molten-cake'], photo: FOOD_PHOTOS.chocolateLavaCake },
  { keywords: ['brownie'], photo: FOOD_PHOTOS.brownie },
  { keywords: ['apple-pie', 'pie'], photo: FOOD_PHOTOS.applePie },
  { keywords: ['cookie', 'biscuit'], photo: FOOD_PHOTOS.cookie },
  { keywords: ['ice-cream', 'gelato'], photo: FOOD_PHOTOS.iceCream },
  { keywords: ['mousse'], photo: FOOD_PHOTOS.mousse },
  { keywords: ['panna-cotta'], photo: FOOD_PHOTOS.pannaCotta },
  { keywords: ['flan'], photo: FOOD_PHOTOS.flan },
  { keywords: ['donut', 'doughnut'], photo: FOOD_PHOTOS.donut },
  { keywords: ['cake'], photo: FOOD_PHOTOS.cheesecake },
  
  { keywords: ['pancake', 'pancakes'], photo: FOOD_PHOTOS.pancake },
  { keywords: ['french-toast'], photo: FOOD_PHOTOS.frenchToast },
  { keywords: ['waffle', 'waffles'], photo: FOOD_PHOTOS.waffle },
  { keywords: ['omelette', 'omelet'], photo: FOOD_PHOTOS.omelette },
  
  { keywords: ['burger', 'hamburger', 'cheeseburger'], photo: FOOD_PHOTOS.burger },
  { keywords: ['bbq-ribs', 'ribs', 'barbecue'], photo: FOOD_PHOTOS.bbqRibs },
  { keywords: ['mac-and-cheese', 'mac-cheese'], photo: FOOD_PHOTOS.macAndCheese },
  { keywords: ['fried-chicken'], photo: FOOD_PHOTOS.friedChicken },
  { keywords: ['steak', 'beef', 'ribeye'], photo: FOOD_PHOTOS.steak },
  { keywords: ['hot-dog', 'hotdog'], photo: FOOD_PHOTOS.hotDog },
  { keywords: ['sandwich', 'sub'], photo: FOOD_PHOTOS.sandwich },
  { keywords: ['meatball'], photo: FOOD_PHOTOS.meatball },
  { keywords: ['pork', 'bacon', 'ham'], photo: FOOD_PHOTOS.pork },
  { keywords: ['lamb'], photo: FOOD_PHOTOS.lamb },
  
  { keywords: ['salmon'], photo: FOOD_PHOTOS.salmon },
  { keywords: ['shrimp', 'prawn'], photo: FOOD_PHOTOS.shrimp },
  { keywords: ['lobster'], photo: FOOD_PHOTOS.lobster },
  { keywords: ['crab'], photo: FOOD_PHOTOS.crab },
  { keywords: ['fish', 'cod'], photo: FOOD_PHOTOS.fish },
  { keywords: ['tuna'], photo: FOOD_PHOTOS.tuna },
  { keywords: ['scallop'], photo: FOOD_PHOTOS.scallop },
  { keywords: ['oyster'], photo: FOOD_PHOTOS.oyster },
  
  { keywords: ['salad', 'caesar'], photo: FOOD_PHOTOS.salad },
  { keywords: ['chicken-salad'], photo: FOOD_PHOTOS.chickenSalad },
  { keywords: ['potato-salad'], photo: FOOD_PHOTOS.potatoSalad },
  { keywords: ['coleslaw'], photo: FOOD_PHOTOS.coleslaw },
  
  { keywords: ['mashed-potato'], photo: FOOD_PHOTOS.mashedPotato },
  { keywords: ['roasted-vegetable', 'veggies'], photo: FOOD_PHOTOS.roastedVeggie },
  { keywords: ['stuffing'], photo: FOOD_PHOTOS.stuffing },
  { keywords: ['bread', 'rolls'], photo: FOOD_PHOTOS.bread },
  { keywords: ['fries', 'french-fries'], photo: FOOD_PHOTOS.mashedPotato },
  
  { keywords: ['soup'], photo: FOOD_PHOTOS.soup },
  { keywords: ['dessert', 'sweet'], photo: FOOD_PHOTOS.cheesecake },
  { keywords: ['breakfast'], photo: FOOD_PHOTOS.pancake },
  { keywords: ['dinner'], photo: FOOD_PHOTOS.pasta },
  { keywords: ['lunch'], photo: FOOD_PHOTOS.sandwich },
];

export function getRecipePhoto(slug: string): string {
  if (!slug || typeof slug !== 'string') {
    return DEFAULT_PHOTO;
  }
  
  const slugLower = slug.toLowerCase();
  
  for (const rule of KEYWORD_RULES) {
    for (const keyword of rule.keywords) {
      if (slugLower.includes(keyword)) {
        return rule.photo;
      }
    }
  }
  
  return DEFAULT_PHOTO;
}
