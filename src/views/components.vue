<script setup>
import Button from 'primevue/button'
</script>

<template>
  <div class="space-x-5 space-y-5 p-5">
    <h1>Button</h1>
    <div class="space-y-5">
      <div>Basic</div>
      <Button label="Basic" />
    </div>

    <div class="space-y-5">
      <div>Severity</div>
      <div class="space-x-5 space-y-5">
        <Button label="Primary" />
        <Button label="Secondary" severity="secondary" />
        <Button label="success" severity="success" />
        <Button label="danger" severity="danger" />
      </div>
    </div>

    <div class="space-y-5">
      <div>Rounded</div>
      <div class="space-x-5 space-y-5">
        <Button label="Primary" rounded />
        <Button label="Secondary" severity="secondary" rounded />
        <Button label="success" severity="success" rounded />
        <Button label="danger" severity="danger" rounded />
      </div>
    </div>

    <div class="space-y-5">
      <div>Text</div>
      <div class="space-x-5 space-y-5">
        <Button label="Primary" text />
        <Button label="Secondary" severity="secondary" text />
        <Button label="success" severity="success" text />
        <Button label="danger" severity="danger" text />
      </div>
    </div>

    <div class="space-y-5">
      <div>Outlined</div>
      <div class="space-x-5 space-y-5">
        <Button label="Primary" outlined />
        <Button label="Secondary" severity="secondary" outlined />
        <Button label="success" severity="success" outlined />
        <Button label="danger" severity="danger" outlined />
      </div>
    </div>

    <div class="space-y-5">
      <div>
        Icon Only
      </div>
      <div class="space-x-5 space-y-5">
        <Button icon="icon-[lucide--check]" outlined />
        <Button icon="icon-[lucide--check]" severity="secondary" outlined />
        <Button icon="icon-[lucide--check]" severity="success" outlined />
        <Button icon="icon-[lucide--check]" severity="danger" outlined />
      </div>
      <div class="space-x-5 space-y-5">
        <Button icon="icon-[lucide--check]" />
        <Button icon="icon-[lucide--check]" severity="secondary" />
        <Button icon="icon-[lucide--check]" severity="success" />
        <Button icon="icon-[lucide--check]" severity="danger" />
      </div>
      <div class="space-x-5 space-y-5">
        <Button icon="icon-[lucide--check]" rounded />
        <Button icon="icon-[lucide--check]" severity="secondary" rounded />
        <Button icon="icon-[lucide--check]" severity="success" rounded />
        <Button icon="icon-[lucide--check]" severity="danger" rounded />
      </div>
    </div>

    <div class="space-y-5">
      <div>Sizes</div>
      <div class="space-x-5 space-y-5">
        <Button label="small" size="small" icon="icon-[lucide--check]" />
        <Button label="无size" icon="icon-[lucide--check]" />
        <Button label="danger" size="large" icon="icon-[lucide--check]" />
      </div>
    </div>

    <!-- 结束 -->
  </div>
</template>
