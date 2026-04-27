import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [greeting, setGreeting] = useState('로드 중...')
  const [postResult, setPostResult] = useState('')

  useEffect(() => {
    // GET 요청: Greeting 메시지 가져오기
    fetch('http://localhost:8080/api/cors/greeting')
      .then(response => response.text())
      .then(data => setGreeting(data))
      .catch(error => {
        console.error('Error fetching greeting:', error)
        setGreeting('백엔드 연결 실패')
      })
  }, [])

  const handlePostRequest = () => {
    // POST 요청: JSON 본문 전송 (Preflight 유도)
    fetch('http://localhost:8080/api/cors/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: '안녕 백엔드! 프론트엔드에서 보냈어.' })
    })
      .then(response => response.text())
      .then(data => setPostResult(data))
      .catch(error => {
        console.error('Error post data:', error)
        setPostResult('데이터 전송 실패')
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>보안 실습 - 문제 4</h1>
        <div className="card">
          <h2>백엔드로부터의 인사말 (GET):</h2>
          <p className="greeting-text">{greeting}</p>
        </div>
        
        <div className="card">
          <h2>POST 요청 테스트 (CORS Preflight):</h2>
          <button onClick={handlePostRequest}>데이터 보내기</button>
          {postResult && <p className="result-text">{postResult}</p>}
        </div>

        <div className="info">
          <h3>네트워크 격리 설정:</h3>
          <ul>
            <li>Frontend -> Backend: <strong>허용</strong></li>
            <li>Backend -> Database: <strong>허용</strong></li>
            <li>Frontend -> Database: <strong>차단 (네트워크 레벨 격리)</strong></li>
          </ul>
        </div>
      </header>
    </div>
  )
}

export default App
