// 출력
const outputContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  marginTop: "20px",
  padding: "0",
  listStyle: "none",
};

const outputGroupStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "80%",
  padding: "20px",
  border: "1px solid gray",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
  boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
  marginBottom: "10px",
};

const outputButtonStyle = {
  backgroundColor: "#ffcc00",
  border: "none",
  borderRadius: "5px",
  padding: "8px 15px",
  cursor: "pointer",
  fontWeight: "bold",
};

function MedalList({ outputCountry, removeCountry }) {
  return (
    <ul style={outputContainerStyle}>
      {outputCountry.map((prev) => (
        <li key={prev.id} style={outputGroupStyle}>
          <div style={{ flex: 1, textAlign: "left" }}>{prev.country}</div>
          <div style={{ flex: 1, textAlign: "center" }}>
            🥇 {prev.goldmedal}개
          </div>
          <div style={{ flex: 1, textAlign: "center" }}>
            🥈 {prev.silvermedal}개
          </div>
          <div style={{ flex: 1, textAlign: "center" }}>
            🥉 {prev.bronzemedal}개
          </div>
          <button
            style={outputButtonStyle}
            onClick={() => removeCountry(prev.id)}
          >
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
}

export default MedalList;
