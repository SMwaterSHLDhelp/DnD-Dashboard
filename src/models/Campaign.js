class Campaign {
  constructor(id, name, description, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.worldLore = [];
    this.locations = [];
    this.factions = [];
    this.history = [];
    this.maps = [];
  }

  addWorldLore(lore) {
    this.worldLore.push(lore);
  }

  addLocation(location) {
    this.locations.push(location);
  }

  addFaction(faction) {
    this.factions.push(faction);
  }

  addHistoryEvent(event) {
    this.history.push(event);
  }

  addMap(map) {
    this.maps.push(map);
  }
}

module.exports = Campaign;