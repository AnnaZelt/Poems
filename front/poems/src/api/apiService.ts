import User from "../features/users/userSlice";

// front/poems/src/app/apiService.ts
export const API_BASE_URL = 'http://127.0.0.1:8000/api/';

export const apiService = {
  async login(username: string, password: string) {
    const response = await fetch(`${API_BASE_URL}token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    const responseData = await response.json();
    return responseData // Return the 'access' token
  },
  

  async logout(refreshToken: string) {
    const response = await fetch(`${API_BASE_URL}token/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    return await response.json();
  },

  async getInputs(token: string) {
    const response = await fetch(`${API_BASE_URL}input_list/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },

  async getInputDetail(token: string, inputId: number) {
    const response = await fetch(`${API_BASE_URL}input/${inputId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },

  async getGeneratedPoems(token: string) {
    const response = await fetch(`${API_BASE_URL}generated_poem_list/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },

  async getPoemDetail(token: string, poemId: number) {
    const response = await fetch(`${API_BASE_URL}generated_poem/${poemId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },

  async createPoem(inputText: string, poetStyle: string) {
    try {
      const response = await fetch(`${API_BASE_URL}generate_poem/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_text: inputText, poet_style: poetStyle }),
      });
      if (!response.ok) {
        throw new Error(`Failed to create poem: ${response.status} - ${response.statusText}`);
      }
      const responseData = await response.json(); // Wait for the response data
      return responseData; // Return the response data
    } catch (error) {
      console.error('Failed to create poem:', error);
      throw error; // Rethrow the error to be caught by the calling code
    }
  },

  async getUsers(token: string) {
    const response = await fetch(`${API_BASE_URL}user_list/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },

  async getUserDetail(token: string, userId: number) {
    const response = await fetch(`${API_BASE_URL}user/${userId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },

  async updateUser(token: string, userId: number, userData: Partial<typeof User>) {
    const response = await fetch(`${API_BASE_URL}user/${userId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  },
  
  async deleteUser(token: string, userId: number) {
    const response = await fetch(`${API_BASE_URL}user/${userId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },
  
  // Add other API calls as needed
};
