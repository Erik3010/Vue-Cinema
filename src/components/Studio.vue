<template>
    <div>
        <AppHeader></AppHeader>
        <div class="container">
            <router-link to="/" class="button is-danger is-light" style="margin: 10px 0">Back</router-link>
            <div class="content">
                <h1 class="title">Studio</h1>
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
                                placeholder="Studio Name"
                                v-model="studio.name"
                            >
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Branch</label>
                        <div class="control">
                            <div class="select">
                                <select v-model="studio.branch_id">
                                    <option value="">Choose Branch</option>
                                    <option
                                        v-for="branch in branches"
                                        :key="branch.id"
                                        :value="branch.id"
                                    >{{ branch.name }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Basic Price</label>
                        <div class="control">
                            <input
                                class="input"
                                type="number"
                                placeholder="Basic Price"
                                v-model="studio.basic_price"
                            >
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Additional Friday Price</label>
                        <div class="control">
                            <input
                                class="input"
                                type="number"
                                placeholder="Additional Friday Price"
                                v-model="studio.additional_friday_price"
                            >
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Additional Saturday Price</label>
                        <div class="control">
                            <input
                                class="input"
                                type="number"
                                placeholder="Additional Saturday Price"
                                v-model="studio.additional_saturday_price"
                            >
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Additional Sunday Price</label>
                        <div class="control">
                            <input
                                class="input"
                                type="number"
                                placeholder="Basic Price"
                                v-model="studio.additional_sunday_price"
                            >
                        </div>
                    </div>
                    <div class="control">
                        <button
                            class="button is-link"
                            v-show="!isEdit"
                            @click="createStudio"
                        >Create</button>
                        <button
                            class="button is-success"
                            v-show="isEdit"
                            @click="updateStudio"
                            style="margin-right: 10px;"
                        >Update</button>
                        <button
                            v-show="isEdit"
                            class="button is-success is-light"
                            @click="cancelEdit"
                        >Cancel</button>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="column">
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Branch Name</th>
                                <th>Basic Price</th>
                                <th>Additional Friday Price</th>
                                <th>Additional Saturday Price</th>
                                <th>Additional Sunday Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="studio in studios" :key="studio.id">
                                <td>{{ studio.id }}</td>
                                <td>{{ studio.name }}</td>
                                <td>{{ studio.branch_name }}</td>
                                <td>{{ studio.basic_price }}</td>
                                <td>{{ studio.additional_friday_price }}</td>
                                <td>{{ studio.additional_saturday_price }}</td>
                                <td>{{ studio.additional_sunday_price }}</td>
                                <td>
                                    <button
                                        class="button is-warning"
                                        style="margin: 0 10px 10px 0"
                                        @click="editStudio(studio.id)"
                                    >Edit</button>
                                    <button
                                        class="button is-danger"
                                        @click="deleteStudio(studio.id)"
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
            studios: [],
            branches: [],
            studio: {
                name: '',
                branch_id: '',
                basic_price: '',
                additional_friday_price: '',
                additional_saturday_price: '',
                additional_sunday_price: ''
            },
            studio_id: '',
            isEdit: 0
        }
    },
    created() {
        this.fetchStudio();
        this.fetchBranch();
    },
    methods: {
        fetchBranch() {
            axios.get(`${this.domain}/branches?token=${this.token}`)
                .then(res => {
                    this.branches = res.data;
                    console.log(this.branches);
                })
        },
        fetchStudio() {
            axios.get(`${this.domain}/studios?token=${this.token}`)
                .then(res => {
                    this.studios = res.data;
                    console.log(this.studios)
                })
        },
        createStudio() {
            axios.post(`${this.domain}/studios?token=${this.token}`, this.studio)
                .then(res => {
                    console.log(res);
                    this.fetchStudio();
                    alert(res.data.message)
                })
                .catch(err => {
                    console.log(err);
                    alert(err.response.data.message)
                })
        },
        editStudio(id) {
            this.isEdit = 1;
            this.studio_id = id;

            let res = this.studios.filter(studio => {
                return studio.id == id
            })[0];

            this.studio.name = res.name;
            this.studio.basic_price = res.basic_price;
            this.studio.additional_friday_price = res.additional_friday_price;
            this.studio.additional_saturday_price = res.additional_saturday_price;
            this.studio.additional_sunday_price = res.additional_sunday_price;
            this.studio.branch_id = res.branch_id;
        },
        cancelEdit() {
            this.studio_id = null;
            this.isEdit = 0;
        },
        updateStudio() {
            axios.put(`${this.domain}/studios/${this.studio_id}?token=${this.token}`, this.studio)
                .then(res => {
                    console.log(res);
                    alert(res.data.message);
                    this.fetchStudio()
                })
                .catch(err => {
                    console.log(err);
                    alert(err.response.data.message);
                })
        },
        deleteStudio(id) {
            axios.delete(`${this.domain}/studios/${id}?token=${this.token}`)
                .then(res => {
                    console.log(res);
                    this.fetchStudio();
                })
                .catch(err => {
                    console.log(err);
                    alert(err.response.data.message)
                })
        }
    }
}
</script>