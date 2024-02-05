const mongoose = require('mongoose');

// Define the schema for the attendance records
const AttendanceSchemaa = new mongoose.Schema({
    employeeId: String,
    status: String,
    attendanceDate: { type: Date, default: Date.now }

});

// Create the Mongoose model using the schema
const AttendanceModell = mongoose.model("attend", AttendanceSchemaa);

// Export the model to be used in other parts of your application
module.exports = AttendanceModell;
