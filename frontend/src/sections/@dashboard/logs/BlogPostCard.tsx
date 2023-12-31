import { Button, Card, TableCell, Typography } from '@mui/material';

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

type Props = {
  post: {
    _id: number;
    status: string;
    projectId: {
      name: string;
    };
    duration: number;
    note: string;
    date: Date;
  };
  index?: number;
};

export default function BlogPostCard({ post, index }: Props) {
  const theme = useTheme();

  const linkTo = PATH_DASHBOARD.logs.view(post._id as unknown as string);

  return (
    <Card className={style.card}>
      <div className={style.status__container}>
        <TableCell align="right">
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

      <div className={style.name__container}>
        <Typography className={style.bold}>project</Typography>
        <p>{post?.projectId?.name}</p>
      </div>
      <div className={style.name__container}>
        <Typography className={style.bold}>starting date</Typography>
        <p>{fDate(post?.date)}</p>
      </div>
      <br />
      <Typography className={style.bold}>description</Typography>
      <br />
      <div
        className={style.note__container}
        dangerouslySetInnerHTML={{ __html: post && post.note }}
      />

      <br />
      <NextLink href={linkTo} passHref>
        <Button>Edit</Button>
      </NextLink>
    </Card>
  );
}
