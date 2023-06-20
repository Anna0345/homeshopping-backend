import express from "express";
import authRoutes from "./routes/authRoutes";
import addressRoutes from "./routes/addressRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import productRoutes from "./routes/productRoutes";
import shoppingCartRoutes from "./routes/shoppingCartRoutes";
import orderRoutes from "./routes/orderRoutes";
import cors from "cors";
import { sessionMiddleware } from "./middlewares/sessionMid";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(sessionMiddleware);
app.use("/auth", authRoutes);
app.use("/addresses", addressRoutes);
app.use("/payments", paymentRoutes);
app.use("/products", productRoutes);
app.use("/cart", shoppingCartRoutes);
app.use("/order", orderRoutes);

app.listen(3000, () => {
  console.log("Server started on url http://localhost:3000");
});
