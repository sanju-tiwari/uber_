const captionmodel = require("../models/caption.model.js");

module.exports.createcaption = async ({
  fullName,
  email,
  password,
  vehicle,
  location
}) => {
  if (
    !fullName?.firstname ||
    !fullName?.lastname ||
    !email ||
    !password ||
    !vehicle?.color ||
    !vehicle?.plate ||
    !vehicle?.vehicleType ||
    vehicle?.capacity == null
  ) {
    throw new Error("All fields are required");
  }
    let locationField;
  if (
    location &&
    location.type === "Point" &&
    Array.isArray(location.coordinates) &&
    location.coordinates.length === 2 &&
    location.coordinates.every(coord => typeof coord === "number")
  ) {
    locationField = location;
  }
    const captionPayload = {
    fullName,
    email,
    password,
    vehicle
  };

  if (locationField) {
    captionPayload.location = locationField;
  }

  const caption = await captionmodel
    .create({
      fullName: {
        firstname: fullName.firstname,
        lastname: fullName.lastname
      },
      email,
      password,
      vehicle: {
        color: vehicle.color,
        plate: vehicle.plate,
        vehicleType: vehicle.vehicleType,
        capacity: vehicle.capacity
      }
    })
    .then((caption) => {
      return caption;
    })
    .catch((err) => {
      throw new Error("Error creating caption: " + err.message);
    });

  return caption;
};