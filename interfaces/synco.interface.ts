export interface UploadOptions {
    fieldName: string;
    multiple?: boolean;
    mimeTypes?: string[];
    maxSizeMb?: number;
}

export interface ModuleMetadata {
    imports?: any[];
    controllers?: any[];
    providers?: any[];
    exports?: any[];
}