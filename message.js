let messagesCollection;

getMessages = () => {
  messagesCollection = db.collection('rooms').doc(`room${roomNum}`).collection('messages');
  // getCollectionChange(messagesCollection, messagesList, 'message');
  messagesCollection.orderBy('created').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        createMessageList(messagesList, change.doc.data().message, change.doc.data().user);
      }
    });
  });
}

// メッセージの追加
messageForm.addEventListener('submit', e => {
  e.preventDefault();

  messagesCollection.add({
    user: uid,
    message: messageInput.value,
    created: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(doc => {
    console.log(`${doc.id} added!`);
    messageInput.value = '';
  })
  .catch(e => {
    console.error(e);
  });  
});
