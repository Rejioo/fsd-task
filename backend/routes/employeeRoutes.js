const express =require('express');
const {addEmployee,getAllEmployees }= require('../controllers/employeeController');
const router=express.Router();

router.post('/add', addEmployee);
router.get('/all', getAllEmployees);

module.exports= { addEmployee, getAllEmployees};
module.exports= router;
