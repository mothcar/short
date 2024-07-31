import { useState } from 'react';
import {bible} from './bible.js'

const abbreviations = {
  '창세기': ['창'],
  '베드로 전서': ['벧전', '밷전'],
  '출애굽기': ['출'],
  '레위기': ['레', '래'],
  '민수기': ['민'],
  '신명기': ['신'],
  '여호수아': ['여'],
  '사사기': ['사사'],
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
  '전도서': ['전도'],
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
  '마태복음': ['마'],
  '마가복음': ['막'],
  '누가복음': ['누'],
  '요한복음': ['요'],
  '사도행전': ['사'],
  '로마서': ['롬'],
  '고린도전서': ['고전'],
  '고린도후서': ['고후'],
  '갈라디아서': ['갈'],
  '에베소서': ['에베'],
  '빌립보서': ['빌'],
  '골로새서': ['골'],
  '데살로니가전서': ['데전'],
  '데살로니가후서': ['데후'],
  '디모데전서': ['딤전'],
  '디모데후서': ['딤후'],
  '디도서': ['디도'],
  '빌레몬서': ['빌'],
  '히브리서': ['히'],
  '야고보서': ['야고'],
  '베드로전서': ['베전', '벧전', '밷전', '배전'],
  '베드로후서': ['베후', '벧후', '밷후', '배후'],
  '요한1서': ['요일'],
  '요한2서': ['요이'],
  '요한3서': ['요삼'],
  '유다서': ['유다'],
  '요한계시록': ['요계'],
};

function App() {
  const [input, setInput] = useState('');
  const [origin, setOrigin] = useState('');
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');
  const [disVerse, setDisverse] = useState('');
  const [output, setOutput] = useState('');
  const [number, setNumber] = useState(0);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const handleChapterChange = (e) => {
    setChapter(e.target.value);
  };
  const handleVerseChange = (e) => {
    setVerse(e.target.value);
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

    const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
    const onlyKor = result.match(koreanRegex);
    // setOutput(result2 ? onlyKor.join('') : '');
    const chapterName = onlyKor.join('')
    setOrigin(chapterName)
    // console.log('Korean only : ', chapterName )
    // console.log('Chapter: ', chapter )
    // console.log('verse: ', verse )
    // console.log('Bible : ', bible)

    if (chapterName in bible) {
      const all =  bible[chapterName];
      // console.log("Find from Bible : ", all)
      let chapterNum = chapterName +chapter+"장"
      // console.log('Check name : ', chapterNum)
      if(chapterNum in all) {
        const chapAll =  all[chapterNum];
        // console.log("chpa: ", chapAll)
        const newVerse = Number(verse) + Number(number)
        if(newVerse in chapAll) {
          const res =  chapAll[newVerse];
          // console.log("verse : ", res)
          setOutput(res);
          setDisverse(newVerse)
        }
      }
    }

    setNumber(number +1)
    
    
    
    
    // setOutput(result);
  };

  function readMore () {
    convertToStandard()
    // setDisverse(number+1)
  }

  return (
    <div className="App">
      <h1>성경 찾기</h1>
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
      <input 
        type="number" 
        value={chapter} 
        onChange={handleChapterChange} 
        placeholder="1"
      />
      <span>장</span>
      <input 
        type="number" 
        value={verse} 
        onChange={handleVerseChange} 
        placeholder="1"
      />
      <span>절</span>
      <br />
      <button onClick={convertToStandard}>찾기</button>
      <h2>결과:<span>{origin} {chapter}장 {disVerse}절</span></h2>
      <p>{output}</p>

      <div>
      <button onClick={readMore}>계속읽기</button>
      </div>
    </div>
  );
}

export default App;