const auth = firebase.auth();
let uid;
let shortedId;
const error = {
  code: null,
  message: null
}

authLogin = () => {
  auth.signInAnonymously().catch(e => {
    error.code = e.code;
    error.message = e.message;
  });
};

authLogout = () => {
  auth.signOut();
  // ログアウトと同時に新しい匿名ログインID を取得する
  authLogin();
};

// ページを訪れた際に自動で匿名ログインする
auth.onAuthStateChanged(user => {
  if (user) {
    uid = user.uid;
    shortedId = user.uid.substr(0, 5);
    console.log(`${user.uid.substr(0, 5)} としてログインしてるよ`);
    return;
  }
  console.log('ログアウトしてるよ');
  uid = null;
  shortedId = null;
  hideContent();
});

// 新しい部屋を作って入室する
createRoom = () => {
  const user = auth.currentUser;

  // 部屋番号を生成
  const num = Math.round(Math.random() * 10000);
  // roomNum をグローバルに持つ
  roomNum = num;
  
  // firebase に rooms collection と部屋番号を持った document を作成
  const roomUsersCollection = db.collection('rooms').doc(`room${num}`).collection('users');
  
  roomUsersCollection.get()
  .then(doc => {
    if (doc.host) { // host がすでにいる場合は return
      return;
    }
    roomUsersCollection.doc('host').set({
      uid: user.uid
    });
    getHands();
    getMessages();
    showContent();  
  })
  .catch(e => {
    console.error(e);
  });
}

// 既存の部屋番号を指定して入室する
enterRoom.addEventListener('submit', e => {
  e.preventDefault();
  // ログイン情報を取得
  const user = auth.currentUser;
  uid = user.uid;

  // 入力した部屋番号
  const inputRoomNum = document.getElementById('inputRoomNum').value;
  // roomNum をグローバルに持つ
  roomNum = inputRoomNum;

  const roomUsersCollection = db.collection('rooms').doc(`room${inputRoomNum}`).collection('users');
  roomUsersCollection.get()
  .then(doc => {
    if (doc.docs.length >= 2) { // host, guest がすでにいる場合は return
      error.message = `${inputRoomNum}は満員です`;
      showError();
      return;
    }
    authLogin();
    roomUsersCollection.doc('guest').set({
      uid: uid
    });  
    getHands();
    getMessages();
    showContent();  
  })
  .catch(e => {
    console.error(e);
  });
})