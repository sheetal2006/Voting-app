// backend/routes/candidateRoutes.js
const express = require('express');
const router  = express.Router();

const User      = require('../models/user');
const Candidate = require('../models/candidate');
const { jwtAuthMiddleware } = require('../jwt');   // exports jwtAuthMiddleware, generateToken if needed

// ─────────────────────────────────────────────────────────────
// Helper: confirm the user making the request is an admin
// ─────────────────────────────────────────────────────────────
const checkAdminRole = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user?.role === 'admin';
  } catch {
    return false;
  }
};

// ─────────────────────────────────────────────────────────────
// 1️⃣  Add Candidate  (Admin Only)         POST /candidate
// ─────────────────────────────────────────────────────────────
router.post('/', jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.id)))
      return res.status(403).json({ message: 'User does not have admin role' });

    const newCandidate = new Candidate(req.body);
    const saved = await newCandidate.save();

    console.log('✅ Candidate added:', saved._id);
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ─────────────────────────────────────────────────────────────
// 2️⃣  Update Candidate  (Admin Only)      PUT /candidate/:candidateID
// ─────────────────────────────────────────────────────────────
router.put('/:candidateID', jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.id)))
      return res.status(403).json({ message: 'User does not have admin role' });

    const { candidateID } = req.params;
    const updated = await Candidate.findByIdAndUpdate(
      candidateID,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: 'Candidate not found' });

    console.log('🔄 Candidate updated:', candidateID);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ─────────────────────────────────────────────────────────────
// 3️⃣  Delete Candidate  (Admin Only)      DELETE /candidate/:candidateID
// ─────────────────────────────────────────────────────────────
router.delete('/:candidateID', jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.id)))
      return res.status(403).json({ message: 'User does not have admin role' });

    const removed = await Candidate.findByIdAndDelete(req.params.candidateID);
    if (!removed) return res.status(404).json({ error: 'Candidate not found' });

    console.log('🗑️  Candidate deleted:', removed._id);
    res.json(removed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ─────────────────────────────────────────────────────────────
// 4️⃣  Vote Count  (Public)                GET /candidate/vote/count
// ─────────────────────────────────────────────────────────────
router.get('/vote/count', async (_req, res) => {
  try {
    const list = await Candidate.find().sort({ voteCount: -1 });
    const standings = list.map(({ party, voteCount }) => ({
      party,
      count: voteCount,
    }));
    res.json(standings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ─────────────────────────────────────────────────────────────
// 5️⃣  Vote for a Candidate                POST /candidate/vote
//     Body: { "candidateId": "<MongoId>" }   (Auth required)
// ─────────────────────────────────────────────────────────────
router.post('/vote', jwtAuthMiddleware, async (req, res) => {
  const { candidateId } = req.body;
  const userId = req.user.id;

  try {
    // Validate candidate
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    // Validate user
    const user = await User.findById(userId);
    if (!user)        return res.status(404).json({ message: 'User not found' });
    if (user.role === 'admin')
      return res.status(403).json({ message: 'Admin cannot vote' });
    if (user.isVoted)
      return res.status(400).json({ message: 'You have already voted' });

    // Record vote
    candidate.votes.push({ user: userId });
    candidate.voteCount += 1;
    await candidate.save();

    user.isVoted = true;
    await user.save();

    console.log(`🗳️  User ${userId} voted for candidate ${candidateId}`);
    res.json({ message: 'Vote recorded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ─────────────────────────────────────────────────────────────
// 6️⃣  Get All Candidates  (Public)        GET /candidate
// ─────────────────────────────────────────────────────────────
router.get('/', async (_req, res) => {
  try {
    const candidates = await Candidate.find({}, 'name party _id');
    res.json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
