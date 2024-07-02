const mongoose = require("mongoose");
const {Schema} = require("mongoose");

// --| A user creates a new pool
const PoolSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, default: 0 },
  totalMembers: { type: Number, deafult: 0 },
  target: { type: Number, deafult: 0 },
  members: [{ type: mongoose.Schema.ObjectId, ref: "user" }],
  withdrawalDate: { type: Date },
  duration: { type: Number, required: true }
}, 
{
  timestamps: true
});

// --| A user joins a pool -- This would be an upsert operation of some sort if we don't merge it with the user schema
const UserPoolSchema = new Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
  pools: [{ type: mongoose.Schema.ObjectId, ref: "pool", required: true }]
},
{
  timestamps: true
});

const UserContributionSchema = new Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
  poolId: { type: mongoose.Schema.ObjectId, ref: "pool", required: true },
  amount: { type: Number, required: true },
},
{
  timestamps: true
});

const Pool = mongoose.model("pool", PoolSchema);
const UserPool = mongoose.model("userPool", UserPoolSchema);
const UserContribution = mongoose.model("userPool", UserContributionSchema);

module.exports = { Pool, UserPool, UserContribution };
