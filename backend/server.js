const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allow all origins for now to simplify deployment testing
app.use(express.json());

// MongoDB Connection
const MONGO_URI = "mongodb+srv://vehicleAdmin:Vinay2005@cluster0.rlouqve.mongodb.net/smartcampus?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log('Backend connected to MongoDB (smartcampus)'))
    .catch(err => console.error('MongoDB connection error:', err));


// --- Schemas & Models ---

// Attendance Schema
const attendanceSchema = new mongoose.Schema({
    total: { type: Number, default: 40 },
    attended: { type: Number, default: 32 }
});
const Attendance = mongoose.model('Attendance', attendanceSchema);

// Booking Schema
const bookingSchema = new mongoose.Schema({
    room: String,
    date: String,
    time: String
}, { timestamps: true });

bookingSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});
const Booking = mongoose.model('Booking', bookingSchema);

// Complaint Schema
const complaintSchema = new mongoose.Schema({
    category: String,
    desc: String
}, { timestamps: true });

complaintSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});
const Complaint = mongoose.model('Complaint', complaintSchema);

// Notice Schema
const noticeSchema = new mongoose.Schema({
    title: String,
    date: String,
    desc: String
}, { timestamps: true });

noticeSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});
const Notice = mongoose.model('Notice', noticeSchema);

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'Student' } // e.g., 'Student', 'Admin'
}, { timestamps: true });

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});
const User = mongoose.model('User', userSchema, 'users'); // Explicitly use 'users' collection


// --- Routes ---

// User Routes
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/users', async (req, res) => { // Signup or Create User
    try {
        const user = new User(req.body);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Attendance Routes
async function getAttendanceRecord() {
    let record = await Attendance.findOne();
    if (!record) {
        record = await Attendance.create({ total: 40, attended: 32 });
    }
    return record;
}

app.get('/api/attendance', async (req, res) => {
    try {
        const record = await getAttendanceRecord();
        res.json({ total: record.total, attended: record.attended });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/attendance', async (req, res) => {
    try {
        const record = await getAttendanceRecord();
        if (req.body.total !== undefined) record.total = req.body.total;
        if (req.body.attended !== undefined) record.attended = req.body.attended;
        await record.save();
        res.json({ total: record.total, attended: record.attended });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Booking Routes
app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/bookings', async (req, res) => {
    try {
        const item = new Booking(req.body);
        await item.save();
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/bookings/:id', async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Complaint Routes
app.get('/api/complaints', async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/complaints', async (req, res) => {
    try {
        const item = new Complaint(req.body);
        await item.save();
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/complaints/:id', async (req, res) => {
    try {
        await Complaint.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Notice Routes
app.get('/api/notices', async (req, res) => {
    try {
        const notices = await Notice.find();
        res.json(notices);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/notices', async (req, res) => {
    try {
        const notice = new Notice(req.body);
        await notice.save();
        res.json(notice);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/notices/:id', async (req, res) => {
    try {
        await Notice.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
