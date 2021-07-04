<template>
  <v-container fluid>
    <v-row justify="space-between" class="mx-5">
      <v-col cols="6">
        <span class="headline font-weight-bold">{{$t('navigation.events')}}</span>
      </v-col>
      <v-col cols="6" align="right">
        <v-btn color="secondary" depressed @click="addDialog=true">+{{$t('events.add')}}</v-btn>
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
          :items="events"
          :items-per-page="10"
          hide-default-footer
          class="elevation-0 myTable"
        >
          <template v-slot:item="props">
            <tr>
              <td align="left">
                <v-avatar color="grey" size="36"><span class="white--text font-weight-bold">{{props.item.title.charAt(0).toUpperCase()}}</span>
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

    <template>
      <v-dialog v-model="addDialog" max-width="750">
        <add-event-form @close="addDialog=false" @create="createEvent"/>
      </v-dialog>
    </template>

    <template>
      <v-dialog v-model="editDialog" max-width="750">
        <edit-event-form :event="singleEvent" @close="editDialog=false" @edit="editEvent"/>
      </v-dialog>
    </template>
  </v-container>
</template>

<script>
    import AddEventForm from "../../components/forms/add_forms/AddEventForm";
    import EditEventForm from "../../components/forms/edit_forms/EditEventForm";
    import cloneDeep from "lodash/cloneDeep"
    import Swal from "sweetalert2"

    export default {
        components: {AddEventForm, EditEventForm},

        data() {
            return {
                events: [],
                addDialog: false,
                editDialog: false,
                singleEvent: {},
                page: 1,
                total: 1,

                headers: [
                    {sortable: false, class: 'accent white--text'},
                    {
                        text: this.$t('events.title'),
                        align: 'start',
                        sortable: false,
                        value: 'title',
                        class: 'accent white--text'
                    },
                    {text: this.$t('events.text'), value: 'text', sortable: false, class: 'accent white--text'},
                    {sortable: false, class: 'accent white--text'}
                ],
            }
        },

        mounted() {
            this.getEvents()
        },

        methods: {
            async getEvents() {
                try {
                    let res = await this.$axios.get(`/events?page=${this.page}`)
                    this.events.splice(0, this.events.length, ...res.data.data)
                    this.page = res.data.page
                    this.total = res.data.total
                } catch (err) {
                    console.log(err)
                }
            },

            openEdit(item) {
                this.singleEvent = cloneDeep(item);
                this.editDialog = true
            },

            async deleteEvent(id) {
                try {
                    await this.$axios.delete('events', {data: {id: id}})
                    this.getEvents()
                    Swal.fire({
                        toast: true,
                        position: 'bottom',
                        icon: 'success',
                        title: this.$t('swal.deleted'),
                        showConfirmButton: false,
                        timer: 2000
                    })
                } catch (err) {
                    console.log(err);
                }
            },

            async createEvent(item) {
                try {
                    await this.$axios.post('events', {
                        title: item.title,
                        text: item.text
                    })
                    this.getEvents()
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
                    await this.$axios.put('events', {
                        id: item.id,
                        title: item.title,
                        text: item.text
                    })
                    this.getEvents()
                    Swal.fire({
                        toast: true,
                        position: 'bottom',
                        icon: 'success',
                        title: this.$t('swal.updated'),
                        showConfirmButton: false,
                        timer: 2000
                    })
                } catch (err) {
                    console.log(err)
                }
            }
        },

        watch: {
            page() {
                this.getEvents()
            }
        }
    }
</script>


<style>
  .myTable {
    border: 1px solid #a0a0a0
  }
</style>
