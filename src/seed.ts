import Todo from "./models/Todo";

export const seedTodos = async () => {
  const count = await Todo.countDocuments();

  if (count === 0) {
    await Todo.insertMany([
      { title: "Shopping list", description: "Milk, Eggs, Bread", favorite: true, color: "#fff3cd" },
      { title: "Meeting notes", description: "Discuss project roadmap", favorite: true, color: "#d1ecf1" },
      { title: "Project ideas", description: "Launch new website", favorite: false, color: "#f8d7da" },
      { title: "Vacation plans", description: "Visit Rome in June", favorite: false, color: "#d4edda" },
    ]);
    console.log("✅ Seed inserida com sucesso!");
  } else {
    console.log("ℹ️ Seed já existente, não foi recriada.");
  }
};
