import { useState } from 'react';

const abbreviations = {
  '창세기': ['창'],
  '베드로 전서': ['벧전', '밷전'],
  '출애굽기': ['출'],
  '레위기': ['레', '래'],
  '민수기': ['민'],
  '신명기': ['신'],
  '여호수아': ['여'],
  '사사기': ['사'],
  '룻기': ['룻'],
  '사무엘상': ['삼상'],
  '사무엘하': ['삼하'],
  '열왕기상': ['열상'],
  '열왕기하': ['열하'],
  '역대상': ['역상'],
  '느헤미아': ['느'],
  '에스더': ['에'],
  '욥기': ['욥'],
  '시편': ['시'],
  '잠언': ['잠'],
  '전도서': ['전'],
  '아가': ['아'],
  '이사야': ['이'],
  '예레미아': ['예'],
  '예레미아 애가': ['예애'],
  '에스겔': ['에스'],
  '다니엘': ['단'],
  '호세아': ['호'],
  '요엘': ['요엘'],
  '아모스': ['아모'],
  '오바댜': ['오바'],
  '요나': ['요나'],
  '미가': ['미'],
  '나훔': ['나'],
  '하박국': ['하'],
  '스바냐': ['스바'],
  '학개': ['학'],
  '스가랴': ['스가'],
  '말라기': ['말'],
};

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const convertToStandard = () => {
    let result = input;
    
    // 준말을 표준말로 변환하는 객체 생성
    const abbrToStandard = {};
    for (const [standard, abbrs] of Object.entries(abbreviations)) {
      for (const abbr of abbrs) {
        abbrToStandard[abbr] = standard;
      }
    }

    // 긴 준말부터 처리하기 위해 키를 길이 순으로 정렬
    const sortedAbbreviations = Object.keys(abbrToStandard).sort((a, b) => b.length - a.length);
    
    for (let abbr of sortedAbbreviations) {
      const regex = new RegExp(abbr, 'gi');
      result = result.replace(regex, abbrToStandard[abbr]);
    }
    
    setOutput(result);
  };

  return (
    <div className="App">
      <h1>준말을 표준말로 변환하기</h1>
      {/* <textarea 
        value={input} 
        onChange={handleInputChange} 
        placeholder="준말을 입력하세요"
        rows="4"
        cols="50"
      /> */}
      <input 
        type="text" 
        value={input} 
        onChange={handleInputChange} 
        placeholder="준말을 입력하세요"
      />
      <br />
      <button onClick={convertToStandard}>변환하기</button>
      <h2>변환 결과:</h2>
      <p>{output}</p>
    </div>
  );
}

export default App;