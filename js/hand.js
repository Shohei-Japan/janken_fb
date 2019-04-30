let handsCollection;

getHands = () => {
  handsCollection = db.collection('rooms').doc(`room${roomNum}`).collection('hands');
  db.collection('rooms').doc(`room${roomNum}`).collection('hands').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        // 2人とも揃ったら勝負
        console.log(myHand, enemyHand)
        const data = change.doc.data();
        if (data.user !== uid) {
          enemyHand = data.hand;
        } else {
          myHand = data.hand;
        }
        if (myHand && enemyHand) {
          judge();
          return;
        }
      }
    });
  });
}

// じゃんけんの手の追加
click = e => {
  console.log(`${handsList[e.srcElement.id]} をクリック!!`);
  myHand = e.srcElement.id;
  myHandResult.textContent = handsList[myHand];

  handsCollection.add({
    user: uid,
    hand: myHand,
    created: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(doc => {
    console.log(`${doc.id} added!`);
  })
  .catch(e => {
    console.error(e);
  });  
}
