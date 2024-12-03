import gql from "graphql-tag";

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!, $device: String!, $twoFactorCode: String) {
        Login(email: $email, password: $password, device: $device, twoFactorCode: $twoFactorCode)
    }
`

export const GET_CURRENT_USER = gql`
    query CurrentUserProfile {
        CurrentUserProfile {
            id
            user {
                id
                email
            }
            company {
                id
                label
            }
        }
    }
`

export const GET_PRODUCTS = gql`
    query Products(
        $orderBy: [QueryProductsOrderByOrderByClause!] = [{column: LABEL, order: ASC}]
        $where: QueryProductsWhereWhereConditions = { AND: [{ column: ACTIVE, operator: EQ, value: true }] }
        $first: Int
        $page: Int
    ) {
        Products(orderBy: $orderBy, where: $where, first: $first, page: $page) {
            paginatorInfo {
                total
            }
            data {
                id
                label
                variants {
                    paginatorInfo {
                        total
                    }
                    data {
                        id
                        sku
                        on_hand
                    }
                }
            }
        }
    }
`
