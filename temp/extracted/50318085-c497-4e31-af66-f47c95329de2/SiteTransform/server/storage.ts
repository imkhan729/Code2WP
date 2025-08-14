import { type Conversion, type InsertConversion, type UploadedFile, type InsertFile } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Conversions
  createConversion(conversion: InsertConversion): Promise<Conversion>;
  getConversion(id: string): Promise<Conversion | undefined>;
  getAllConversions(): Promise<Conversion[]>;
  updateConversion(id: string, updates: Partial<Conversion>): Promise<Conversion>;
  
  // Files
  createFile(file: InsertFile): Promise<UploadedFile>;
  getFilesByConversionId(conversionId: string): Promise<UploadedFile[]>;
  deleteFile(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private conversions: Map<string, Conversion>;
  private files: Map<string, UploadedFile>;

  constructor() {
    this.conversions = new Map();
    this.files = new Map();
  }

  async createConversion(insertConversion: InsertConversion): Promise<Conversion> {
    const id = randomUUID();
    const conversion: Conversion = {
      ...insertConversion,
      id,
      status: "pending",
      progress: 0,
      errorMessage: null,
      downloadUrl: null,
      originalFiles: null,
      previewData: null,
      createdAt: new Date(),
      completedAt: null,
    };
    this.conversions.set(id, conversion);
    return conversion;
  }

  async getConversion(id: string): Promise<Conversion | undefined> {
    return this.conversions.get(id);
  }

  async getAllConversions(): Promise<Conversion[]> {
    return Array.from(this.conversions.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async updateConversion(id: string, updates: Partial<Conversion>): Promise<Conversion> {
    const existing = this.conversions.get(id);
    if (!existing) {
      throw new Error(`Conversion with id ${id} not found`);
    }
    const updated = { ...existing, ...updates };
    this.conversions.set(id, updated);
    return updated;
  }

  async createFile(insertFile: InsertFile): Promise<UploadedFile> {
    const id = randomUUID();
    const file: UploadedFile = {
      ...insertFile,
      id,
      uploadedAt: new Date(),
    };
    this.files.set(id, file);
    return file;
  }

  async getFilesByConversionId(conversionId: string): Promise<UploadedFile[]> {
    return Array.from(this.files.values()).filter(file => file.conversionId === conversionId);
  }

  async deleteFile(id: string): Promise<void> {
    this.files.delete(id);
  }
}

export const storage = new MemStorage();
