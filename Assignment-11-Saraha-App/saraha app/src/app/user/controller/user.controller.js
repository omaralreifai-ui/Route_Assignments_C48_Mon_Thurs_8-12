import * as userservice from '../service/user.service.js'

export async function reqidentity(req, res, next) {
    try {
        const { messageId } = req.body;
        const reqidentity = await userservice.reqUserIdentity(messageId);
        return res.json({ message: 'req identity send successfully', success: true, data: reqidentity });
    } catch (err) {
        next(err);
    }
}

export async function getAllreq(req, res, next) {
    try {
        const { reciverId } = req.body;
        const getallreq = await userservice.GetAllReq(reciverId);
        return res.json({ message: 'req getallreq send successfully', data: getallreq, success: true });
    } catch (err) {
        next(err);
    }
}

export async function RespondToIdentityRequest(req, res, next) {
    try {
        const { idReq, status } = req.body;
        const AcceptorReject = await userservice.RespondToIdentityRequest(idReq, status);
        return res.json({ message: 'Identity request has been responded to successfully', success: true, data: AcceptorReject });
    } catch (err) {
        next(err);
    }
}

export async function sendMessageInConversation(req, res, next) {
    try {
        const { conversationId } = req.params;
        const { content } = req.body;
        const senderId = req.user.id;
        const result = await userservice.sendMessageInConversation(conversationId, content, senderId);
        return res.status(201).json({ message: 'message sent', success: true, data: result });
    } catch (err) {
        next(err);
    }
}

export async function getConversation(req, res, next) {
    try {
        const { conversationId } = req.params;
        const userId = req.user.id;
        const result = await userservice.getConversation(conversationId, userId);
        return res.json({ message: 'done', success: true, data: result });
    } catch (err) {
        next(err);
    }
}

