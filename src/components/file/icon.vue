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
import Excel from '@/assets/svg_icons/excel.svg'
import Image from '@/assets/svg_icons/image.svg'
import Pdf from '@/assets/svg_icons/pdf.svg'
import Ppt from '@/assets/svg_icons/ppt.svg'
import Unknown from '@/assets/svg_icons/unknown.svg'
import Video from '@/assets/svg_icons/video.svg'
import Word from '@/assets/svg_icons/word.svg'
import Zip from '@/assets/svg_icons/zip.svg'
import Folder from '@/assets/svg_icons/folder.svg'

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
  <div class="inline-flex p-[10px] bg-gray-100 rounded-lg">
    <template v-if="streamMime(type).startsWith('image')">
      <Image class="w-full" />
    </template>
    <template v-else-if="streamMime(type).startsWith('video')">
      <Video class="w-full" />
    </template>
    <template v-else-if="streamMime(type).startsWith('audio')">
      <Audio class="w-full" />
    </template>
    <template v-else-if="streamMime(type).startsWith('application/pdf')">
      <Pdf class="w-full" />
    </template>
    <template
      v-else-if="streamMime(type).startsWith('application/vnd.openxmlformats-officedocument.presentationml.presentation')"
    >
      <Ppt class="w-full" />
    </template>
    <template
      v-else-if="streamMime(type).startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')"
    >
      <Word class="w-full" />
    </template>
    <template v-else-if="streamMime(type).startsWith('application/zip')">
      <Zip class="w-full" />
    </template>
    <template v-else-if="streamMime(type).startsWith('application/excel')">
      <Excel class="w-full" />
    </template>
    <template
      v-else-if="streamMime(type).startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')"
    >
      <Excel class="w-full" />
    </template>
    <template v-else-if="streamMime(type).startsWith('folder')">
      <Folder class="w-full" />
    </template>
    <template v-else>
      <Unknown class="w-full" />
    </template>
  </div>
</template>
