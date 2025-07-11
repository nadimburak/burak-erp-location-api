import mongoose from "mongoose";
import City from "../models/City";
import Country from "../models/Country";
import State from "../models/State";

export const CitySeedDB = async () => {
  try {
    await City.deleteMany({});
    console.log("🗑️ Existing cities removed");

    const countries = await Country.find({});
    const states = await State.find({});

    if (!countries.length || !states.length) {
      console.error(
        "❌ Countries or States missing. Run CountrySeedDB and StateSeedDB first."
      );
      return;
    }

    const countryMap = Object.fromEntries(
      countries.map((c) => [c.name, c._id])
    );
    const stateMap = new Map<string, mongoose.Document>();

    states.forEach((state) => {
      const countryId = state.country.toString();
      stateMap.set(`${countryId}_${state.name}`, state);
    });

    const citiesData: Record<string, Record<string, string[]>> = {
      India: {
        Maharashtra: ["Mumbai", "Pune", "Nagpur"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
        Karnataka: ["Bengaluru", "Mysuru", "Mangalore"],
        Rajasthan: ["Udaipur", "Jaipur", "Chittor"],
      },
      "United States": {
        California: ["Los Angeles", "San Francisco", "San Diego"],
        Texas: ["Houston", "Dallas", "Austin"],
      },
      "United Kingdom": {
        England: ["London", "Manchester", "Liverpool"],
        Scotland: ["Edinburgh", "Glasgow"],
      },
      Canada: {
        Ontario: ["Toronto", "Ottawa", "Mississauga"],
        Quebec: ["Montreal", "Quebec City"],
      },
      Australia: {
        "New South Wales": ["Sydney", "Newcastle"],
        Victoria: ["Melbourne", "Geelong"],
      },
      Germany: {
        Bavaria: ["Munich", "Nuremberg"],
        Berlin: ["Berlin"],
      },
      France: {
        "Île-de-France": ["Paris"],
        "Provence-Alpes-Côte d'Azur": ["Marseille", "Nice"],
      },
      Italy: {
        Lombardy: ["Milan", "Bergamo"],
        Lazio: ["Rome"],
      },
      Spain: {
        Catalonia: ["Barcelona"],
        Madrid: ["Madrid"],
      },
    };

    const cities = [];

    for (const [countryName, states] of Object.entries(citiesData)) {
      const countryId = countryMap[countryName];
      if (!countryId) continue;

      for (const [stateName, cityList] of Object.entries(states)) {
        const stateDoc = stateMap.get(`${countryId}_${stateName}`);
        if (!stateDoc) continue;

        for (const city of cityList) {
          cities.push({
            country: countryId,
            state: stateDoc._id,
            name: city,
            description: `${city} in ${stateName}, ${countryName}`,
            status: true,
          });
        }
      }
    }

    const inserted = await City.insertMany(cities);

    console.log(
      `✅ ${inserted.length} cities added:\n`,
      inserted.map((c) => c.name).join(", ")
    );
  } catch (error) {
    console.error("❌ Error seeding cities:", error);
    throw error;
  }
};
