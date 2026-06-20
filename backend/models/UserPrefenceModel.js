const mongoose = require("../configuration/mongoose_config")

const UserPreferenceSchema = mongoose.Schema(
    {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    // Interest Scores
    categoryScores: {
        type: Map,
        of: Number,
        default: {}
    },

    // Search Behaviour
    topSearchKeywords: [{
        type: String
    }],

    // Spending Behaviour
    totalSpending: {
        type: Number,
        default: 0
    },

    totalOrders: {
        type: Number,
        default: 0
    },

    // Click Behaviour
    categoryClickCounts: {
        type: Map,
        of: Number,
        default: {}
    },

    // Cart Behaviour
    categoryCartCounts: {
        type: Map,
        of: Number,
        default: {}
    },

    // Purchase Behaviour
    categoryPurchaseCounts: {
        type: Map,
        of: Number,
        default: {}
    },

    // Time Behaviour
    totalTimeSpent: {
        type: Number, // seconds
        default: 0
    },

    categoryTimeSpent: {
        type: Map,
        of: Number, // seconds
        default: {}
    }

}, {
    timestamps: true
}
)

module.exports = mongoose.model('UserPreference' , UserPreferenceSchema)