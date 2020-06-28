<template>
    <div>
        <AppHeader></AppHeader>
        <div class="container">
            <div class="content">
                <div class="content" style="margin-bottom: 20px;">
                    <h1 class="has-text-centered title">Login</h1>
                    <p class="has-text-centered subtitle is-6" style="margin-bottom: 20px;">Lorem ipsum dolor sit amet.</p>
                </div>
                <div class="columns">
                    <div class="column is-half is-offset-one-quarter">
                        <form action="">
                            <div class="field">
                                <label class="label">Username</label>
                                <div class="control">
                                    <input
                                        class="input"
                                        type="text"
                                        placeholder="Username"
                                        v-model="loginData.username"
                                    >
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Password</label>
                                <div class="control">
                                    <input
                                        class="input"
                                        type="password"
                                        placeholder="Password"
                                        v-model="loginData.password"
                                    >
                                </div>
                            </div>
                            <div class="control">
                                <button
                                    @click.prevent="login"
                                    class="button is-link"
                                >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
    components: { AppHeader: Header },
    data() {
        return {
            domain: 'http://localhost:8000/api/v1',
            loginData: { username: '', password: '' }
        }
    },
    methods: {
        login() {
            axios.post(`${this.domain}/auth/login`, this.loginData)
                .then(res => {
                    console.log(res)
                    localStorage.setItem('c_token', res.data.token);
                    localStorage.setItem('c_role', res.data.role);

                    this.$router.push('/')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>