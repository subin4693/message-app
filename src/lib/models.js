import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,

            default: "/profile.jpg",
        },
        password: {
            type: String,
            required: true,
        },
        chats: [{ type: Schema.Types.ObjectId }],
    },
    { timestamps: true },
);
const User = models.User || model("User", UserSchema);

const ChatSchema = new Schema({
    isgroup: {
        type: Boolean,
        default: false,
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    latestmsg: {
        type: Schema.Types.ObjectId,
        ref: "Message",
    },
    groupname: String,
    groupIcon: {
        type: String,
        default: "/profile.jpg",
    },
});
const Chat = models.Chat || model("Chat", ChatSchema);

const MessageSchema = new Schema(
    {
        chatid: {
            type: Schema.Types.ObjectId,
            ref: Chat,
        },
        userid: {
            type: Schema.Types.ObjectId,
            ref: User,
        },

        message: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const Message = models.Message || model("Message", MessageSchema);

export { User, Chat, Message };
