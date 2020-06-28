<template>
    <div style="margin-bottom: 20px;">
        <nav class="navbar is-light" role="navigation" aria-label="main navigation">
            <div class="container">
                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons">
                                <a v-show="!token" class="button is-link">Log in</a>
                                <a @click.prevent="logout" v-show="token" class="button is-danger">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            token: localStorage.getItem('c_token')
        }
    },
    methods: {
        logout() {
            axios.get(`http://localhost:8000/api/v1/auth/logout?token=${this.token}`)
                .then(res => {
                    console.log(res)
                    localStorage.removeItem('c_token');
                    localStorage.removeItem('c_role');
                    this.$router.push('/login')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>