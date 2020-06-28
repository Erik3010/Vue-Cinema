<template>
    <div>
        <AppHeader></AppHeader>
        <div class="container">
            <router-link to="/" class="button is-danger is-light" style="margin: 10px 0">Back</router-link>
            <div class="content">
                <h1 class="title">Schedule</h1>
                <p class="subtitle is-6" style="margin-bottom: 20px;">Lorem ipsum dolor sit amet.</p>
            </div>
            <div class="columns">
                <div class="column is-half">
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="select">
                            <select v-model="schedule.movie_id">
                                <option value="">Choose Movie</option>
                                <option
                                    v-for="movie in movies"
                                    :key="movie.id"
                                    :value="movie.id"
                                >{{ movie.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="select">
                            <select v-model="schedule.studio_id">
                                <option value="">Choose Studio</option>
                                <option
                                    v-for="studio in studios"
                                    :key="studio.id"
                                    :value="studio.id"
                                >{{ studio.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Start Time</label>
                        <div class="control">
                            <input
                                class="input"
                                type="text"
                                placeholder="Start Time"
                                v-model="schedule.start"
                            >
                        </div>
                    </div>
                    <div class="control">
                        <button
                            class="button is-link"
                            v-show="!isEdit"
                            @click="createSchedule"
                        >Create</button>
                        <button
                            class="button is-success"
                            v-show="isEdit"
                            style="margin-right: 10px"
                            @click="updateSchedule"
                        >Update</button>
                        <button
                            class="button is-success is-light"
                            v-show="isEdit"
                            @click="cancelEdit"
                        >Cancel</button>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Movie Name</th>
                                <th>Studio Name</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="schedule in schedules" :key="schedule.id">
                                <td>{{ schedule.id }}</td>
                                <td>{{ schedule.movie_name }}</td>
                                <td>{{ schedule.studio_name }}</td>
                                <td>{{ schedule.start_time }}</td>
                                <td>{{ schedule.end_time }}</td>
                                <td>{{ schedule.price }}</td>
                                <td>
                                    <button
                                        class="button is-warning"
                                        style="margin: 0 10px 10px 0"
                                        @click="editSchedule(schedule.id)"
                                    >Edit</button>
                                    <button
                                        class="button is-danger"
                                        @click="deleteSchedule(schedule.id)"
                                    >Delete</button>
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
import Header from '@/components/Header.vue'
export default {
    components: { AppHeader: Header },
    data() {
        return {
            domain: 'http://localhost:8000/api/v1',
            token: localStorage.getItem('c_token'),
            schedules: [],
            schedule: {
                movie_id: '',
                studio_id: '',
                start: ''
            },
            isEdit: 0,
            schedule_id: '',
            movies: [],
            studios: []
        }
    },
    created() {
        this.fetchSchedule();
        this.fetchMovie();
        this.fetchStudio();
    },
    methods: {
        fetchSchedule() {
            axios.get(`${this.domain}/schedules?token=${this.token}`)
                .then(res => {
                    this.schedules = res.data;
                })
        },
        fetchMovie() {
            axios.get(`${this.domain}/movies?token=${this.token}`)
                .then(res => {
                    this.movies = res.data
                })
        },
        fetchStudio() {
            axios.get(`${this.domain}/studios?token=${this.token}`)
                .then(res => {
                    this.studios = res.data
                })
        },
        createSchedule() {
            axios.post(`${this.domain}/schedules?token=${this.token}`, this.schedule)
                .then(res => {
                    console.log(res);
                    this.fetchSchedule();
                    alert(res.data.message)
                })
                .catch(err => {
                    console.log(err);
                    alert(err.response.data.message)
                })
        },
        editSchedule(id) {
            this.schedule_id = id;
            this.isEdit = 1;

            let res = this.schedules.filter(schedule => {
                return schedule.id == id;
            })[0];

            // this.schedule.movie_id = res.movie_id;
            // this.schedule.studio_id = res.studio_id;
            this.schedule.start = res.start_time;
        },
        cancelEdit() {
            this.schedule_id = null;
            this.isEdit = 0;
        },
        updateSchedule() {
            axios.put(`${this.domain}/schedules/${this.schedule_id}?token=${this.token}`, this.schedule)
                .then(res => {
                    console.log(res);
                    alert(res.data.message);
                    this.fetchSchedule();
                })
                .catch(err => {
                    console.log(err);
                    alert(err.response.data.message)
                })
        },
        deleteSchedule(id) {
            axios.delete(`${this.domain}/schedules/${id}?token=${this.token}`)
                .then(res => {
                    console.log(res);
                    this.fetchSchedule();
                    alert(res.data.message)
                })
                .catch(err => {
                    console.log(err);
                    alert(err.response.data.message)
                })
        }
    }
}
</script>