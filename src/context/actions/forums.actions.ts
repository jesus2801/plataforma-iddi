import { AnyAction, Dispatch } from 'redux';

import { ForumCategory, HelpForumDoc } from '@interfaces/index';
import { ForumsFilter } from '@interfaces/states';

import firebase from '@firebase/index';

import fb from 'firebase/app';
import { INIT_SET_FORUMS, SET_FORUMS } from 'context/types';

// get the forums with the specific filters
export function getForums(
  category: ForumCategory | 'all',
  filter: ForumsFilter,
  userId: string,
  search: string,
) {
  return async (dispatch: Dispatch) => {
    dispatch(initSetForums());

    let query: any;
    const collectionRef = firebase.db.collection('forums');

    //build the category query
    switch (category) {
      case 'all': 
        query = collectionRef;
        break;

      case 'art':
        query = collectionRef.where('category', '==', 'art');
        break;

      case 'economy':
        query = collectionRef.where('category', '==', 'economy');
        break;

      case 'entrepreneurship':
        query = collectionRef.where('category', '==', 'entr');
        break;

      case 'math':
        query = collectionRef.where('category', '==', 'math');
        break;

      case 'natural sciences':
        query = collectionRef.where('category', '==', 'natural-sciences');
        break;

      case 'philosophy & language':
        query = collectionRef.where('category', '==', 'philosophy');
        break;

      case 'society':
        query = collectionRef.where('category', '==', 'society');
        break;

      case 'sports':
        query = collectionRef.where('category', '==', 'sports');
        break;

      case 'technology':
        query = collectionRef.where('category', '==', 'technology');
        break;
    }

    //build search query
    const vl = search.trim();
    if (vl !== '') {
      query = query.where('title', '==', vl);
    }

    //build the filter query
    switch (filter) {
      case 'ancient':
        query = query.orderBy('date', 'asc');
        break;
      case 'less-votes':
        query.orderBy('date', 'asc');
        break;
      case 'more-votes':
        query.orderBy('date', 'desc');
        break;
      case 'recent':
        query = query.orderBy('date', 'desc');
        break;
      case 'user-forums':
        const userRef = firebase.db.collection('users').doc(userId);
        query = query.where('author', '==', userRef);
        break;
    }

    const querySnapshot: fb.firestore.QuerySnapshot<fb.firestore.DocumentData> = await query.get();
    let forums: HelpForumDoc[] = [];

    for (let i = 0, n = querySnapshot.docs.length; i < n; i++) {
      const forum = {
        ...querySnapshot.docs[i].data(),
        id: querySnapshot.docs[i].id,
      };
      forums.push(forum as HelpForumDoc);
    }

    dispatch(setForums(forums));
  };
}

const initSetForums = (): AnyAction => ({
  type: INIT_SET_FORUMS,
});

const setForums = (forums: HelpForumDoc[]): AnyAction => ({
  type: SET_FORUMS,
  payload: forums,
});
