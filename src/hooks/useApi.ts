export const useApi = {
  login: async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }

      const data = await response.json();

      return data.user;
    } catch (error: any) {
      throw {
        message: error.message || "Erro inesperado.",
        fieldErrors: error.error || null,
      };
    }
  },
  register: async (username: string, email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3001/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }

      const data = await response.json();

      return data.user;
    } catch (error: any) {
      throw {
        message: error.message || "Erro inesperado.",
        fieldErrors: error.error || null,
      };
    }
  },

  createList: async (name: string, userId: number, icon: string) => {
    try {
      const response = await fetch("http://localhost:3001/list/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          userId,
          icon,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }

      const data = await response.json();

      return data.listId;
    } catch (error: any) {
      throw {
        message: error.message || "Erro inesperado.",
        fieldErrors: error.error || null,
      };
    }
  },

  getAllLists: async (userId: number) => {
    try {
      const response = await fetch("http://localhost:3001/list/all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }

      const data = await response.json();

      return data.lists;
    } catch (error: any) {
      throw {
        message: error.message || "Erro inesperado.",
        fieldErrors: error.error || null,
      };
    }
  },

  getFavoritesLists: async (userId: number) => {
    try {
      const response = await fetch("http://localhost:3001/list/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }

      const data = await response.json();

      return data.lists;
    } catch (error: any) {
      throw {
        message: error.message || "Erro inesperado.",
        fieldErrors: error.error || null,
      };
    }
  },

  // LABELS
  getAllLabels: async (userId: number) => {
    try {
      const response = await fetch("http://localhost:3001/label/all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }

      const data = await response.json();

      return data.labels;
    } catch (error: any) {
      throw {
        message: error.message || "Erro inesperado.",
        fieldErrors: error.error || null,
      };
    }
  },

  createLabel: async (name: string, userId: number) => {
    try {
      const response = await fetch("http://localhost:3001/label/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          userId,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }

      const data = await response.json();

      return data.createdLabel;
    } catch (error: any) {
      throw {
        message: error.message || "Erro inesperado.",
        fieldErrors: error.error || null,
      };
    }
  },
};
