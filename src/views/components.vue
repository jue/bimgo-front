<template>
  <div class="flex flex-col space-y-5 p-5">
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
  </div>
</template>
