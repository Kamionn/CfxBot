class ContextMenu {
    constructor(client, {
        name = null,
        type = null,
        perms = null,
        meperms = null,
    }) {
        this.client = client;
        this.config = {
            name,
            type,
            perms,
            meperms
        };
    };
};

module.exports = ContextMenu;