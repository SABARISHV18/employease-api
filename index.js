const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const EmployeeModel = require('./models/Login');
const UserModel = require('./models/User');
const AttendanceModel=require('./models/AttendanceModel')
const AttendanceModell=require('./models/AttendanceModell')

const Categorymodel=require('./models/Categorymodel')

const app = express();
app.use(express.json());
app.use(cors());

// {
//   origin: ["https://deploy-mern-1whq.vercel.app"],
//   methods: ["POST", "GET", "PUT"],
//   credentials: true
//  }

 mongoose.connect("mongodb+srv://sabarishv:Sabarii8@cluster0.ft5iy6n.mongodb.net/?retryWrites=true&w=majority");
//  mongodb://127.0.0.1:27017/ems
//mongodb+srv://sabarishv:Sabarii8@cluster0.ft5iy6n.mongodb.net/?retryWrites=true&w=majority

app.post('/register', (req, res) => {
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


app.post('/create', (req, res) => {
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

 app.post('/add', (req, res) => {
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

app.get('/getcategory',(req,res)=>{
  Categorymodel.find({})
    .then(users=>res.json(users))
    .catch(err => {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Error creating user' });
    });
})






// app.post('/attendance', (req, res) => {
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


app.post('/attendancee', (req, res) => {
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



app.get('/employee',(req,res)=>{
  UserModel.find({})
    .then(users=>res.json(users))
    .catch(err => {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Error creating user' });
    });
})
app.get('/getuser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById(id) // Use just the id directly without { _id: id }
    .then(user => res.json(user))
    .catch(err => {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Error fetching user' });
    });
});
// app.get('/history/:id',(req, res) => {
//   const id = req.params.id;
//   console.log('hii'); 
// AttendanceModell.findById(id) // Use just the id directly without { _id: id }
//     .then(user => res.json(user))
//     .catch(err => {
//       console.error('Error fetching user:', err);
//       res.status(500).json({ error: 'Error fetching user' });
//     });
// });
app.get('/history/:employeeId', (req, res) => {
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



// app.get('/history/:id', async (req, res) => {
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




app.get('/categoryCount', (req, res) => {
  Categorymodel.countDocuments()
    .then(employeeCount => {
      res.json({ count: employeeCount });
    })
    .catch(error => {
      console.error('Error fetching employee count:', error);
      res.status(500).json({ error: 'Error fetching employee count' });
    });
});


app.get('/employeeCount', (req, res) => {
  UserModel.countDocuments()
    .then(employeeCount => {
      res.json({ count: employeeCount });
    })
    .catch(error => {
      console.error('Error fetching employee count:', error);
      res.status(500).json({ error: 'Error fetching employee count' });
    });
});

app.get('/adminCount', (req, res) => {
  EmployeeModel.countDocuments()
    .then(employeeCount => {
      res.json({ count: employeeCount });
    })
    .catch(error => {
      console.error('Error fetching employee count:', error);
      res.status(500).json({ error: 'Error fetching employee count' });
    });
});




app.put('/update/:id', (req, res) => {
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


app.post('/login',(req,res)=>{
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
app.delete('/deleteUser/:id', (req, res) => {
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
app.delete('/deletecategory/:id', (req, res) => {
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
