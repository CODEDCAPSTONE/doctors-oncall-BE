import { Request, NextFunction, Response, Express } from "express";
import AvailableSchedule from "../models/AvailableSchedule";

// CRUD for available schedules
// 1st. Read >> GET

const getAllAvailableSchedules = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schedules = await AvailableSchedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    next(error);
  }
};

// 2nd. Create >> POST
const createAvailableSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get schedule data from request body
    const { date, time, slotsNum } = req.body;
    const { healthCareProviderID } = (req as any).user._id; // user is the logged in health care provider

    // create a new available schedule
    const availability = await AvailableSchedule.create({
      date,
      time,
      slotsNum,
      healthCareProvider: healthCareProviderID,
    });

    res.status(201).json(availability);
  } catch (error) {
    next(error);
  }
};

// 3rd. Update >> PUT
// update an available schedule time, healthcare provider is logged in
const updateAvailableTime = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { scheduleID } = req.params; // get schedule ID from request parameters
    const { time } = req.body; // get updated data from request body
    //  check if the schedule exists
    const existingSchedule = await AvailableSchedule.findById(scheduleID);
    if (!existingSchedule) {
      res.status(404).json({ message: "ScheduleID not found" });
    }
    // find the schedule by ID and update it
    const updatedSchedule = await AvailableSchedule.findByIdAndUpdate(
      scheduleID,
      { time: time },
      { new: true } // return the updated document
    );
    // if the schedule is not found it will not update therefore we check if updatedSchedule is null
    //idk how much it is needed after the first check
    if (!updatedSchedule) {
      res
        .status(404)
        .json({ message: "Schedule not found, try creating a new one" });
    }

    res.status(200).json(updatedSchedule);
  } catch (error) {
    next(error);
  }
};
// update an available schedule date, healthcare provider is logged in
const updateAvailableDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { scheduleID } = req.params; // get schedule ID from request parameters
    const { date } = req.body; // get updated data from request body
    //  check if the schedule exists
    const existingSchedule = await AvailableSchedule.findById(scheduleID);
    if (!existingSchedule) {
      res.status(404).json({ message: "ScheduleID not found" });
    }
    // find the schedule by ID and update it
    const updatedSchedule = await AvailableSchedule.findByIdAndUpdate(
      scheduleID,
      { date: date },
      { new: true } // return the updated document
    );
    // if the schedule is not found it will not update therefore we check if updatedSchedule is null
    //idk how much it is needed after the first check
    if (!updatedSchedule) {
      res
        .status(404)
        .json({ message: "Schedule not found, try creating a new one" });
    }

    res.status(200).json(updatedSchedule);
  } catch (error) {
    next(error);
  }
};

// update an available schedule slots number, healthcare provider is logged in
const updateAvailableSlotsNum = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { scheduleID } = req.params; // get schedule ID from request parameters
    const { slotsNum } = req.body; // get updated data from request body
    //  check if the schedule exists
    const existingSchedule = await AvailableSchedule.findById(scheduleID);
    if (!existingSchedule) {
      res.status(404).json({ message: "ScheduleID not found" });
    }
    // find the schedule by ID and update it
    const updatedSchedule = await AvailableSchedule.findByIdAndUpdate(
      scheduleID,
      { slotsNum: slotsNum },
      { new: true } // return the updated document
    );
    // if the schedule is not found it will not update therefore we check if updatedSchedule is null
    //idk how much it is needed after the first check
    if (!updatedSchedule) {
      res
        .status(404)
        .json({ message: "Schedule not found, try creating a new one" });
    }

    res.status(200).json(updatedSchedule);
  } catch (error) {
    next(error);
  }
};
// update full schedule, healthcare provider is logged in
const updateAvailableSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { scheduleID } = req.params; // get schedule ID from request parameters
    const { date, time, slotsNum } = req.body; // get updated data from request body
    //  check if the schedule exists
    const existingSchedule = await AvailableSchedule.findById(scheduleID);
    if (!existingSchedule) {
      res.status(404).json({ message: "ScheduleID not found" });
    }
    // find the schedule by ID and update it
    const updatedSchedule = await AvailableSchedule.findByIdAndUpdate(
      scheduleID,
      { date, time, slotsNum },
      { new: true } // return the updated document
    );
    // if the schedule is not found it will not update therefore we check if updatedSchedule is null
    //idk how much it is needed after the first check
    if (!updatedSchedule) {
      res
        .status(404)
        .json({ message: "Schedule not found, try creating a new one" });
    }

    res.status(200).json(updatedSchedule);
  } catch (error) {
    next(error);
  }
};
// 4th. Delete >> DELETE
const deleteAvailableSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { scheduleID } = req.params; // get schedule ID from request parameters
    // check if the schedule exists
    const existingSchedule = await AvailableSchedule.findById(scheduleID);
    if (!existingSchedule) {
      res.status(404).json({ message: "Schedule not found" });
    }
    // delete the schedule by ID
    await AvailableSchedule.findByIdAndDelete(scheduleID);
    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export {
  getAllAvailableSchedules,
  createAvailableSchedule,
  updateAvailableSchedule,
  updateAvailableTime,
  updateAvailableDate,
  updateAvailableSlotsNum,
  deleteAvailableSchedule,
};
