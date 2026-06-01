interface GraphQLUpload {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => NodeJS.ReadableStream;
}
export type UploadFile = Express.Multer.File | GraphQLUpload;
export declare class FileStorageService {
    private readonly uploadDir;
    saveFile(file: UploadFile): Promise<string>;
    deleteFile(filePath: string): Promise<void>;
    private ensureUploadDir;
    private buildFilename;
    private getOriginalName;
}
export {};
