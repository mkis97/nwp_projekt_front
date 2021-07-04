<template>
  <v-container fluid>
    <v-row justify="space-between" class="mx-5">
      <v-col cols="6">
        <span class="headline font-weight-bold">{{$t('navigation.moderators')}}</span>
      </v-col>
      <v-col cols="6" align="right">
        <v-btn color="secondary" depressed @click="addDialog=true">+{{$t('moderators.add')}}</v-btn>
      </v-col>
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="12"
        md="10"
      >
        <v-data-table
          :headers="headers"
          :items="moderators"
          :items-per-page="10"
          hide-default-footer
          class="elevation-0 myTable"
        >
          <template v-slot:item="props">
            <tr>
              <td align="left">
                <v-avatar color="grey" size="36"><span class="white--text font-weight-bold">{{props.item.firstname.charAt(0).toUpperCase()}}</span>
                </v-avatar>
              </td>
              <template v-for="param in headers">
                <td v-if="param.value" style="cursor: pointer" @click="openEdit(props.item)">
                  {{props.item[param.value]}}
                </td>
              </template>
              <td align="right" style="width: 50px;">
                <v-icon
                  small
                  color="error"
                  class="pl-1"
                  @click="deleteEvent(props.item.id)"
                >
                  mdi-delete
                </v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="total"
            color="accent"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="addDialog" max-width="750">
      <add-user-form @close="addDialog=false" @create="createEvent"/>
    </v-dialog>

    <v-dialog v-model="editDialog" max-width="750">
      <edit-user-form :user="singleUser" @close="editDialog=false" @edit="editEvent"/>
    </v-dialog>

  </v-container>
</template>

<script>
  import AddUserForm from "../../components/forms/add_forms/AddUserForm";
  import EditUserForm from "../../components/forms/edit_forms/EditUserForm";
  import cloneDeep from "lodash/cloneDeep"
  import Swal from "sweetalert2"

    export default {
        components: {EditUserForm, AddUserForm},

        data() {
            return {
                moderators: [],
                page: 1,
                total: 1,
                addDialog: false,
                editDialog: false,
                singleUser: {},

                headers: [
                    {sortable: false, class: 'accent white--text'},
                    {
                        text: this.$t('moderators.firstname'),
                        align: 'start',
                        sortable: false,
                        value: 'firstname',
                        class: 'accent white--text'
                    },
                    {
                        text: this.$t('moderators.lastname'),
                        sortable: false,
                        value: 'lastname',
                        class: 'accent white--text'
                    },
                    {
                        text: this.$t('moderators.email'),
                        sortable: false,
                        value: 'email',
                        class: 'accent white--text'
                    },
                    {sortable: false, class: 'accent white--text'}
                ],
            }
        },

        mounted() {
            this.getModerators()
        },

        methods: {
            async getModerators() {
                try {
                    let res = await this.$axios.get(`/users?page=${this.page}`)
                    this.moderators.splice(0, this.moderators.length, ...res.data.data)
                    this.page = res.data.page
                    this.total = res.data.total
                } catch (err) {
                    console.log(err)
                }
            },

            openEdit(item) {
                this.singleUser = cloneDeep(item);
                this.singleUser.password=""
                this.editDialog = true
            },

            async deleteEvent(id) {
                try {
                    await this.$axios.delete('users', {data: {id: id}})
                    this.getModerators()
                    Swal.fire({
                        toast: true,
                        position: 'bottom',
                        icon: 'success',
                        title: this.$t('swal.deleted'),
                        showConfirmButton: false,
                        timer: 2000
                    })
                } catch (err) {
                    console.log(err)
                }
            },

            async createEvent(item) {
                try {
                    await this.$axios.post('users', {
                        firstname: item.firstname,
                        lastname: item.lastname,
                        email: item.email,
                        password: item.password
                    })
                    this.getModerators()
                    Swal.fire({
                        toast: true,
                        position: 'bottom',
                        icon: 'success',
                        title: this.$t('swal.created'),
                        showConfirmButton: false,
                        timer: 2000
                    })
                } catch (err) {
                    console.log(err)
                }
            },

            async editEvent(item) {
                try {
                    await this.$axios.put('users', {
                        id: item.id,
                        firstname: item.firstname,
                        lastname: item.lastname,
                        email: item.email,
                        password: item.password
                    })
                    this.getModerators()
                    Swal.fire({
                        toast: true,
                        position: 'bottom',
                        icon: 'success',
                        title: this.$t('swal.updated'),
                        showConfirmButton: false,
                        timer: 2000
                    })
                } catch (err) {
                    console.log(err);
                }
            }
        },

        watch: {
            page() {
                this.getModerators()
            }
        }
    }
</script>


<style>
  .myTable {
    border: 1px solid #a0a0a0
  }
</style>
