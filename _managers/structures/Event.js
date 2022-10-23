class Event {
    constructor(client, {
        name = null,
    }) {
        this.client = client;
        this.config = {
            name
        };
    };
};

module.exports = Event;