import axios, { AxiosRequestConfig } from 'axios';
import { FollowerResponse } from 'src/pages/followers';
import api from 'src/services/api';
import { firestore, firebase } from 'src/services/firebase/config';
import { Community } from 'src/types/Community';
import { GithubUser } from 'src/types/GithubUser';
import { PostType } from 'src/types/Post';

type DocRef =
	firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;

export const getPosts = (): Promise<PostType[]> =>
	new Promise(resolve => {
		firestore
			.collection('posts')
			.orderBy('createdAt', 'desc')
			.get()
			.then(querySnapshot => {
				const documents = querySnapshot.docs.map(doc => {
					const docData = doc.data() as PostType;

					if (docData.createdAt instanceof firebase.firestore.Timestamp)
						return {
							...docData,
							createdAt: docData.createdAt.toDate().toISOString(),
						};
				});
				resolve(documents);
			});
	});

export const createPost = (newPost: PostType): Promise<void> =>
	new Promise((resolve, reject) => {
		firestore
			.collection('posts')
			.doc(newPost.id)
			.set(newPost)
			.then(() => resolve())
			.catch(error => reject(error));
	});

export const getFollowers = async (
	githubUserId: string,
	config?: AxiosRequestConfig,
	page: number = 1,
	results_per_page: number = 20
) => {
	const { data } = await axios.post<FollowerResponse>('/api/followers', {
		uid: githubUserId,
		config,
		page,
		resultsPerPage: results_per_page,
	});

	return data;
};

export const getUser = async (
	id: string | string[],
	config?: AxiosRequestConfig
) => await api.get<GithubUser>(`/users/${id}`, config);

export const getCommunities = (): Promise<Community[]> =>
	new Promise(resolve => {
		firestore
			.collection('communities')
			.get()
			.then(querySnapshot => {
				const documents = querySnapshot.docs.map(
					doc => doc.data() as Community
				);
				resolve(documents);
			});
	});

export const createCommunity = (newCommunity: Community): Promise<DocRef> =>
	new Promise(resolve => {
		firestore
			.collection('communities')
			.add(newCommunity)
			.then(docRef => resolve(docRef));
	});

export const togglelike = async (
	postId: string,
	currentLikes: number,
	hasLiked: boolean
) =>
	new Promise((resolve, reject) => {
		firestore
			.collection('posts')
			.doc(postId)
			.update({
				likes: hasLiked ? currentLikes - 1 : currentLikes + 1,
			})
			.then(() => resolve('Document updated successfully'))
			.catch(error => reject(error));
	});

export const getPost = (postId: string | string[]): Promise<PostType> =>
	new Promise((resolve, reject) => {
		if (typeof postId === 'string')
			firestore
				.collection('posts')
				.doc(postId)
				.get()
				.then(querySnapshot => {
					const data = querySnapshot.data() as PostType;

					if (data.createdAt instanceof firebase.firestore.Timestamp) {
						const converted: PostType = {
							...data,
							createdAt: data.createdAt.toDate().toISOString(),
						};

						resolve(converted);
					}

					reject(data);
				})
				.catch(error => reject(error));
		else {
			reject('Could not perform this operation');
		}
	});
