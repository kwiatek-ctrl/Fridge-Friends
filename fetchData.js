import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://fridge-friends-be.onrender.com',
  timeout: 30000,
});

const ai = axios.create({
  baseURL: 'https://fridge-friends-ai.onrender.com',
  timeout: 180000,
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
      householdID: user.householdID ? user.householdID : null,
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
  let camelCaseCategory = '';
  const lowercase = item.category.toLowerCase();
  camelCaseCategory += lowercase
    .split(', ')
    .reduce((s, c) => s + (c.charAt(0).toUpperCase() + c.slice(1)));
  return apiClient
    .post(`/users/${username}/pantry`, {
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      location: item.location,
      category: camelCaseCategory,
      expiryDate: item.expiryDate,
    })
    .then((response) => response.data)
    .catch((err) => Promise.reject(err));
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

export function getRecipes(input) {
  return ai
    .post('/api/generate-recipe', {
      ingredients: input.ingredients,
      allergies: input.allergies.length > 0 ? input.allergies : null,
      dietaryRequirements: input.dietaryRequirements.length > 0 ? input.dietaryRequirements : null,
      cookTime: input.cookingTime,
      onlyInventory: input.onlyInventory
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function resetPassword(email){
  return apiClient
    .post('/users/reset-password', {
      emailAddress: email,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}
