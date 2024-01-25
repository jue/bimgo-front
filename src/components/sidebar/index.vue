<template>
  <div class="w-64 shrink-0 flex flex-col h-screen">
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
          <div class="flex items-center text-neutral-400 px-2 h-6 mb-2 text-xs">
            收藏
          </div>
          <div
            class="flex items-center space-x-2 text-neutral-500 cursor-pointer h-8 px-2 rounded-lg hover:text-neutral-900 hover:bg-gray-200"
          >
            <span class="icon-[lucide--star]" />
            <div>收藏内容</div>
          </div>
        </div>

        <div class="px-2 space-y-[1px] py-2">
          <div class="flex items-center text-neutral-400 px-2 h-6 mb-2 text-xs">
            功能
          </div>
          <div
            class="flex items-center space-x-2 text-neutral-500 cursor-pointer h-8 px-2 rounded-lg hover:text-neutral-900 hover:bg-gray-200"
          >
            <span class="icon-[lucide--list-todo]" />
            <div>工程进度</div>
          </div>
          <div
            class="flex items-center space-x-2 text-neutral-500 cursor-pointer h-8 px-2 rounded-lg hover:text-neutral-900 hover:bg-gray-200"
          >
            <span class="icon-[lucide--circle-dot]" />
            <div>质量风险</div>
          </div>
          <div
            class="flex items-center space-x-2 text-neutral-500 cursor-pointer h-8 px-2 rounded-lg hover:text-neutral-900 hover:bg-gray-200"
          >
            <span class="icon-[lucide--file-spreadsheet]" />
            <div>工程报告</div>
          </div>
          <div
            class="flex items-center space-x-2 text-neutral-500 cursor-pointer h-8 px-2 rounded-lg hover:text-neutral-900 hover:bg-gray-200"
          >
            <span class="icon-[lucide--file-box]" />
            <div>文档管理</div>
          </div>
        </div>

        <div class="px-2 space-y-[1px] py-2">
          <div class="flex items-center text-neutral-400 px-2 h-6 mb-2 text-xs">
            承包商
          </div>
          <div
            class="flex items-center space-x-2 text-neutral-500 cursor-pointer h-8 px-2 rounded-lg hover:text-neutral-900 hover:bg-gray-200"
          >
            <span class="icon-[lucide--users]" />
            <div>
              <RouterLink to="/contractors">
                承包单位
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <div class="p-2 border-t">
      <User />
    </div>
  </div>
</template>
