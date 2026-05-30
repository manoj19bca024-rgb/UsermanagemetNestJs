"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const graphqlUploadExpress_mjs_1 = __importDefault(require("graphql-upload/graphqlUploadExpress.mjs"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    app.use((0, graphqlUploadExpress_mjs_1.default)({ maxFileSize: 10000000, maxFiles: 1 }));
    const port = process.env.PORT ?? 3000;
    await app.listen(port, '0.0.0.0');
    console.log(`Server is running on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map