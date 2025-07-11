import Country from "../models/Country";

export const CountrySeedDB = async () => {
  try {
    // Optional: Clear existing countries
    await Country.deleteMany({});
    console.log("🗑️ Existing countries removed");

    const countries = [
      { name: "India" },
      { name: "USA" },
      { name: "United Kingdom" },
      { name: "Canada" },
      { name: "Australia" },
      { name: "Germany" },
      { name: "France" },
      { name: "Italy" },
      { name: "Spain" },
      { name: "China" },
      { name: "Japan" },
      { name: "Russia" },
      { name: "Brazil" },
      { name: "South Africa" },
      { name: "Mexico" },
      { name: "Indonesia" },
      { name: "Pakistan" },
      { name: "Bangladesh" },
      { name: "Saudi Arabia" },
      { name: "United Arab Emirates" },
    ];

    const inserted = await Country.insertMany(countries);

    console.log(
      `✅ ${inserted.length} countries added:`,
      inserted.map((i) => i.name).join(", ")
    );
  } catch (error) {
    console.error("❌ Error seeding countries:", error);
    throw error;
  }
};
