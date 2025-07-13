import State from "../models/State";
import Country from "../models/Country";
import City from "../models/City";
const cityData = require('../../public/states.json');

export const CitySeedDB = async () => {
  try {
    await City.deleteMany({});
    console.log("🗑️ Existing cities removed");

    // Process all cities in parallel
    const cityInsertData = await Promise.all(
      cityData.map(async (element: any) => {
        const country = await Country.findOne({ iso2: element.country_code });
        if (!country) {
          console.warn(`⚠️ Country not found for code: ${element.country_code}`);
          return null;
        }
        const state = await State.findOne({ state_name: element.state_name });
        if (!state) {
          console.warn(`⚠️ State not found for name: ${element.state_name}`);
          return null;
        }
        return {
          ...element,
          country: country._id,
          state: state._id,
        };
      })
    );

    // Filter out any null entries (where state wasn't found)
    const validData = cityInsertData.filter(state => state !== null);

    const inserted = await City.insertMany(validData);

    console.log(`✅ ${inserted.length} cities added:`);

  } catch (error) {
    console.error("❌ Error seeding cities:", error);
    throw error;
  }
};