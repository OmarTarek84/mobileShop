const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
        firstname: String!
    }

    type User {
        _id: ID!
        email: String!
        password: String
        firstname: String!
        lastname: String!
        createdMobiles: [Mobile!]!
        cart: [Cart!]!
    }

    type Mobile {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        model: String!
        imageUrl: String!
        createdAt: String!
        updatedAt: String!
        userId: User!
    }

    type Cart {
        _id: ID!
        userId: User!
        mobileId: Mobile!
        quantity: Int!
    }

    input UserInput {
        email: String!
        password: String
        firstname: String!
        lastname: String!
        confirmPassword: String
    }

    input MobileInput {
        title: String!
        description: String!
        price: Float!
        model: String!
        imageUrl: String!
    }

    input AddedMobileToCartInput {
        _id: String!
        title: String!
        description: String!
        price: Float!
        model: String!
        imageUrl: String!
    }

    type OrderedMobile {
        mobile: Mobile!
        quantity: Int!
    }

    type Order {
        _id: ID!
        order: [OrderedMobile]!
        userId: User!
        createdAt: String!
        updatedAt: String!
    }

    type RootQuery {
        mobiles: [Mobile!]!
        loginUser(email: String!, password: String!): AuthData!
        cart(userId: String): [Cart!]!
        orders(userId: String): [Order!]!
    }

    type RootMutation {
        createUser(userInput: UserInput): User!
        createMobile(mobileInput: MobileInput): Mobile!
        editMobile(mobileId: String!, newMobile: MobileInput!): Mobile!
        addToCart(mobile: AddedMobileToCartInput!): Cart!
        removeCart(cartId: String!): [Cart]!
        clearCart: User!
        incrementItemToCart(cartId: String!, cartQuantity: Int!): Cart!
        decrementItemToCart(cartId: String!, cartQuantity: Int!): Cart
        createOrder: Order!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);