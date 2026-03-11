<script setup lang="ts">
import defaultAvatarImage from "@/assets/images/default_avatar_400x400.jpg";

interface UserProps {
  firstName?: string;
  lastName?: string | null;
  username: string;
  avatarImageURL: string | null;
}

interface StyleProps {
  avatar?: string;
  fullName?: string;
  username?: string;
}

interface Props {
  user: UserProps;
  style?: StyleProps;
  showFullName?: boolean;
}

const props = defineProps<Props>();

const fullName = computed(() => {
  return [props.user.firstName, props.user.lastName].filter(Boolean).join(" ");
});
</script>

<template>
  <div class="inline-flex items-center gap-2 min-w-0">
    <img
      :src="user.avatarImageURL ?? defaultAvatarImage"
      :class="[props.style?.avatar, 'rounded-full object-cover']"
      :alt="user.username"
    />
    <div class="flex flex-col min-w-0">
      <span v-if="props.showFullName" :class="[props.style?.fullName, 'font-medium truncate']">{{ fullName }}</span>
      <span :class="[props.style?.username, 'truncate']">@{{ user.username }}</span>
    </div>
  </div>
</template>
