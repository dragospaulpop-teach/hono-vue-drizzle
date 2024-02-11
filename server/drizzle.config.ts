import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './db/schema/todos.ts',
  out: './drizzle',
  driver: 'better-sqlite',
} satisfies Config;