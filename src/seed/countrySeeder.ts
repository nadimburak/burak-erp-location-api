import Country from "../models/Country";

const countryData = require('../../public/countries.json');

export const CountrySeedDB = async () => {
  try {
    // Optional: Clear existing countries
    await Country.deleteMany({});
    console.log("🗑️ Existing countries removed");

    const inserted = await Country.insertMany(countryData);

    console.log(`✅ ${inserted.length} countries added:`);
  } catch (error) {
    console.error("❌ Error seeding countries:", error);
    throw error;
  }
};
