const order = {
    "_id": {
        "$oid": "69404d1b7fc43fe4c012b24c"
    },
    "paymentId": "ORDER79985b51aeda46fc8bdbb234a00dfaf0",
    "cartId": "69404b4deb3449ddde8fdf41",
    "paymentStatus": "PAID",
    "user": {
        "$ref": "user",
        "$id": "arghyadey639b7dc9deb91c44389a7de59a0f9cdcb95"
    },
    "initiatedAt": {
        "$date": "2025-12-15T18:02:03.946Z"
    },
    "orderItemList": [
        {
            "productId": "692a923a299fef5a8e10b7dc",
            "quantity": 2
        }
    ],
    "paymentMethod": "ONLINE",
    "totalPrice": 1000,
    "_class": "com.ecommerce.model.Order"
};

export default order;