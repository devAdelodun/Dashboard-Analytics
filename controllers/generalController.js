import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import OverallStat from "../models/OverallStat.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const getDashboardStats = async (req, res) => {
    try {
        // Hardcoded Entries.
        const currentMonth = "November";
        const currentYear = 2021;
        const currentDay = "2021-11-09";

        const transactions = await Transaction.find()
            .limit(50)
            .sort({ createdOn: -1 });

        // Overall Stat
        const overallStats = await OverallStat.findOne({ year: currentYear });

        const {
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
        } = overallStats;

        const thisMonthStat = monthlyData.find(({ month }) => month === currentMonth);

        const thisDayStat = monthlyData.find(({ date }) => date === currentDay);

        res.status(200).json({
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
            thisMonthStat,
            thisDayStat,
            transactions,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
