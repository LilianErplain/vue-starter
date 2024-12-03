<script setup lang="ts">
interface Props {
  products?: Array<{
    id: string | number,
    label: string,
    variants: {
      paginatorInfo: {
        total: string
      },
      data: Array<{
        id: string | number,
        label: string,
        sku: string,
      }>
    }
  }>
}

withDefaults(defineProps<Props>(), {
  products: () => []
})
</script>

<template>
  <table>
    <thead>
    <tr>
      <th>ID</th>
      <th>Label</th>
      <th>SKU</th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="product in products"
        :key="product.id"
    >
      <td>{{ product.id }}</td>
      <td>{{ product.label }}</td>
      <td>{{ product.variants.paginatorInfo.total > 1 ? `${product.variants.paginatorInfo.total} variants` :
        product.variants.data[0].sku }}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f1f1f1;
}
</style>