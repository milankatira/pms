import { Card, TableCell, Typography } from '@mui/material';

import style from './BlogPostCard.module.scss';
import { fDate } from 'src/utils/formatTime';
import TextIconLabel from 'src/components/TextIconLabel';
import Label from 'src/components/Label';
import { useTheme } from '@mui/material';
import { description } from '../../../_mock/text';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { paramCase } from 'change-case';
import TextMaxLine from 'src/components/TextMaxLine';
import NextLink from 'next/link';
import { Link } from '@mui/material';
import MaxWidthDialog from 'src/sections/overview/mui/dialog/MaxWidthDialog';

type Props = {
  post: {
    name: string;
    description: string;
    createdAt: Date;
    status: string;
    logCount: number;
    _id: number;
  };
  index?: number;
};

export default function BlogPostCard({ post, index }: Props) {
  const theme = useTheme();

  const linkTo = PATH_DASHBOARD.blog.view(post._id as unknown as string);

  return (
    <Card className={style.card}>
      <div className={style.name__container}>
        <NextLink href={linkTo} passHref>
          <Link color="inherit">
            <TextMaxLine variant={'h5'} line={1} persistent>
              {post.name}
            </TextMaxLine>
          </Link>
        </NextLink>
        <TableCell align="left">
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={
              (post?.status === 'paid' && 'success') ||
              (post?.status === 'unpaid' && 'warning') ||
              (post?.status === 'overdue' && 'error') ||
              'default'
            }
            sx={{ textTransform: 'capitalize' }}
          >
            {post?.status}
          </Label>
        </TableCell>
      </div>
      <Typography className={style.bold}>description</Typography>
      <p>
        {post.description.substring(0, 25)}
        {post.description.length > 25 ? '...' : ''}
      </p>
      <div className={style.name__container}>
        <Typography className={style.bold}>starting date</Typography>

        <p>{fDate(post?.createdAt)}</p>
      </div>

      <div className={style.name__container}>
        <Typography className={style.bold}>logs</Typography>
        <p>{post.logCount}</p>
      </div>
      <br />
    </Card>
  );
}
