// front/poems/src/app/apiService.ts
export const API_BASE_URL = 'http://127.0.0.1:8000/api/';

export const apiService = {
  async login(username: string, password: string) {
    const response = await fetch(`${API_BASE_URL}api/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    return await response.json();
  },

  async logout(refreshToken: string) {
    const response = await fetch(`${API_BASE_URL}api/token/logout/`, {
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

  async createInput(token: string, inputText: string) {
    const response = await fetch(`${API_BASE_URL}create_input/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ input_text: inputText }),
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
    const response = await fetch(`${API_BASE_URL}generated-poem/${poemId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },

  async createPoem(inputText: string, poetStyle: string) {
    const response = await fetch(`${API_BASE_URL}generate_poem/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input_text: inputText, poet_style: poetStyle }),
    });
    return await response.json();
  },
  

  async getUser(token: string, userId: number) {
    const response = await fetch(`${API_BASE_URL}user/${userId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },
  
  // Add other API calls as needed
};
