import { CropInfo, PresetScenario } from '../types';

export const CROPS_DATABASE: Record<string, CropInfo> = {
  rice: {
    id: 'rice',
    name: 'Rice (Paddy)',
    scientificName: 'Oryza sativa',
    category: 'Cereal / Grain',
    icon: '🌾',
    color: '#10b981',
    tagline: 'High-moisture staple grain thriving in warm monsoon environments',
    description: 'Rice is the primary staple food for over half of the world\'s population. It thrives exceptionally well in water-retentive clay and alluvial soils with high seasonal rainfall or dependable flood/canal irrigation.',
    growthRequirements: {
      soilType: ['alluvial', 'clay', 'silt_loam'],
      optimalPh: [5.5, 7.2],
      optimalTemp: [20, 37],
      optimalHumidity: [75, 95],
      optimalRainfall: [150, 300],
      optimalMoisture: [70, 95],
      optimalN: [60, 100],
      optimalP: [35, 65],
      optimalK: [35, 55],
      sunlightHours: '6 - 8 hours/day',
      growthDuration: '105 - 150 days',
      waterRequirement: 'Very High',
    },
    careInstructions: {
      season: 'Kharif (June - November) / Wet Monsoon',
      sowingGuide: 'Puddle the field thoroughly 2-3 times. Transplant 21-25 day old seedlings in rows spaced 20cm x 15cm with 2-3 seedlings per hill.',
      soilPreparation: 'Incorporate 10-12 tonnes of farmyard manure (FYM) per hectare before leveling and puddling.',
      irrigationSchedule: 'Maintain 2-5 cm standing water layer from transplanting till grain filling. Drain water 10-12 days before harvest.',
      fertilizerManagement: 'Apply NPK in ratio 100:50:50 kg/ha. Full P and K plus 1/3 N at basal transplanting; remaining N in 2 split top dressings at tillering and panicle initiation.',
      pestAndDiseases: [
        {
          name: 'Stem Borer & Leaf Folder',
          symptoms: 'Dead hearts in vegetative stage and white ears at flowering stage.',
          prevention: 'Release Trichogramma egg parasitoids or apply Cartap Hydrochloride / Neem oil spray (1500 ppm).'
        },
        {
          name: 'Bacterial Leaf Blight & Blast',
          symptoms: 'Water-soaked lesions on leaf margins turning straw-yellow; spindle-shaped lesions.',
          prevention: 'Avoid excessive nitrogen; spray Streptocycline (0.01%) or Tricyclazole 75 WP.'
        }
      ],
      harvestingGuidelines: 'Harvest when 80-85% grains in panicles turn golden yellow and moisture drops below 20%. Dry thoroughly to 12-14% moisture before milling.',
      expectedYield: '4.5 - 6.5 tonnes / hectare',
      economicValue: 'High market liquidity with steady minimum support and commercial trading prices.'
    }
  },
  wheat: {
    id: 'wheat',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    category: 'Cereal / Grain',
    icon: '🍞',
    color: '#f59e0b',
    tagline: 'Cool-season staple cereal requiring fertile, well-drained loam',
    description: 'Wheat is a premier winter cereal requiring mild temperatures during early tillering and warm sunshine during grain filling and maturity.',
    growthRequirements: {
      soilType: ['alluvial', 'silt_loam', 'clay'],
      optimalPh: [6.0, 7.5],
      optimalTemp: [12, 25],
      optimalHumidity: [45, 70],
      optimalRainfall: [50, 100],
      optimalMoisture: [40, 65],
      optimalN: [90, 140],
      optimalP: [40, 70],
      optimalK: [30, 50],
      sunlightHours: '7 - 9 hours/day',
      growthDuration: '110 - 130 days',
      waterRequirement: 'Moderate',
    },
    careInstructions: {
      season: 'Rabi (October - April) / Cool Dry Season',
      sowingGuide: 'Sow in lines using seed drill at 20-22 cm row spacing, 4-5 cm deep. Seed rate: 100-125 kg/ha.',
      soilPreparation: 'Deep plowing followed by 2-3 harrowings to create a fine, crumbly, weed-free seedbed.',
      irrigationSchedule: '4-6 critical irrigations: Crown root initiation (21 DAS), Tillering, Late jointing, Flowering, Milk stage, and Dough stage.',
      fertilizerManagement: 'NPK 120:60:40 kg/ha. Apply half N, all P and K at sowing; remaining N split equally at 1st and 2nd irrigations.',
      pestAndDiseases: [
        {
          name: 'Yellow / Brown Rust',
          symptoms: 'Linear yellow/brown pustules on leaves forming powdery stripes.',
          prevention: 'Cultivate rust-resistant varieties; spray Propiconazole 25 EC at first notice.'
        },
        {
          name: 'Loose Smut & Aphids',
          symptoms: 'Entire grain head converted to black powdery fungal mass; curled leaves.',
          prevention: 'Seed treatment with Carboxin/Thiram (2g/kg seed); foliar neem oil or Imidacloprid for aphids.'
        }
      ],
      harvestingGuidelines: 'Harvest when stalks turn golden-yellow, straw becomes brittle, and grain moisture is around 14%.',
      expectedYield: '4.0 - 5.5 tonnes / hectare',
      economicValue: 'Strong global commodity demand with long shelf life.'
    }
  },
  maize: {
    id: 'maize',
    name: 'Maize (Corn)',
    scientificName: 'Zea mays',
    category: 'Cereal / Grain',
    icon: '🌽',
    color: '#eab308',
    tagline: 'Versatile cereal and industrial crop with rapid vegetative vigor',
    description: 'Maize serves as food, feed, and biofuel feedstock. It requires deep fertile soils, warm sunny weather, and adequate nitrogen nutrition throughout its fast vegetative cycle.',
    growthRequirements: {
      soilType: ['alluvial', 'red_loam', 'black', 'silt_loam'],
      optimalPh: [5.8, 7.8],
      optimalTemp: [18, 32],
      optimalHumidity: [50, 75],
      optimalRainfall: [60, 110],
      optimalMoisture: [45, 70],
      optimalN: [60, 100],
      optimalP: [40, 60],
      optimalK: [15, 25],
      sunlightHours: '7 - 10 hours/day',
      growthDuration: '85 - 110 days',
      waterRequirement: 'Moderate',
    },
    careInstructions: {
      season: 'Kharif, Rabi & Spring (Versatile multi-season crop)',
      sowingGuide: 'Sow at 60cm row-to-row and 20cm plant-to-plant distance at 3-5 cm depth. Seed rate: 20 kg/ha for hybrids.',
      soilPreparation: 'Prepare deep ridge-and-furrow system to facilitate aeration and prevent water stagnation.',
      irrigationSchedule: 'Irrigate at seedling, knee-high, tasseling, silking, and grain filling stages. Critical: Never allow moisture stress during tasseling.',
      fertilizerManagement: 'NPK 120:60:40 kg/ha. Apply 25% N + full P & K at sowing; 50% N at knee-high stage; 25% N at tasseling.',
      pestAndDiseases: [
        {
          name: 'Fall Armyworm (FAW)',
          symptoms: 'Window pane leaf damage, ragged holes in whorls with moist sawdust-like frass.',
          prevention: 'Pheromone traps, push-pull intercropping with Desmodium, spray Emamectin Benzoate 5 SG.'
        },
        {
          name: 'Turcicum Leaf Blight',
          symptoms: 'Long elliptical grayish-green or tan lesions on lower leaves progressing upwards.',
          prevention: 'Apply Mancozeb 75 WP (2.5 g/L) at onset of disease.'
        }
      ],
      harvestingGuidelines: 'Harvest when husks turn dry paper-white and black layer forms at the grain attachment point.',
      expectedYield: '6.0 - 8.5 tonnes / hectare (Hybrids)',
      economicValue: 'High industrial demand for poultry feed, starch extraction, and ethanol manufacturing.'
    }
  },
  cotton: {
    id: 'cotton',
    name: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    category: 'Fiber',
    icon: '☁️',
    color: '#06b6d4',
    tagline: 'High-value white gold fiber ideal for deep black and fertile soils',
    description: 'Cotton requires warm sunny days, moderate rainfall during vegetative growth, and dry, warm weather during boll opening and picking.',
    growthRequirements: {
      soilType: ['black', 'alluvial', 'red_loam'],
      optimalPh: [6.0, 8.2],
      optimalTemp: [22, 35],
      optimalHumidity: [40, 70],
      optimalRainfall: [50, 110],
      optimalMoisture: [35, 60],
      optimalN: [100, 140],
      optimalP: [40, 60],
      optimalK: [15, 30],
      sunlightHours: '8 - 10 hours/day',
      growthDuration: '150 - 180 days',
      waterRequirement: 'Moderate',
    },
    careInstructions: {
      season: 'Kharif (May - June sowing)',
      sowingGuide: 'Dibble seeds at 90cm x 60cm or 120cm x 45cm spacing on ridges.',
      soilPreparation: 'Deep summer plowing to destroy pupae and weed seeds followed by leveling.',
      irrigationSchedule: 'Avoid excessive watering during vegetative growth. Ensure adequate moisture at squaring, flowering, and boll development.',
      fertilizerManagement: 'NPK 120:60:60 kg/ha. Apply P as basal; N in 3 splits (basal, square formation, and flowering); K in 2 splits.',
      pestAndDiseases: [
        {
          name: 'Bollworms & Whitefly',
          symptoms: 'Shedding of squares and bolls; yellowing, sooty mold on honeydew secretions.',
          prevention: 'Install yellow sticky traps, maintain refuge crops, spray Flonicamid or Spinosad.'
        },
        {
          name: 'Bacterial Blight / Angular Leaf Spot',
          symptoms: 'Angular water-soaked spots bounded by leaf veins.',
          prevention: 'Seed delinting with sulfuric acid; spray Copper Oxychloride (0.3%).'
        }
      ],
      harvestingGuidelines: 'Pick clean, fully opened bolls in dry morning hours after dew has evaporated. Store in dry, clean sheds.',
      expectedYield: '2.0 - 3.2 tonnes / hectare (Seed cotton)',
      economicValue: 'Primary fiber crop with high export and textile mill profitability.'
    }
  },
  chickpea: {
    id: 'chickpea',
    name: 'Chickpea (Gram)',
    scientificName: 'Cicer arietinum',
    category: 'Pulse / Legume',
    icon: '🌱',
    color: '#84cc16',
    tagline: 'Drought-tolerant, soil-enriching pulse fixing atmospheric nitrogen',
    description: 'Chickpea is a major winter pulse crop known for atmospheric nitrogen fixation, low water requirements, and high protein content.',
    growthRequirements: {
      soilType: ['black', 'alluvial', 'sandy_loam', 'red_loam'],
      optimalPh: [6.0, 7.5],
      optimalTemp: [15, 25],
      optimalHumidity: [15, 40],
      optimalRainfall: [35, 90],
      optimalMoisture: [25, 50],
      optimalN: [20, 45],
      optimalP: [55, 85],
      optimalK: [75, 95],
      sunlightHours: '7 - 9 hours/day',
      growthDuration: '90 - 115 days',
      waterRequirement: 'Low',
    },
    careInstructions: {
      season: 'Rabi (October - November)',
      sowingGuide: 'Sow at 30cm x 10cm spacing at 8-10cm depth to reach moisture zone. Inoculate seed with Rhizobium and PSB culture.',
      soilPreparation: 'Rough, cloddy seedbed preferred to avoid soil crusting and promote root aeration.',
      irrigationSchedule: 'Only 1-2 light irrigations: at pre-flowering and pod development. Never flood or irrigate during full bloom.',
      fertilizerManagement: 'NPK 20:50:20 kg/ha as starter basal dose; chickpea fixes its own nitrogen through root nodules.',
      pestAndDiseases: [
        {
          name: 'Pod Borer (Helicoverpa armigera)',
          symptoms: 'Circular holes bored into developing pods with larval heads inside.',
          prevention: 'Plant marigold as trap crop, install pheromone traps (5/ha), spray NPV or Chlorantraniliprole.'
        },
        {
          name: 'Fusarium Wilt & Root Rot',
          symptoms: 'Drooping petioles, dark internal vascular discoloration, sudden plant wilting.',
          prevention: 'Crop rotation, deep sowing, seed treatment with Trichoderma viride (4g/kg seed).'
        }
      ],
      harvestingGuidelines: 'Harvest when leaves dry and fall off, pods turn yellowish-brown, and seeds rattle inside.',
      expectedYield: '1.8 - 2.5 tonnes / hectare',
      economicValue: 'Consistent premium pricing in pulse markets due to essential dietary protein demand.'
    }
  },
  coffee: {
    id: 'coffee',
    name: 'Coffee',
    scientificName: 'Coffea arabica / canephora',
    category: 'Beverage / Plantation',
    icon: '☕',
    color: '#78350f',
    tagline: 'Highland plantation crop thriving under canopy shade and humid mist',
    description: 'Coffee thrives on undulating hillsides and highland plateaus with rich organic matter, mild temperatures, and well-distributed rainfall.',
    growthRequirements: {
      soilType: ['red_loam', 'laterite', 'alluvial'],
      optimalPh: [6.0, 6.8],
      optimalTemp: [22, 28],
      optimalHumidity: [55, 75],
      optimalRainfall: [110, 200],
      optimalMoisture: [50, 75],
      optimalN: [90, 120],
      optimalP: [25, 40],
      optimalK: [25, 40],
      sunlightHours: 'Dappled shade (4-6 hours)',
      growthDuration: 'Perennial (3-4 years to first crop)',
      waterRequirement: 'High',
    },
    careInstructions: {
      season: 'Monsoon planting (June - September)',
      sowingGuide: 'Plant healthy nursery-raised seedlings in pits of 45x45x45cm filled with topsoil, compost, and rock phosphate at 2.5m x 2.5m spacing under two-tier shade trees (Silver Oak, Erythrina).',
      soilPreparation: 'Terracing and contour bunding on slopes to prevent soil erosion.',
      irrigationSchedule: 'Blossom shower (25-40mm) in March-April triggers simultaneous uniform flowering; backing showers essential 2 weeks later.',
      fertilizerManagement: 'NPK 120:90:120 kg/ha in 3 split doses (pre-monsoon, post-monsoon, and post-harvest). Apply dolomite lime annually to maintain pH.',
      pestAndDiseases: [
        {
          name: 'Coffee Berry Borer (Hypothenemus hampei)',
          symptoms: 'Small pinhole entry near the navel of the berry.',
          prevention: 'Maintain shade canopy, use broca traps with ethanol/methanol lures, spray Beauveria bassiana.'
        },
        {
          name: 'Coffee Leaf Rust (Hemileia vastatrix)',
          symptoms: 'Orange-yellow powdery spots on the underside of mature leaves.',
          prevention: '0.5% Bordeaux mixture spray before monsoon and after harvest.'
        }
      ],
      harvestingGuidelines: 'Selective hand-picking of only crimson-red ripe cherries. Process via washed or natural sundried method.',
      expectedYield: '1.2 - 2.0 tonnes / hectare (Clean coffee beans)',
      economicValue: 'High export commodity with lucrative specialty coffee premiums.'
    }
  },
  banana: {
    id: 'banana',
    name: 'Banana',
    scientificName: 'Musa acuminata',
    category: 'Fruit',
    icon: '🍌',
    color: '#facc15',
    tagline: 'Fast-growing, nutrient-hungry perennial giant yielding heavy harvests',
    description: 'Banana is a high-yielding tropical fruit that requires ample warmth, heavy organic matter, uniform moisture, and high potassium for optimal bunch development.',
    growthRequirements: {
      soilType: ['alluvial', 'red_loam', 'clay', 'black'],
      optimalPh: [5.5, 7.5],
      optimalTemp: [25, 35],
      optimalHumidity: [75, 90],
      optimalRainfall: [90, 160],
      optimalMoisture: [65, 85],
      optimalN: [90, 120],
      optimalP: [70, 95],
      optimalK: [45, 65],
      sunlightHours: '8 - 10 hours/day',
      growthDuration: '10 - 12 months',
      waterRequirement: 'Very High',
    },
    careInstructions: {
      season: 'Year-round with irrigation; peak planting Feb-March or June-July',
      sowingGuide: 'Plant disease-free tissue-cultured plantlets or sword suckers (1.5-2 kg) in 50cm pits at 1.8m x 1.8m or 1.5m x 1.5m spacing.',
      soilPreparation: 'Deep trenching and incorporation of 20 kg FYM + 250g neem cake per pit.',
      irrigationSchedule: 'Drip irrigation (15-20 liters/plant/day) ensures 35% higher yield and rapid bunch shooting.',
      fertilizerManagement: 'NPK 200:50:300 g/plant. Split N and K in 4-6 fertigation doses across vegetative and bunch emergence stages.',
      pestAndDiseases: [
        {
          name: 'Panama Wilt & Sigatoka Leaf Spot',
          symptoms: 'Yellowing of lower leaves, splitting of pseudostem base; brown oval spots with gray centers.',
          prevention: 'Plant tissue-culture Cavendish clones; soil drenching with Trichoderma; spray Propiconazole.'
        },
        {
          name: 'Banana Pseudostem Weevil',
          symptoms: 'Gelatinous exudation from stem pinholes, weakening and snapping of trunk.',
          prevention: 'Stem injection with Azadirachtin or Monocrotophos; pheromone cosmos lures.'
        }
      ],
      harvestingGuidelines: 'Harvest bunches when fruit angles become rounded and top leaves begin to dry (approx. 90-110 days after flowering).',
      expectedYield: '50 - 75 tonnes / hectare',
      economicValue: 'Rapid cash turnaround with consistent daily retail market demand.'
    }
  },
  coconut: {
    id: 'coconut',
    name: 'Coconut',
    scientificName: 'Cocos nucifera',
    category: 'Beverage / Plantation',
    icon: '🥥',
    color: '#854d0e',
    tagline: 'The Tree of Life yielding oil, water, coir, and timber in coastal plains',
    description: 'Coconut thrives in sandy loams and coastal alluvial belts with high relative humidity, abundant sunshine, and warm marine breezes.',
    growthRequirements: {
      soilType: ['sandy_loam', 'alluvial', 'red_loam', 'laterite'],
      optimalPh: [5.2, 8.0],
      optimalTemp: [25, 35],
      optimalHumidity: [80, 98],
      optimalRainfall: [130, 250],
      optimalMoisture: [50, 75],
      optimalN: [15, 40],
      optimalP: [10, 30],
      optimalK: [25, 45],
      sunlightHours: '8 - 10 hours/day',
      growthDuration: 'Perennial (5-6 years to bearing)',
      waterRequirement: 'High',
    },
    careInstructions: {
      season: 'May - June (Onset of monsoon)',
      sowingGuide: 'Dig 1m x 1m x 1m pits spaced 7.5m x 7.5m in square system. Fill with topsoil, red earth, and 25kg compost.',
      soilPreparation: 'Provide adequate drainage channels in waterlogged lowlands.',
      irrigationSchedule: '40-50 liters/palm/day under basin or drip system; apply sea salt (1-2 kg/palm/year) to supply chlorine and enhance nut water.',
      fertilizerManagement: 'NPK 500:320:1200 g/palm/year in two equal splits (May-June and Sept-Oct) in 1.8m circular basins.',
      pestAndDiseases: [
        {
          name: 'Rhinoceros Beetle & Red Palm Weevil',
          symptoms: 'V-shaped cuts on newly opened fronds; extrusion of chewed fibrous mass with fermented smell.',
          prevention: 'Apply neem cake + sand (1:2) in leaf axils; set ferrolure pheromone traps.'
        },
        {
          name: 'Bud Rot & Stem Bleeding',
          symptoms: 'Central spindle leaf withers and rots; dark brown liquid exudate on trunk.',
          prevention: 'Crown cleaning and application of 1% Bordeaux paste.'
        }
      ],
      harvestingGuidelines: 'Harvest bunches of 11-12 month old mature coconuts every 45-60 days for copra/oil or 7-month tender nuts for fresh water.',
      expectedYield: '80 - 120 nuts / palm / year',
      economicValue: 'High lifetime asset value with multiple revenue streams (tender water, copra, coir, charcoal).'
    }
  },
  apple: {
    id: 'apple',
    name: 'Apple',
    scientificName: 'Malus domestica',
    category: 'Fruit',
    icon: '🍎',
    color: '#ef4444',
    tagline: 'High-altitude temperate fruit requiring winter chilling and crisp sun',
    description: 'Apples require cool temperate climates, 1000-1500 hours of winter chilling (<7°C), well-drained loamy soils rich in organic matter, and mild summers.',
    growthRequirements: {
      soilType: ['silt_loam', 'red_loam', 'alluvial'],
      optimalPh: [5.5, 6.8],
      optimalTemp: [12, 24],
      optimalHumidity: [60, 85],
      optimalRainfall: [90, 150],
      optimalMoisture: [45, 65],
      optimalN: [15, 40],
      optimalP: [120, 145],
      optimalK: [190, 205],
      sunlightHours: '7 - 9 hours/day',
      growthDuration: 'Perennial deciduous tree',
      waterRequirement: 'Moderate',
    },
    careInstructions: {
      season: 'Dormant winter planting (December - February)',
      sowingGuide: 'Plant grafted clonal rootstock saplings in 1m pits at 4m x 4m (standard) or 2.5m x 1.5m (high density).',
      soilPreparation: 'Ensure deep well-aerated soil; incorporate 30kg decomposed farm manure + 500g bone meal per pit.',
      irrigationSchedule: 'Irrigate during spring bud-burst, fruit set, and active cell expansion (May-July). Drip irrigation with mulching.',
      fertilizerManagement: 'NPK 70:35:70 g/year of tree age up to 10 years. Apply full P and K in winter; N in two splits (bud break and petal fall).',
      pestAndDiseases: [
        {
          name: 'Apple Scab (Venturia inaequalis)',
          symptoms: 'Olive-green to black velvety spots on leaves and corky cracks on fruit skin.',
          prevention: 'Dithiocarbamate or Difenoconazole spray during pink bud and petal fall stages.'
        },
        {
          name: 'Woolly Apple Aphid & San Jose Scale',
          symptoms: 'White cottony masses on twigs and roots; grayish scales on bark and fruits.',
          prevention: 'Release Aphelinus mali parasitoids; dormant horticultural spray oil in January.'
        }
      ],
      harvestingGuidelines: 'Harvest by gentle hand twist when ground color changes from green to yellow-cream and starch turns to sugar (tested with iodine).',
      expectedYield: '15 - 25 tonnes / hectare',
      economicValue: 'High market premium with extensive cold storage and national retail distribution.'
    }
  },
  mango: {
    id: 'mango',
    name: 'Mango',
    scientificName: 'Mangifera indica',
    category: 'Fruit',
    icon: '🥭',
    color: '#fb923c',
    tagline: 'The King of Fruits thriving in tropical warmth with dry flowering season',
    description: 'Mango requires warm, frost-free tropical or subtropical conditions with distinct dry periods to stimulate profuse blossoming and sweet fruit ripening.',
    growthRequirements: {
      soilType: ['alluvial', 'red_loam', 'laterite', 'black'],
      optimalPh: [5.5, 7.5],
      optimalTemp: [24, 38],
      optimalHumidity: [45, 65],
      optimalRainfall: [60, 110],
      optimalMoisture: [35, 60],
      optimalN: [15, 35],
      optimalP: [15, 40],
      optimalK: [25, 45],
      sunlightHours: '8 - 10 hours/day',
      growthDuration: 'Perennial orchard',
      waterRequirement: 'Low',
    },
    careInstructions: {
      season: 'July - August (Monsoon season planting)',
      sowingGuide: 'Plant veneer or epicotyl grafted varieties in 1m x 1m pits at 10m x 10m (traditional) or 5m x 5m (high density).',
      soilPreparation: 'Deep plowing; mix topsoil with 25kg FYM, 1kg SSP, and 100g chlorpyrifos dust to prevent termites.',
      irrigationSchedule: 'Irrigate young trees every 3-5 days. For mature trees, withhold water for 2 months prior to flowering to induce floral buds, then irrigate during fruit swelling.',
      fertilizerManagement: 'NPK 100:50:100 g/year of tree age up to 10th year (1000:500:1000 g/tree). Apply post-harvest in August-September.',
      pestAndDiseases: [
        {
          name: 'Mango Hopper & Fruit Fly',
          symptoms: 'Nymphs suck sap from tender panicles causing blossom drop; maggots inside ripe fruits.',
          prevention: 'Spray Imidacloprid (0.3ml/L) at panicle emergence; methyl eugenol pheromone traps.'
        },
        {
          name: 'Powdery Mildew & Anthracnose',
          symptoms: 'White powdery coating on flowers; black sunken spots on leaves and maturing fruits.',
          prevention: 'Sulfur dust (0.2%) or Carbendazim spray before full bloom.'
        }
      ],
      harvestingGuidelines: 'Harvest at physiological maturity when shoulder rises above stalk attachment and specific gravity reaches 1.01-1.02.',
      expectedYield: '10 - 18 tonnes / hectare',
      economicValue: 'Huge domestic consumption and lucrative export avenues for Alphonso, Kesar, and Dasheri.'
    }
  },
  grapes: {
    id: 'grapes',
    name: 'Grapes',
    scientificName: 'Vitis vinifera',
    category: 'Fruit',
    icon: '🍇',
    color: '#8b5cf6',
    tagline: 'High-value vine crop requiring precision trellis and dry summers',
    description: 'Grapes thrive in sunny, dry climates with well-drained sandy loams and low ambient humidity during berry maturation to prevent fungal decay.',
    growthRequirements: {
      soilType: ['sandy_loam', 'alluvial', 'red_loam'],
      optimalPh: [6.0, 7.8],
      optimalTemp: [15, 35],
      optimalHumidity: [70, 85],
      optimalRainfall: [60, 90],
      optimalMoisture: [40, 60],
      optimalN: [15, 40],
      optimalP: [120, 145],
      optimalK: [190, 205],
      sunlightHours: '8 - 10 hours/day',
      growthDuration: 'Perennial vine',
      waterRequirement: 'Moderate',
    },
    careInstructions: {
      season: 'October - November planting of rooted cuttings',
      sowingGuide: 'Train on Bower (pandal) or Y-trellis system at 3m x 1.8m spacing.',
      soilPreparation: 'Ensure excellent drainage with gypsum/organic matter additions; eliminate caliche hardpans.',
      irrigationSchedule: 'Drip fertigation with precision moisture sensors; stress irrigation prior to back-pruning in October.',
      fertilizerManagement: 'NPK 250:150:400 kg/ha. Apply high potassium during berry expansion and veraison to boost sugar content.',
      pestAndDiseases: [
        {
          name: 'Downy Mildew & Powdery Mildew',
          symptoms: 'Oily yellow spots on upper leaf surface with white downy growth beneath; powdery gray coat on berries.',
          prevention: 'Spray Bordeaux mixture (1%) or Azoxystrobin + Difenoconazole regularly.'
        },
        {
          name: 'Thrips & Mealybugs',
          symptoms: 'Scabbing on berry skin; white waxy colonies under bark and on grape bunches.',
          prevention: 'Stem banding with sticky grease; release Cryptolaemus montrouzieri ladybird beetles.'
        }
      ],
      harvestingGuidelines: 'Harvest when Total Soluble Solids (TSS) reach 18-20° Brix and berries develop characteristic color and sweetness.',
      expectedYield: '20 - 30 tonnes / hectare',
      economicValue: 'Exceptional ROI for table grapes, raisins, and wine production.'
    }
  },
  watermelon: {
    id: 'watermelon',
    name: 'Watermelon',
    scientificName: 'Citrullus lanatus',
    category: 'Fruit',
    icon: '🍉',
    color: '#ec4899',
    tagline: 'Warm-season creeping vine delivering quick summer cash returns',
    description: 'Watermelon is a fast-maturing summer crop demanding deep sandy soils, hot sunshine, low humidity, and controlled irrigation during ripening.',
    growthRequirements: {
      soilType: ['sandy_loam', 'alluvial', 'red_loam'],
      optimalPh: [6.0, 7.0],
      optimalTemp: [24, 35],
      optimalHumidity: [45, 60],
      optimalRainfall: [40, 60],
      optimalMoisture: [40, 60],
      optimalN: [15, 40],
      optimalP: [10, 30],
      optimalK: [45, 55],
      sunlightHours: '8 - 10 hours/day',
      growthDuration: '80 - 100 days',
      waterRequirement: 'Moderate',
    },
    careInstructions: {
      season: 'Zaid / Summer (January - March sowing)',
      sowingGuide: 'Sow 2-3 seeds per hill in channels spaced 2.5m apart with 90cm between hills, or on silver-black plastic mulch beds.',
      soilPreparation: 'Deep harrowing and bed preparation with 15 tonnes/ha FYM.',
      irrigationSchedule: 'Irrigate every 5-7 days during vegetative growth; gradually decrease irrigation 10 days before harvest to concentrate sugars.',
      fertilizerManagement: 'NPK 100:60:80 kg/ha. Apply 1/3 N and full P & K at bed formation; balance N in 2 split top dressings at vine elongation and fruit set.',
      pestAndDiseases: [
        {
          name: 'Fruit Fly & Red Pumpkin Beetle',
          symptoms: 'Punctured fruit rotting with larval maggots; defoliation of young cotyledon leaves.',
          prevention: 'Cue-lure traps (10/ha); cover young fruits with newspaper bags or neem oil spray.'
        },
        {
          name: 'Fusarium Wilt & Anthracnose',
          symptoms: 'Sudden yellowing and daytime wilting of entire vine; sunken circular fruit lesions.',
          prevention: 'Seed treatment with Thiram; use grafted rootstocks (Bottle gourd/Pumpkin).'
        }
      ],
      harvestingGuidelines: 'Harvest when the ground spot turns creamy yellow, tendril near fruit stalk dries completely, and tapping gives a dull hollow sound.',
      expectedYield: '25 - 40 tonnes / hectare',
      economicValue: 'Short 90-day turnaround with explosive summer retail demand.'
    }
  },
  orange: {
    id: 'orange',
    name: 'Orange (Citrus)',
    scientificName: 'Citrus sinensis / reticulata',
    category: 'Fruit',
    icon: '🍊',
    color: '#f97316',
    tagline: 'Vitamin-rich citrus fruit demanding sub-tropical sun and well-drained loam',
    description: 'Oranges thrive in sub-tropical regions with dry climates, distinct winter chilling for coloring, and light to medium loamy soils free of hardpan.',
    growthRequirements: {
      soilType: ['alluvial', 'red_loam', 'black'],
      optimalPh: [6.0, 7.5],
      optimalTemp: [15, 35],
      optimalHumidity: [85, 95],
      optimalRainfall: [100, 120],
      optimalMoisture: [45, 65],
      optimalN: [15, 40],
      optimalP: [10, 25],
      optimalK: [5, 15],
      sunlightHours: '7 - 9 hours/day',
      growthDuration: 'Perennial orchard',
      waterRequirement: 'Moderate',
    },
    careInstructions: {
      season: 'Monsoon planting (June - August)',
      sowingGuide: 'Plant budded plants on Rangpur lime or Rough Lemon rootstock in 75cm pits at 6m x 6m spacing.',
      soilPreparation: 'Incorporate 20kg FYM, 500g SSP, and 50g Carbofuran per planting pit.',
      irrigationSchedule: 'Ring basin or double-ring drip method ensuring irrigation water never directly touches the trunk collar.',
      fertilizerManagement: 'NPK 600:200:400 g/tree/year for mature trees in 3 split doses. Spray micronutrient mixture (Zn, Fe, Mn, B) twice a year.',
      pestAndDiseases: [
        {
          name: 'Citrus Psylla & Leaf Miner',
          symptoms: 'Vectors Greening/HLB disease causing mottled leaves; silvery serpentine mines on flush leaves.',
          prevention: 'Spray Thiamethoxam 25 WG or Imidacloprid at new flush emergence.'
        },
        {
          name: 'Citrus Canker & Gummosis',
          symptoms: 'Raised corky lesions surrounded by yellow halos on fruit/leaves; gum oozing from trunk bark.',
          prevention: 'Prune infected twigs; spray Streptomycin Sulfate (100 ppm) + Copper Oxychloride.'
        }
      ],
      harvestingGuidelines: 'Harvest by clipping fruits with short stalks when skin turns 75% orange-yellow. Avoid pulling by hand.',
      expectedYield: '12 - 20 tonnes / hectare',
      economicValue: 'Steady commercial market with juice processing and table consumption demand.'
    }
  },
  jute: {
    id: 'jute',
    name: 'Jute (Golden Fiber)',
    scientificName: 'Corchorus olitorius',
    category: 'Fiber',
    icon: '🌾',
    color: '#d97706',
    tagline: 'Eco-friendly biodegradable fiber crop flourishing in humid river deltas',
    description: 'Jute requires warm and wet tropical conditions, fertile alluvial floodplains, and ample standing fresh water for microbial fiber retting.',
    growthRequirements: {
      soilType: ['alluvial', 'silt_loam', 'clay'],
      optimalPh: [6.0, 7.4],
      optimalTemp: [24, 37],
      optimalHumidity: [70, 90],
      optimalRainfall: [150, 220],
      optimalMoisture: [60, 85],
      optimalN: [60, 90],
      optimalP: [35, 60],
      optimalK: [35, 55],
      sunlightHours: '6 - 8 hours/day',
      growthDuration: '110 - 130 days',
      waterRequirement: 'High',
    },
    careInstructions: {
      season: 'Pre-monsoon (March - May)',
      sowingGuide: 'Broadcast or line sow at 25-30cm x 5-7cm spacing. Seed rate: 5-7 kg/ha.',
      soilPreparation: 'Fine tilth prepared by 3-4 deep plowings and plankings on alluvial soils.',
      irrigationSchedule: '1-2 pre-sowing irrigations if rain is delayed; rainfed during monsoon.',
      fertilizerManagement: 'NPK 60:30:30 kg/ha. Apply full P and K at basal; split N in 2 top dressings at 3 and 6 weeks after sowing.',
      pestAndDiseases: [
        {
          name: 'Jute Semilooper & Yellow Mite',
          symptoms: 'Caterpillars defoliate top leaves; mites cause curling and downward copping of apical leaves.',
          prevention: 'Install bamboo perches for predatory birds; spray Spiromesifen or Neem formulation.'
        },
        {
          name: 'Stem Rot & Root Rot (Macrophomina)',
          symptoms: 'Dark brown canker at collar region and shredding of stem fiber.',
          prevention: 'Seed treatment with Carbendazim (2g/kg); apply potash to increase plant resistance.'
        }
      ],
      harvestingGuidelines: 'Harvest at 50% flowering stage (120 days) for optimal fiber quality and tensile strength.',
      expectedYield: '2.5 - 3.5 tonnes / hectare (Dry fiber)',
      economicValue: 'Rising global demand for biodegradable packaging and geotextiles.'
    }
  },
  lentil: {
    id: 'lentil',
    name: 'Lentil (Masoor)',
    scientificName: 'Lens culinaris',
    category: 'Pulse / Legume',
    icon: '🍲',
    color: '#f87171',
    tagline: 'Nutritious red pulse thriving on residual moisture with low input needs',
    description: 'Lentil is a resilient winter legume capable of growing on marginal soils and residual flood moisture, delivering high protein seeds.',
    growthRequirements: {
      soilType: ['alluvial', 'black', 'silt_loam', 'red_loam'],
      optimalPh: [5.8, 7.5],
      optimalTemp: [15, 26],
      optimalHumidity: [55, 70],
      optimalRainfall: [35, 60],
      optimalMoisture: [30, 50],
      optimalN: [15, 30],
      optimalP: [55, 80],
      optimalK: [15, 25],
      sunlightHours: '7 - 8 hours/day',
      growthDuration: '95 - 120 days',
      waterRequirement: 'Low',
    },
    careInstructions: {
      season: 'Rabi (Late October - November)',
      sowingGuide: 'Sow behind plow in lines 22-25 cm apart at 3-4 cm depth. Seed rate: 30-40 kg/ha.',
      soilPreparation: 'Medium tilth; also suitable as paira/utera crop directly broadcast into standing paddy 7 days before harvest.',
      irrigationSchedule: 'Generally rainfed; 1 critical irrigation at pod formation if winter rains fail.',
      fertilizerManagement: 'NPK 20:40:20 kg/ha + 20 kg Sulfur/ha applied as single basal dose at sowing.',
      pestAndDiseases: [
        {
          name: 'Rust (Uromyces viciae-fabae)',
          symptoms: 'Small pustules of yellowish-brown spores on leaves and pods causing early defoliation.',
          prevention: 'Cultivate resistant cultivars; spray Hexaconazole (1ml/L) if severity occurs.'
        },
        {
          name: 'Vascular Wilt & Aphids',
          symptoms: 'Drooping of upper branches, sudden drying; aphid clustering on tender shoot tips.',
          prevention: 'Seed treatment with Trichoderma; spray dimethoate for aphid control.'
        }
      ],
      harvestingGuidelines: 'Harvest when leaves dry and pods turn golden-straw color before pods shatter open.',
      expectedYield: '1.2 - 2.0 tonnes / hectare',
      economicValue: 'High consumer demand in dietary dhal recipes with long storage life.'
    }
  },
  pigeonpeas: {
    id: 'pigeonpeas',
    name: 'Pigeonpeas (Arhar / Tur)',
    scientificName: 'Cajanus cajan',
    category: 'Pulse / Legume',
    icon: '🌿',
    color: '#a3e635',
    tagline: 'Deep-rooted drought-resistant woody pulse with high nitrogen fixation',
    description: 'Pigeonpea has a deep taproot system that penetrates subsoils to access moisture during dry spells, making it an ideal intercrop and soil rejuvenator.',
    growthRequirements: {
      soilType: ['red_loam', 'black', 'alluvial'],
      optimalPh: [5.5, 7.5],
      optimalTemp: [20, 35],
      optimalHumidity: [45, 65],
      optimalRainfall: [60, 110],
      optimalMoisture: [35, 60],
      optimalN: [15, 35],
      optimalP: [55, 75],
      optimalK: [15, 30],
      sunlightHours: '8 - 10 hours/day',
      growthDuration: '130 - 180 days',
      waterRequirement: 'Low',
    },
    careInstructions: {
      season: 'Kharif (June - July)',
      sowingGuide: 'Sow at 60-75cm row-to-row and 20cm plant-to-plant spacing at 4-5cm depth. Seed rate: 12-15 kg/ha.',
      soilPreparation: 'Deep summer plowing followed by ridge-and-furrow formation to prevent waterlogging.',
      irrigationSchedule: 'Requires 1-2 protective irrigations at flower initiation and pod filling if dry spell exceeds 25 days.',
      fertilizerManagement: 'NPK 20:50:20 kg/ha as basal dose along with 20 kg/ha sulfur (gypsum).',
      pestAndDiseases: [
        {
          name: 'Pod Borer & Plume Moth',
          symptoms: 'Holes in pods, damaged seeds, frass inside pods.',
          prevention: 'Pheromone traps (10/ha), bird perches (50/ha), spray Chlorantraniliprole 18.5 SC.'
        },
        {
          name: 'Sterility Mosaic & Phytophthora Blight',
          symptoms: 'Bushy pale green leaves devoid of flowers; water-soaked brown stem lesions.',
          prevention: 'Spray Fenazaquin for vector mite control; improve field drainage.'
        }
      ],
      harvestingGuidelines: 'Harvest when 75-80% pods turn brown and dry. Cut plants at ground level with sickle.',
      expectedYield: '1.5 - 2.5 tonnes / hectare',
      economicValue: 'Premium valued pulse in culinary trade with stable pricing.'
    }
  },
  papaya: {
    id: 'papaya',
    name: 'Papaya',
    scientificName: 'Carica papaya',
    category: 'Fruit',
    icon: '🍈',
    color: '#fbbf24',
    tagline: 'Fast-bearing tropical fruit tree yielding abundant papain and sweet flesh',
    description: 'Papaya is a fast-growing, heavy-yielding herbaceous tree that demands porous, well-drained soils, frost-free heat, and continuous moisture.',
    growthRequirements: {
      soilType: ['alluvial', 'red_loam', 'sandy_loam'],
      optimalPh: [6.0, 7.0],
      optimalTemp: [22, 36],
      optimalHumidity: [70, 95],
      optimalRainfall: [120, 180],
      optimalMoisture: [50, 75],
      optimalN: [35, 60],
      optimalP: [45, 70],
      optimalK: [45, 65],
      sunlightHours: '8 - 10 hours/day',
      growthDuration: '9 - 11 months to first harvest',
      waterRequirement: 'High',
    },
    careInstructions: {
      season: 'Spring (Feb-March) or Monsoon (June-July)',
      sowingGuide: 'Transplant 45-day nursery seedlings in 45cm pits spaced 1.8m x 1.8m. Keep 1 male plant per 10 female plants (or grow gynodioecious varieties like Red Lady 786).',
      soilPreparation: 'Raised mounds with excellent drainage channels to avoid collar rot.',
      irrigationSchedule: 'Drip irrigation 6-8 liters/day. Never allow standing water around the collar.',
      fertilizerManagement: 'NPK 250:250:500 g/plant/year in 6 split bi-monthly applications.',
      pestAndDiseases: [
        {
          name: 'Papaya Ringspot Virus (PRSV)',
          symptoms: 'Yellow mosaic pattern on leaves, shoestring distortion, oily green rings on fruits.',
          prevention: 'Silver reflective mulch, border barrier crop of maize/sorghum, spray Dimethoate for aphids.'
        },
        {
          name: 'Damping Off & Collar Rot (Pythium)',
          symptoms: 'Water-soaked soft rot of stem collar causing plant toppling.',
          prevention: 'Drench collar with Metalaxyl + Mancozeb (2g/L); apply Trichoderma.'
        }
      ],
      harvestingGuidelines: 'Harvest when fruit apex turns from green to a streak of yellow/orange color.',
      expectedYield: '60 - 90 tonnes / hectare',
      economicValue: 'Exceptional rapid income generation with continuous weekly pickings.'
    }
  },
  pomegranate: {
    id: 'pomegranate',
    name: 'Pomegranate',
    scientificName: 'Punica granatum',
    category: 'Fruit',
    icon: '🍎',
    color: '#be123c',
    tagline: 'Antioxidant super-fruit suited for semi-arid lands and drip irrigation',
    description: 'Pomegranate is an exceptionally hardy, drought-tolerant fruit crop suited to arid and semi-arid regions with warm summers and mild winters.',
    growthRequirements: {
      soilType: ['red_loam', 'alluvial', 'black', 'sandy_loam'],
      optimalPh: [6.5, 8.0],
      optimalTemp: [20, 38],
      optimalHumidity: [80, 95],
      optimalRainfall: [100, 120],
      optimalMoisture: [35, 60],
      optimalN: [15, 35],
      optimalP: [15, 30],
      optimalK: [35, 50],
      sunlightHours: '8 - 10 hours/day',
      growthDuration: 'Perennial (2-3 years to regular bearing)',
      waterRequirement: 'Low',
    },
    careInstructions: {
      season: 'Monsoon or Winter (July-August or Dec-Jan)',
      sowingGuide: 'Plant tissue-culture or air-layered saplings (variety Bhagwa/Arakta) in 60cm pits at 4.5m x 3m spacing.',
      soilPreparation: 'Deep ripping and ridge beds with 20kg FYM + 500g rock phosphate per pit.',
      irrigationSchedule: 'Stress tree for 40-50 days to induce Hastha/Mrig bahar flowering, followed by regular drip fertigation.',
      fertilizerManagement: 'NPK 625:250:500 g/plant/year for mature orchard in split fertigation schedules.',
      pestAndDiseases: [
        {
          name: 'Bacterial Blight / Oily Spot (Xanthomonas)',
          symptoms: 'Dark brown oily angular spots on leaves, stems, and fruits with L-shaped cracking.',
          prevention: 'Strict sanitation, copper oxychloride + Streptocycline sprays, 2-bromo-2-nitropropane-1,3-diol.'
        },
        {
          name: 'Pomegranate Fruit Borer (Deudorix isocrates)',
          symptoms: 'Punctured fruit rotting with foul smell; caterpillars inside seeds.',
          prevention: 'Bag fruits with non-woven polypropylene bags; spray Spinetoram.'
        }
      ],
      harvestingGuidelines: 'Harvest when fruit calyx turns inward, skin turns glossy red-yellow, and tapping gives a metallic sound (135-150 days after flowering).',
      expectedYield: '12 - 18 tonnes / hectare',
      economicValue: 'High export value, excellent transport shelf-life, and strong supermarket pricing.'
    }
  }
};

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'monsoon_alluvial_paddy',
    name: 'Monsoon Alluvial Lowland',
    tag: 'Wet & Humid',
    description: 'High rainfall, alluvial clay soil, high nitrogen & organic moisture — classic paddy & jute basin.',
    soilParameters: {
      nitrogen: 85,
      phosphorus: 50,
      potassium: 45,
      temperature: 26,
      humidity: 84,
      ph: 6.5,
      rainfall: 220,
      soilMoisture: 80,
      soilType: 'alluvial',
      fieldName: 'River Valley Field #1',
      location: 'Eastern River Delta'
    }
  },
  {
    id: 'rabi_wheat_plain',
    name: 'Cool Winter Grain Plain',
    tag: 'Temperate / Loamy',
    description: 'Moderate temperatures, fertile loam, balanced high NPK, low humidity — ideal for Wheat & Rabi crops.',
    soilParameters: {
      nitrogen: 110,
      phosphorus: 55,
      potassium: 40,
      temperature: 18,
      humidity: 58,
      ph: 6.8,
      rainfall: 75,
      soilMoisture: 52,
      soilType: 'silt_loam',
      fieldName: 'North Plain Plot A',
      location: 'Gangetic Basin'
    }
  },
  {
    id: 'black_soil_cotton_belt',
    name: 'Black Regur Cotton Basin',
    tag: 'Subtropical Semi-Arid',
    description: 'Deep black soil, high nitrogen, warm climate, moderate moisture — optimized for Cotton and Pulses.',
    soilParameters: {
      nitrogen: 115,
      phosphorus: 48,
      potassium: 22,
      temperature: 28,
      humidity: 55,
      ph: 7.6,
      rainfall: 80,
      soilMoisture: 48,
      soilType: 'black',
      fieldName: 'Deccan Black Soil Sector 4',
      location: 'Deccan Plateau'
    }
  },
  {
    id: 'arid_pulses_dryland',
    name: 'Semi-Arid Pulse & Gram Belt',
    tag: 'Dry / Low Water',
    description: 'Low rainfall, light red/sandy loam, low nitrogen, alkaline pH — ideal for Chickpea & Lentils.',
    soilParameters: {
      nitrogen: 28,
      phosphorus: 68,
      potassium: 82,
      temperature: 21,
      humidity: 28,
      ph: 7.2,
      rainfall: 45,
      soilMoisture: 32,
      soilType: 'sandy_loam',
      fieldName: 'Dryland Field B-3',
      location: 'Western Dry Zone'
    }
  },
  {
    id: 'coastal_tropical_plantation',
    name: 'Coastal Humid Plantation',
    tag: 'Tropical Coastal',
    description: 'Warm, maritime high humidity, sandy loam, generous rainfall — optimal for Coconut, Banana, Papaya.',
    soilParameters: {
      nitrogen: 25,
      phosphorus: 20,
      potassium: 35,
      temperature: 30,
      humidity: 88,
      ph: 6.2,
      rainfall: 180,
      soilMoisture: 65,
      soilType: 'sandy_loam',
      fieldName: 'Coastal Palm Grove',
      location: 'Southern Coast'
    }
  },
  {
    id: 'highland_coffee_orchard',
    name: 'Highland Mist Hillside',
    tag: 'Cool Highland',
    description: 'Laterite hillside soil, rich leaf litter, mild temperatures, mountain rain — ideal for Coffee & Tea.',
    soilParameters: {
      nitrogen: 105,
      phosphorus: 32,
      potassium: 30,
      temperature: 24,
      humidity: 68,
      ph: 6.3,
      rainfall: 155,
      soilMoisture: 62,
      soilType: 'laterite',
      fieldName: 'Hillside Coffee Estate',
      location: 'Western Ghats Ridge'
    }
  },
  {
    id: 'temperate_apple_valley',
    name: 'Temperate High-Altitude Orchard',
    tag: 'Cold Temperate',
    description: 'Cool mountain air, high phosphorus & potassium requirements, acidic-neutral loam — tailored for Apple.',
    soilParameters: {
      nitrogen: 30,
      phosphorus: 135,
      potassium: 198,
      temperature: 16,
      humidity: 72,
      ph: 6.2,
      rainfall: 110,
      soilMoisture: 55,
      soilType: 'silt_loam',
      fieldName: 'Valley Apple Orchard #7',
      location: 'Northern Alpine Valley'
    }
  }
];
