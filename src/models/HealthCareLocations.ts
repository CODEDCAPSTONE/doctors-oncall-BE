import { Schema, model } from "mongoose";

const HealthCareLocationsSchema = new Schema({
  name: { type: String, required: true },
  latitude: { type: String, required: true }, 
  longitude: { type: String, required: true }, 
  contactInfo: [{ type: String }], 
});

const HealthCareLocations = model(
  "HealthCareLocations",
  HealthCareLocationsSchema
);
export default HealthCareLocations;