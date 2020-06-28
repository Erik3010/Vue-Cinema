<template>
    <div>
        <AppHeader></AppHeader>
        <div class="container">
            <router-link to="/" class="button is-danger is-light" style="margin: 10px 0">Back</router-link>
            <div class="content">
                <h1 class="title">Movie</h1>
                <p class="subtitle is-6" style="margin-bottom: 20px;">Lorem ipsum dolor sit amet.</p>
            </div>
            <div class="columns">
                <div class="column is-half">
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input
                                class="input"
                                type="text"
                                placeholder="Movie Name"
                                v-model="movie.name"
                            >
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Minute Length</label>
                        <div class="control">
                            <input
                                class="input"
                                type="number"
                                placeholder="Minute Length"
                                v-model="movie.minute_length"
                            >
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Picture</label>
                        <div class="file has-name">
                            <label class="file-label">
                                <input
                                    class="file-input"
                                    type="file"
                                    name="resume"
                                    @change="uploadPicture($event)"
                                >
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <i class="fas fa-upload"></i>
                                    </span>
                                    <span class="file-label">Choose a file…</span>
                                </span>
                                <span class="file-name">Choose your file...</span>
                            </label>
                        </div>
                    </div>
                    <div class="control">
                        <button
                            class="button is-link"
                            @click.prevent="createMovie"
                            v-show="!isEdit"
                        >Create</button>
                        <button
                            class="button is-success"
                            @click.prevent="updateMovie"
                            v-show="isEdit"
                            style="margin-right: 10px"
                        >Update</button>
                        <button
                            class="button is-success is-light"
                            @click.prevent="cancelEdit"
                            v-show="isEdit"
                        >Cancel</button>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Minute Length</th>
                                <th>Picture</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="movie in movies" :key="movie.id">
                                <td>{{ movie.id }}</td>
                                <td>{{ movie.name }}</td>
                                <td>{{ movie.minute_length }} minutes</td>
                                <td>
                                    <img :src="'http://localhost:8000/images/'+movie.picture_url" alt="movie picture" class="image is-128x128" style="object-fit: cover">
                                </td>
                                <td>
                                    <button
                                        class="button is-warning"
                                        style="margin-right: 10px"
                                        @click="editMovie(movie.id)"
                                    >Edit</button>
                                    <button
                                        class="button is-danger"
                                        @click="deleteMovie(movie.id)"
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
import Header from '@/components/Header.vue';

export default {
    components: { AppHeader: Header },
    data() {
        return {
            domain: 'http://localhost:8000/api/v1',
            token: localStorage.getItem('c_token'),
            movies: [],
            movie: { name: '', minute_length: '', picture: '' },
            isEdit: 0,
            movie_id: ''
        }
    },
    created() {
        this.fetchMovie()
    },
    methods: {
        uploadPicture(e) {
            let name = document.querySelector('.file-name');

            this.movie.picture = e.target.files[0];

            if(this.movie.picture) name.innerHTML = this.movie.picture.name;
            else name.innerHTML = 'Choose your file...'
            // console.log(this.movie.picture)
        },
        fetchMovie() {
            axios.get(`${this.domain}/movies?token=${this.token}`)
                .then(res => {
                    this.movies = res.data;
                    console.log(this.movies)
                })
        },
        createMovie() {
            let formData = new FormData();
            for(let key in this.movie) {
                formData.append(key, this.movie[key])
            }

            axios.post(`${this.domain}/movies?token=${this.token}`, formData)
                .then(res => {
                    console.log(res);
                    alert(res.data.message)
                    this.fetchMovie();
                })
                .catch(err => {
                    console.log(err)
                    alert(err.response.data.message)
                })
        },
        editMovie(id) {
            this.isEdit = true;
            this.movie_id = id;

            let res = this.movies.filter(movie => {
                return movie.id == this.movie_id
            })

            this.movie.name = res[0].name;
            this.movie.minute_length = res[0].minute_length;
        },
        cancelEdit() {
            this.isEdit = false;
            this.movie_id = null;
        },
        updateMovie() {
            let formData = new FormData();
            for(let key in this.movie) {
                formData.append(key, this.movie[key]);
            }
            formData.append('_method', 'PUT');

            axios.post(`${this.domain}/movies/${this.movie_id}?token=${this.token}`, formData)
                .then(res => {
                    console.log(res);
                    alert(res.data.message);
                    this.fetchMovie();
                })
                .catch(err => {
                    console.log(err);
                    alert(err.response.data.message);
                })
        },
        deleteMovie(id) {
            axios.delete(`${this.domain}/movies/${id}?token=${this.token}`)
                .then(res => {
                    console.log(res);
                    alert(res.data.message)
                    this.fetchMovie()
                })
                .catch(err => {
                    console.log(err);
                    alert(err.response.data.message)
                })
        }
    }
}
</script>