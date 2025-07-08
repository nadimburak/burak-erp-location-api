import { Request, Response } from "express";
import Country from "../models/Country";

const asyncHandler = require("express-async-handler");

const modelTitle = "Country";

export const getAllCountry = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const {
        page = "1", // Default to page 1 if not provided
        limit = "10", // Default to limit 10 if not provided
        sortBy = "name", // Default sorting field
        order = "asc", // Default order
        search = "", // Default search string
      } = req.query;

      // Parse and validate page and limit
      const parsedPage = Math.max(parseInt(page as string, 10), 1); // Minimum value 1
      const parsedLimit = Math.max(parseInt(limit as string, 10), 1); // Minimum value 1
      const sortOrder = order === "asc" ? 1 : -1; // Convert order to MongoDB format

      const query: any = search
        ? {
          $or: [
            { name: { $regex: search, $options: "i" } }, // Case-insensitive match for name
          ],
        }
        : {};

      // Fetch data with sorting and pagination
      const data = await Country.find(query)
        .sort({ [sortBy as string]: sortOrder })
        .skip((parsedPage - 1) * parsedLimit)
        .limit(parsedLimit);

      // Get the total number of documents
      const totalData = await Country.countDocuments(query);

      // Send the response
      res.status(200).json({
        data,
        total: totalData,
        currentPage: parsedPage,
        totalPages: Math.ceil(totalData / parsedLimit),
      });
    } catch (error) {
      res.status(500).json({ message: `Error ${modelTitle}.`, error });
    }
  }
);

export const getCountry = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await Country.findById(id);

      if (!data) {
        res.status(404).json({ message: `${modelTitle} not found.` });
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: `Error ${modelTitle}.`, error });
    }
  }
);

export const createCountry = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { name, description, status } = req.body;
      const newData = new Country({ name, description, status });

      await newData.save();
      res.status(201).json({
        data: newData,
        message: `${modelTitle} created successfully.`,
      });
    } catch (error) {
      res.status(500).json({ message: `Error ${modelTitle}.`, error });
    }
  }
);

export const updateCountry = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, description, status } = req.body;

      const updatedData = await Country.findByIdAndUpdate(
        id,
        { name, description, status },
        { new: true } // Return the updated document
      );

      if (!updatedData) {
        res.status(404).json({ message: `${modelTitle} not found.` });
      }

      res.status(200).json({
        data: updatedData,
        message: `${modelTitle} updated successfully.`,
      });
    } catch (error) {
      res.status(500).json({ message: `Error ${modelTitle}.`, error });
    }
  }
);

export const deleteCountry = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const deletedData = await Country.findByIdAndDelete(id);
      if (!deletedData) {
        res.status(404).json({ message: `${modelTitle} not found.` });
      }

      res.status(200).json({ message: `${modelTitle} deleted successfully.` });
    } catch (error) {
      res.status(500).json({ message: `Error ${modelTitle}.`, error });
    }
  }
);
