const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const EmployeeModel = require('./models/Login');
const UserModel = require('./models/User');
const AttendanceModel=require('./models/AttendanceModel')
const AttendanceModell=require('./models/AttendanceModell')
const dotenv = require('dotenv')

const Categorymodel=require('./models/Categorymodel')
dotenv.config({path:'.env'})
const app = express();
// const corsConfig = {
//   origin:"*",
//   credential:true,
//   methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"]
// }
// app.options("",cors(corsConfig));
// app.use(cors(corsConfig));
app.use(cors());
app.use(express.json());

app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*")
  next()
})

 mongoose.connect(process.env.DB)
 .then(()=>{
  console.log("db connected");
 })
 .catch((err)=>{
  console.log(err);
 })





app.post('/v1/register', (req, res) => {
  console.log('Received data:', req.body); // Logging req.body
  EmployeeModel.create(req.body)
    .then(newEmployee => {
      console.log('New employee created:', newEmployee); // Log the created employee
      res.status(201).json(newEmployee);
    })
    .catch(err => {
      console.error('Error creating employee:', err);
      res.status(500).json({ error: 'Error creating employee' });
    });
});


app.post('/v1/create', (req, res) => {
  console.log('Received data:', req.body); // Logging req.body
  UserModel.create(req.body)
    .then(user => {
      console.log('New user created:', user); // Log the created user
      res.status(201).json(user);
    })
    .catch(err => {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Error creating user' });
    });
});

 app.post('/v1/add', (req, res) => {
  Categorymodel.create(req.body)
    .then(data => {
      console.log('New category created:', data);
      res.status(201).json(data);
    })
    .catch(err => {
      console.error('Error creating category:', err);
      res.status(500).json({ error: 'Error creating category' });
    });
});


app.get('/v1/getcategory',(req,res)=>{
  Categorymodel.find({})
    .then(users=>res.json(users))
    .catch(err => {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Error creating user' });
    });
})






// app.post('/v1/attendance', (req, res) => {
//   const { employeeId, status } = req.body;

//   AttendanceModel.create({ employeeId, status })
//     .then(user => {
//       console.log('New user created:', user);
//       res.status(201).json(user);
//     })
//     .catch(err => {
//       console.error('Error creating user:', err);
//       res.status(500).json({ error: 'Error creating user' });
//     });
// });


app.post('/v1/attendancee', (req, res) => {
  const { employeeId, status } = req.body;

  AttendanceModell.create({ employeeId, status })
    .then(user => {
      console.log('New user created:', user);
      res.status(201).json(user);
    })
    .catch(err => {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Error creating user' });
    });
});



app.get('/v1/employee',(req,res)=>{
  UserModel.find({})
    .then(users=>res.json(users))
    .catch(err => {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Error creating user' });
    });
})
app.get('/v1/getuser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById(id) // Use just the id directly without { _id: id }
    .then(user => res.json(user))
    .catch(err => {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Error fetching user' });
    });
});
// app.get('/v1/history/:id',(req, res) => {
//   const id = req.params.id;
//   console.log('hii'); 
// AttendanceModell.findById(id) // Use just the id directly without { _id: id }
//     .then(user => res.json(user))
//     .catch(err => {
//       console.error('Error fetching user:', err);
//       res.status(500).json({ error: 'Error fetching user' });
//     });
// });
app.get('/v1/history/:employeeId', (req, res) => {
  const employeeId = req.params.employeeId;

  AttendanceModell.find({ employeeId })
    .then(users => {
      if (users && users.length > 0) {
        res.json(users);
      } else {
        res.status(404).json({ error: 'No attendance history found for the given employeeId' });
      }
    })
    .catch(err => {
      console.error('Error fetching attendance history:', err);
      res.status(500).json({ error: 'Error fetching attendance history' });
    });
});



// app.get('/v1/history/:id', async (req, res) => {
//   try {
//     const name = req.params.id;
//     console.log('hii');
//     // Your database query based on name
//     const attendanceHistory = await AttendanceModel.findById({ name: name });

//     if (!attendanceHistory) {
//       return res.status(404).json({ error: 'Attendance history not found' });
//     }

//     res.json(attendanceHistory);
//   } catch (err) {
//     console.error('Error fetching attendance history:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });




app.get('/v1/categoryCount', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  Categorymodel.countDocuments()
    .then(employeeCount => {
      res.json({ count: employeeCount });
    })
    .catch(error => {
      console.error('Error fetching employee count:', error);
      res.status(500).json({ error: 'Error fetching employee count' });
    });
});


app.get('/v1/employeeCount', (req, res) => {
  UserModel.countDocuments()
    .then(employeeCount => {
      res.json({ count: employeeCount });
    })
    .catch(error => {
      console.error('Error fetching employee count:', error);
      res.status(500).json({ error: 'Error fetching employee count' });
    });
});

app.get('/v1/adminCount', (req, res) => {
  EmployeeModel.countDocuments()
    .then(employeeCount => {
      res.json({ count: employeeCount });
    })
    .catch(error => {
      console.error('Error fetching employee count:', error);
      res.status(500).json({ error: 'Error fetching employee count' });
    });
});




app.put('/v1/update/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate({ _id: id }, {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age // Corrected field to update user's age
  })
    .then(updatedUser => res.json(updatedUser))
    .catch(err => {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Error updating user' });
    });
});


app.post('/v1/loginForm',(req,res)=>{
    const {email,password}=req.body;
    EmployeeModel.findOne({email:email})
    .then(user=>{
        if(user){
        if(user.password===password)
        {
            res.json("Success")
        }
        else
        {
            res.json("password incorrect")
        }
    }
    else
    {
        res.json('no record exist')
    }
    })
})
app.delete('/v1/deleteUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then(deletedUser => {
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    })
    .catch(err => {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Error deleting user' });
    });
});
app.delete('/v1/deletecategory/:id', (req, res) => {
  const id = req.params.id;
  Categorymodel.findByIdAndDelete({ _id: id })
    .then(deletedUser => {
      if (!deletedUser) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json({ message: 'Category deleted successfully' });
    })
    .catch(err => {
      console.error('Error deleting category:', err);
      res.status(500).json({ error: 'Error deleting category' });
    });
});


app.listen(3001, () => {
  console.log("Server is running");
});
