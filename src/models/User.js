export default class User {
  constructor(figmaUser) {
    this.name = figmaUser.handle;
    this.email = figmaUser.email;
    this.avatar = figmaUser.img_url;
    this.id = figmaUser.id;
  }
}