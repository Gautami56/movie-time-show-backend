"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveSubscriptionController = void 0;
const http2_1 = require("http2");
const SubscriptionService_1 = require("../../services/SubscriptionService");
const { HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_OK, } = http2_1.constants;
function saveSubscriptionController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('req bodyyyyyy', req.body);
            if (req.body && !req.body) {
                return res
                    .status(HTTP_STATUS_BAD_REQUEST)
                    .json({ message: "Field value is not allowed to be null" });
            }
            const reqBody = {
                endpoint: req.body.subscription.endpoint,
                userUniqueId: req.body.userUniqueId,
                authKey: req.body.subscription.keys.auth,
                publicKey: req.body.subscription.keys.p256dh
            };
            const result = yield (0, SubscriptionService_1.saveSubscriptionService)(reqBody);
            res.status(HTTP_STATUS_OK).send(result);
        }
        catch (error) {
            console.error("Unable to create the user - Controller", error);
            return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
                message: "Unable to create the user",
            });
        }
    });
}
exports.saveSubscriptionController = saveSubscriptionController;
