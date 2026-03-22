class Session {
  constructor(id, campaignId, date, title, description, createdAt, updatedAt) {
    this.id = id;
    this.campaignId = campaignId;
    this.date = date;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.npcs = [];
    this.characters = [];
    this.notes = [];
  }

  addNPC(npc) {
    this.npcs.push(npc);
  }

  addCharacter(character) {
    this.characters.push(character);
  }

  addNote(note) {
    this.notes.push(note);
  }
}

module.exports = Session;