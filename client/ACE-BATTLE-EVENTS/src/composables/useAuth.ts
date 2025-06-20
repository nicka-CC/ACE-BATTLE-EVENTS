import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {API} from '@/constants/api.ts'
import {useUserStore} from '@/store/user';
export function useAuth() {
    const email = ref('');
    const password = ref('');
    const loginError = ref('');
    const router = useRouter();
    const userStore = useUserStore();


    const handleLogin = async () => {
        loginError.value = '';
        try {
            const response = await fetch(`${API}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.value, password: password.value }),
            });

            const data = await response.json();

            if (response.ok) {
                userStore.setUser(data.user);
                localStorage.setItem('userToken', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                router.push({ name: 'admin' });
            } else {
                loginError.value = data.message || 'Error authentication failed';
            }
        } catch (error) {
            loginError.value = 'Network error or error server';
        }
    };

    return {
        email,
        password,
        loginError,
        handleLogin,
    };
}