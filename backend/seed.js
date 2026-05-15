import mongoose from 'mongoose';
import Video from './models/Video.js';
import dotenv from 'dotenv';

dotenv.config();

const videos = [
  // ACTION (10)
  { title: 'Explosive Chase', category: 'Action', genre: 'Action', year: 2026, rating: 8.5, duration: 7200, description: 'High-speed car chase through city streets' },
  { title: 'Combat Elite', category: 'Action', genre: 'Action', year: 2026, rating: 8.3, duration: 6900, description: 'Special forces on a dangerous mission' },
  { title: 'Bullet Storm', category: 'Action', genre: 'Action', year: 2025, rating: 8.1, duration: 7500, description: 'Intense firefight in the desert' },
  { title: 'Heist Masters', category: 'Action', genre: 'Action', year: 2026, rating: 8.7, duration: 8100, description: 'The perfect heist movie' },
  { title: 'Prison Break', category: 'Action', genre: 'Action', year: 2025, rating: 8.2, duration: 7800, description: 'Escape from the most secure prison' },
  { title: 'Sword Legacy', category: 'Action', genre: 'Action', year: 2026, rating: 8.4, duration: 7200, description: 'Epic sword battles and revenge' },
  { title: 'Ninja Shadows', category: 'Action', genre: 'Action', year: 2025, rating: 8.0, duration: 6600, description: 'Ancient ninja warriors rise again' },
  { title: 'Black Ops', category: 'Action', genre: 'Action', year: 2026, rating: 8.6, duration: 8400, description: 'CIA covert operations gone wrong' },
  { title: 'Explosion Zone', category: 'Action', genre: 'Action', year: 2025, rating: 7.9, duration: 7200, description: 'Bombs and action sequences' },
  { title: 'Final Stand', category: 'Action', genre: 'Action', year: 2026, rating: 8.5, duration: 7800, description: 'Last stand against impossible odds' },

  // COMEDY (10)
  { title: 'Laugh Out Loud', category: 'Comedy', genre: 'Comedy', year: 2026, rating: 7.8, duration: 5400, description: 'Hilarious situations and funny dialogues' },
  { title: 'Office Chaos', category: 'Comedy', genre: 'Comedy', year: 2025, rating: 7.6, duration: 5700, description: 'Workplace comedy gone wild' },
  { title: 'Buddy System', category: 'Comedy', genre: 'Comedy', year: 2026, rating: 7.9, duration: 5400, description: 'Two friends on a wild adventure' },
  { title: 'Family Reunion', category: 'Comedy', genre: 'Comedy', year: 2025, rating: 7.5, duration: 5100, description: 'Chaotic family gathering' },
  { title: 'College Days', category: 'Comedy', genre: 'Comedy', year: 2026, rating: 7.7, duration: 5600, description: 'College students getting into trouble' },
  { title: 'Holiday Disaster', category: 'Comedy', genre: 'Comedy', year: 2025, rating: 7.4, duration: 5400, description: 'Holiday season chaos' },
  { title: 'Love at First Sight', category: 'Comedy', genre: 'Comedy', year: 2026, rating: 7.8, duration: 5500, description: 'Romantic comedy mishaps' },
  { title: 'Road Trip', category: 'Comedy', genre: 'Comedy', year: 2025, rating: 7.6, duration: 5800, description: 'Cross-country comedy adventure' },
  { title: 'Dating Games', category: 'Comedy', genre: 'Comedy', year: 2026, rating: 7.7, duration: 5300, description: 'Modern dating disasters' },
  { title: 'Pet Trouble', category: 'Comedy', genre: 'Comedy', year: 2025, rating: 7.5, duration: 5600, description: 'Pets causing hilarious chaos' },

  // DRAMA (10)
  { title: 'Broken Promises', category: 'Drama', genre: 'Drama', year: 2026, rating: 8.9, duration: 9000, description: 'A story of betrayal and redemption' },
  { title: 'Life Lessons', category: 'Drama', genre: 'Drama', year: 2025, rating: 8.7, duration: 8700, description: 'Coming of age drama' },
  { title: 'Silent Tears', category: 'Drama', genre: 'Drama', year: 2026, rating: 8.8, duration: 8400, description: 'Emotional family struggles' },
  { title: 'Second Chance', category: 'Drama', genre: 'Drama', year: 2025, rating: 8.6, duration: 8100, description: 'Getting a second chance at life' },
  { title: 'Lost Love', category: 'Drama', genre: 'Drama', year: 2026, rating: 8.5, duration: 8800, description: 'Heartbreaking love story' },
  { title: 'Street Dreams', category: 'Drama', genre: 'Drama', year: 2025, rating: 8.4, duration: 8300, description: 'Dreams from the streets' },
  { title: 'Family Secrets', category: 'Drama', genre: 'Drama', year: 2026, rating: 8.7, duration: 9200, description: 'Dark family secrets revealed' },
  { title: 'Miracle Worker', category: 'Drama', genre: 'Drama', year: 2025, rating: 8.6, duration: 8900, description: 'Inspiring true story' },
  { title: 'Forgiveness', category: 'Drama', genre: 'Drama', year: 2026, rating: 8.5, duration: 8600, description: 'Journey to forgiveness' },
  { title: 'New Horizons', category: 'Drama', genre: 'Drama', year: 2025, rating: 8.3, duration: 8400, description: 'Starting fresh in a new place' },

  // HORROR (10)
  { title: 'Midnight Terror', category: 'Horror', genre: 'Horror', year: 2026, rating: 7.8, duration: 6300, description: 'Terrifying night of horror' },
  { title: 'Haunted House', category: 'Horror', genre: 'Horror', year: 2025, rating: 7.6, duration: 6600, description: 'Supernatural haunting' },
  { title: 'Dark Shadows', category: 'Horror', genre: 'Horror', year: 2026, rating: 7.7, duration: 6000, description: 'Mysterious dark forces' },
  { title: 'Curse of the Past', category: 'Horror', genre: 'Horror', year: 2025, rating: 7.5, duration: 6400, description: 'Ancient curse awakens' },
  { title: 'Night Creature', category: 'Horror', genre: 'Horror', year: 2026, rating: 7.6, duration: 6200, description: 'Monster hunting gone wrong' },
  { title: 'Bloody Night', category: 'Horror', genre: 'Horror', year: 2025, rating: 7.4, duration: 6500, description: 'Slasher horror classic' },
  { title: 'Possessed', category: 'Horror', genre: 'Horror', year: 2026, rating: 7.8, duration: 6700, description: 'Demonic possession horror' },
  { title: 'The Fog', category: 'Horror', genre: 'Horror', year: 2025, rating: 7.3, duration: 5900, description: 'Mysterious fog descends' },
  { title: 'Zombie Dawn', category: 'Horror', genre: 'Horror', year: 2026, rating: 7.5, duration: 6100, description: 'Zombie apocalypse begins' },
  { title: 'Scream Factory', category: 'Horror', genre: 'Horror', year: 2025, rating: 7.2, duration: 6300, description: 'Survived horror stories' },

  // SCI-FI (10)
  { title: 'Space Odyssey', category: 'Sci-Fi', genre: 'Sci-Fi', year: 2026, rating: 9.0, duration: 9600, description: 'Journey to distant galaxies' },
  { title: 'Time Warp', category: 'Sci-Fi', genre: 'Sci-Fi', year: 2025, rating: 8.8, duration: 9300, description: 'Time travel adventures' },
  { title: 'Cyber Reality', category: 'Sci-Fi', genre: 'Sci-Fi', year: 2026, rating: 8.9, duration: 9000, description: 'Virtual reality gone wrong' },
  { title: 'Robot Uprising', category: 'Sci-Fi', genre: 'Sci-Fi', year: 2025, rating: 8.7, duration: 8700, description: 'AI takes over' },
  { title: 'Parallel World', category: 'Sci-Fi', genre: 'Sci-Fi', year: 2026, rating: 8.6, duration: 9200, description: 'Alternate dimension discovered' },
  { title: 'Quantum Leap', category: 'Sci-Fi', genre: 'Sci-Fi', year: 2025, rating: 8.5, duration: 8900, description: 'Quantum mechanics adventure' },
  { title: 'Alien Contact', category: 'Sci-Fi', genre: 'Sci-Fi', year: 2026, rating: 8.8, duration: 9500, description: 'First contact with aliens' },
  { title: 'Future City', category: 'Sci-Fi', genre: 'Sci-Fi', year: 2025, rating: 8.4, duration: 8600, description: 'Futuristic metropolis' },
  { title: 'Teleportation', category: 'Sci-Fi', genre: 'Sci-Fi', year: 2026, rating: 8.3, duration: 8400, description: 'Teleportation experiments' },
  { title: 'Mars Colony', category: 'Sci-Fi', genre: 'Sci-Fi', year: 2025, rating: 8.6, duration: 9100, description: 'Colonizing Mars' },

  // ROMANCE (10)
  { title: 'Love in Paris', category: 'Romance', genre: 'Romance', year: 2026, rating: 8.4, duration: 7800, description: 'Romantic Paris getaway' },
  { title: 'Soulmates', category: 'Romance', genre: 'Romance', year: 2025, rating: 8.2, duration: 7500, description: 'Two souls meant to be together' },
  { title: 'Chance Meeting', category: 'Romance', genre: 'Romance', year: 2026, rating: 8.3, duration: 7200, description: 'Unexpected romance' },
  { title: 'Love Letters', category: 'Romance', genre: 'Romance', year: 2025, rating: 8.1, duration: 7600, description: 'Classic love story letters' },
  { title: 'Beach Romance', category: 'Romance', genre: 'Romance', year: 2026, rating: 8.2, duration: 7400, description: 'Summer beach romance' },
  { title: 'Against All Odds', category: 'Romance', genre: 'Romance', year: 2025, rating: 8.0, duration: 7700, description: 'Love conquers all obstacles' },
  { title: 'Reunited', category: 'Romance', genre: 'Romance', year: 2026, rating: 8.3, duration: 7300, description: 'Lost lovers reunited' },
  { title: 'Midnight Kiss', category: 'Romance', genre: 'Romance', year: 2025, rating: 8.1, duration: 7500, description: 'New Year romance' },
  { title: 'Forever Young', category: 'Romance', genre: 'Romance', year: 2026, rating: 8.2, duration: 7800, description: 'Timeless love story' },
  { title: 'Destiny', category: 'Romance', genre: 'Romance', year: 2025, rating: 8.0, duration: 7400, description: 'Fated love connections' },

  // THRILLER (10)
  { title: 'Murder Mystery', category: 'Thriller', genre: 'Thriller', year: 2026, rating: 8.6, duration: 8100, description: 'Who is the killer?' },
  { title: 'Twisted Plot', category: 'Thriller', genre: 'Thriller', year: 2025, rating: 8.5, duration: 8400, description: 'Nothing is what it seems' },
  { title: 'Deadly Game', category: 'Thriller', genre: 'Thriller', year: 2026, rating: 8.4, duration: 7800, description: 'Survival game thriller' },
  { title: 'Mind Games', category: 'Thriller', genre: 'Thriller', year: 2025, rating: 8.3, duration: 8200, description: 'Psychological thriller' },
  { title: 'Countdown', category: 'Thriller', genre: 'Thriller', year: 2026, rating: 8.5, duration: 8000, description: 'Time is running out' },
  { title: 'Hidden Truth', category: 'Thriller', genre: 'Thriller', year: 2025, rating: 8.2, duration: 8300, description: 'Uncovering buried secrets' },
  { title: 'Alibi', category: 'Thriller', genre: 'Thriller', year: 2026, rating: 8.4, duration: 7900, description: 'Perfect crime investigation' },
  { title: 'Betrayal', category: 'Thriller', genre: 'Thriller', year: 2025, rating: 8.3, duration: 8100, description: 'Ultimate betrayal thriller' },
  { title: 'Last Day', category: 'Thriller', genre: 'Thriller', year: 2026, rating: 8.2, duration: 8400, description: 'Final day of life' },
  { title: 'Shadow Game', category: 'Thriller', genre: 'Thriller', year: 2025, rating: 8.1, duration: 7700, description: 'Playing with shadows' },

  // ANIMATION (10)
  { title: 'Magic Quest', category: 'Animation', genre: 'Animation', year: 2026, rating: 8.7, duration: 6000, description: 'Enchanted magical adventure' },
  { title: 'Dragon Tales', category: 'Animation', genre: 'Animation', year: 2025, rating: 8.5, duration: 5800, description: 'Dragons and adventures' },
  { title: 'Underwater World', category: 'Animation', genre: 'Animation', year: 2026, rating: 8.6, duration: 5900, description: 'Ocean creatures adventure' },
  { title: 'Sky Kingdom', category: 'Animation', genre: 'Animation', year: 2025, rating: 8.4, duration: 5700, description: 'Flying through the clouds' },
  { title: 'Monster Friends', category: 'Animation', genre: 'Animation', year: 2026, rating: 8.5, duration: 5600, description: 'Friendly monsters adventure' },
  { title: 'Forest Legend', category: 'Animation', genre: 'Animation', year: 2025, rating: 8.3, duration: 5800, description: 'Enchanted forest' },
  { title: 'Superhero Squad', category: 'Animation', genre: 'Animation', year: 2026, rating: 8.6, duration: 6100, description: 'Young heroes team up' },
  { title: 'Fairy Tale', category: 'Animation', genre: 'Animation', year: 2025, rating: 8.2, duration: 5500, description: 'Classic fairy tale adventure' },
  { title: 'Robot Friends', category: 'Animation', genre: 'Animation', year: 2026, rating: 8.4, duration: 5900, description: 'Robots learning to be friends' },
  { title: 'Time Travel Kids', category: 'Animation', genre: 'Animation', year: 2025, rating: 8.3, duration: 5700, description: 'Kids traveling through time' },

  // DOCUMENTARY (10)
  { title: 'Nature Wonders', category: 'Documentary', genre: 'Documentary', year: 2026, rating: 9.0, duration: 5400, description: 'Exploring nature beauty' },
  { title: 'Human Stories', category: 'Documentary', genre: 'Documentary', year: 2025, rating: 8.8, duration: 5100, description: 'Inspiring human tales' },
  { title: 'Space Discovery', category: 'Documentary', genre: 'Documentary', year: 2026, rating: 8.9, duration: 5600, description: 'Cosmic explorations' },
  { title: 'Ocean Life', category: 'Documentary', genre: 'Documentary', year: 2025, rating: 8.7, duration: 5300, description: 'Deep sea mysteries' },
  { title: 'Mountain Peaks', category: 'Documentary', genre: 'Documentary', year: 2026, rating: 8.6, duration: 5200, description: 'Climbing world highest peaks' },
  { title: 'Ancient Civilizations', category: 'Documentary', genre: 'Documentary', year: 2025, rating: 8.8, duration: 5500, description: 'Lost ancient cities' },
  { title: 'Wildlife Africa', category: 'Documentary', genre: 'Documentary', year: 2026, rating: 8.9, duration: 5400, description: 'African wildlife wonders' },
  { title: 'Tech Revolution', category: 'Documentary', genre: 'Documentary', year: 2025, rating: 8.5, duration: 5200, description: 'Technology evolution' },
  { title: 'Music Legends', category: 'Documentary', genre: 'Documentary', year: 2026, rating: 8.7, duration: 5300, description: 'Greatest musicians stories' },
  { title: 'Science Explained', category: 'Documentary', genre: 'Documentary', year: 2025, rating: 8.6, duration: 5100, description: 'Science simplified' },

  // ADVENTURE (10)
  { title: 'Jungle Expedition', category: 'Adventure', genre: 'Adventure', year: 2026, rating: 8.5, duration: 7800, description: 'Deep jungle exploration' },
  { title: 'Desert Quest', category: 'Adventure', genre: 'Adventure', year: 2025, rating: 8.3, duration: 7600, description: 'Crossing vast deserts' },
  { title: 'Mountain Climb', category: 'Adventure', genre: 'Adventure', year: 2026, rating: 8.4, duration: 7900, description: 'Epic mountain climbing' },
  { title: 'Island Discovery', category: 'Adventure', genre: 'Adventure', year: 2025, rating: 8.2, duration: 7500, description: 'Uncharted island adventure' },
  { title: 'River Journey', category: 'Adventure', genre: 'Adventure', year: 2026, rating: 8.3, duration: 7700, description: 'Dangerous river voyage' },
  { title: 'Treasure Hunt', category: 'Adventure', genre: 'Adventure', year: 2025, rating: 8.4, duration: 8000, description: 'Finding hidden treasure' },
  { title: 'Lost City', category: 'Adventure', genre: 'Adventure', year: 2026, rating: 8.5, duration: 8100, description: 'Finding lost civilization' },
  { title: 'Sky Adventures', category: 'Adventure', genre: 'Adventure', year: 2025, rating: 8.2, duration: 7400, description: 'Flying adventures' },
  { title: 'Survival Quest', category: 'Adventure', genre: 'Adventure', year: 2026, rating: 8.3, duration: 7600, description: 'Wilderness survival' },
  { title: 'Arctic Expedition', category: 'Adventure', genre: 'Adventure', year: 2025, rating: 8.4, duration: 8200, description: 'Polar region adventure' },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/enterzilla');
    
    // Clear existing videos
    await Video.deleteMany({});
    
    // Insert new videos
    await Video.insertMany(videos);
    
    console.log('✅ Database seeded with 100 videos!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
