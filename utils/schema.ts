import { timestamp } from 'drizzle-orm/pg-core';
import { integer, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: varchar("amount").notNull().default('0'),  // ✅ varchar
  icon: varchar("icon"),
  createdBy: varchar("createdBy").notNull()
});

export const Expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: varchar("amount").notNull().default('0'),  // ✅ varchar
  budgetId: integer("budgetId").references(() => Budgets.id),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull()          // ✅ fixed
});

