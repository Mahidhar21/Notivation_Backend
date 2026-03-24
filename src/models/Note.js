export class Note {
  constructor({
    id,
    title,
    content,
    author_id,
    visibility,
    forked_from,
    created_at,
    updated_at
  }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.authorId = author_id;
    this.visibility = visibility;
    this.forkedFrom = forked_from;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }
}

