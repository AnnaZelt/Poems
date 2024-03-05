import { access } from "fs";
import User from "../features/users/userSlice";
import { Token } from "../types/token";

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
  

  async logout(refreshToken: Token) {
    const response = await fetch(`${API_BASE_URL}token/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken.refresh }),
    });
    return await response.json();
  },

  async getInputs(token: Token) {
    const response = await fetch(`${API_BASE_URL}input_list/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access}`,
      },
    });
    return await response.json();
  },

  async getInputDetail(token: Token, inputId: number) {
    const response = await fetch(`${API_BASE_URL}input/${inputId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access}`,
      },
    });
    return await response.json();
  },

  async getGeneratedPoems(token: Token) {
    const response = await fetch(`${API_BASE_URL}generated_poem_list/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access}`,
      },
    });
    return await response.json();
  },

  async getPoemDetail(token: Token, poemId: number) {
    const response = await fetch(`${API_BASE_URL}generated_poem/${poemId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access}`,
      },
    });
    return await response.json();
  },


  async createPoem(inputText: string, poetStyle: string, userId: number, token: Token) {
    console.log('api token: ', token.access);
    
    try {
        const response = await fetch(`${API_BASE_URL}generate_poem/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.access}`,
            },
            body: JSON.stringify({ input_text: inputText, poet_style: poetStyle, user: userId }),
        });
        console.log(JSON.stringify({ input_text: inputText, poet_style: poetStyle, user: userId }));
        
        if (!response.ok) {
            throw new Error(`Failed to create poem: ${response.status} - ${response.statusText}`);
        }
        const responseData = await response.json();
        console.log('api: ', responseData);
        // Wait for the response data
        return responseData; // Return the response data
    } catch (error) {
        console.error('Failed to create poem:', error);
        throw error; // Rethrow the error to be caught by the calling code
    }
  },
  

  

  async getUsers(token: Token) {
    const response = await fetch(`${API_BASE_URL}user_list/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access}`,
      },
    });
    return await response.json();
  },

  async getUserDetail(token: Token, userId: number) {
    const response = await fetch(`${API_BASE_URL}user/${userId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access}`,
      },
    });
    return await response.json();
  },

  async updateUser(token: Token, userId: number, userData: Partial<typeof User>) {
    const response = await fetch(`${API_BASE_URL}user/${userId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access}`,
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  },
  
  async deleteUser(token: Token, userId: number) {
    const response = await fetch(`${API_BASE_URL}user/${userId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access}`,
      },
    });
    return await response.json();
  },
  
  // Add other API calls as needed
};
