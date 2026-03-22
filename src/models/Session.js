class Session {
  constructor(id, campaignId, name, date, notes, events) {
    this.id = id;
    this.campaignId = campaignId;
    this.name = name;
    this.date = date;
    this.notes = notes;
    this.events = events || [];
  }

  addEvent(event) {
    this.events.push(event);
  }
}

module.exports = Session;