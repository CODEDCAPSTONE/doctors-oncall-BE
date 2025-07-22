import { Request, Response } from "express";
import { Review } from "../models/Review";
import HealthcareProvider, {
  IHealthCareProvider,
} from "../models/HealthCareProvider";

export const postReview = async (req: Request, res: Response) => {
  try {
    const { providerId, rating, comment, patientId } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      res.status(400).json({ message: "Rating must be between 1 and 5" });
      return;
    }

    const provider = (await HealthcareProvider.findById(providerId)) as any;

    if (!provider) {
      res.status(404).json({ message: "Provider not found" });
      return;
    }

    const existingReview = await Review.findOne({ providerId, patientId });
    if (existingReview) {
      res
        .status(409)
        .json({ message: "Patient has already reviewed this provider" });
      return;
    }

    const newReview = new Review({
      providerId,
      rating,
      comment,
      patientId,
    });

    await newReview.save();

    // Update average rating and review count
    const reviews = await Review.find({ providerId });

    const reviewCount = reviews.length;
    const averageRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviewCount;

    provider.reviewCount = reviewCount;
    provider.averageRating = parseFloat(averageRating.toFixed(1));

    res.status(201).json({
      message: "Review submitted successfully",
      review: newReview,
    });
  } catch (error) {
    console.error("Review error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
