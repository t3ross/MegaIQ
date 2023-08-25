<template>
  <div class="friend-lateral laterals q-pa-md">
    <p class="text-h4 text-white text-weight-regular">Amigos</p>
    <!-- No friends  -->
    <div v-if="friendsList.length === 0" class="no-friends column flex-center">
      No tienes ningún amigo aún... <br />
      <a href="#">Busca gente aquí</a>
      <q-img
        src="~assets/coolface.png"
        width="140px"
        :ratio="1"
        class="q-mt-md no-friend-img"
        spinner-color="primary"
        spinner-size="82px"
        alt="No friends image" />
    </div>
    <!-- Friends -->
    <q-list class="friend-list" v-else>
      <q-item
        clickable
        v-ripple:white
        class="no-padding friend-item"
        v-for="friend in friendsList"
        :key="friend.friendId">
        <q-item-section avatar>
          <q-avatar size="56px">
            <img :src="friend.friendPFP" :alt="friend.friendName + 'Photo'" />
            <div
              class="online-dot"
              v-if="friend.friendStatus === 'online'"></div>
          </q-avatar>
        </q-item-section>

        <q-item-section
          class="friend-info text-white"
          :class="{ 'first-friend': friend.friendId === 1 }">
          {{ friend.friendName }}
          <br />

          <span class="friend-last-msg text-weight-light text-subtitle1">
            <i
              :class="
                friend.friendMsgSeen
                  ? 'fa-solid fa-circle-check'
                  : 'fa-regular fa-circle-check'
              "></i>
            {{ friend.friendLastMsg }}</span
          >
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'FriendAside',
  setup() {
    const friendsList: {
      friendId: number;
      friendName: string;
      friendStatus: string;
      friendPFP: string;
      // TODO: change to date
      friendLastMsg: string;
      friendMsgSeen: boolean;
    }[] = [
      // {
      //   friendId: 0,
      //   friendName: 'string',
      //   friendStatus: 'online',
      //   friendPFP: '',
      //   friendLastMsg: 'string',
      //   friendMsgSeen: true,
      // },
      // {
      //   friendId: 1,
      //   friendName: 'btic',
      //   friendStatus: 'online',
      //   friendPFP: '',
      //   friendLastMsg: 'string',
      //   friendMsgSeen: false,
      // },
    ];
    return { friendsList };
  },
});
</script>
