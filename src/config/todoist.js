import axios from "axios";

export async function createTask({ title, due, priority }) {
  if (!title) return;
  return axios.post("https://api.todoist.com/rest/v2/tasks",
    { content: title, due_date: due, priority },
    { headers: { Authorization: `Bearer ${process.env.TODOIST_TOKEN}` } }
  );
}
