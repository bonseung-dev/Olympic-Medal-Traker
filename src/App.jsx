import { useState } from "react";
import MedalForm from "./MedalForm";
import MedalList from "./MedalList";

const boxStyle = {
  backgroundColor: "#f8f8f8",
  display: "flex",
  flexDirection: "column",
  width: "80%",
  margin: "0 auto",
  border: "solid 1px gray",
  borderRadius: "5px",
  boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
  padding: "20px",
};

const titleStyle = {
  fontSize: "2rem",
  margin: "0",
  textAlign: "center",
  fontWeight: "bold",
  color: "blue",
};

function App() {
  const [outputCountry, setOutputCountry] = useState([]); // 국가별 메달 저장
  const [sortCriteria, setSortCriteria] = useState("gold");
  const addCountry = (newCountry) => {
    // 국가 정보 추가
    setOutputCountry([...outputCountry, newCountry]);
  };

  const updateCountry = (id, updatedData) => {
    // 국가 정보 업데이트
    const updatedCountries = outputCountry.map((country) => {
      if (country.id === id) {
        return { ...country, ...updatedData };
      }
      return country;
    });
    setOutputCountry(updatedCountries);
  };

  const removeCountry = (id) => {
    // 국가 정보 삭제
    const filteredCountry = outputCountry.filter(
      (country) => country.id !== id
    );
    setOutputCountry(filteredCountry);
  };

  const sortedCountry = [...outputCountry].sort((a, b) => {
    if (sortCriteria === "gold") {
      // 만약 라디오 버튼의 밸류가 "gold"라면
      return b.goldmedal - a.goldmedal;
    } else if (sortCriteria === "total") {
      const totalA = a.goldmedal + a.silvermedal + a.bronzemedal;
      const totalB = b.goldmedal + b.silvermedal + b.bronzemedal;
      return totalB - totalA;
    } else {
      console.log("라디오 버튼 오류");
    }
  });

  return (
    <>
      <div style={boxStyle}>
        <h1 style={titleStyle}>2024 파리 올림픽</h1>
        <MedalForm
          addCountry={addCountry}
          updateCountry={updateCountry}
          outputCountry={outputCountry}
          sortCriteria={sortCriteria}
          setSortCriteria={setSortCriteria}
        />
      </div>
      <h3 style={{ textAlign: "center" }}>추가된 국가 목록</h3>
      <MedalList outputCountry={sortedCountry} removeCountry={removeCountry} />
    </>
  ); // 자식 컴포넌트로 props 넘겨주기
}

export default App;
