// 入室画面
const entryContainer = document.getElementById('entry__container');
// 入室後 ユーザー情報
const appContainer = document.getElementById('app__container');
const currentRoomNum = document.getElementById('currentRoomNum');
const currentUserId = document.getElementById('currentUserId');

// じゃんけんエリア
const jankenField = document.getElementById('jankenField');
const handsList = ['グー', 'チョキ', 'パー'];

const handsResults = document.getElementById('handsResults');
const myHandResult = document.getElementById('myHandResult');
const enemyHandResult = document.getElementById('enemyHandResult');
const result = document.getElementById('result');
const messagesList = document.getElementById('messagesList');
const errorMessage = document.getElementById('errorMessage');

// グローバル変数群
let myHand; // 自分の手
let enemyHand; // 相手の手
let roomNum; // 入室している部屋

const messageInput = document.getElementById('messageInput');
const messageForm = document.getElementById('messageForm');
const enterRoom = document.getElementById('enterRoom');

// 初期化　じゃんけんのボタンを生成する
init = () => {
  authLogin();
  handsList.forEach((hand, key) => {
    let item = document.createElement('div');
    item.className = 'hand';
    item.textContent = hand;
    item.id = key
    item.onclick = click;
    jankenField.append(item);
  });
}

/**
 * チャットのリストを生成する
 */
createMessageList = (ul, data, user) => {
  const li = document.createElement('li');
  li.classList = 'message__wrapper';
  // 自分の発言でなければ別のクラスをつける
  li.innerHTML = user !== uid ? `<p class="message another">${data}</p>` : `<p class="message mine">${data}</p>`
  ul.append(li);
}

/** 
 * ログインしている場合、
 * appContainer (じゃんけんとチャット) を表示
 * entryContainer (入室画面) を非表示
 */
showContent = () => {
  currentRoomNum.textContent = `部屋番号:${roomNum}`;
  currentUserId.textContent = `ユーザーID: ${shortedId}`;
  appContainer.classList.remove('hidden');
  entryContainer.classList.add('hidden');
}

/**
 * ログアウトしている場合、
 * appContainer (じゃんけんとチャット) を非表示
 * entryContainer (入室画面) を表示
 */
hideContent = () => {
  appContainer.classList.add('hidden');
  entryContainer.classList.remove('hidden');
}

showError = () => {
  errorMessage.textContent = error.message;
}

judge = () => {
  if (myHand === '0') {
    const judgeList = {
      '0': 'ドロー',
      '1': 'あなたの勝ち',
      '2': 'あなたの負け'
    }
    result.textContent = judgeList[enemyHand];
    enemyHandResult.textContent = handsList[enemyHand];
  } 
  if (myHand === '1') {
    const judgeList = {
      '0': 'あなたの負け',
      '1': 'ドロー',
      '2': 'あなたの勝ち'
    }
    result.textContent = judgeList[enemyHand];
    enemyHandResult.textContent = handsList[enemyHand];
  } 
  if (myHand === '2') {
    const judgeList = {
      '0': 'あなたの勝ち',
      '1': 'あなたの負け',
      '2': 'ドロー'
    }
    result.textContent = judgeList[enemyHand];
    enemyHandResult.textContent = handsList[enemyHand];
  } 
}