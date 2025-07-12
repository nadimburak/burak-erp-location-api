import State from "../models/State";
import Country from "../models/Country";
const stateData = require('../../public/states.json');

export const StateSeedDB = async () => {
  try {
    await State.deleteMany({});
    console.log("🗑️ Existing states removed");

    // Process all states in parallel
    const stateInsertData = await Promise.all(
      stateData.map(async (element: any) => {
        const country = await Country.findOne({ iso2: element.country_code });
        if (!country) {
          console.warn(`⚠️ Country not found for code: ${element.country_code}`);
          return null;
        }
        return {
          ...element,
          country: country._id  // Use _id instead of id
        };
      })
    );

    // Filter out any null entries (where country wasn't found)
    const validStates = stateInsertData.filter(state => state !== null);

    const inserted = await State.insertMany(validStates);

    console.log(`✅ ${inserted.length} states added:`);

  } catch (error) {
    console.error("❌ Error seeding states:", error);
    throw error;
  }
};