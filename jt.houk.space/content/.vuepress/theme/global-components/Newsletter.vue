<template>
    <SimpleNewsletter v-slot="{ slotProps }">
      <CFormControl
        max-width="420px"
        background-color="var(--background-color)"
        color="var(--text-color)"
        border="1px solid var(--border-color)"
        margin="auto"
        padding="30px"
      >
        <CInput
          v-model="mail"
          type="email"
          name="email"
          aria-label="Email"
          placeholder="Email"
          required
          autocapitalize="off"
          autocorrect="off"
          data-cy="email"
          mb="15px"
          border="none"
          height="20px"
          border-radius="5px"
          p="10px"
          max-width="400px"
        />
        <CButton
          @click.prevent="onSubmit"
          type="submit"
          data-cy="submit"
          bg-color="var(--accent-color)"
          w="100%"
          h="40px"
          border-radius="5px"
          border="none"
          font-weight="bold"
          font-size="16"
          cursor="pointer"
        >
          {{ slotProps.submitText }}
        </CButton>
      </CFormControl>
    </SimpleNewsletter>
</template>

<script>
import SimpleNewsletter from 'vuepress-plugin-mailchimp/src/components/SimpleNewsletter'
import subscribeToMailchimp from 'vuepress-plugin-mailchimp/src/mailchimpSubscribe'
import subscribeEvent from 'vuepress-plugin-mailchimp/src/event'
import { CFormControl, CInput, CButton } from '@chakra-ui/vue'

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ig

export default {
  name: 'Newsletter',
  components: { SimpleNewsletter, subscribeToMailchimp, CFormControl, CInput, CButton },
  data() {
    return {
      mail: ''
    }
  },
  computed: {
    isValidEmail() {
      return this.mail.match(emailRegex)
    }
  },
  methods: {
    async onSubmit() {
      try {
        if (!this.isValidEmail) {
          throw new Error('Invalid email address')
        }
        const res = await subscribeToMailchimp(this.mail)
        subscribeEvent.$emit('submited', res);
      } catch (error) {
        console.error(error)
        subscribeEvent.$emit('submited', { result: 'error' });
      } finally {
        this.mail = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.newsletter {
  /deep/ .newsletter__wrap {
    max-width: 420px;
    background-color: var(--background-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    .newsletter__input {
      margin-bottom: 15px;
    }
    .newsletter__interests {
      display: flex;
      list-style: none;
      padding-left: 0;
      justify-content: center;
      .interest {
        margin-right: 1rem;
      }
    }
    .newsletter__button {
      background-color: var(--accent-color);
    }
  }
}
</style>