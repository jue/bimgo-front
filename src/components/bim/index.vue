<script setup>
// import('https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js')

let viewer = null
const viewerRef = ref(null)

// 炬光模型地址
const svfURL = 'https://files.jue.sh/files/164098048-juguangrvt/Resource/三维视图/3D/3D.svf'

async function initializeViewer() {
  // 动态导入 Autodesk Viewer API
  // await import('https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js')

  viewer = new Autodesk.Viewing.Private.GuiViewer3D(
    viewerRef.value,
    {

    },
  )

  const options = {
    env: 'Local',
    useConsolidation: true,
    useADP: false,
  }

  Autodesk.Viewing.Initializer(options, () => {
    viewer.start(
      svfURL,
      options,
      // {
      //   sharedPropertyDbPath: svfURL.replace('output', 'output/Resource')
      // },
      () => {
        console.log('模型加载完成')
        viewer.setBackgroundColor(250, 250, 250, 250, 250, 250)
      },
    )
  })
}

onMounted(() => {
  initializeViewer()
})
</script>

<template>
  <div class="relative w-full h-full">
    <div id="view" ref="viewerRef" class="h-full" />
  </div>
</template>
