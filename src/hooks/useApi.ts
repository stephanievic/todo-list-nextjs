export const useApi = {
  login: async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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
        credentials: "include",
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

  userLogged: async () => {
    try {
      const response = await fetch("http://localhost:3001/user/logged", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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

  logout: async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }
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
        credentials: "include",
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

  getList: async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/list/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }

      const data = await response.json();

      return data.list;
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
        credentials: "include",
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
        credentials: "include",
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

  editListName: async (id: number, name: string) => {
    try {
      const response = await fetch(`http://localhost:3001/list/${id}/name`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }
    } catch (error: any) {
      throw {
        message: error.message || "Erro inesperado.",
        fieldErrors: error.error || null,
      };
    }
  },

  updateFavorite: async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/list/${id}/favorite`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }
    } catch (error: any) {
      throw {
        message: error.message || "Erro inesperado.",
        fieldErrors: error.error || null,
      };
    }
  },

  updateIcon: async (id: number, icon: string) => {
    try {
      const response = await fetch(`http://localhost:3001/list/${id}/icon`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          icon,
        })
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }
    } catch (error: any) {
      throw {
        message: error.message || "Erro inesperado.",
        fieldErrors: error.error || null,
      };
    }
  },

  updateLabels: async (id: number, labels: { id: number, name: string }[] | undefined) => {
    try {
      const response = await fetch(`http://localhost:3001/list/${id}/labels`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          labels,
        })
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }
    } catch (error: any) {
      throw {
        message: error.message || "Erro inesperado.",
        fieldErrors: error.error || null,
      };
    }
  },

  deleteList: async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/list/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }
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
        credentials: "include",
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
        credentials: "include",
        body: JSON.stringify({
          name,
          userId,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }

      const data = await response.json()
      return data.createdLabel
    } catch (error: any) {
      throw {
        message: error.message || "Erro inesperado.",
        fieldErrors: error.error || null,
      };
    }
  },

  editLabelName: async (id: number, name: string) => {
    try {
      const response = await fetch(`http://localhost:3001/label/${id}/name`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id,
          name
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }
    } catch (error: any) {
      throw {
        message: error.message || "Erro inesperado.",
        fieldErrors: error.error || null,
      };
    }
  },

  deleteLabel: async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/label/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }
    } catch (error: any) {
      throw {
        message: error.message || "Erro inesperado.",
        fieldErrors: error.error || null,
      };
    }
  },

  // TASK
  createTask: async (listId: number, name: string, dateToComplete: Date | undefined, priority: number | null) => {
    try {
      const response = await fetch(`http://localhost:3001/task/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          listId,
          name,
          dateToComplete,
          priority
        })
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }

      const data = await response.json()

      return data.task
    } catch (error: any) {
      throw {
        message: error.message || "Erro inesperado.",
        fieldErrors: error.error || null,
      };
    }
  },

  toggleChecked: async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/task/${id}/isChecked`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }
    } catch (error: any) {
      throw {
        message: error.message || "Erro inesperado.",
        fieldErrors: error.error || null,
      };
    }
  },

  editPriorityTask: async (id: number, priority: number) => {
    try {
      const response = await fetch(`http://localhost:3001/task/${id}/priority`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          priority
        })
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }
    } catch (error: any) {
      throw {
        message: error.message || "Erro inesperado.",
        fieldErrors: error.error || null,
      };
    }
  },

  editDateToComplete: async (id: number, date: Date | undefined) => {
    try {
      const response = await fetch(`http://localhost:3001/task/${id}/date`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          date
        })
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }
    } catch (error: any) {
      throw {
        message: error.message || "Erro inesperado.",
        fieldErrors: error.error || null,
      };
    }
  },

  deleteTask: async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/task/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }
    } catch (error: any) {
      throw {
        message: error.message || "Erro inesperado.",
        fieldErrors: error.error || null,
      };
    }
  }
};
