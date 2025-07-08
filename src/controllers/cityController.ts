import { Request, Response } from "express";
import City from "../models/City";

const asyncHandler = require("express-async-handler");

const modelTitle = "City";

export const getAllCity = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const {
        page = "1", // Default to page 1 if not provided
        limit = "10", // Default to limit 10 if not provided
        sortBy = "name", // Default sorting field
        order = "asc", // Default order
        search = "", // Default search string
        country = "", // Default state location
        state = "",
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

      if (state) {
        query.state = state;
      }

      if (country) {
        query.country = country;
      }

      // Fetch data with sorting and pagination
      const data = await City.find(query)
        .populate("country", "name")
        .populate("state", "name")
        .sort({ [sortBy as string]: sortOrder })
        .skip((parsedPage - 1) * parsedLimit)
        .limit(parsedLimit);

      // Get the total number of documents
      const totalData = await City.countDocuments(query);

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

export const getCity = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await City.findById(id)
        .populate("country", "name")
        .populate("state", "name");

      if (!data) {
        res.status(404).json({ message: `${modelTitle} not found.` });
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: `Error ${modelTitle}.`, error });
    }
  }
);

export const createCity = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { name, description, status, state, country } =
        req.body;
      const newData = new City({
        name,
        description,
        status,
        state,
        country,
      });

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

export const updateCity = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, description, status, state, country } =
        req.body;

      const updatedData = await City.findByIdAndUpdate(
        id,
        { name, description, status, state, country },
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

export const deleteCity = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const deletedData = await City.findByIdAndDelete(id);
      if (!deletedData) {
        res.status(404).json({ message: `${modelTitle} not found.` });
      }

      res.status(200).json({ message: `${modelTitle} deleted successfully.` });
    } catch (error) {
      res.status(500).json({ message: `Error ${modelTitle}.`, error });
    }
  }
);
