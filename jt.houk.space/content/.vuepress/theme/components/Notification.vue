<template>
  <CAlert
    v-show="notification && !notificationIsClosed"
    class="alert"
    position="absolute"
    top="64px"
    left="0"
    right="0"
    status="info"
    py="0.3rem"
    background="var(--text-color)"
    color="var(--background-color)"
    box-shadow="1px 1px 2px rgba(0,0,0,0.15)"
    transition="all 0.3s ease"
    justify-content="center"
    align-items="center"
  >
    <CLink isExternal :href="notification.link" d="flex" align-items="center" color="var(--background-color)" :_hover="{ color: 'var(--background-color)' }">
      <CAlertIcon name="hand-holding-heart" min-height="30px" min-width="30px" />
      <CBox max-width="600px" mx="1rem" >
        <CAlertTitle :mr="2" v-if="notification.title">{{notification.title}}</CAlertTitle>
        <CAlertDescription class="description" display="none">{{notification.description}}</CAlertDescription>
      </CBox>
    </CLink>
    <CCloseButton @click="() => closeNotification(notification.id)" position="absolute" right="10px" bg="unset" />
  </CAlert>
</template>

<script>
import { CAlert, CAlertIcon, CAlertTitle, CAlertDescription, CCloseButton, CBox, CLink } from "@chakra-ui/vue"

export default {
  name: 'Notification',
  components: { CAlert, CAlertIcon, CAlertTitle, CAlertDescription, CCloseButton, CBox, CLink },
  computed: {
    notification() {
      return (this.$themeConfig && this.$themeConfig.notification) || {}
    },
    notificationIsClosed() {
      return this.shouldHideNotifcation(this.notification.id)
    }
  },
  methods: {
    closeNotification(id) {
      this.notificationIsClosed = true
      localStorage.setItem(id, JSON.stringify({isClosed: true}))
    },
    shouldHideNotifcation(id) {
      if (typeof window === 'undefined') return false
      const notification = localStorage.getItem(id)
      return !!notification && JSON.parse(notification).isClosed
    }
  }
}
</script>

<style lang="scss" scoped>
.alert {
  &:hover {
    box-shadow: 3px 3px 5px rgba(0,0,0,0.15);
  }
}

@media (min-width: 720px) {
  .alert {
    top: 80px;
    .description {
      display: block;
    }
  }
}
@media (min-width: 1300px) {
  .alert {
    margin-right: 230px;
    border-radius: 0 0 5px 0;
  }
}
</style>