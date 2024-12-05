export const baseUrl = "http://localhost:3001";

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
};

const getItems = () => {
  return request(`${baseUrl}/items`);
};

const addItem = ({ name, imageUrl, weather }) => {
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
};

const deleteItem = (item, token) => {
  return request(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const addCardLike = (_id, token) => {
  return request(`${baseUrl}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

const removeCardLike = (_id, token) => {
  return request(`${baseUrl}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export { getItems, addItem, deleteItem, addCardLike, removeCardLike };
