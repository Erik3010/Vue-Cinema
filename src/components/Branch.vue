<template>
    <div>
        <AppHeader></AppHeader>
        <div class="container">
            <router-link to="/" class="button is-danger is-light" style="margin: 10px 0">Back</router-link>
            <div class="content">
                <h1 class="title">Branch</h1>
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
                                placeholder="Branch Name"
                                v-model="branch.name"
                            >
                        </div>
                    </div>
                    <div class="control">
                        <button
                            v-show="!isEdit"
                            @click.prevent="createBranch"
                            class="button is-link"
                        >Create</button>
                        <button
                            v-show="isEdit"
                            @click.prevent="updateBranch"
                            class="button is-success"
                        >Update</button>
                        <button
                            v-show="isEdit"
                            @click.prevent="cancelEdit"
                            class="button is-success is-light"
                            style="margin-left: 10px"
                        >Cancel</button>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <table class="table is-fullwidth">
                        <thead>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            <tr v-for="branch in branches" :key="branch.id">
                                <td>{{ branch.id }}</td>
                                <td>{{ branch.name }}</td>
                                <td>
                                    <button
                                        class="button is-warning"
                                        style="margin-right: 10px"
                                        @click="editBranch(branch.id)"
                                    >Edit</button>
                                    <button
                                        class="button is-danger"
                                        @click="deleteBranch(branch.id)"
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
            branch: { name: '' },
            branches: [],
            isEdit: 0,
            branch_id: ''
        }
    },
    created() {
        this.fetchBranch()
    },
    methods: {
        fetchBranch() {
            axios.get(`${this.domain}/branches?token=${this.token}`)
                .then(res => {
                    this.branches = res.data;
                    console.log(this.branches)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        createBranch() {
            axios.post(`${this.domain}/branches?token=${this.token}`, this.branch)
                .then(res => {
                    console.log(res)
                    alert(res.data.message)
                    this.fetchBranch();
                    this.branch.name = ''
                })
                .catch(err => {
                    console.log(err)
                    alert(err.response.data.message)
                })
        },
        editBranch(id) {
            this.branch_id = id;
            this.isEdit = true;

            let res = this.branches.filter(branch => {
                return branch.id == this.branch_id
            })
            this.branch.name = res[0].name

            console.log(this.branch_id);
        },
        cancelEdit() {
            this.branch_id = null;
            this.isEdit = false;
        },
        updateBranch() {
            axios.put(`${this.domain}/branches/${this.branch_id}?token=${this.token}`, this.branch)
                .then(res => {
                    console.log(res)
                    alert(res.data.message)
                    this.fetchBranch()
                })
                .catch(err => {
                    console.log(err)
                    alert(err.response.data.message)
                })
        },
        deleteBranch(id) {
            axios.delete(`${this.domain}/branches/${id}?token=${this.token}`)
                .then(res => {
                    alert(res.data.message);
                    this.fetchBranch();
                })
                .catch(err => {
                    console.log(err)
                    alert(err.response.data.message)
                })
        }
    }
}
</script>