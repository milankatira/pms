// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar, { Props as AvatarProps } from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: AvatarProps) {
  const { user } = useAuth();

  return (
    <Avatar
      src={user?.photoURL}
      alt={'MILAN'}
      color={user?.photoURL ? 'default' : createAvatar('MILAN').color}
      {...other}
    >
      {createAvatar('MILAN').name}
    </Avatar>
  );
}
