import { useState } from 'react';

const abbreviations = {
  '그 아이': ['걔', '그애'],
  '베드로 전서': ['벧전', '밷전'],
  '꾸준하게': ['꾸준히'],
  '내 것': ['내꺼', '내거'],
  '내용 없음': ['냉무'],
  '너무': ['넘'],
  '무엇이 미스터리': ['뭥미'],
  '빙고': ['빙구'],
  '사무치게 그립다': ['삼귀다'],
  '솔직히 까놓고 말해서': ['솔까'],
  '아니 방금': ['앙팡'],
  '알아서 잘 딱 깔끔하고 센스있게': ['알잘딱깔센'],
  // 더 많은 표준말-준말 쌍을 여기에 추가할 수 있습니다.
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