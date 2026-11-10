// Promotions & news shown on the home page (latest 3).
// Add items here, newest first. While this list is empty, the home page
// shows a link card to /promotions-news instead.

export type NewsItem = {
  title: string;
  date: string; // e.g. '12 Mar 2026'
  summary: string;
  href: string;
};

export const news: NewsItem[] = [];
