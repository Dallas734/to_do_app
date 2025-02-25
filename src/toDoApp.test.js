import { render, screen, fireEvent } from "@testing-library/react";
import TodoApp from "./toDoApp";
import userEvent from "@testing-library/user-event";

describe("TodoApp", () => {
  test("добавление задачи", () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText("Введите задачу...");
    const addButton = screen.getByText("Добавить");
    
    userEvent.type(input, "Новая задача");
    fireEvent.click(addButton);
    
    expect(screen.getByText("Новая задача")).toBeInTheDocument();
  });

  test("переключение состояния задачи", () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText("Введите задачу...");
    const addButton = screen.getByText("Добавить");
    
    userEvent.type(input, "Завершить тест");
    fireEvent.click(addButton);
    const taskItem = screen.getByText("Завершить тест");
    
    fireEvent.click(taskItem);
    expect(taskItem).toHaveStyle("text-decoration: line-through");
  });

  test("удаление задачи", () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText("Введите задачу...");
    const addButton = screen.getByText("Добавить");
    
    userEvent.type(input, "Удалить задачу");
    fireEvent.click(addButton);
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    
    fireEvent.click(deleteButton);
    expect(screen.queryByText("Удалить задачу")).not.toBeInTheDocument();
  });

  test("фильтрация задач", () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText("Введите задачу...");
    const addButton = screen.getByText("Добавить");
    
    userEvent.type(input, "Первая задача");
    fireEvent.click(addButton);
    userEvent.type(input, "Вторая задача");
    fireEvent.click(addButton);
    
    const firstTask = screen.getByText("Первая задача");
    fireEvent.click(firstTask);
    
    const completedFilter = screen.getByText("Выполненные");
    fireEvent.click(completedFilter);
    expect(screen.getByText("Первая задача")).toBeInTheDocument();
    expect(screen.queryByText("Вторая задача")).not.toBeInTheDocument();
  });

  test("очистка выполненных задач", async () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText("Введите задачу...");
    const addButton = screen.getByText("Добавить");
  
    userEvent.type(input, "Очистить меня");
    fireEvent.click(addButton);
  
    // Дождаться, пока задача появится в DOM
    const taskItem = await screen.findByText("Очистить меня");
  
    // Отметить задачу как выполненную
    fireEvent.click(taskItem);
  
    // Очистить выполненные задачи
    fireEvent.click(screen.getByText("Очистить выполненные задачи"));
  
    // Проверить, что задача удалена
    expect(screen.queryByText("Очистить меня")).not.toBeInTheDocument();
  });  
});