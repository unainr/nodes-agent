// db/schema.ts
import { pgTable, text, integer, timestamp, boolean, pgEnum, decimal, uuid,jsonb } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const orderStatusEnum = pgEnum("order_status", ["pending", "confirmed", "shipped", "delivered", "cancelled"]);
export const paymentMethodEnum = pgEnum("payment_method", ["cod", "card"]);

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  unit: text("unit").notNull().default("pcs"),
  stock: integer("stock").notNull().default(0),
  imageUrl: text("image_url"),
  categoryId: uuid("category_id").references(() => categories.id),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkUserId: text("clerk_user_id").notNull(),
  status: orderStatusEnum("status").notNull().default("pending"),
  paymentMethod: paymentMethodEnum("payment_method").notNull().default("cod"),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id").references(() => orders.id).notNull(),
  productId: uuid("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
});

export const cartItems = pgTable("cart_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkUserId: text("clerk_user_id").notNull(),
  productId: uuid("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").notNull().default(1),
});



// ------------------------------------------- social accounts 
export const postStatusEnum = pgEnum("post_status", [
  "draft",
  "scheduled",
  "published",
  "failed",
]);

export const socialAccounts = pgTable("social_accounts", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  userId: text("user_id").notNull(), // Clerk userId
  zernioProfileId: text("zernio_profile_id").notNull(),
  zernioAccountId: text("zernio_account_id").notNull().unique(),
  platform: text("platform").notNull(), // twitter, linkedin, instagram, etc
  username: text("username"),
  avatarUrl: text("avatar_url"),
  isActive: boolean("is_active").notNull().default(true),
  connectedAt: timestamp("connected_at").notNull().defaultNow(),
});

export const posts = pgTable("posts", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  userId: text("user_id").notNull(),
  zernioPostId: text("zernio_post_id"),
  content: text("content").notNull(),
  mediaUrls: jsonb("media_urls").$type<string[]>().default([]),
  status: postStatusEnum("status").notNull().default("draft"),
  scheduledFor: timestamp("scheduled_for"),
  timezone: text("timezone").default("Asia/Karachi"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const postTargets = pgTable("post_targets", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  postId: text("post_id").notNull(),
  socialAccountId: text("social_account_id").notNull(),
  platform: text("platform").notNull(),
  publishStatus: postStatusEnum("publish_status").notNull().default("draft"),
  errorMessage: text("error_message"),
});