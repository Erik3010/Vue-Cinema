<template>
    <div>
        <AppHeader></AppHeader>
        <div class="container">
            <div class="content">
                <div class="content" style="margin-bottom: 20px;">
                    <h1 class="title">Cinema</h1>
                    <p class="subtitle is-6" style="margin-bottom: 20px;">Lorem ipsum dolor sit amet.</p>
                </div>
                <div class="buttons has-addons" v-show="role === 'admin'">
                    <router-link to="/branch" class="button">Branch</router-link>
                    <router-link to="/movie" class="button">Movie</router-link>
                    <router-link to="/schedule" class="button">Schedule</router-link>
                    <router-link to="/studio" class="button">Studio</router-link>
                </div>
            </div>
            <hr>
            <div class="columns">
                <div class="column">
                    <div class="field has-addons">
                        <div class="control is-expanded">
                            <div class="select is-fullwidth">
                                <select name="branch" v-model="search.branch_id">
                                    <option value="">Choose branch</option>
                                    <option
                                        v-for="branch in branches"
                                        :key="branch.id"
                                        :value="branch.id"
                                    >{{ branch.name }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="control">
                            <button @click="searchSchedule" type="submit" class="button is-link">Search</button>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field has-addons">
                        <div class="control">
                            <input class="input" type="text" v-model="search.date">
                        </div>
                        <div class="control">
                            <button @click="searchSchedule" class="button is-link">Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column is-half">
                    <table class="table bordered is-striped is-fullwidth" style="margin-top: 50px">
                        <thead>
                            <tr>
                                <th>Movie</th>
                                <th>Price</th>
                                <th>Start Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="schedule in schedules" :key="schedule.id">
                                <td>{{ schedule.name }}</td>
                                <td>{{ schedule.price }}</td>
                                <td>
                                    <span
                                        v-for="(time,i) in schedule.start"
                                        :key="i"
                                        style="margin-right: 10px"
                                    >{{ time }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
            token: localStorage.getItem('c_token'),
            role: localStorage.getItem('c_role'),
            schedules: [],
            branches: [],
            search: { branch_id: '', date: '' }
        }
    },
    created() {
        this.fetchSchedule();
        this.fetchBranches();
    },
    methods: {
        fetchSchedule() {
            axios.get(`${this.domain}/available-schedules?token=${this.token}`)
                .then(res => {
                    this.schedules = res.data;
                    console.log(this.schedules)
                })
        },
        fetchBranches() {
            axios.get(`${this.domain}/branches?token=${this.token}`)
                .then(res => {
                    this.branches = res.data;
                    console.log(this.branches)
                })
        },
        searchSchedule() {
            axios.get(`${this.domain}/available-schedules?branch_id=${this.search.branch_id}&date=${this.search.date}&token=${this.token}`)
                .then(res => {
                    this.schedules = res.data;
                    console.log(res)
                })
        }
    }
}
</script>