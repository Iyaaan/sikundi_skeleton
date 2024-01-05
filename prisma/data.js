const Roles = [
    {
        name: "Admin",
        permissions: {
            post: [
                { label: "view", value: "view" },
                { label: "draft", value: "draft" },
                { label: "delete", value: "delete" },
                { label: "soft_delete", value: "soft_delete" },
                { label: "publish", value: "publish" },
                { label: "pending", value: "pending" }
            ],
            category: [
                { label: "view", value: "view" },
                { label: "delete", value: "delete" },
                { label: "create", value: "create" },
                { label: "update", value: "update" }
            ],
            tag: [
                { label: "view", value: "view" },
                { label: "delete", value: "delete" },
                { label: "create", value: "create" },
                { label: "update", value: "update" }
            ],
            library: [
                { label: "view", value: "view" },
                { label: "delete", value: "delete" },
                { label: "create", value: "create" }
            ],
            graphic: [
                { label: "view", value: "view" },
                { label: "draft", value: "draft" },
                { label: "delete", value: "delete" },
                { label: "soft_delete", value: "soft_delete" },
                { label: "publish", value: "publish" },
                { label: "pending", value: "pending" }
            ],
            photo: [
                { label: "view", value: "view" },
                { label: "draft", value: "draft" },
                { label: "delete", value: "delete" },
                { label: "soft_delete", value: "soft_delete" },
                { label: "publish", value: "publish" },
                { label: "pending", value: "pending" }
            ],
            video: [
                { label: "view", value: "view" },
                { label: "draft", value: "draft" },
                { label: "delete", value: "delete" },
                { label: "soft_delete", value: "soft_delete" },
                { label: "publish", value: "publish" },
                { label: "pending", value: "pending" }
            ],
            user: [
                { label: "view", value: "view" },
                { label: "block", value: "block" },
                { label: "create", value: "create" },
                { label: "update", value: "update" }
            ],
            role: [
                { label: "view", value: "view" },
                { label: "delete", value: "delete" },
                { label: "create", value: "create" },
                { label: "update", value: "update" }
            ],
            adBanner: [
                { label: "view", value: "view" },
                { label: "draft", value: "draft" },
                { label: "delete", value: "delete" },
                { label: "soft_delete", value: "soft_delete" },
                { label: "publish", value: "publish" },
                { label: "pending", value: "pending" }
            ],
        }
    },
    {
        name: "Editor",
        permissions: {

        }
    },
    {
        name: "Author",
        permissions: {

        }
    }
];

const Users = [
    {
        userName: "ހަސަން އިޔާން",
        userNameEn: "Hassan Iyan",
        email: "hassan.iyan.l@gmail.com",
        password: "iyan@sikundi",
        description: "I am the developer of the websote",
        status: "active",
        roleId: 1
    },
    // {
    //     userName: "ޢާލިމް އަބްދުއްލަތީފް",
    //     userNameEn: "Aalim Abdul Latheef",
    //     email: "aalimabdullatheef133@gmail.com",
    //     password: "aalimabdullatheef133@sikundi",
    //     description: "I dont care",
    //     status: "active",
    //     roleId: 2
    // },
    // {
    //     userName: "ހުސައިން އަހްމަދު",
    //     userNameEn: "Hussain Ahmed",
    //     email: "comphusen2340@gmail.com",
    //     password: "hussain@sikundi",
    //     description: "CEO of gaafu",
    //     status: "active",
    //     roleId: 2
    // },
    // {
    //     userName: "އަހްމަދު ސަދޫފް",
    //     userNameEn: "Ahmed Sadhoof Moosa",
    //     email: "sadhoofmoosa@gmail.com",
    //     password: "shadhoof@sikundi",
    //     description: "Journalist tester",
    //     status: "active",
    //     roleId: 2
    // },
    // {
    //     userName: "ދާއިން",
    //     userNameEn: "Dhaain",
    //     email: "asneird@gmail.com",
    //     password: "asneird@sikundi",
    //     description: "Journalist tester",
    //     status: "active",
    //     roleId: 2
    // },
]

module.exports = {
    Roles,
    Users
};