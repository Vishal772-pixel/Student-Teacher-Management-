const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");


// Here we are calling a function getAllStudents ....and sending response with student list in json 
const handleGetAllStudents = asyncHandler(async (req, res) => {
    const filters= req.query;
    const students=await getAllStudents(filters);
    res.status(200).json({success:true,data:students});
  

});

// reads or gets new student data , calls addNewStudent..and insert data into database
const handleAddStudent = asyncHandler(async (req, res) => {
    const studentData = req.body;
    const result = await addNewStudent(studentData);
    res.status(201).json({ success: true, data: result });
});

// takes id of student ...calls function updateStudent..and updates
const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = { ...req.body, id };  
    const result = await updateStudent(updateData);
    res.status(200).json({ success: true, data: result });
});

 // takes id ..calls getStudentDetail function ..and then sends back the detail
const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await getStudentDetail(id);
    res.status(200).json({ success: true, data: student });
});

// again here also calls  setStudentStatus  and sents the status
const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { reviewerId, status } = req.body;
    const result = await setStudentStatus({ userId: id, reviewerId, status });
    res.status(200).json({ success: true, data: result });
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
