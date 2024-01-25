<template>
  <div class="w-64 shrink-0 bg-[#f7f7f7] flex flex-col h-screen">
    <div class="h-14 flex items-center justify-between px-2">
      <Logo class="w-12" />
    </div>

    <el-scrollbar class="flex-1 h-full w-full">
      <div class="divide-y">
        <div class="px-2 space-y-[1px] py-2">
          <SearchButton />
          <div
            class="flex items-center space-x-2 text-neutral-500 cursor-pointer h-8 px-2 rounded-lg hover:text-neutral-900 hover:bg-gray-200"
          >
            <span class="icon-[lucide--bell]" />
            <div>收件箱</div>
          </div>
          <div
            class="flex items-center space-x-2 text-neutral-500 cursor-pointer h-8 px-2 rounded-lg hover:text-neutral-900 hover:bg-gray-200"
          >
            <span class="icon-[lucide--check-circle]" />
            <div>已分配给我的</div>
          </div>
        </div>
        <div class="px-2 space-y-[1px] py-2">
          <div class="flex items-center text-neutral-400 px-2 h-8 mb-2">
            收藏
          </div>
          <div
            class="flex items-center space-x-2 text-neutral-500 cursor-pointer h-8 px-2 rounded-lg hover:text-neutral-900 hover:bg-gray-200"
          >
            <icon-ic:outline-more-horiz class="text-base" />
            <div>收件箱</div>
          </div>
        </div>
        <div class="px-2 space-y-[1px] py-2">
          <div class="flex items-center justify-between text-neutral-400 px-2 h-8">
            <div>空间</div>
            <div class="flex items-center space-x-1">
              <SpaceAdd />
            </div>
          </div>

          <SpaceMenu />
        </div>
      </div>
    </el-scrollbar>
    <div class="p-2 border-t">
      <User />
    </div>
  </div>
</template>
