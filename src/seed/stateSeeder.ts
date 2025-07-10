import mongoose from "mongoose";
import State from "../models/State";
import Country from "../models/Country";

export const StateSeedDB = async () => {
  try {
    await State.deleteMany({});
    console.log("🗑️ Existing states removed");

    const countries = (await Country.find({})) as Array<{
      name: string;
      _id: mongoose.Types.ObjectId;
    }>;
    if (!countries.length) {
      console.error("❌ No countries found. Run CountrySeedDB first.");
      return;
    }

    const countryMap: Record<string, mongoose.Types.ObjectId> = {};
    countries.forEach((c) => (countryMap[c.name] = c._id));

    const countryStatesMap: Record<string, string[]> = {
      India: [
        "Rajasthan",
        "Maharashtra",
        "Uttar Pradesh",
        "Karnataka",
        "Tamil Nadu",
        "Delhi",
      ],
      "United States": [
        "California",
        "Texas",
        "New York",
        "Florida",
        "Illinois",
      ],
      "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
      Canada: ["Ontario", "Quebec", "British Columbia", "Alberta"],
      Australia: [
        "New South Wales",
        "Victoria",
        "Queensland",
        "Western Australia",
      ],
      Germany: ["Bavaria", "Berlin", "Hesse", "Saxony"],
      France: [
        "Île-de-France",
        "Provence-Alpes-Côte d'Azur",
        "Auvergne-Rhône-Alpes",
      ],
      Italy: ["Lombardy", "Lazio", "Sicily", "Tuscany"],
      Spain: ["Catalonia", "Madrid", "Andalusia", "Valencia"],
      China: ["Beijing", "Shanghai", "Guangdong", "Sichuan"],
      Japan: ["Tokyo", "Osaka", "Hokkaido", "Fukuoka"],
      Russia: ["Moscow", "Saint Petersburg", "Siberia", "Krasnodar"],
      Brazil: ["São Paulo", "Rio de Janeiro", "Bahia", "Paraná"],
      "South Africa": [
        "Gauteng",
        "Western Cape",
        "KwaZulu-Natal",
        "Eastern Cape",
      ],
      Mexico: ["Mexico City", "Jalisco", "Nuevo León", "Puebla"],
      Indonesia: ["Jakarta", "West Java", "East Java", "Bali"],
      Pakistan: ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan"],
      Bangladesh: ["Dhaka", "Chittagong", "Khulna", "Rajshahi"],
      "Saudi Arabia": ["Riyadh", "Makkah", "Madinah", "Eastern Province"],
      "United Arab Emirates": ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"],
    };

    const states = [];

    for (const [country, stateNames] of Object.entries(countryStatesMap)) {
      const countryId = countryMap[country];
      if (!countryId) continue;

      for (const state of stateNames) {
        states.push({
          country: countryId,
          name: state,
          description: `${state} in ${country}`,
          status: true,
        });
      }
    }

    const inserted = await State.insertMany(states);

    console.log(
      `✅ ${inserted.length} states added:\n`,
      inserted.map((s) => s.name).join(", ")
    );
  } catch (error) {
    console.error("❌ Error seeding states:", error);
    throw error;
  }
};
