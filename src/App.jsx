import { useState } from "react";
import { bible } from "./bible.js";
import "./App.css";

const chapterTitle = {
  창세기: ["창", '창세기'],
  출애굽기: ["출"],
  레위기: ["레", "래"],
  민수기: ["민"],
  신명기: ["신"],
  여호수아: ["여"],
  사사기: ["사사"],
  룻기: ["룻"],
  사무엘상: ["삼상"],
  사무엘하: ["삼하"],
  열왕기상: ["열상"],
  열왕기하: ["열하"],
  역대상: ["역상"],
  느헤미아: ["느"],
  에스더: ["에"],
  욥기: ["욥"],
  시편: ["시"],
  잠언: ["잠"],
  전도서: ["전도"],
  아가: ["아"],
  이사야: ["이"],
  예레미아: ["렘", '에레미아'],
  예레미아애가: ["렘애"],
  에스겔: ["에스"],
  다니엘: ["단"],
  호세아: ["호"],
  요엘: ["요엘"],
  아모스: ["암", '아모스'],
  오바댜: ["오바"],
  요나: ["요나"],
  미가: ["미"],
  나훔: ["나"],
  하박국: ["하"],
  스바냐: ["스바"],
  학개: ["학"],
  스가랴: ["스가"],
  말라기: ["말"],
  마태복음: ["마", "마태복음"],
  마가복음: ["막", "마가복음"],
  누가복음: ["누", "눅", "누가복음"],
  요한복음: ["요", "요한복음"],
  사도행전: ["사", "사도행전"],
  로마서: ["롬", "로마", "로마서"],
  고린도전서: ["고전", "고린도전서"],
  고린도후서: ["고후", "고린도후서"],
  갈라디아서: ["갈", "갈라디아서"],
  에베소서: ["엡", '앱', "에베소서"],
  빌립보서: ["빌", "빌립보서"],
  골로새서: ["골", "골로새서"],
  데살로니가전서: ["데전", "데살로니가전서"],
  데살로니가후서: ["데후", "데살로니가후서"],
  디모데전서: ["딤전", "디모데전서"],
  디모데후서: ["딤후", "디모데후서"],
  디도서: ["디도", "디도서"],
  빌레몬서: ["빌", "빌레몬서"],
  히브리서: ["히", "히브리서"],
  야고보서: ["야고", "약", "야고보서"],
  베드로전서: ["베전", "벧전", "밷전", "배전", "베드로전서"],
  베드로후서: ["베후", "벧후", "밷후", "배후", "베드로후서"],
  요한1서: ["요일", "요한일서", "요한1서"],
  요한2서: ["요이", "요한이서", "요한2서"],
  요한3서: ["요삼", "요한삼서", "요한3서"],
  유다서: ["유다", "유다서"],
  요한계시록: ["계", "요계", "요한계시록"],
};

function App() {
  const [input, setInput] = useState("마");
  const [origin, setOrigin] = useState("마태복음");
  const [chapter, setChapter] = useState(1);
  const [verse, setVerse] = useState(1);
  const [output, setOutput] = useState("");
  const [number, setNumber] = useState(0);

  // useEffect(() => {
  // }, [origin]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    let keyword = e.target.value
    for (const [foundedWord, aliases] of Object.entries(chapterTitle)) {
      if (aliases.some(alias => alias.toLowerCase() === keyword)) {
        // console.log('foundedWord : ', foundedWord)
        setOrigin(foundedWord)
      }
    }
    // setOrigin(e.target.value);
    setNumber(0);
    setVerse(1);
  };
  const handleChapterChange = (e) => {
    setChapter(e.target.value);
    setNumber(0);
  };
  const handleVerseChange = (e) => {
    setVerse(e.target.value);
    setNumber(0);
  };

  const search = () => {
    console.log('bible : ', bible)
    console.log('origin : ', origin)
    
    if (origin in bible) {
      const all = bible[origin];
      // console.log("Find from Bible : ", all)
      let chapterNum = origin + chapter + "장";
      // console.log('chapterNum : ',  chapterNum)
      if (chapterNum in all) {
        const chapAll = all[chapterNum];
        // console.log("chpa: ", chapAll)
        console.log("verse : ", verse)
        if (verse in chapAll) {
          const res = chapAll[verse];
          // console.log("verse : ", res)
          setOutput(res);
          const addVerse = Number(verse) + 1
          const num = Number(number) + 1 
          console.log('Number : ', num)
          setNumber(num);
          setVerse(addVerse);
        }
      }
    }
    
  };

  function readMore() {
    search();
  }

  const names = [
    "마태복음", '마가복음', '누가복음','요한복음','사도행전','로마서','고린도전서','고린도후서','갈라디아서','에베소서',
    '빌립보서','골로새서','데살로니가전서','데살로니가후서','디모데전서','디모데후서','디도서','빌레몬서',
    '히브리서','야고보서','베드로전서','베드로후서','요한1서','요한2서','요한3서','유다서','요한계시록'
  ];
  // const [selectedName, setSelectedName] = useState("");

  const handleNameClick = (name) => {
    setNumber(0);
    setInput(name)
    setOrigin(name);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="mt-5 mb-3">
          <div className="text-5xl">성경 찾기</div>
        </div>

        <div className="mb-3">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              maxWidth: "600px", // 최대 너비 설정
              margin: "0 auto", // 중앙 정렬
            }}
          >
            {names.map((name, index) => (
              <div
                key={index}
                className="text-xs"
                onClick={() => handleNameClick(name)}
                style={{
                  cursor: "pointer",
                  margin: "2px",
                  padding: "2px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  width: "calc(33.33% - 20px)", // 3개씩 배치를 위한 너비 설정
                  boxSizing: "border-box",
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>

        <div className="">
          <div className="">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="셩경 약어"
              className="max-w-24 h-10 text-center border-2 rounded-lg border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_10px_#08f,0_0_15px_#08f]" // 15, 30 -> 10, 15
            />
            <input
              type="number"
              value={chapter}
              onChange={handleChapterChange}
              placeholder="1"
              className="max-w-14 h-10 ml-3 mr-2 text-center border-2 rounded-lg border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_10px_#08f,0_0_15px_#08f]"
            />
            <span className="m-auto">장</span>
            <input
              type="number"
              value={verse}
              onChange={handleVerseChange}
              placeholder="1"
              className="max-w-14 h-10 ml-3 mr-2 text-center border-2 rounded-lg border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_10px_#08f,0_0_15px_#08f]"
            />
            <span className="m-auto">절</span>
          </div>

          <br />
          <div className="flex justify-center">
            <button className="min-w-52 mb-10" onClick={search}>
              찾기
            </button>
          </div>
          {output.length > 1 ? (
            <div className="text-xl mb-3">
              {origin} {chapter}장 {verse}절
            </div>
          ) : (
            ""
          )}

          <div className="text-xl">{output}</div>

          {output.length > 1 ? (
            <div className="mt-10">
              <button onClick={readMore}>계속읽기</button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default App;
