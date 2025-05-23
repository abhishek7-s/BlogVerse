"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("../models/user.model");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signin(data) {
        let user = await this.userModel.findOne({ where: { email: data.email } });
        if (user && user.password == data.password) {
            const payload = { id: user.userId, name: user.name, email: user.email };
            return {
                token: await this.jwtService.signAsync(payload)
            };
        }
        else {
            throw new common_1.BadRequestException("Invalid User");
        }
    }
    async signup(data) {
        const emailExist = await this.userModel.findOne({ where: { email: data.email } });
        if (emailExist) {
            throw new common_1.BadRequestException("Email Already Exists");
        }
        const user = await this.userModel.create({
            name: data.name,
            email: data.email,
            password: data.password
        });
        const payload = { id: user.userId, name: user.name, email: user.email };
        return {
            token: await this.jwtService.signAsync(payload)
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map