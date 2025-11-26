// components/TableDisplay.js
import React from "react";
import Link from "next/link";

const TableDisplay = ({ table, projectId }) => {
  return (
    <div className="project-card fade-up" style={{ padding: 20 }}>
      <div className="kicker">SQL TABLE</div>
      <h3>{table.title}</h3>

      <div style={{ overflowX: "auto", marginTop: 12 }}>
        <table className="sql-table">
          <thead>
            <tr>
              {table.columns.map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {table.data.map((row, rIdx) => (
              <tr key={rIdx}>
                {row.map((cell, cIdx) => (
                  <td key={cIdx}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {projectId && (
        <Link
          href={`/projects/${projectId}`}
          className="btn btn-primary"
          style={{ marginTop: 12 }}
        >
          View Full Project
        </Link>
      )}
    </div>
  );
};

export default TableDisplay;
