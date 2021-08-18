class Project {
  uid: string;

  name: string;

  path: string;

  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
    this.uid = '';
    this.generateUid();
  }

  protected generateUid(): void {
    this.uid = `${this.path}${this.name}`
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '-')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }
}

export default Project;
