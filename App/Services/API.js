import axios from "axios";

const baseURL = "http://85.215.34.177:1337/api";

const API_KEY =
  "1776f7fec3bdf35929e562d12127c24ea054aa4f197f9011bfe4f2969e5af99bce05034ba9162c3613f1c54d24bfc241d4df5c76eeaac8c16d64a46e87521888de4f054b50341c711ba6f1c03fb77d2906ed952d4722aa57123ef9e47e26058a2695dfe06f77211db544dea10d286771762363f6f53af918f0d777c91e1639c2";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const API = {
  getCalendmy: () =>
    axiosInstance.get(
      `/calend-mies?populate[0]=events,shopping_lists,to_do&populate[1]=shopping_lists.list_items,to_do.todo_items`
        ),
    addEvent: (event) => axiosInstance.post(`/events`, event),
    deleteEvent: (id) => axiosInstance.delete(`/events/${id}`),
    updateEvent: (id, event) => axiosInstance.put(`/events/${id}`, event),
};

export default API;
