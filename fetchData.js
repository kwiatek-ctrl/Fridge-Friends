import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://fridge-friends-be.onrender.com',
  timeout: 10000,
});

export function fetchUsers() {
  return apiClient
    .get('/users')
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function fetchUserByUsername(username) {
  return apiClient
    .get(`/users/${username}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function fetchUserPantry(username, location, category) {
  return apiClient
    .get(`/users/${username}/pantry`, {
      params: {
        location: location,
        category: category,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function fetchSingleItem(username, itemID) {
  return apiClient
    .get(`users/${username}/pantry/${itemID}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function addUser(user) {
  return apiClient
    .post('/users', {
      username: user.username,
      name: user.name,
      emailAddress: user.emailAddress,
      profilePicURL: user.profilePicURL,
      householdID: user.householdID,
      allergies: user.allergies,
      dietaryRequirements: user.dietaryRequirements,
    })
    .then((response) => {
     
      
      return response.data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function addItemToPantry(username, item) {
  return apiClient
    .post(`/users/${username}/pantry`, {
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      location: item.location,
      category: item.category,
      expiryDate: item.expiryDate,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function patchItemInPantry(username, itemID, item) {
  return apiClient
    .patch(`/users/${username}/pantry/${itemID}`, {
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      location: item.location,
      expiryDate: item.expiryDate,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function patchUser(username, user) {
  return apiClient.patch(`/users/${username}`, {
    username: user.username,
    name: user.name,
    emailAddress: user.emailAddress,
    allergies: user.allergies,
    dietaryRequirements: user.dietaryRequirements,
  });
}

export function deleteItemFromPantry(username, itemID) {
  return apiClient.delete(`users/${username}/pantry/${itemID}`).catch((err) => {
    return Promise.reject(err);
  });
}
