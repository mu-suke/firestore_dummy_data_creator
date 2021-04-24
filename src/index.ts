import * as admin from 'firebase-admin'


const serviceAccount = require('../bin/keys/service_account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://mysandbox-cba70.firebaseio.com'
})

const firestore = admin.firestore()

const version = 'v1'
const nitFesRef = firestore.doc(`/nitFes/${version}`)
const shopsRef = nitFesRef.collection('shops')

const iteration = 5
async function setOrderData(shopId: string) {
  try {
    const res = await shopsRef.doc(shopId)
      .collection("orders")
      .doc()
      .create({
        count: getRandomInt(),
        createdAt: admin.firestore.Timestamp.now()
      })
  } catch (error) {
    const err = {
      shopID: shopId,
      kind: '追加処理が失敗した',
      error: error
    }
    console.log(err);
  }
}

function getRandomInt() {
  return Math.floor(Math.random() * 5) + 1;
}

async function main() {
  for (let i = 0; i < iteration; i++) {
    await setOrderData('ljMFHw9DAzC0ZM9IawaF')
  }
  console.log('ok')
}

main()