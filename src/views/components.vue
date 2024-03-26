<template>
  <div class=" space-y-5 p-5">
    <div>
      <h2>头像</h2>
      <AvatarTeam contractor_id="b0188398-c36b-44f9-8373-c3e50da82526" :size="32" />
    </div>
    <div>
      <h2>用户选择</h2>
      <IssuesColumnUser :data="{}" class="border" />
    </div>
    <div>
      <h2>lucide图标</h2>
      <!-- <Icon name="circle-chevron-down" /> -->
      <Icon name="CircleChevronDown" class="text-red-500 w-24 h-24" stroke-width="1" />
    </div>

    <div class="space-x-5">
      <np-button :size="32" shape="square" icon="plus" />
      <np-button :size="64" shape="circle" icon="plus" class="bg-yellow-600" />
      <np-button :size="64" icon="plus">
        默认按钮
      </np-button>
      <np-button :size="64" icon="plus" text class="bg-yellow-600 text-red-500" shape="circle">
        默认按钮
      </np-button>
    </div>
  </div>
</template>
