<template functional>
  <tr
    :ref="data.ref"
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    class="bg-white border-b"
    v-on="listeners"
  >
    <td style="width: 2rem">
      <slot name="select" />
    </td>

    <td>
      <slot name="title" />
    </td>

    <td>
      <slot name="emote" />
    </td>

    <td style="width: 122px">
      <slot name="actions" />
    </td>
  </tr>
</template>

<script>
export default {
  name: 'EmoteUpload'
}
</script>
