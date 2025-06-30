// Express server entry point to mount all API routers
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Use CommonJS require, and import routers only once per resource
const membersRouter = require('./api/members');
const blogRouter = require('./api/blog');
const eventsRouter = require('./api/events');
const contactRouter = require('./api/contact');
const loginRouter = require('./api/login');
// const membersIdRouter = require('./api/members/[id]'); // Removed
// const blogIdRouter = require('./api/blog/[id]');       // Removed
// const eventsIdRouter = require('./api/events/[id]');     // Removed

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Mount routers
app.use('/api/members', membersRouter);
// app.use('/api/members', membersIdRouter); // Removed
app.use('/api/blog', blogRouter);
// app.use('/api/blog', blogIdRouter);       // Removed
app.use('/api/events', eventsRouter);
// app.use('/api/events', eventsIdRouter);     // Removed
app.use('/api/contact', contactRouter);
app.use('/api/login', loginRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
