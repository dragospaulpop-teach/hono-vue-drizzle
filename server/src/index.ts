import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import { eq } from 'drizzle-orm'
import { todos, Todo } from '../db/schema/todos'

const app = new Hono()

const sqlite = new Database('database.db')
const db = drizzle(sqlite)

app.use('*', cors())
// read all todos
app.get('/', (c) => {
  const allTodos = db.select().from(todos).all()
  return c.json(allTodos)
})

// create new todo
app.post('/', async (c) => {
  const todo = await c.req.json()
  await db.insert(todos).values({ ...todo })
  return c.json({ ok: true })
})

// patch existing todo
app.patch('/:id', async (c) => {
  const id = +c.req.param('id')
  const updatedTodo = await c.req.json()

  await db.update(todos)
    .set({ ...updatedTodo })
    .where(eq(todos.id, id))

  return c.json({ ok: true })
})

// delete existing todo
app.delete('/:id', async (c) => {
  const id = +c.req.param('id')
  await db.delete(todos).where(eq(todos.id, id))

  return c.json({ ok: true })
})

const port = 3000
console.log(`Server is running on port ${port}: http://localhost:3000/`)

serve({
  fetch: app.fetch,
  port
})
