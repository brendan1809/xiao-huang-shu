import create from "zustand"

type State = {
  user: {
    name: string
    email: string
    thumbnail: string
  }
}

// Create the user store
const useUserStore = create<State>((set) => ({
  user: null, // Initial user state

  // Action to set the user
  setUser: (newUser) => set({ user: newUser }),

  // Action to clear the user (logout)
  clearUser: () => set({ user: null }),
}))

export default useUserStore
