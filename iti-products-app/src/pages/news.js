import React, { useState } from "react";

export default function News({ news = [] }) {
  const [search, setSearch] = useState("");

  const filtered = news.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="my-3">📰 News</h2>

      {/* Search box */}
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search news..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {news.length === 0 ? (
        <div className="alert alert-warning">
          Could not load news. Please check your internet connection.
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-muted">No results found for "{search}"</p>
      ) : (
        <div className="row">
          {filtered.map((item) => (
            <div className="col-md-6 mb-3" key={item.id}>
              <div className="card h-100 p-3">
                <h6 className="fw-bold">{item.title}</h6>
                <p className="text-muted" style={{ fontSize: "13px" }}>
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const news = await res.json();

    return { props: { news } };
  } catch (error) {
    // If fetch fails, return empty array — page won't crash
    return { props: { news: [] } };
  }
}