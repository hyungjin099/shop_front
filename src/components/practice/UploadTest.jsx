
import axios from 'axios';
import React, { useState } from 'react'

const UploadTest = () => {
  //첨부파일 input 태그에서 선택한 파일을 저장할 변수
  const [firstFile, setFirstFile] = useState(null);

  //첨부파일 input 태그에서 선택한 여러 파일을 저장할 변수
  const [secondFiles, setScondFiles] = useState(null);

  //자바로 데이터를 전달할 때 문자뿐만 아니라 파일 데이터도 가져간다는 것을 설정
  const fileConfig = {header:{'Content-Type' : 'multipart/form-data'}};

  const sendFile = () => {
    //첨부파일 데이터를 자바로 전달하기 위해서는 FormData() 객체를 사용해야 함
    //form 데이터 객체 생성 : 
    // -> 첨부파일, input 태그 등의 모든 데이터를 자바로 가져갈 수 있는 객체
    const form = new FormData();
    form.append('bookName', 'hong');
    form.append('bookPrice', 20);
    form.append('firstFile', firstFile);

    //post() 메서드의 세번째 매개변수로 fileConfig를 전달(이거해야 파일 첨부 됨)
    axios.post(
      '/api/test/upload1'
      , form
      , fileConfig)
    .then()
    .catch((e) => {
      console.log(e);
    });
  }

  return (
    <div>
      <input 
        //multiple //이 속성을 사용하면 한 번에 여러 파일 선택 가능
        type='file'
        onChange={(e) => {
          //e.target.files : 선택한 파일들의 정보
          console.log(e.target.files);
          console.log(e.target.files[0]);

          //파일을 선택할때마다 선택한 파일을 firstFile에 저장한다.
          setFirstFile(e.target.files[0]);
        }}
      />
      <button type='button' onClick={() => {sendFile()}}>파일전송1</button>
      <br />
      <input 
        type='file' 
        multiple
        onChange={(e) => {
          setScondFiles(e.target.files)
        }}
      />
      <button type='button' onClick={() => {
        const form2 = new FormData();
        
        //파일 첨부를 했을 때만.
        if(secondFiles != null){
          //첨부한 파일 갯수만큼 formData에 저장
          for(const eachFile of secondFiles){
            form2.append('files', eachFile);
          }
        }

        axios.post('/api/test/upload2', form2, fileConfig)
        .then().catch();
      }}>다중 파일 전송</button>
    </div>
  )
}

export default UploadTest