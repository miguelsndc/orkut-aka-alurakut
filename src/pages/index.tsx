import { useEffect, useState } from 'react';

import CreateCommunityForm from '@components/CreateCommunityForm';
import NostalgicIconSet from '@components/NostalgicIconSet';
import ProfileRelations from '@components/ProfileRelations';
import ProfileSidebar from '@components/ProfileSidebar';
import MainGrid from '@components/MainGrid';
import Box from '@components/Box';

import useCommunity from 'src/hooks/useCommunity';
import { Follower } from 'src/types/Follower';
import * as S from '@styles/pages/Home';
import api from 'src/services/api';

export default function Home() {
	const githubUser = 'miguelsndc';

	const { communities, createCommunity } = useCommunity();
	const [followers, setFollowers] = useState<Follower[]>([]);

	console.log(communities);

	useEffect(() => {
		api.get<Follower[]>(`/users/${githubUser}/followers`).then(response => {
			const { data } = response;
			setFollowers(data);
		});
	}, []);

	return (
		<MainGrid>
			<S.GridItem className='profileArea' gridArea='profileArea'>
				<ProfileSidebar user={'miguelsndc'} />
			</S.GridItem>
			<S.GridItem className='welcomeArea' gridArea='welcomeArea'>
				<Box>
					<h1 className='title'>Bem vindo</h1> <NostalgicIconSet />
				</Box>
				<Box>
					<h2 className='subTitle'>O que você deseja fazer ?</h2>
					<CreateCommunityForm onCreate={createCommunity} />
				</Box>
			</S.GridItem>
			<S.GridItem
				className='profileRelationsArea'
				gridArea='profileRelationsArea'
			>
				<Box>
					<h2 className='smallTitle'>
						Meus Amigos <span>({followers.length})</span>
					</h2>
					<S.ProfileRelationsWrapper>
						{followers.slice(0, 6).map(follower => {
							return (
								<ProfileRelations
									key={follower.id}
									name={follower.login}
									imageURL={follower.avatar_url}
								/>
							);
						})}
					</S.ProfileRelationsWrapper>
				</Box>
				<Box>
					<h2 className='smallTitle'>
						Comunidades <span>({communities.length})</span>
					</h2>
					<S.ProfileRelationsWrapper>
						{communities.slice(0, 6).map(community => {
							return (
								<ProfileRelations
									key={community.id}
									name={community.name}
									imageURL={community.imageUrl}
								/>
							);
						})}
					</S.ProfileRelationsWrapper>
				</Box>
			</S.GridItem>
		</MainGrid>
	);
}
