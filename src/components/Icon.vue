<script setup>
// attachment.svg
// audio.svg
// csv.svg
// excel.svg
// html.svg
// image.svg
// mp.svg
// pdf.svg
// ppt.svg
// txt.svg
// unknown.svg
// video.svg
// word.svg
// zip.svg
import Attachment from '@/assets/svg_icons/attachment.svg'
import Audio from '@/assets/svg_icons/audio.svg'
import Csv from '@/assets/svg_icons/csv.svg'
import Excel from '@/assets/svg_icons/excel.svg'
import Html from '@/assets/svg_icons/html.svg'
import Image from '@/assets/svg_icons/image.svg'
import Mp from '@/assets/svg_icons/mp.svg'
import Pdf from '@/assets/svg_icons/pdf.svg'
import Ppt from '@/assets/svg_icons/ppt.svg'
import Txt from '@/assets/svg_icons/txt.svg'
import Unknown from '@/assets/svg_icons/unknown.svg'
import Video from '@/assets/svg_icons/video.svg'
import Word from '@/assets/svg_icons/word.svg'
import Zip from '@/assets/svg_icons/zip.svg'

defineProps({
  type: {
    type: String,
    default: 'unknown',
  },
})

function streamMime(type) {
  return type.split(';')[0]
}
</script>

<template>
  <div class="inline-flex">
    <template v-if="streamMime(type).startsWith('image')">
      <Image />
    </template>
    <template v-else-if="streamMime(type).startsWith('video')">
      <Video />
    </template>
    <template v-else-if="streamMime(type).startsWith('audio')">
      <Audio />
    </template>
    <template v-else-if="streamMime(type).startsWith('text/html')">
      <Html />
    </template>
    <template v-else-if="streamMime(type).startsWith('application/pdf')">
      <Pdf />
    </template>
    <template
      v-else-if="streamMime(type).startsWith('application/vnd.openxmlformats-officedocument.presentationml.presentation')"
    >
      <Ppt />
    </template>
    <template
      v-else-if="streamMime(type).startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')"
    >
      <Word />
    </template>
    <template v-else-if="streamMime(type).startsWith('application/zip')">
      <Zip />
    </template>
    <template v-else-if="streamMime(type).startsWith('text/csv')">
      <Csv />
    </template>
    <template v-else-if="streamMime(type).startsWith('application/excel')">
      <Excel />
    </template>
    <template
      v-else-if="streamMime(type).startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')"
    >
      <Excel />
    </template>
    <template v-else>
      <Unknown />
    </template>
  </div>
</template>
