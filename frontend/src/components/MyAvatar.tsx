// hooks
import { useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar, { Props as AvatarProps } from './Avatar';
import { RootState } from 'src/store/reducer';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: AvatarProps) {
  const { user } = useSelector((state: RootState) => state.auth);
const name = user?.user?.email?.split('?')[0];
  return (
    <Avatar
      // src={user?.photoURL}
      alt={name}
      color={createAvatar(name).color}
      {...other}
    >
      {createAvatar(name).name}
    </Avatar>
  );
}
