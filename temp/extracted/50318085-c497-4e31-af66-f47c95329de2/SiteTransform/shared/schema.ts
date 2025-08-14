import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const conversions = pgTable("conversions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'file' or 'url'
  sourceUrl: text("source_url"),
  originalFiles: jsonb("original_files"), // Store file metadata
  status: text("status").notNull().default("pending"), // pending, processing, completed, failed
  progress: integer("progress").default(0), // 0-100
  errorMessage: text("error_message"),
  downloadUrl: text("download_url"),
  previewData: jsonb("preview_data"), // Store preview HTML/CSS
  createdAt: timestamp("created_at").default(sql`now()`),
  completedAt: timestamp("completed_at"),
});

export const uploadedFiles = pgTable("uploaded_files", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  conversionId: varchar("conversion_id").references(() => conversions.id),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  mimetype: text("mimetype").notNull(),
  size: integer("size").notNull(),
  path: text("path").notNull(),
  uploadedAt: timestamp("uploaded_at").default(sql`now()`),
});

export const insertConversionSchema = createInsertSchema(conversions).pick({
  name: true,
  type: true,
  sourceUrl: true,
});

export const insertFileSchema = createInsertSchema(uploadedFiles).pick({
  conversionId: true,
  filename: true,
  originalName: true,
  mimetype: true,
  size: true,
  path: true,
});

export type InsertConversion = z.infer<typeof insertConversionSchema>;
export type Conversion = typeof conversions.$inferSelect;
export type InsertFile = z.infer<typeof insertFileSchema>;
export type UploadedFile = typeof uploadedFiles.$inferSelect;
