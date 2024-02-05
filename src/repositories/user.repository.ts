import { UserEntity } from "../utils/types";
import fs from "fs/promises";

const dataFilePath = "src/data/users.json";

export const getAllUsers = async (): Promise<UserEntity[]> => {
  try {
    const data = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(data) || [];
  } catch (error) {
    console.error("Error reading users data:", error);
    return [];
  }
};

export const getUserById = async (
  userId: string
): Promise<UserEntity | undefined> => {
  const users = await getAllUsers();
  const user = users.find((user: UserEntity) => user.id === userId);
  return user;
};
