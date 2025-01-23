import { useState } from "react";

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
  color: "blue"
};

const inputContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginLeft: "30px"
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "20px",

};

const buttonStyle = {
  backgroundColor: "#ffcc00",
  border: "none",
  borderRadius: "5px",
  padding: "10px 20px",
  cursor: "pointer",
  fontWeight: "bold",
  marginLeft: "10px"
};

const outputContainerStyle = {
  display: "flex",
  flexDirection: "column", 
  alignItems: "center", // 중앙 정렬
  width: "100%",
  marginTop: "20px",
  padding: "0",
  listStyle: "none"
};

const outputGroupStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between", // 내부 요소 균등 배치
  width: "80%", // 적절한 너비 설정
  padding: "15px",
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

function App() {
  const [country, setCountry] = useState(""); // 나라
  const [goldmedal, setGoldmedal] = useState(0); // 금메달
  const [silvermedal, setSilvermedal] = useState(0); // 은메달
  const [bronzemedal, setBronzemedal] = useState(0); // 동메달
  const [outputCountry, setOutputCountry] = useState([]); // 입력된 국가 정보

  const addCountry = (e) => { // 추가 기능
    e.preventDefault(); // 새로고침 방지

    if (!country || !goldmedal || !silvermedal || !bronzemedal) {
      alert("국가명과 모든 메달의 개수를 선택해주세요!");
      setCountry("");
      setGoldmedal("");
      setSilvermedal("");
      setBronzemedal("");
      return;
    }
    
    const newCountry = {  // 새로운 변수에 입력된 국가 정보 넣기
      id: Date.now(), // id 생성을 통해 고유값 생성하기
      country,
      goldmedal,
      silvermedal,
      bronzemedal
    };

    

    setOutputCountry([...outputCountry, newCountry]); // 스프레드를 이용하여 새로운 변수 생성 및 입력된 국가 정보 배열에 추가
    setCountry("");
    setGoldmedal("");
    setSilvermedal("");
    setBronzemedal("");

  }

  const removeCountry = (id) => { // 생성했던 고유값을 이용해 삭제 로직 구현하기
    const filteredCountry = outputCountry.filter((country) => {
      return id !== country
    });

    setOutputCountry(filteredCountry);
  }


  return (
    <>
      <div style={boxStyle}>
        <h1 style={titleStyle}>2024 파리 올림픽</h1>
        <form onSubmit={addCountry}>
          <div style={inputContainerStyle}>
            <div style={inputGroupStyle}>

              <h4>국가명</h4>
              <input type="text" value={country} placeholder="국가 입력" onChange={(e) => {
                setCountry(e.target.value);
              }} />
            </div>
            <div style={inputGroupStyle} >
              <h4>금메달</h4>
              <input type="number" value={goldmedal} placeholder="0" onChange={(e) => {
                setGoldmedal(Number(e.target.value));
              }} />
            </div>
            <div style={inputGroupStyle}>
              <h4>은메달</h4>
              <input type="number" value={silvermedal} placeholder="0" onChange={(e) => {
                setSilvermedal(Number(e.target.value));
              }} />
            </div>
            <div style={inputGroupStyle}>
              <h4>동메달</h4>
              <input type="number" value={bronzemedal} placeholder="0" onChange={(e) => {
                setBronzemedal(Number(e.target.value));
              }} />
            </div>
          </div>
          <div style={buttonContainerStyle}>
            <button style={buttonStyle} type="submit" >국가 추가</button>
            <button style={buttonStyle}>업데이트</button>

          </div>
        </form>
      </div>
      <h3 style={{ textAlign: "center" }}>추가된 국가 목록</h3>
      <ul style={outputContainerStyle}>
        {outputCountry.map((newCo) => {
          return <li style={outputGroupStyle}>
            {newCo.country} : 금메달 {newCo.goldmedal}, 은메달 {newCo.silvermedal}, 동메달 {newCo.bronzemedal} <button style={outputButtonStyle} onClick={() => removeCountry(newCo)}>삭제</button>
          </li>
        })}
      </ul>
    </>
  );
}

export default App;
