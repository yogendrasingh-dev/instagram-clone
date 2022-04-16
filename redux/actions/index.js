import * as firebase from '../../firebase';
import {USER_STATE_CHANGE} from '../constants';

export function fetchUser() {
  return dispatch => {
    const user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          console.log(snapshot.data());
          dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()});
        } else {
          console.log('does not exists'); //user doesn't exists
        }
      });
  };
}
