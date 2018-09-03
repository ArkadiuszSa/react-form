class Constants {
  public readonly API_BASE;
  constructor() {
    if (process.env.NODE_ENV === "production") {
      this.API_BASE = "https://event-list-server.herokuapp.com/api";
    } else {
      this.API_BASE = "http://localhost:4000/api";
    }
  }
}

export default new Constants();
