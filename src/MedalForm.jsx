import { useState } from "react";

// 입력
const inputContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginLeft: "30px",
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
  marginLeft: "10px",
};

function MedalForm({
  addCountry,
  updateCountry,
  outputCountry,
  sortCriteria,
  setSortCriteria,
}) {
  const [country, setCountry] = useState("");
  const [goldmedal, setGoldmedal] = useState("");
  const [silvermedal, setSilvermedal] = useState("");
  const [bronzemedal, setBronzemedal] = useState("");

  const handleAdd = (e) => {
    // 국가 추가
    e.preventDefault(); // 새로고침 방지하기
    console.log("국가 추가 버튼 클릭됨!"); // 클릭 이벤트 확인
    console.log("입력된 값:", country, goldmedal, silvermedal, bronzemedal); // 값 확인
    if (!country || !goldmedal || !silvermedal || !bronzemedal) {
      // 하나라도 입력하지 않는다면 alert (입력값 검증)
      alert("국가명과 모든 메달 개수를 입력해주세요!");
      return;
    }

    let existingCountry = false; // 국가가 존재하는지 여부 확인하기 (alert)
    for (let i = 0; i < outputCountry.length; i++) {
      // 현재 국가의 이름이 입력된 국가명과 일치하는 경우
      if (outputCountry[i].country === country) {
        existingCountry = true; // 배열 순회하면서 일치하는 국가 발견되면 true로 설정
        break;
      }
    }
    if (existingCountry) {
      alert("이미 존재하는 국가입니다.");
      return;
    }

    addCountry({
      // 새로운 국가 객체 생성하기
      id: Date.now(), // 고유 ID 생성하기
      country,
      goldmedal,
      silvermedal,
      bronzemedal,
    });

    setCountry(""); // 입력 후 초기화
    setGoldmedal("");
    setSilvermedal("");
    setBronzemedal("");
  };

  const handleUpdate = (e) => {
    // 국가 업데이트
    e.preventDefault();

    let countryFound = false; // 국가가 존재하는지 여부 확인하기 (alert)
    for (let i = 0; i < outputCountry.length; i++) {
      // 배열을 순회하며 일치하는 국가명 찾기
      if (outputCountry[i].country === country) {
        countryFound = true;

        const updatedData = {}; // 업데이트 할 데이터 저장할 객체 만들기

        if (goldmedal) updatedData.goldmedal = goldmedal; // 만약 goldmedal이 true라면(0이 아니라면) updatedData에 금메달 업데이트
        if (silvermedal) updatedData.silvermedal = silvermedal; // 은메달 업데이트
        if (bronzemedal) updatedData.bronzemedal = bronzemedal; // 동메달 업데이트

        updateCountry(outputCountry[i].id, updatedData); // App.jsx에 updateCountry 호출

        // 입력 후 초기화
        setCountry("");
        setGoldmedal("");
        setSilvermedal("");
        setBronzemedal("");

        break; // for문 종료
      }
    }

    if (!countryFound) {
      // countryFound가 false라면 실행
      alert("목록에 없는 국가입니다.");
      setCountry("");
      setGoldmedal("");
      setSilvermedal("");
      setBronzemedal("");
    }
  };

  return (
    <form>
      <div style={inputContainerStyle}>
        <div style={inputGroupStyle}>
          <h4>국가명</h4>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div style={inputGroupStyle}>
          <h4>금메달🥇</h4>
          <input
            type="number"
            value={goldmedal}
            onChange={(e) => setGoldmedal(Number(e.target.value))}
          />
        </div>
        <div style={inputGroupStyle}>
          <h4>은메달🥈</h4>
          <input
            type="number"
            value={silvermedal}
            onChange={(e) => setSilvermedal(Number(e.target.value))}
          />
        </div>
        <div style={inputGroupStyle}>
          <h4>동메달🥉</h4>
          <input
            type="number"
            value={bronzemedal}
            onChange={(e) => setBronzemedal(Number(e.target.value))}
          />
        </div>
      </div>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} type="submit" onClick={handleAdd}>
          국가 추가
        </button>
        <button style={buttonStyle} onClick={handleUpdate}>
          업데이트
        </button>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="gold"
            checked={sortCriteria === "gold"}
            onChange={() => setSortCriteria("gold")}
          />
          금메달 기준
        </label>
        <label>
          <input
            type="radio"
            value="total"
            checked={sortCriteria === "total"}
            onChange={() => setSortCriteria("total")}
          />
          총합 기준
        </label>
      </div>
    </form>
  );
}

export default MedalForm;
