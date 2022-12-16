import { defineStore } from "pinia";
import axios from 'axios'

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        user: null,
        token: null,
        // Modal login across app
        isShowLoginForm: false,
        authorizedCallback: null
    }),
    actions: {
        async logout() {
            this.user = null
        },

        async login({ email, password }) {
            try {
                // Sign in here
                const res = await axios.post(`${serverUrl}/authenticate`, { email: email, password: password })
                this.user = res.data["user"]
                this.token = res.data["token"]

                if (typeof this.authorizedCallback === 'function') {
                    this.authorizedCallback?.(null, this.user)
                }
                return Promise.resolve("Success")
            } catch (error) {
                console.log(error);
                this.authorizedCallback?.(error, null)
                return Promise.reject(error)
            }
        },

        // Confirm email address
        async confirmSignUp(_, { username, code }) {
            try {
                return Promise.resolve()
            } catch (error) {
                return Promise.reject(error)
            }
        },

        async signup({ name, password, email }) {
            try {
                const res = await axios.post(`${serverUrl}/users`, { name: name, email: email, password: password })
                this.user = res.data["user"]

                await this.login({ email, password });

                return Promise.resolve("Success")
            } catch (error) {
                console.log(error);
                return Promise.reject(error)
            }
        },

        // Modal login
        showLoginForm(callback) {
            this.authorizedCallback = callback
            this.isShowLoginForm = true
        },
        hideLoginForm() {
            this.isShowLoginForm = false
        }
    },
    persist: true
});
