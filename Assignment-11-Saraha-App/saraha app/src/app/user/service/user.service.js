import * as UserRepository from "../repository/user.repository.js";
import { AppError } from "../../../pkg/error/error.js";
import { message } from "../../message/model/message.model.js";

export async function reqUserIdentity(messageId) {
    const msg = await UserRepository.findMessage(messageId);
    if (!msg) throw new AppError('Message does not exist', 404);

    const request = await UserRepository.createRequest({
        messageId: msg._id,
        senderOfReq: msg.receiver,
        receiverOfReq: msg.sender,
        status: 'pending',
    });
    return request;
}

export async function GetAllReq(reciverId) {
    const allareq = await UserRepository.getAllReq(reciverId);
    if (!allareq) throw new AppError('no req', 404);
    return allareq;
}

export async function RespondToIdentityRequest(id_Req, status) {
    const reqidentity = await UserRepository.RespondToIdentityRequest(id_Req, status);
    if (!reqidentity) throw new AppError('No req', 404);
    return reqidentity;
}

export async function sendMessageInConversation(conversationId, content, senderId) {
    const conversation = await UserRepository.getConversation(conversationId);
    if (!conversation) throw new AppError('Conversation not found', 404);

    const isMember =
        conversation.sender.toString() === senderId ||
        conversation.receiver.toString() === senderId;
    if (!isMember) throw new AppError('You are not part of this conversation', 403);

    const created = await message.create({ content, sender: senderId, receiver: conversationId });
    return await UserRepository.sendMessageInConversation(conversationId, created._id, senderId);
}

export async function getConversation(conversationId, userId) {
    const conversation = await UserRepository.getConversation(conversationId);
    if (!conversation) throw new AppError('Conversation not found', 404);

    const isMember =
        conversation.sender.toString() === userId ||
        conversation.receiver.toString() === userId;
    if (!isMember) throw new AppError('You are not part of this conversation', 403);

    return conversation;
}
