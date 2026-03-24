export class Edge {
  constructor({ id, source_note_id, target_note_id, relation_type, created_at }) {
    this.id = id;
    this.sourceNoteId = source_note_id;
    this.targetNoteId = target_note_id;
    this.relationType = relation_type;
    this.createdAt = created_at;
  }
}

