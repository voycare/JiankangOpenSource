<template>
  <div class="table-responsive">
    <table class="table custom-table">
      <tbody>
      <tr>
        <td><input @click="onToggleSelectAll" type="checkbox"></td>
        <td colspan="3">Select All</td>
      </tr>
      <tr :class="! message.read_at ? 'text-bold' : ''" :key="message.id"
          v-for="message in messages">
        <td><input :value="message.id" type="checkbox" v-model="selectedIds"></td>
        <td v-if="! show_from">
          <span v-if="message.from">{{ message.from.name }}</span>
        </td>
        <td v-if="! show_to">
          <span v-if="message.to">{{ message.to.name }}</span>
        </td>
        <td>{{ message.content }}</td>
        <td>{{ message.created_at }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    props: {
      messages: Array,
      show_from: {
        type: Boolean,
        default: true
      },
      show_to: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        selectedIds: [],
        selectAll: [],
      }
    },
    methods: {
      onToggleSelectAll() {
        let self = this
        if (!self.selectAll.length) {
          for (let i = 0; i < self.messages.length; i++) {
            self.selectAll.push(self.messages[i].id)
          }
        } else {
          self.selectAll = []
        }

        self.selectedIds = self.selectAll
      },
    }
  }
</script>
