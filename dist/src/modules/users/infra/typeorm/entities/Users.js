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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var class_transformer_1 = require("class-transformer");
var upload_1 = __importDefault(require("@config/upload"));
/* KISS - Keep it Simple & Stupid --- matenha simples e estúpido
 ** Esse principio diz que devemos sempre manter o codigo o mais simples e estúpido possível, para que
 ** qualquer pessoa consiga entender;
 */
var Users = /** @class */ (function () {
    function Users() {
    }
    Users.prototype.getAvartUrl = function () {
        if (!this.avatar) {
            return null;
        }
        switch (upload_1.default.driver) {
            case 'disk':
                return process.env.APP_API_URL + "/files/" + this.avatar;
            case 's3':
                return "https://" + upload_1.default.configs.s3.bucket + ".s3.amazonaws.com/" + this.avatar;
            default:
                return null;
        }
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Users.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Users.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Users.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        class_transformer_1.Exclude(),
        __metadata("design:type", String)
    ], Users.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Users.prototype, "avatar", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Users.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Users.prototype, "updated_at", void 0);
    __decorate([
        class_transformer_1.Expose({ name: 'avatar_url' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Object)
    ], Users.prototype, "getAvartUrl", null);
    Users = __decorate([
        typeorm_1.Entity('users')
    ], Users);
    return Users;
}());
exports.default = Users;
