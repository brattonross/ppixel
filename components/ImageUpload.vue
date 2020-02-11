<template>
  <label :for="_uid" class="relative flex">
    <slot />

    <input
      :id="_uid"
      v-bind="$attrs"
      class="absolute opacity-0 w-full inset-0 cursor-pointer"
      type="file"
      name="images"
      accept="image/*"
      multiple
      v-on="$listeners"
    />
  </label>
</template>

<script>
export default {
  name: 'ImageUpload',

  inheritAttrs: false
}
</script>
