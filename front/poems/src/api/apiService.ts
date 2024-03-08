import User from "../features/users/userSlice";
import { Token } from "../types/token";

// front/poems/src/app/apiService.ts
export const API_BASE_URL = 'http://127.0.0.1:8000/api/';

export const apiService = {
  async register(username: string, password: string, email: string, token: Token | null) {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
  
      if (token) {
        headers['Authorization'] = `Bearer ${token.access}`;
      }
  
      const response = await fetch(`${API_BASE_URL}register/`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ username, password, email }),
      });
  
      if (!response.ok) {
        throw new Error('Registration failed');
      }
  
      const responseData = await response.json();
      return responseData.access; // Return the 'access' token
    } catch (error) {
      console.error('Failed to register:', error);
      throw error;
    }
  },
  
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
    await fetch(`${API_BASE_URL}token/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken.refresh }),
    });
  },

  // async getInputs(token: Token) {
  //   const response = await fetch(`${API_BASE_URL}input_list/`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token.access}`,
  //     },
  //   });
  //   return await response.json();
  // },

  // async getInputDetail(token: Token, inputId: number) {
  //   const response = await fetch(`${API_BASE_URL}input/${inputId}/`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token.access}`,
  //     },
  //   });
  //   return await response.json();
  // },

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

  async deletePoem(token: Token, poemId: number) {
    const response = await fetch(`${API_BASE_URL}generated_poem/${poemId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access}`,
      },
    });
    return await response.json();
  },

  async createPoem(inputText: string, poetStyle: string, userId: number | null, token: Token | null) {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token.access}`;
      }
  
      const response = await fetch(`${API_BASE_URL}generate_poem/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ input_text: inputText, poet_style: poetStyle, user: userId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create poem, api: ${response.status} - ${response.statusText}`);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  },

  // async getUsers(token: Token) {
  //   const response = await fetch(`${API_BASE_URL}user_list/`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token.access}`,
  //     },
  //   });
  //   return await response.json();
  // },

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
};
