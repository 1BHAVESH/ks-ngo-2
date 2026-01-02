import HomePage from "../models/HomePage.js";
import fs from "fs";
import path from "path";

export const getHomePage = async (req, res) => {
  try {
    const data = await HomePage.findOne();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Home Page data" });
  }
};

// 🟢 Get Stats
export const getStats = async (req, res) => {
  try {
    const home = await HomePage.findOne().select("stats");

    if (!home) {
      return res.status(404).json({ message: "Home data not found" });
    }

    res.json(home.stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};

// 🟡 Update Stats
export const updateStats = async (req, res) => {
  try {
    let home = await HomePage.findOne();

    // Agar document hi nahi hai to create karo
    if (!home) {
      home = new HomePage({});
    }

    home.stats = {
      Cows_Rescued: req.body.Cows_Rescued,
      Active_Volunteers: req.body.Active_Volunteers,
      Years_of_Service: req.body.Years_of_Service,
      Successful_Adoptions: req.body.Successful_Adoptions,
    };

    await home.save();

    res.json({
      message: "Stats Updated Successfully",
      stats: home.stats,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating stats" });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const home = await HomePage.findOne().select("testimonials");

    if (!home) {
      return res.status(404).json({ message: "Home data not found" });
    }

    // console.log(home)

    res.json({
      message: "Testimonials Fetched",
      testimonials: home.testimonials,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching testimonials" });
  }
};

export const addTestimonial = async (req, res) => {
  try {
    const home = await HomePage.findOne();
    home.testimonials.push(req.body);
    await home.save();

    res.json({ message: "Testimonial Added", home });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding testimonial" });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params; // URL param
    const updateData = req.body; // new values

    console.log("updatedddddd", req.body)

    const home = await HomePage.findOne();
    if (!home) {
      return res.status(404).json({ message: "HomePage not found" });
    }

    console.log("###############", home.testimonials);

    // Find testimonial inside array

    console.log("iddddddddddd", id);
    const testimonial = home.testimonials.id(id);

    console.log("test", testimonial);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    // Update fields
    testimonial.name = req.body.name ?? testimonial.name;
    testimonial.message = req.body.message ?? testimonial.message;
    testimonial.position = req.body.position ?? testimonial.position;
    await home.save();

    

    res.json({
      message: "Testimonial Updated",
      data: testimonial,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating testimonial",
      error: error.message,
    });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const home = await HomePage.findOne();
    home.testimonials = home.testimonials.filter(
      (t) => t._id.toString() !== id
    );

    await home.save();
    res.json({ message: "Testimonial Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting testimonial" });
  }
};
