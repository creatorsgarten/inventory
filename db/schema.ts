import { uuid, text, timestamp, jsonb, pgSchema } from "drizzle-orm/pg-core";

const schema = pgSchema("inventorygarten");

export const items = schema.table("items", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const labels = schema.table("labels", {
  id: text("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const labelAttachments = schema.table("label_attachments", {
  id: uuid("id").defaultRandom().primaryKey(),
  itemId: uuid("item_id")
    .references(() => items.id)
    .notNull(),
  labelId: text("label_id")
    .references(() => labels.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const activityLog = schema.table("activity_log", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull(),
  activityType: text("activity_type").notNull(),
  activityPayload: jsonb("activity_payload"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const nfcTags = schema.table("nfc_tags", {
  id: text("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
