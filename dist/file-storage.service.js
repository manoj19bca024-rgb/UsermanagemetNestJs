"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const stream_1 = require("stream");
const util_1 = require("util");
const streamPipeline = (0, util_1.promisify)(stream_1.pipeline);
let FileStorageService = class FileStorageService {
    uploadDir = (0, path_1.join)(process.cwd(), 'uploads', 'profiles');
    async saveFile(file) {
        this.ensureUploadDir();
        const originalName = this.getOriginalName(file);
        const filename = this.buildFilename(originalName);
        const filePath = (0, path_1.join)(this.uploadDir, filename);
        if ('buffer' in file && file.buffer) {
            await fs_1.promises.writeFile(filePath, file.buffer);
            return filePath;
        }
        if ('createReadStream' in file && typeof file.createReadStream === 'function') {
            const readStream = file.createReadStream();
            const writeStream = (0, fs_1.createWriteStream)(filePath);
            await streamPipeline(readStream, writeStream);
            return filePath;
        }
        throw new common_1.BadRequestException('Unsupported upload object');
    }
    async deleteFile(filePath) {
        try {
            if ((0, fs_1.existsSync)(filePath)) {
                await fs_1.promises.unlink(filePath);
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to delete file');
        }
    }
    ensureUploadDir() {
        if (!(0, fs_1.existsSync)(this.uploadDir)) {
            (0, fs_1.mkdirSync)(this.uploadDir, { recursive: true });
        }
    }
    buildFilename(originalName) {
        const safeName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
        return `${Date.now()}-${safeName}`;
    }
    getOriginalName(file) {
        if ('originalname' in file && file.originalname) {
            return file.originalname;
        }
        return file.filename;
    }
};
exports.FileStorageService = FileStorageService;
exports.FileStorageService = FileStorageService = __decorate([
    (0, common_1.Injectable)()
], FileStorageService);
//# sourceMappingURL=file-storage.service.js.map