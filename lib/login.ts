"use server";
import { cookies } from "next/headers";
import { getDatabase } from "./db";

async function login(name: string, password: string) {
  try {
    const db = await getDatabase();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ name, password });
    if (user) {
      cookies().set("id", user._id.toString());
      console.log("Usuário logado com sucesso:", user.name);
      return { success: true };
    } else {
      console.log("Usuário ou senha inválidos.");
      return { success: false, message: "Usuário ou senha inválidos." };
    }
  } catch (error) {
    console.error("login: Erro ao fazer login:", error);
    return { success: false, message: "Erro ao fazer login." };
  }
}

export default login;
