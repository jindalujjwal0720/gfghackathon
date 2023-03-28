export class NewsModel {
  constructor({
    _id,
    title,
    author,
    excerpt,
    summary,
    media,
    link,
    published_date,
  }) {
    this.id = _id;
    this.title = title;
    this.author = author;
    this.excerpt = excerpt;
    this.summary = summary;
    this.imageURL = media;
    this.link = link;
    this.publishedDate = published_date;
  }
}
