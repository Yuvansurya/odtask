const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');
const Slot = require('./models/Slot')
const Schedule = require('./models/Schedule');
const Accept = require('./models/Accept')

app.use(cors());
app.use(bodyParser.json());

// const mongoURI = 'mongodb+srv://21f3001741:ieNoBs619VRbx6D6@cluster0.yez6x.mongodb.net/';
const mongoURI = 'mongodb://localhost:27017';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


app.post('/register', async (req, res) => {
    try {
        const { name, dept, year, rollno, password } = req.body
        // const re=await req.body
        //console.log(typeof(rollno))
        // console.log(req.body)
        // rollno=parseInt(rollno)
        if (await User.findOne({ rollno: rollno })) {
            return res.status(400).send('User Exist');
        }
        await User.create({
            name: name,
            dept: dept,
            year: year,
            rollno: rollno,
            password: password
        })

        res.send("successfull")
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).send('Server error');
    }
})


app.post('/studentlist', async (req, res) => {
    try {
        res.send(await User.find({}));
    } catch (err) {
        res.status(500).send('Server error');
    }
})

app.post('/deletestudent', async (req, res) => {
    try {
        const { rollno } = req.body
        await User.deleteOne({ rollno: rollno })
        res.send(await User.find({}))

    } catch (err) {
        res.status(500).send('Server error');
    }
})

app.post('/addslot', async (req, res) => {
    try {
        const { fromHours, fromMinutes, fromPeriod, toHours, toMinutes, toPeriod } = req.body
        await Slot.create({
            fromHours: +fromHours,
            fromMinutes: +fromMinutes,
            fromPeriod: fromPeriod,
            toHours: +toHours,
            toMinutes: +toMinutes,
            toPeriod: toPeriod
        })

        res.send(await Slot.find({}))

    } catch (err) {
        res.status(500).send('Server error');
    }
})

app.get('/getslot', async (req, res) => {
    try {
        res.send(await Slot.find({}));
    } catch (err) {
        res.status(500).send('Server error');
    }
});

app.post('/deleteslot', async (req, res) => {
    try {
        const { fromHours, fromMinutes, fromPeriod, toHours, toMinutes, toPeriod } = req.body;

        // Find and remove the slot using the unique slot data
        await Slot.deleteOne({
            fromHours: +fromHours,
            fromMinutes: +fromMinutes,
            fromPeriod: fromPeriod,
            toHours: +toHours,
            toMinutes: +toMinutes,
            toPeriod: toPeriod
        });

        // Send back the updated list of slots
        const updatedSlots = await Slot.find({});
        res.send(updatedSlots);
    } catch (err) {
        console.log(err)
        res.status(500).send('Error deleting the slot');
    }
});

app.post('/login', async (req, res) => {
    try {
        const { rollno, password } = req.body
        //console.log(typeof(rollno))

        const user_data = await User.findOne({ rollno: +rollno })
        //console.log(user_data)
        if (user_data && user_data.password === password) {
            res.send({ rollno: user_data.rollno, name: user_data.name, dept: user_data.dept, year: user_data.year })
        } else {
            res.status(500).send('Invalid Credentials');
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
})


app.post('/check', async (req, res) => {
    try {
        // Get the slots array from the request body

        // Create a new schedule with the time slots
        const schedule = new Accept(req.body);

        // Save the schedule to MongoDB
        await schedule.save();

        res.status(201).json({ message: 'Time slots inserted successfully' });
    } catch (err) {
        console.error('Error inserting time slots:', err);
        res.status(500).json({ error: 'An error occurred while inserting time slots' });
    }
});


app.post('/accept', async (req, res) => {
    try {
        // Get the slots array from the request body

        // Create a new schedule with the time slots
        const schedule = new Accept(req.body);

        // Save the schedule to MongoDB
        await schedule.save();

        res.status(201).json({ message: 'Time slots inserted successfully' });
    } catch (err) {
        console.error('Error inserting time slots:', err);
        res.status(500).json({ error: 'An error occurred while inserting time slots' });
    }
});

app.post('/requests', async (req, res) => {
    try {
        const requests = await Accept.find({ status: 0 });
        console.log('Requests fetched:', requests); // Log the fetched requests
        res.status(200).json(requests);
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).send('Server error');
    }
});


app.post('/slotstatus', async (req, res) => {
    const { rollno } = req.body;

    try {
        // Find the data with the given rollno
        const slots = await Accept.find({ 'user_data.rollno': +rollno });
        console.log('ssssss')
        console.log(slots)

        // If no slots found, return a message
        if (slots.length === 0) {
            return res.status(404).json({ message: 'No slots found for this roll number.' });
        }

        // Send the filtered data back to the client
        res.status(200).json(slots);
    } catch (err) {
        console.error('Error fetching slot data:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


app.post('/changestatus', async (req, res) => {
    try {
        const { id, changestatus } = req.body; // Destructure _id and changestatus from request body
        console.log(id, changestatus); // Log the received data

        // Find the document by _id and update the status field
        const updatedRequest = await Accept.findByIdAndUpdate(
            id,
            { status: changestatus }, // Update the status field
            { new: true } // Return the updated document
        );

        if (updatedRequest) {
            res.status(200).json({ message: 'Status updated successfully', updatedRequest });
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


const PORT = process.env.PORT || 3001;

app.listen(3001, (err) => {
    if (err) {
        console.error('Failed to start server:', err);
    } else {
        console.log(`Server running on port ${PORT}`);
    }
});