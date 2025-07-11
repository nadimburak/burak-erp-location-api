import Country from "../models/Country";

const countryData = require('../../public/countries.json');

export const CountrySeedDB = async () => {
  try {
    // Optional: Clear existing countries
    await Country.deleteMany({});
    console.log("🗑️ Existing countries removed");

    console.log("countryData",countryData)
    const inserted = await Country.insertMany(countryData);

    console.log(
      `✅ ${inserted.length} countries added:`,
      inserted.map((i) => i.name).join(", ")
    );
  } catch (error) {
    console.error("❌ Error seeding countries:", error);
    throw error;
  }
};
