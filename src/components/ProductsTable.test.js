// ProductsTable.test.js
import { render } from '@testing-library/vue'
import ProductsTable from './ProductsTable.vue'

test('it should work', () => {
    const { getByText } = render(ProductsTable, {
        props: {
            products: []
        }
    })

    // assert output
    getByText('ID')
    getByText('Label')
    getByText('SKU')
})