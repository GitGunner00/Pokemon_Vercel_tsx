import express from "express"
import { registerRoutes } from "./routes"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static("dist/client"))

async function startServer() {
  try {
    const server = await registerRoutes(app)

    server.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()
