const express = require('express');
const cors = require('cors');
const listing = require('./data/listing.json');

const app = express();
app.use(cors());
app.use(express.json());

// GET /api/listing/:id -> returns the mock listing (id is ignored, single demo listing)
app.get('/api/listing/:id', (req, res) => {
  res.json(listing);
});

// GET /api/listing -> default listing
app.get('/api/listing', (req, res) => {
  res.json(listing);
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`));
