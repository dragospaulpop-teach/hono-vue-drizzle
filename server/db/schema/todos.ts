import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todos', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  date: text('date').default(sql`CURRENT_TIMESTAMP`),
  author: text('name').notNull(),
  completed: integer('completed', { mode: 'boolean' }).default(false),
});

export type Todo = typeof todos.$inferSelect;