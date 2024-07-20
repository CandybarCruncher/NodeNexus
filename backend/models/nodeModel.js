const mongoose = require('mongoose')

const nodeModel = mongoose.Schema(
    {
        chatName: { type: String, trim: true},
        isCluster:{ type: Boolean, default: false},
        users:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }],
        latestMessage: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"message",
        },
        clusterAdmin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            }
        },
        {
            timestamps:true
        }
);

const node = mongoose.model("node",nodeModel);

module.exports = node;