import { useState } from "react";
import { Input, Button, List, Card, Radio } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { TaskType } from "./TaskType";

export default function TodoApp() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleTask = (index: number) => {
    setTasks(tasks.map((t, i) => i === index ? { ...t, completed: !t.completed } : t));
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: "20px" }}>
      <Card title="Todo List" style={{ width: 400 }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <Input 
            value={task} 
            onChange={(e) => setTask(e.target.value)} 
            placeholder="Введите задачу..." 
          />
          <Button type="primary" onClick={addTask}>Добавить</Button>
        </div>
        <Radio.Group value={filter} onChange={(e) => setFilter(e.target.value)} style={{ marginBottom: "16px" }}>
          <Radio.Button value="all">Все</Radio.Button>
          <Radio.Button value="completed">Выполненные</Radio.Button>
          <Radio.Button value="pending">Невыполненные</Radio.Button>
        </Radio.Group>
        <List
          bordered
          dataSource={filteredTasks}
          renderItem={(t, i) => (
            <List.Item 
              actions={[
                <Button type="text" icon={<DeleteOutlined />} onClick={() => removeTask(i)} />
              ]}
              onClick={() => toggleTask(i)}
              style={{ textDecoration: t.completed ? "line-through" : "none", cursor: "pointer" }}
            >
              {t.text}
            </List.Item>
          )}
        />
        <Button type="default" onClick={clearCompleted} style={{ marginTop: "16px", width: "100%" }}>
          Очистить выполненные задачи
        </Button>
      </Card>
    </div>
  );
}
