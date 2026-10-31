import { user } from '../model/user.model.js'
import { message } from "../../message/model/message.model.js";
import { RequestModel } from "../../../lib/db/requests.js";
import { Conversation } from "../../../lib/db/conservation.js";

export async function updateUser(email, updateData) {
    return await user.findOneAndUpdate(
        { email: email },
        updateData,
        { returnDocument: 'after' }
    )
}

export async function finduserbyid(id) {
    return user.findById(id);
}

export async function findMessage(messageId) {
    return await message.findOne({ _id: messageId });
}

export async function createRequest(data) {
    return await RequestModel.create(data);
}

export async function getAllReq(reciverId) {
    return await RequestModel.find({ receiverOfReq: reciverId })
}

export async function RespondToIdentityRequest(id_Req, status) {
    const req = await RequestModel.findOne({ _id: id_Req });

    const respond = await RequestModel.findOneAndUpdate(
        { _id: id_Req },
        { status: status },
        { returnDocument: 'after' }
    );

    if (status === "accept") {
        return await Conversation.create({
            sender: req.receiverOfReq,
            receiver: req.senderOfReq,
            message: [{
                msgID: req.messageId,
                sender: req.senderOfReq,
            }]
        });
    }

    return respond;
}

export async function sendMessageInConversation(conversationId, msgID, senderId) {
    return await Conversation.findOneAndUpdate(
        { _id: conversationId },
        { $push: { message: { msgID, sender: senderId } } },
        { returnDocument: 'after' }
    );
}

export async function getConversation(conversationId) {
    return await Conversation.findById(conversationId);
}
