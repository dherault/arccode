"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const resend_1 = require("resend");
const Recap_1 = __importDefault(require("../../../emails/Recap"));
const resend = new resend_1.Resend((_a = process.env.RESEND_API_KEY) !== null && _a !== void 0 ? _a : '_null_');
async function sendRecapEmail({ email, name, levelUpCount, keywordRegistry, levelUpKeywordRegistry, period = 'daily', }) {
    await resend.emails.send({
        from: 'David from Arccode <hi@arccode.dev>',
        to: email,
        subject: 'Level up!',
        react: (<Recap_1.default name={name} levelUpCount={levelUpCount} keywordRegistry={keywordRegistry} levelUpKeywordRegistry={levelUpKeywordRegistry} period={period}/>),
    });
}
exports.default = sendRecapEmail;
//# sourceMappingURL=recap.jsx.map