// import firebase from 'firebase/compat/app';
// import * as firebaseui from 'firebaseui'
// import 'firebaseui/dist/firebaseui.css'


// const ui = new firebaseui.auth.AuthUI(firebase.auth())

//  ui.start('#firebaseui-auth-container', {
//   signInOptions: [
//     {
//       // Google provider must be enabled in Firebase Console to support one-tap
//       // sign-up.
//       provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       // Required to enable ID token credentials for this provider.
//       // This can be obtained from the Credentials page of the Google APIs
//       // console. Use the same OAuth client ID used for the Google provider
//       // configured with GCIP or Firebase Auth.
//       clientId: '931139458173-dhfatciivkiinqcff25ib2vo0tifd7o4.apps.googleusercontent.com'
//     },
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//     firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//     firebase.auth.GithubAuthProvider.PROVIDER_ID,
//     firebase.auth.EmailAuthProvider.PROVIDER_ID,
//   ],
//   // Required to enable one-tap sign-up credential helper.
//   credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
// });
// // Auto sign-in for returning users is enabled by default except when prompt is
// // not 'none' in the Google provider custom parameters. To manually disable:
// ui.disableAutoSignIn();

// console.log(ui.disableAutoSignIn())

const Auth = () => {
  return (
    <div>
      {/* <button id='firebaseui-auth-container' */}
      {/* // onClick={() => ui.start}>регистрация </button> */}
    </div>
  )
}

export default Auth