interface INote {
  id?: string;
  title?: string;
  content?: string;
  createdAt?: Date
}

export default class Note implements INote {

  id?: string;
  title?: string;
  content?: string;
  createdAt: Date;

  constructor( id?: string, title?: string, content?: string, createdAt?: Date ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt ? createdAt : new Date();
  }

  setTitle( title: string ) {
    this.title = title;
  }

  setContent( content: string ) {
    this.content = content;
  }

  update(){
    this.createdAt = new Date();
  }
}
