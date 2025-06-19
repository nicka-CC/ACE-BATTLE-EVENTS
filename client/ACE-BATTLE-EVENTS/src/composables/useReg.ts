import {ref} from "vue";
import {API} from '@/constants/api.ts'
import router from "@/router";
export function useReg(){
    const name = ref('');
    const surname = ref('');
    const email = ref('');
    const club = ref('');
    const city = ref('');
    const country = ref('');
    const password = ref('');
    const termsAccepted = ref(false);
    const registerError = ref('');

    const handleRegister = async () => {
        registerError.value = '';

        if (!termsAccepted.value) {
            registerError.value = 'Вы должны согласиться с правилами и условиями.';
            return;
        }

        try {
            const response = await fetch(`${API}/auth/reg`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.value,
                    surname: surname.value,
                    email: email.value,
                    club: club.value,
                    city: city.value,
                    country: country.value,
                    password: password.value,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Registration successful:', data);
                router.push({ name: 'login' });
            } else {
                registerError.value = data.message || 'Ошибка регистрации';
                console.error('Registration failed:', data);
            }
        } catch (error) {
            registerError.value = 'Сетевая ошибка или сервер недоступен';
            console.error('Registration error:', error);
        }
    };
    return{
        name,
        surname,
        email,
        club,
        city,
        country,
        password,
        termsAccepted,
        registerError,
        handleRegister,
    }
}