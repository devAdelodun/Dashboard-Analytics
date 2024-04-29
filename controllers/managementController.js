import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getAdmin = async (req, res) => {
    try {
        const admins = await User.find({ role: "admin" }).select("-password");
        res.status(200).json(admins);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const getUserPerformance = async (req, res) => {
    try {
        const { id } = req.params;
        const userWithStats = await User.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "affiliatestats",
                    localField: "_id",
                    foreignField: "userId",
                    as: "affiliatestats",
                },
            },
            { $unwind: "$affiliatestats" },
        ]);

        if (userWithStats.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const affiliateStat = userWithStats[0].affiliatestats;

        const salesTransaction = await Transaction.find({
            _id: { $in: affiliateStat.affiliateSales },
        });

        res.status(200).json({ user: userWithStats[0], sales: salesTransaction });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
